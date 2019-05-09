const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "这是文章列表"
})

router.post('/submitArticle', async (ctx) => { //新增文章
  const Article = mongoose.model('Article')
  let newArticle = new Article(ctx.request.body)

  await newArticle.save().then(() => {
    ctx.body = {
      code: 200,
      message: '提交成功'
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
    let sum = await Articles.countDocuments('', (err, count) => {
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

router.post('/getArticleView', async (ctx) => { //获取页面详情
  try {
    let id = ctx.request.body.id;
    let isadd = ctx.request.body.isadd === "false" ? false : true;
    const Articles = mongoose.model('Article')
    if (isadd) {
      await Articles.update({
        _id: id
      }, {
        $inc: {
          read: +1
        }
      })
    }
    let result = await Articles.findById(id);
    ctx.body = {
      code: 200,
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

router.post('/editArticle', async (ctx) => { //编辑修改文章
  try {
    let id = ctx.request.body.id;
    let type = ctx.request.body.type;
    let content = ctx.request.body.content;
    let html = ctx.request.body.html;
    let title = ctx.request.body.title;
    let updateTime = ctx.request.body.updateTime;
    const Articles = mongoose.model('Article')
    await Articles.update({
      _id: id
    }, {
      $set: {
        type: type,
        content: content,
        html: html,
        title: title,
        updateTime: updateTime,
      }
    })
    ctx.body = {
      code: 200,
      message: '修改成功'
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

router.post('/removeArticle', async (ctx) => { //删除文章
  try {
    let id = ctx.request.body.id;
    const Articles = mongoose.model('Article')
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
