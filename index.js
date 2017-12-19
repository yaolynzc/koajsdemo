const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

// app.use(async(ctx)=>{
//   ctx.body = 'hello koa2'
// })

// app.use(async (ctx)=>{
//   let url = ctx.request.url
//   ctx.body = url
// })



/************自定义路由 */
/**
 * 用Promise封装异步读取文件方法
 */
// function render(page){
//   return new Promise((resolve,reject) => {
//     let viewUrl = `./view/${page}`
//     fs.readFile(viewUrl,"binary",(err,data)=>{
//       if(err){
//         reject(err)
//       }else{
//         resolve(data)
//       }
//     })
//   })
// }

/**
 * 根据URL获取HTML内容
 */
// async function route(url){
//   let view = '404.html'
//   switch(url){
//     case '/':
//       view = 'index.html'
//       break
//     case '/index':
//       view = 'index.html'
//       break
//     case '/todo':
//       view = 'todo.html'
//       break
//     case '/404':
//       view = '404.html'
//       break
//     default:
//       break
//   }
//   let html = await render(view)
//   return html
// }

// app.use(async (ctx)=>{
//   let url = ctx.request.url
//   let html = await route(url)
//   ctx.body = html
// })


/*******使用koa-router中间件 */
/**npm install --save koa-router */
const Router = require('koa-router')

let home = new Router()
// 子路由1
home.get('/',async(ctx)=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404',async(ctx)=>{
  ctx.body = '404 page!'
}).get('/helloworld',async(ctx)=>{
  ctx.body = 'helloworld page!'
})

// 装载所有子路由
let router = new Router()
router.use('/',home.routes(),home.allowedMethods())
router.use('/page',page.routes(),page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// app.listen(3000)
// console.log('[demo] start-quick is starting at port 3000')
app.listen(3000,()=>{
  console.log('[demo] start-quick is starting at port 3000')
})