<template>
  <div class="registered">
    <van-nav-bar title="新用户注册" />
    <van-field
      label="手机号"
      type="tel"
      clickable
      :value="validateForm.phone"
      @touchstart.native.stop="show = true,show1=false"
    />
    <van-number-keyboard
      v-model="validateForm.phone"
      :show="show"
      :maxlength="11"
      @blur="show = false,show1=false"
    />
    <van-field
      v-model="validateForm.captcha"
      center
      clearable
      label="验证码"
      placeholder="请输入验证码"
    >
      <template #button>
        <van-button
          round
          color="#c62f2f"
          size="small"
          type="primary"
          @click="getCaptcha(time)"
          v-show="!captchabutton"
        >发送验证码</van-button>
        <van-button
          v-show="captchabutton"
          disabled
        >
          <van-count-down
            :time="time"
            format="ss 秒"
            @finish="finish"
          />
        </van-button>
      </template>
    </van-field>
    <van-field
      label="密码"
      type="password"
      clickable
      :value="validateForm.password"
      v-model="validateForm.password"
    />
    <van-field
      label="昵称"
      type="text"
      clickable
      :value="validateForm.nickname"
      v-model="validateForm.nickname"
    />
    <div style="margin: 20px;">
      <van-button
        color="#c62f2f"
        round
        block
        type="info"
        native-type="submit"
        @click="vertify"
      >注册</van-button>
    </div>
    <router-link to="/login">
      <div>返回登陆</div>
    </router-link>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'SignIn',
  data() {
    return {
      tel: '',
      text: '',
      digit: '',
      number: '',
      password: '',
      show: false,
      show1: false,
      show2: false,
      captchabutton: false,
      value: '',
      passvalue: '',
      validateForm: {
        captcha: '',
        phone: '',
        password: '',
        nickname: ''
      },
      time: '',
      user: {}
    }
  },
  methods: {
    getCaptcha(time) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/captcha/sent?phone=' + this.validateForm.phone
      }).then((res) => {
        console.log(res.data)
        this.captchabutton = true
        time = 1 * 1 * 60 * 1000
        this.time = time
      })
    },
    vertify() {
      this.axios({
        method: 'get',
        url:
          'http://localhost:3000/captcha/verify?phone=' +
          this.validateForm.phone +
          '&captcha=' +
          this.validateForm.captcha
      }).then((res) => {
        console.log(res.data)
        this.axios({
          method: 'get',
          url:
            'http://localhost:3000/register/cellphone?phone=' +
            this.validateForm.phone +
            '&password=' +
            this.validateForm.password +
            '&captcha=' +
            this.validateForm.captcha +
            '&nickname=' +
            this.validateForm.nickname
        }).then((result) => {
          console.log(result.data)
          Toast('注册成功，返回登陆页面')
          this.$router.push('/login')
        })
      })
    },
    finish() {
      this.captchabutton = false
    }
  },
  created() {
    this.getCaptcha()
  },
  components: {}
}
</script>
