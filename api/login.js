import axiosRequest from '@/utils/axios_request'

export default{

    //登录
    //这个方法后端接口返回token值
    login(ucenterMember){
        return axiosRequest({
            url:`/educenter/ucenter-member/login`,
            method:'post',
            data:ucenterMember
        })
    },

    //根据token获取用户信息
    //从浏览器请求（url）获取
    //注：不用将 request 传参进去
    getMemberInfo(){
        return axiosRequest({
            url:`/educenter/ucenter-member/getMemberInfo`,
            method:'get'
        })
    },


    //微信登录
    //获取二维码
    wxlogin(){
        return axiosRequest({
            url:`/api/ucenter/wx/login`,
            method:'get'
        })
    },


}