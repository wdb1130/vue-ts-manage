import Mock from 'mockjs' // 获取mock对象
const Random = Mock.Random // 用于生成随机数据
const domain = 'http://localhost:8080' // 自定义域名

// Mock.mock( rurl, rtype, template )  //url、请求类型、模板数据（支持函数返回）

Mock.mock(`${domain}/roomList`, 'post', (req:any) => {
  const data = []
  const code:number = 0
  for (let i = 0; i < 10; i++) {
    const item = {
      id: Random.integer(10, 100), // 随机生成名字
      courtCode: Random.integer(1300, 1399), // 随机生成名字
      name: `第${Random.cword('一二三四五六七八九十')}法庭`, // 随机汉子字符串
      url: Random.word(3, 5) // 随机生成单词
    }
    data.push(item)
  }
  return { code, data }
})
