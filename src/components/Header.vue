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

            <Person></Person>
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
            <van-col>排行榜</van-col>
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
          indicator-color="black"
        >
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
      </div>
      <div class="wrap">
        <van-tabs v-model="active">
          <van-tab title="推荐单曲">
            <div
              v-for="(item,index) in musics"
              :key="index"
            >
              <van-card
                :title="item.name"
                :thumb="item.picUrl"
              ><template #desc>
                  <div
                    v-for="(user,index1) in item.song.artists"
                    :key="index1"
                  >
                    <div>作者：
                      {{user.name}}</div>
                  </div>
                  <div>专辑名：{{item.song.album.name}}</div>
                </template>
                <template #tag>
                  <van-button
                    icon="play-circle-o"
                    size="primary"
                    style="border:none;background-color:rgba(0,0,0,0);margin:50px 0px 0px 70px"
                    @click="getPlay(item.id)"
                  />
                </template>
              </van-card>

            </div>
          </van-tab>
          <van-tab title="推荐歌单">
            <div
              v-for="(item,index) in musiclists.slice(10,20)"
              :key="index"
            >
              <van-card
                :title="item.name"
                :thumb="item.picUrl"
              >
              </van-card>
            </div>
          </van-tab>
          <van-tab title="每日电台">
            <div
              v-for="(item,index) in djprograms"
              :key="index"
            >
              <van-card
                :title="item.name"
                :thumb="item.picUrl"
              >
              </van-card>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <audio
      ref='audio'
      controls
      autoplay
    >
      您的浏览器不支持 audio 元素。
    </audio>
  </div>

</template>

<script>
export default {
  name: 'appheader',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Person: require('../components/Common/Person').default
  },
  data() {
    return {
      show: false,
      active: 1,
      tel: '',
      text: '',
      digit: '',
      number: '',
      password: '',
      musics: [],
      musiclists: [],
      djprograms: []
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },

    getNewSongs() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/personalized/newsong'
      }).then((res) => {
        this.musics = res.data.result
        console.log(this.musics)
      })
    },
    getPlay(id) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + id
      }).then((res) => {
        this.list = res.data.data[0].url
        this.getprogress = res.data.data[0].size
        this.$refs.audio.src = this.list
        this.axios({
          method: 'get',
          url: 'http://localhost:3000/song/detail?ids=' + id
        }).then((result) => {
          this.info[this.count++] = result.data.songs[0]
        })
      })
    },
    getNewList() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/personalized?limit=20'
      }).then((res) => {
        this.musiclists = res.data.result
        console.log(this.musiclists)
      })
    },
    getDgProgram() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/personalized/djprogram'
      }).then((res) => {
        this.djprograms = res.data.result
        console.log(this.djprograms)
      })
    }
  },
  created() {
    this.getNewSongs(), this.getNewList(), this.getDgProgram()
  }
}
</script>

<style scoped>
#appfooter {
  width: 100%;
  height: 60px;
}
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
  background-color: rgb(42, 41, 48);
  font-size: 0.8rem;
  height: 100%;
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
  height: 150px;
  width: 100%;
}
</style>
