<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
      <img src="~/assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>

        <tr>
          <th class="name">商品</th>
          <th class="price">原价</th>
          <th class="priceNew">价格</th>
        </tr>

        </tbody>

        <tbody>
        <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
        <tr>
          <td colspan="3" class="teacher">讲师：{{orderInfo.teacherName}}</td>
        </tr>
        <tr class="good">
          <td class="name First">
              <!-- TODO: 部署到服务器这里要改地址 （localhost ==> 116.62.106.210）-->
            <a target="_blank" :href="'https://localhost:3000/course/'+orderInfo.courseId">
              <img :src="orderInfo.courseCover"></a>
            <div class="goodInfo">
              <input type="hidden" class="ids ids_14502" value="14502">
              <a target="_blank" :href="'https://localhost:3000/course/'+ orderInfo.courseId">{{orderInfo.courseTitle}}</a>
            </div>
          </td>
          <td class="price">
            <p>￥<strong>{{orderInfo.totalFee}}</strong></p>
            <!-- <span class="discName red">限时8折</span> -->
          </td>
          <!-- 订单金额 -->
          <td class="red priceNew Last">￥<strong>{{orderInfo.totalFee}}</strong></td>
        </tr>
        <tr>
          <td class="Billing tr" colspan="3">
            <div class="tr">
              <p>共 <strong class="red">1</strong> 件商品，合计<span
                class="red f20">￥<strong>{{orderInfo.totalFee}}</strong></span></p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">
          
          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:" target="_blank">《阿泽在线教育平台购买协议》</a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+orderInfo.courseId">返回课程详情页</a>
          </div>
          <div class="fr">
              <!-- 因为一次只能买一节课，所以总金额还是一节课的金额，还是 orderInfo.totalFee -->
            <p>共 <strong class="red">1</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{orderInfo.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <!-- 点击去支付跳转到微信支付二维码页面（动态路由跳转） -->
        <button class="fr redb" type="button" id="submitPay" @click="toPay()">去支付</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>

<script>
import orderApi from '@/api/orders'

export default {

    data(){
        return {
            orderNo:'', //订单编号
            orderInfo:{ //订单信息（对应后端Order实体类）

            }
        }
    },
    created(){
        //查询订单信息
        this.getOrderInfo()
    },
    methods:{
        //1、根据订单编号查询订单信息
        getOrderInfo(){
            //获取动态路由页面，浏览器带过来的 订单编号
            //注意：因为当前页面对应名称是 _orderid，所以读取到的名称为 orderid
            this.orderNo = this.$route.params.orderid
            //测试
            console.log("订单编号 ==》"+this.orderNo)

            //根据订单编号查询订单信息
            orderApi.getOrderInfo(this.orderNo)
            .then(response=>{
                //接收后端传来的订单信息，并封装到 orderInfo
                this.orderInfo = response.data.data.order
            })
        },


        ///////////////////////////////////////

        //微信支付

        //点击 “去支付” 跳转到微信二维码页面（动态路由）
        //跳转到 pages/pay/_pid.vue
        //传递 订单编号
        toPay(){
            this.$router.push({path:'/pay/'+ this.orderNo })
        }

    }

    
}
</script>