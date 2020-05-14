<template>
  <div id="person">
    <div class="header">
      <div class="img">
        <img
          ref="img"
          :src="users.avatarUrl"
          alt
        />
      </div>
      <div
        ref="name"
        class="name"
      >{{users.nickname}}</div>

    </div>
    <van-row type="flex">
      <van-col
        offset="5"
        span="12"
      >ID：{{users.userId}}</van-col>

    </van-row>
    <van-row type="flex">
      <van-col
        offset="4"
        span="8"
      >被关：{{users.followeds}}</van-col>

    </van-row>
    <van-row type="flex">
      <van-col
        offset="4"
        span="8"
      >关注：{{users.follows}}</van-col>

    </van-row>
    <footer>
      <div
        class="imgicon"
        v-show="istrue"
      >
        <router-link to="/login">
          <van-button type="default">点击登录</van-button>
        </router-link>
      </div>
      <div class="imgicon">
        <van-button
          type="default"
          @click="signout"
          v-show="!istrue"
        >退出登录</van-button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'person',
  data() {
    return {
      istrue: false,
      users: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    nohave() {
      this.$toast('error')
    },
    //   退出
    signout() {
      this.istrue = false
      this.$router.push('/login')
    }
  },
  mounted() {}
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
  font-size: 1.5rem;
  text-indent: 2rem;
  margin-left: 0.4rem;
  color: rgb(198, 47, 47);
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
</style>