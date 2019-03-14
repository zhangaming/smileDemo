const fs = require('fs')

fs.readFile('./data_json/goods.json','utf8',function(err,data){
  let newData = JSON.parse(data)
  let pushData = []
  newData.RECORDS.map((value,index)=>{
    if(value.IMAGE1!=null){
      pushData.push(value)
    }
  })

  fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData),(err)=>{
    if(err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})

//重写文件
