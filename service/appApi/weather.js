const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const axios = require('axios')

let router = new Router()

router.get('/weather', async (ctx) => {
  let url = "http://pv.sohu.com/cityjson?ie=utf-8";
  let returnCitySN = await axios.get(url).then(res => {
    eval(res.data)
    return returnCitySN
  })
  let cname = returnCitySN['cname'].split('省')[1].split('市')[0];

  let url2 = "https://www.apiopen.top/weatherApi?city=" + encodeURI(cname)
  let result = await axios.get(url2).then(res => {
    return res.data
  })
  ctx.body = {
    data: result
  }
})

module.exports = router
