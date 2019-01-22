const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-vue'
const glob = require('glob')
const {resolve} = require('path')
let connectMongodb = function(){
  mongoose.connect(db,{useCreateIndex: true, useNewUrlParser: true, })
}
exports.initSchemas = ()=>{
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}



exports.connect = ()=>{
  //链接数据库
  mongoose.connect(db,{useCreateIndex: true, useNewUrlParser: true, })
  let maxConnectTimes = 0;
  connectMongodb();

  return new Promise((resolve,reject)=>{
      //增加数据库监听事件
      mongoose.connection.on('disconnected',()=>{
        console.log('***********数据库断开***********')
        if(maxConnectTimes<=3){
          maxConnectTimes++
          connectMongodb();
        }else{
          reject()
          throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
        }
        
      })

      mongoose.connection.on('error',(err)=>{
        console.log('***********数据库错误*************')
        if(maxConnectTimes<=3){
          maxConnectTimes++
          connectMongodb();
        }else{
          reject(err)
          throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
        }
      })
      //链接打开时候
      mongoose.connection.once('open',()=>{
        console.log('MongoDB connected successfully')
        resolve()
      })
  })

  
}