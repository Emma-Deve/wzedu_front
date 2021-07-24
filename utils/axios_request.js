import axios from 'axios'
import { ColorPicker } from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  //部署，将 localhost 改成 116.62.106.210
  //baseURL: 'http://localhost:9001', // api 的 base_url（nginx）（只能加单引号）（坑）
  baseURL: 'http://localhost:8222', //gateway网关（02/09修改）
  timeout: 5000 // 请求超时时间
})


// 创建拦截器，http request 拦截器
// 需要引入 js-cookie
service.interceptors.request.use(
  config =>{
    //判断cookie里面是否有名称是 wz_token的数据
    if(cookie.get('wz_token')){
      //把cookie值放到header里面
      config.headers['token'] = cookie.get('wz_token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)



// http response 拦截器
//（02/05 添加）
//微信支付时拦截 “支付中” 请求，让其等待支付（等待，不做任何处理）
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
        console.log("response.data.resultCode是28004")
        // 返回 错误代码-1 清除ticket信息并跳转到登录页面
        //debugger
        window.location.href="/login"
        return
    }else{
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if(response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        return response;
      }
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
});



export default service