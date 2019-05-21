const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const axios = require('axios')

let router = new Router()

router.get('/ip', async (ctx) => {
  let url = "http://pv.sohu.com/cityjson?ie=utf-8";
  let returnCitySN = await axios.get(url).then(res => {
    eval(res.data)
    return returnCitySN
  })
  let ip = returnCitySN['cip']
  // let ip = returnCitySN['cip']
  let cid = returnCitySN['cid']
  let cname = returnCitySN['cname']
  const IP = mongoose.model('IP')
  let result = await IP.find({
    ip: ip
  }, {
    ip: 1
  })
  if (result.length === 0) {
    let obj = {
      count: 1,
      ip: ip,
      orNew: true,
      cname: cname,
      cid: cid
    }
    let IPmodel = new IP(obj)
    await IPmodel.save()
  } else {
    await IP.updateOne({
      ip: ip
    }, {
      $inc: {
        count: +1
      },
      $set: {
        orNew: false
      }
    })
  }
  const Count = mongoose.model("Count")
  let sum = await IP.find({}).countDocuments('', (err, count) => {
    if (err) {
      return console.error(err)
    }
    return count;
  })
  let alltime = 0
  let arr = await IP.find({}, {
    count: 1,
    ip: 1,
    orNew: 1
  })
  for (const item of arr) {
    alltime += item.count
  }
  let res = await IP.find({
    ip: ip
  }, {
    ip: 1,
    orNew: 1,
    city: 1,
    cid: 1,
  })
  ctx.body = {
    code: 200,
    data: {
      count: sum,
      ip: res[0].ip,
      orNew: res[0].orNew,
    },
    alltime: alltime
  }
})

router.post('/ipList', async (ctx) => { //获取列表
  try {
    let cid = parseInt(ctx.request.body.cid) //城市id
    let page = parseInt(ctx.request.body.page) //当前页数
    let num = parseInt(ctx.request.body.pageNum) //每页显示数量
    let start = parseInt((page - 1) * num) //开始位置
    const IP = mongoose.model('IP')
    let sum = await IP.countDocuments('', (err, count) => {
      if (err) {
        return console.error(err)
      }
      return count;
    })

    let obj = cid ? {
      cid: cid
    } : {}
    let result = await IP.find(obj, {
        count: 1,
        ip: 1,
        orNew: 1,
        cid: 1,
        cname: 1,
        _id: 1,
      }).sort({
        _id: -1
      })
      .skip(start).limit(num).exec()
    ctx.body = {
      code: 200,
      data: {
        count: sum,
        current: page,
        pageSize: num,
        rows: result
      }
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

module.exports = router
