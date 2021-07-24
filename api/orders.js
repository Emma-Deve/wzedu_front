import axiosRequest from '@/utils/axios_request'

export default{
    //1、生成订单（根据 课程id 和 用户id(不显示传入)），返回订单id
    //注：HttpServletRequest request 后端接口参数，这里也不用显式传入
    // post 提交
    makeOrder(courseId){
        return axiosRequest({
            url:'/eduorder/order/makeOrder/'+ courseId,
            method:'post'
        })
    },

    //2、根据订单号查询订单信息
    //注意是 订单号，不是订单表id
    //get提交
    getOrderInfo(OrderNo){
        return axiosRequest({
            url:'/eduorder/order/getOrderInfo/'+ OrderNo,
            method:'get'
        })
    },


    ////////////////////////////////
    //微信支付

    //1、生成微信二维码
    makeQRCode(orderNo){
        return axiosRequest({
            url:'/eduorder/pay-log/createQRCode/'+ orderNo,
            method:'post'
        })
    },

    //2、查询订单支付状态
    queryPayStatus(orderNo){
        return axiosRequest({
            url:'/eduorder/pay-log/queryPayStatus/'+ orderNo,
            method:'get'
        })
    }
}
