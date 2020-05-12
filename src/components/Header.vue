<template>
  <div>
    <div id="appheader">
      <div class="flex">
        <div class="icon">
          <van-cell @click="showPopup">
            <van-icon name="wap-nav" />
          </van-cell>
          <van-popup
            v-model="show"
            round
            position="left"
            :style="{ width: '70%',height:'100%'}"
          >
            <sidebar />
          </van-popup>
        </div>
        <div class="title">网易云音乐</div>
        <div class="icon">
          <router-link to="/search">
          </router-link>
        </div>
      </div>
      <div class="wrap">
        <van-row>
          <router-link
            to="/sheet"
            tag="div"
          >
            <van-col>推荐</van-col>
          </router-link>
          <router-link
            to="/ranking"
            tag="div"
          >
            <van-col>歌单</van-col>
          </router-link>
          <router-link
            to="/singer"
            tag="div"
          >
            <van-col>歌手</van-col>
          </router-link>
        </van-row>
      </div>
      <div class="cover">

        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>

      </div>
    </div>
    <van-button type="default">按钮</van-button>

  </div>
</template>

<script>
import sidebar from './Sidebar'
export default {
  name: 'appheader',
  components: {
    sidebar
  },
  data() {
    return {
      show: false,
      active: 1,
      tel: '',
      text: '',
      digit: '',
      number: '',
      password: ''
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onConfirm(date) {
      this.show = false
      this.text = `选择了 ${date.length} 个日期`
    }
  }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(42, 41, 48);
}
.icon .van-cell {
  background: rgb(42, 41, 48);
}
.icon i {
  font-size: 2rem;
  cursor: pointer;
}
.title {
  font-weight: 600;
  color: #ffffff;
}
.wrap {
  width: 100%;
  background: rgb(42, 41, 48);
  font-size: 0.8rem;
  height: 2rem;
}
.van-row {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #ffffff;
}
.van-row div {
  margin-left: 1.5rem;
}

.cover {
  height: 200px;
  width: 100%;
  margin-top: 3rem;
}
</style>
