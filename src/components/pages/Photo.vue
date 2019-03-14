<template>
  <div>
    照片
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import url from '@/serviceApiConfig.js'

export default {
  data() {
    return {
      active: 0
    }
  },
  mounted() {
    console.log(1)
    this.getImg();
  },
  methods: {
    getImg() {
      let data =  qs.stringify({
        type:1,
        page:1,
        pageNum:20
      })
      axios.post(url.getPeopleImg,data).then(res =>{
         console.log(res)
      })
    }
  }
}
</script>
