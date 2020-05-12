<template>
  <div
    class="login"
    :v-if="isshow"
  >
    <van-nav-bar title="登陆" />
    <van-field
      label="账号"
      type="tel"
      clickable
      v-model="validateForm.username"
      @touchstart.native.stop="show = true,show1=false"
    />

    <van-field
      label="密码"
      type="password"
      clickable
      v-model="validateForm.password"
      @touchstart.native.stop="show1 = true,show=false"
    />

    <van-field
      v-model="verifyCode"
      center
      clearable
      label="验证码"
      placeholder="请输入验证码"
      type="text"
      autocapitalize="on"
    >
      <template #button>
        <img
          ref="image"
          alt
          @click="getVerify()"
        />
      </template>
    </van-field>

    <van-button
      type="primary"
      size="large"
      @click="submit"
    >登录</van-button>
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
      show2: false,
      value: '',
      passvalue: '',
      verifyCode: '',
      validateForm: {
        username: '',
        password: ''
      },
      currentTime: '',
      user: {}
    }
  },
  props: {
    isshow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getVerify() {
      this.currentTime = new Date().getTime()
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/captcha',
        params: {
          name: this.currentTime
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob'
      }).then((res) => {
        let img = this.$refs.image
        let url = window.URL.createObjectURL(res.data)
        img.src = url
      })
    },
    submit() {
      console.log(this.currentTime)
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/sysAdmin/login',
        data: {
          name: this.validateForm.username,
          password: this.validateForm.password,
          verifyCode: this.verifyCode
        },
        headers: {
          Verify: this.currentTime
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.code == 1) {
          this.isshow = false
          let data = res.data.data
          localStorage.setItem('token', data.token)
          this.roles = data.roles
          localStorage.setItem('user', JSON.stringify(data.user))
          Toast(res.data.msg)
          this.$router.push('/')
        } else {
          Toast(res.data.msg)
        }
      })
    }
  },
  created() {
    this.getVerify()
  },
  components: {}
}
</script>
