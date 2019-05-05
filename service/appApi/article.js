const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "这是文章列表"
})

router.post('/submitArticle', async (ctx) => {
  const Article = mongoose.model('Article')
  let newArticle = new Article(ctx.request.body)

  await newArticle.save().then(() => {
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

router.post('/getArticleList', async (ctx) => { //获取列表
  try {
    let page = parseInt(ctx.request.body.page) //当前页数
    let num = parseInt(ctx.request.body.pageNum) //每页显示数量
    let start = parseInt((page - 1) * num) //开始位置
    const Articles = mongoose.model('Article')
    let sum = await Articles.count('', (err, count) => {
      if (err) {
        return console.error(err)
      }
      return count;
    })
    let result = await Articles.find({}, {
        title: 1,
        type: 1,
        read: 1,
        createTime: 1,
        updateTime: 1,
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

router.post('/getArticleView', async (ctx) => { //获取列表
  try {
    let id = ctx.request.body.id;
    let read = ctx.request.body.read;
    let isadd = ctx.request.body.isadd === "false" ? false : true;
    let num = parseInt(read) + 1;
    const Articles = mongoose.model('Article')
    if (isadd) {
      await Articles.update({
        _id: id
      }, {
        $set: {
          read: num
        }
      })
    }
    let result = await Articles.findById(id);
    ctx.body = {
      code: 200,
      num: num,
      data: result,
      message: '请求成功'
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
