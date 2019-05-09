const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

let router = new Router()

router.get('/insertAllPeopleImg', async (ctx) => {
  fs.readFile('./data_json/people_img2.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const PeopleImg = mongoose.model('Img')
    data.map((value, index) => {
      let newPeopleImgs = new PeopleImg(value)
      newPeopleImgs.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        // console.log(error)
      })
    })
  })
  ctx.body = '开始导入数据'
})
// 上面是导入数据库 下面获取商品详情信息的接口

router.post('/getImg', async (ctx) => {
  try {
    let imgtype = ctx.request.body.type //子类别ID
    let page = parseInt(ctx.request.body.page) //当前页数
    let num = parseInt(ctx.request.body.pageNum) //每页显示数量
    let start = parseInt((page - 1) * num) //开始位置
    const PeopleImgs = mongoose.model('Img')
    let obj = imgtype ? {
      type: imgtype
    } : {}
    let sum = await PeopleImgs.find(obj).countDocuments('', (err, count) => {
      if (err) {
        return console.error(err)
      }
      return count;
    })
    let result = await PeopleImgs.find(obj, {
        type: 1,
        img: 1,
        _id: 1
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

router.post('/submitImg', async (ctx) => {
  const Img = mongoose.model('Img')
  let newLiuyan = new Img(ctx.request.body)

  await newLiuyan.save().then(() => {
    ctx.body = {
      code: 200,
      message: '留言成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

router.post('/removeImg', async (ctx) => { //删除留言
  try {
    let id = ctx.request.body.id;
    const Img = mongoose.model('Img')
    await Img.remove({
      _id: id
    })
    ctx.body = {
      code: 200,
      message: '删除成功'
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
