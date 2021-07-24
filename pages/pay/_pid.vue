<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->

            <!-- 注意：要安装 vue-qriously 组件，然后使用这个标签，绑定后端传来的 code_url 值，才能将支付二维码显示到页面 -->
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>

          </div>

        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
        
      </div>
    </div>
  </div>
</template>


<script>

import orderApi from '@/api/orders'

export default {
    data(){
        return {
            orderNo:'',
            payObj:[],
            timer1:''   //定时器的flag标志
        }
    },
    created(){
        //获取订单编号（因为当前动态路由页面 _pid ，所以写 pid ）
        this.orderNo = this.$route.params.pid
        //console.log("从路径获取订单编号 ==》 "+this.orderNo)//测试
        this.createdQrcode(this.orderNo)
    },

    //mouted，在页面渲染之后执行
    mounted(){
        //定时器（间隔执行 “查询订单支付状态方法”）
        this.timer1 = setInterval(()=>{
            this.getStatus(this.orderNo)
        },3000)

    },

    methods:{
        //1、生成微信支付二维码（传入 订单编号（动态路由，地址获取））
        createdQrcode(orderNo){
            orderApi.makeQRCode(orderNo)
            .then(response =>{
                //接收后端传来的 map 集合
                //里面包含该订单支付二维码的各种信息（绑定payObj，显示到前端页面）
                this.payObj = response.data.data

                //测试
                //console.log("map对象==》"+this.payObj)
                //console.log("课程id==》"+this.payObj.course_id)
                //console.log("应付金额==》"+this.payObj.total_fee)

                ///
                //console.log("课程id==》（后端resonse）"+response.data.data.course_id)
                //console.log("应付金额==》（后端resonse）"+response.data.data.total_fee)        
                
            })
        },

        //2、查询订单支付状态（传入订单编号）
        //如果支付成功，跳转到课程页面（动态路由）
        getStatus(orderNo){
            orderApi.queryPayStatus(orderNo)
            .then(response =>{
                //如果支付成功
                if(response.data.success){
                    //清除定时器
                    clearInterval(this.timer1)

                    // this.$message({
                    //     type:'success',
                    //     message:'支付成功'
                    // })

                    //跳转到课程页面
                    //payObj（也就是后端返回的map），已经封装了课程id的key，名称“course_id”，这里对应名称即可取出
                    //注意 /course/ 前后都有 / ，如果前面没有写/，则会跳转到 pages/pid/course，就错了。。。
                    this.$router.push({path:'/course/'+this.payObj.course_id})
                    
                }
            })
            
        }
      
    }
     
}
</script>