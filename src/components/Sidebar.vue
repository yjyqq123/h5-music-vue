<template>
  <div id="sidebar">
    <div class="header">
      <div class="img">
        <img
          ref="img"
          :src="user.avatarUrl"
          alt
        />
      </div>
      <div
        ref="name"
        class="name"
      >{{user.signature}}</div>
    </div>
    <div
      ref="nickname"
      class="nickname"
    >{{user.nickname}}</div>

    <footer>
      <van-overlay
        :show="show"
        @click="show = false"
      >
        <div
          class="wrapper"
          @click.stop
        >
          <div class="block">
            <login>
            </login>
          </div>

        </div>

      </van-overlay>
      <div
        class="imgicon"
        @click="show = true"
        v-if="!istrue"
      >
        <van-button type="default">登录</van-button>
      </div>
      <div
        class="imgicon"
        v-if="istrue"
      >
        <van-button
          type="default"
          @click="signout"
        >退出</van-button>
      </div>
    </footer>
  </div>
</template>
<script>
import login from '../components/Login'
export default {
  name: 'sidebar',
  components: {
    login
  },
  data() {
    return {
      user: [],
      show: false,
      istrue: false,
      users: JSON.parse(localStorage.getItem('user'))
    }
  },
  inject: ['reload'],
  methods: {
    nohave() {
      this.$toast('error')
    },
    //   退出
    signout() {
      this.istrue = false
      localStorage.removeItem('user')
      this.reload()
      this.$router.push('/')
    }
  },
  mounted() {
    this.getuser()
  }
}
</script>
<style scoped>
#sidebar {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
/* header */
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
}
.img img {
  width: 4rem;
  border-radius: 50%;
}
.name {
  font-size: 0.8rem;
  text-indent: 2rem;
  margin-left: 0.4rem;
  color: rgb(41, 172, 196);
}
.nickname {
  font-size: 0.8rem;
  font-weight: 400;
  text-indent: 1rem;
}
/* icon */
.icon {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top: 1rem;
}
.added .van-icon {
  font-size: 1.8rem;
  color: red;
  opacity: 0.8;
}

.iconname {
  font-size: 0.2rem;
  text-align: center;
}
/* nav */
.nav {
  margin-top: 1.8rem;
}
.nav div {
  width: 100%;
  height: 2rem;
  background: #ccc;
  text-align: center;
  margin-top: 10%;
  border-radius: 1rem;
  line-height: 2rem;
  color: black;
  font-weight: 400;
}
/* 底部 */
footer {
  position: fixed;
  bottom: 0;
  left: 40%;
}
.iconfont {
  font-size: 3rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 240px;
  height: 300px;
  background-color: #fff;
}
</style>