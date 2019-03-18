<template>
  <div class="aj">
    <van-list v-model="loading"
              :finished="finished"
              @load="onLoad"
              :offset="400">
      <img v-for="(item, key) in imageList"
           :key="key"
           :src="item.img"
           @click="preview(item)">
    </van-list>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import url from '@/serviceApiConfig.js'
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      imageList: [],
      loading: false,
      finished: false,
      total: 0,
      current: 0,
      pageSize: 20,
      imagePreview: null,
      scrollTop: -1,
      clsName: "top",
      navShow:false,
    };
  },
  mounted() {
    console.log(1)
  },
  methods: {
    preview(item) {
      this.navShow= false;
      const images = this.imageList.map(_ => _.img);
      console.log('images',images)
      this.imagePreview = ImagePreview({
        images,
        startPosition: this.imageList.indexOf(item),
        onClose: () => this.navShow = true
      });
    },
    async onLoad() {
      let data =  qs.stringify({
        type:1,
        page:this.current + 1,
        pageNum:this.pageSize
      })
      let result = await axios.post(url.getPeopleImg,data).then(res =>{
         return res.data.data
      })
      this.loading = false;
      this.imageList.push(...result.rows);
      this.current = result.current;
      this.total = result.count;
      if (this.imageList.length >= this.total) this.finished = true;
    },
  }
}
</script>
<style scoped>
.aj {
  background: white;
  height: 80%;
  width: 100%;
  color: black;
}
img {
    margin: .08rem;
    width: 32vw;
    height: 32vw;
    overflow: hidden;
    border-radius: .266667rem;
  }
</style>
