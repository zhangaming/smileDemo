const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const axios = require('axios')

let router = new Router()

router.post('/weather', async (ctx) => {
  let cname = ctx.request.body.cityName
  let url2 = "https://www.apiopen.top/weatherApi?city=" + encodeURI(cname)
  let result = await axios.get(url2).then(res => {
    return res.data
  })
  ctx.body = {
    data: result
  }
})

module.exports = router
