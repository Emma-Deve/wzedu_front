<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">

<!-- :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }] 失去焦点就会提醒 -->
        <el-form-item class="input-prepend restyle" prop="nickname" :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="你的昵称" v-model="params.nickname"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>

<!-- 年龄 -->
         <el-form-item class="input-prepend restyle" prop="age" :rules="[{ required: true, message: '请输入你的年龄', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="你的年龄" v-model="params.age"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>


        <el-form-item class="input-prepend restyle no-radius" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="params.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="验证码" v-model="params.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <!-- {{codeTest}} 使用插值表达式获取 codeTest，
          注：不能直接写字符串，因为这个值获取到验证码后要反转为倒计时 -->
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button" @click="getCode()" :value="codeTest" style="border: none;background-color: none">{{codeTest}}</a>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="设置密码" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="注册" @click="submitRegister()">
        </div>

      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i
            class="iconfont icon-weixin"/></a></li>
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

import registerApi from '@/api/register'

export default{
    //指定layout首部尾部页面为 layouts/sign.vue（默认是 default.vue）
    layout:'sign',

    data(){
        return {
            //注册页面输入的数据（后端传入Vo类）
            params:{
                mobile:'',
                password:'',
                nickName:'',
                // sex:'',
                age:'',
                code:''
            },
            //sending: true,   //是否允许发送验证码
            codeTest:'获取验证码',
            second:60
        }
    },
    created(){

    },
    methods:{
        //获取验证码（传入参数：手机号码）
        getCode(){
            registerApi.sendMsm(this.params.mobile)
            .then(response=>{
                //this.sending = false;   //暂时不允许再次发送
                this.timeDown();    //开始倒计时
            })

        },

        //倒计时（固定写法）
        //js 定时器 setInterval 函数
        //参数1：调用方法
        //参数2：倒计时时间，结束触发参数1的方法
        timeDown(){
            let result = setInterval(() => {
                --this.second;  //初始60s
                this.codeTest = this.second
                    if (this.second < 1) {
                        clearInterval(result);
                        this.sending = true;
                        this.second = 60;
                        this.codeTest = "获取验证码"
                    }
            }, 1000);
        },

        //提交注册
        //传入对象（用户输入的数据都封装到 params 对象了）
        submitRegister(){
            registerApi.register(this.params)
            .then(response=>{
                //提示注册成功
              this.$message({
                type: 'success',
                message: "注册成功"
              })

              //跳转到登录界面（固定写法）
              this.$router.push({path:'/login'})
            })
        }
    }
}

</script>  