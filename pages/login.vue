<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' }]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
            <!-- TODO:项目上线后这里的微信登录超链接要改成服务器对应地址 （localhost ==> 116.62.106.210）          
            @click.prevent="wxlogin()" 按理来说,这个可以阻止a标签的默认行为,转而来执行这个wxlogin这个方法,但是不生效??? -->
          <li><a id="weixin" class="weixin" target="_blank" href='http://localhost:8150/api/ucenter/wx/login'><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>


<script>
// 导入必要样式（固定）
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

import loginApi from '@/api/login'

// 引入 js-cookie（进行登录cookie操作使用）
import cookie from 'js-cookie'


export default{
    //指定layout首部尾部页面为 layouts/sign.vue（默认是 default.vue）
    layout:'sign',

    data(){
        return {
            user:{
                mobile:'',
                password:''
            },
            //用户信息（/token）
            token:'',
            loginInfoByToken:''  //token 约等于 用户信息（因为 用户信息 就是根据 token 解析出来的）
        }
    },
    created(){

    },
    methods:{
        submitLogin(){

            //第一步：调用接口进行登录，后端接口返回token字符串
            loginApi.login(this.user)
            .then(response =>{

                //第二步：获取token字符串，放进cookie里面（注意写法：两个data）
                this.token = response.data.data.token;
                //参数1：cookie名称；  参数2：值；  参数3：作用范围
                //部署，将 localhost 改成 116.62.106.210
                cookie.set('wz_token',this.token,{domain:'localhost'})

                ///////////////
                //第三步：在 axios_request.js 配置全局拦截器
                        //拦截全局的请求，将cookie中的token放到header（需要引入 js-cookie）
                ///////////////

                //第四步：调用后端接口，根据token获取用户信息（后端解析，直接返回memberInfo）
                loginApi.getMemberInfo()
                .then(response=>{
                    this.loginInfoByToken = response.data.data.memberInfo;
                    //将 用户信息 放到cookie
                    cookie.set('wz_memberInfo',this.loginInfoByToken,{domain:'localhost'})

                })


                this.$message({
                    type:'success',
                    message:'登录成功'
                })

                //跳转回首页
                this.$router.push({path:'/'})
            })

        },



        //////////////////////////////////////////////////


        //微信登录
        wxlogin(){
            //调用后端获取微信登录二维码接口
            loginApi.wxlogin()
            .then(response=>{

            })
        }
    }
}
</script>