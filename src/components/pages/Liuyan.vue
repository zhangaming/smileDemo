<template>
  <div>
    <van-row>
      <van-col span="24">
        <h1 class="title">留言板</h1>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-cell-group>
          <van-field v-model="user"
                     label="昵称"
                     left-icon="contact"
                     required
                     clearable/>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="message"
                     label="留言"
                     type="textarea"
                     placeholder="请输入留言"
                     rows="1"
                     autosize />
        </van-cell-group>
        <van-cell-group class="btn_row">
          <van-button size="small"
                      class="btn"
                      @click="submit">提交按钮</van-button>
        </van-cell-group>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-cell-group class="btn_row">
          <van-button size="small"
                      class="btn"
                      @click="getmsg">获取按钮</van-button>
        </van-cell-group>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios'
import qs from 'qs'
import url from '@/serviceApiConfig.js'

export default {
  data () {
    return {
      message: '',
      user: '',
      total: 0,
      current: 0,
      pageSize: 10,
    }
  },
  methods: {
    submit () {

      if (!this.user) {
        Toast('请输入昵称', 1000);
        return
      }
      console.log('user', this.user)
      console.log("message", this.message)
      let data = qs.stringify({
        user: this.user,
        message: this.message,
      })
      axios.post(url.submitMessage, data).then(res => {
        Toast(res.data.message, 1000);
      })
    },
    async getmsg () {
      let data = qs.stringify({
        page: this.current + 1,
        pageNum: this.pageSize
      })
      let result = await axios.post(url.getMessage, data).then(res => {
        return res.data.data
      })
      console.log('result', result)
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
}
.btn_row {
  display: flex;
  justify-content: center;
  padding: 5px 0;
}
.btn {
  color: #fff;
  background-color: #1989fa;
  border: 1px solid #1989fa;
}
</style>
