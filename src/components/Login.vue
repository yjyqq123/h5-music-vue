<template>
  <div class="bg">
    <van-nav-bar title="登陆" />
    <van-field
      label="账号"
      type="tel"
      clickable
      v-model="validateForm.phoneNumber"
      :rules="[{ required: true, message: '请填写手机号' }]"
      @touchstart.native.stop="show = true,show1=false"
    />
    <van-number-keyboard
      v-model="validateForm.phoneNumber"
      :show="show"
      :maxlength="11"
      @blur="show = false,show1=false"
    />

    <van-field
      label="密码"
      type="password"
      clickable
      v-model="validateForm.password"
      :rules="[{ required: true, message: '请填写密码' }]"
      @touchstart.native.stop="show1 = true,show=false"
    />
    <van-number-keyboard
      v-model="validateForm.password"
      :show="show1"
      @blur="show1 = false,show=false"
    />
    <router-link to="/registered">
      <p>还未注册？点击注册账号</p>
    </router-link>
    <div style="margin: 20px;">
      <van-button
        color="#c62f2f"
        round
        block
        type="info"
        native-type="submit"
        @click="submit"
      >登录</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      tel: '',
      text: '',
      digit: '',
      number: '',
      password: '',
      show: false,
      show1: false,
      value: '',
      passvalue: '',
      validateForm: {
        phoneNumber: '',
        password: ''
      },
      schema: {
        phoneNumber: [
          { required: true, error: '手机号不能为空' },
          {
            regex: /^1[3|4|5|6|7|8][0-0]{9}$/,
            error: '手机号格式不正确'
          }
        ]
      },
      currentTime: '',
      user: {}
    }
  },

  methods: {
    submit() {
      console.log(this.currentTime)
      this.axios({
        method: 'post',
        url:
          'http://localhost:3000/login/cellphone?phone=' +
          this.validateForm.phoneNumber +
          '&password=' +
          this.validateForm.password
      }).then((res) => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.isshow = false
          let data = res.data
          localStorage.setItem('token', data.token)
          this.roles = data.roles
          localStorage.setItem('user', JSON.stringify(data.profile))
          this.$router.push('/')
        } else {
          Toast(res.data.msg)
        }
      })
    }
  },
  created() {},
  components: {}
}
</script>
<style scoped>
.bg {
}
</style>
