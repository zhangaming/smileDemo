const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "这是留言板"
})

router.post('/submitMessage', async (ctx) => {
  const Liuyan = mongoose.model('Liuyan')
  let newLiuyan = new Liuyan(ctx.request.body)

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

router.post('/getMessage', async (ctx) => {
  try {
    let page = parseInt(ctx.request.body.page) //当前页数
    let num = parseInt(ctx.request.body.pageNum) //每页显示数量
    let start = parseInt((page - 1) * num) //开始位置
    const Liuyans = mongoose.model('Liuyan')
    let sum = await Liuyans.count('', (err, count) => {
      if (err) {
        return console.error(err)
      }
      return count;
    })
    let result = await Liuyans.find({}, {
        user: 1,
        message: 1,
        createTing: 1,
        _id: 0
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



module.exports = router;
