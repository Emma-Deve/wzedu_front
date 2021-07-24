<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="wz在线教育">
            <img src="~/assets/img/logo_wz.png" width="100%" alt="wz在线教育">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <!-- 注：固定路由， router-link 绑定的是 pages下面的文件夹，默认访问文件夹下的 index.vue 页面 -->
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            
            <!-- 在 pages 下 创建course 文件夹，添加页面 index.vue ，这个路由就会访问到 -->
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>

            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">

            <!-- 如果没有用户信息（未登录） -->
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>

            <!-- 已登录 -->
            <li v-if="loginInfo.id" id="is-login-one">
              <a href="#" title="消息" id="headerMsgCountId">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <!-- 如果有用户信息（已登录） -->
            <li v-if="loginInfo.id" class="h-r-user" id="is-login-two">
              <a href="#" title>
                <!-- :src 前面要有冒号，双向绑定 -->
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span class="vam disIb" id="userName">{{loginInfo.nickname}}</span>
              </a>
              <!-- 区别？？？ -->
              <!-- onclick="exit();" 不触发 -->
              <!-- @click="exit()" 触发 -->
              <a title="退出" @click="exit()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想学的课程" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
      
    <!-- /公共头引入 -->
    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="https://gitee.com/WuZe-wz" title="wz gitee 主页" target="_blank">wz gitee 主页</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>Email：wuzest@163.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©版权信息 wz在线教育</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";

///订单
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"




//引入js-cookie
import cookie from 'js-cookie'
import loginApi from '@/api/login'

export default {
    data(){
      return {
        loginInfo:{
          id:'',
          avatar:'',
          nickname:''
        },
        token:''
      }
      
    },
    created(){

      //注意：获取页面是否有token值，要在created这里，不能在 wxLogin 那里（顺序）
      this.token = this.$route.query.token
      if(this.token){
        this.wxLogin()
      }
      //不管是 手机号验证码 登录，还是微信登录，都要调用showInfo()方法
      //从cookie中获取数据，然后赋值给loginInfo，然后显示头像和昵称
      this.showInfo()

    },
    methods:{

      //微信登录
      //扫码并同意后跳转到首页，链接带上token字符串
      //现在就要解析这个token字符串，获取用户信息，并存入cookie
      //注意：因为正常手机号验证码登录链接没有带token值，所以获取token值要放在created，并判断要不要执行wxLogin方法
      wxLogin(){
        //向cookie存入token
        //部署，将 localhost 改成 116.62.106.210
        cookie.set('wz_token',this.token,{domain:'localhost'})
        cookie.set('wz_memberInfo','',{domain:'localhost'}) //置空
        //根据token获取用户信息
        loginApi.getMemberInfo()
        .then(response=>{
          this.loginInfo = response.data.data.memberInfo
          //向cookie存入用户信息
          cookie.set('wz_memberInfo',this.loginInfo,{domain:'localhost'})

          this.$message({
                    type:'success',
                    message:'登录成功'
        })
        
        })
        


      },




      //登录后显示用户头像和昵称
      showInfo(){
        var jsonStr = cookie.get('wz_memberInfo')//返回的用户信息是字符串，不是json格式
        //转换成json格式
        if(jsonStr){
          this.loginInfo = JSON.parse(jsonStr)
        }
      },

      //退出登录
      exit(){
        //退出登录，清空cookie
        //部署，将 localhost 改成 116.62.106.210
        cookie.set('wz_token','',{domain:'localhost'})
        cookie.set('wz_memberInfo','',{domain:'localhost'})

        //跳转到登录页（点击已经是个超链接了，会跳转，两个选一个配置即可，不用重复配置）（在这里配置比较好）
        this.$router.push({path:'/login'})
      }
    }


}
</script>