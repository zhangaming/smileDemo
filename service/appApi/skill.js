const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "这是技能列表"
})

router.post('/submitSkill', async (ctx) => {
  const Skill = mongoose.model('Skill')
  let newLiuyan = new Skill(ctx.request.body)

  await newLiuyan.save().then(() => {
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
router.post('/getSkill', async (ctx) => {
  try {
    let page = parseInt(ctx.request.body.page) //当前页数
    let num = parseInt(ctx.request.body.pageNum) //每页显示数量
    let start = parseInt((page - 1) * num) //开始位置
    const Skill = mongoose.model('Skill')
    let sum = await Skill.find({}).countDocuments('', (err, count) => {
      if (err) {
        return console.error(err)
      }
      return count;
    })
    let result = await Skill.find({}, {
        skill: 1,
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

router.post('/removeSkill', async (ctx) => { //删除留言
  try {
    let id = ctx.request.body.id;
    const Skill = mongoose.model('Skill')
    await Skill.remove({
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
