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
    let type = ctx.request.body.type //类型
    let obj = type ? {
      type: type
    } : {}
    let start = parseInt((page - 1) * num) //开始位置
    const Liuyans = mongoose.model('Liuyan')
    let sum = await Liuyans.find(obj).countDocuments('', (err, count) => {
      if (err) {
        return console.error(err)
      }
      return count;
    })
    let result = await Liuyans.find(obj, {
        user: 1,
        message: 1,
        createTime: 1,
        time: 1,
        type: 1,
        _id: 1
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

router.post('/removeMessage', async (ctx) => { //删除留言
  try {
    let id = ctx.request.body.id;
    const Articles = mongoose.model('Liuyan')
    await Articles.remove({
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


module.exports = router;
