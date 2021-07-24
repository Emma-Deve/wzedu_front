import axiosRequest from '@/utils/axios_request'

export default{
    
    //获取验证码
    sendMsm(phone){
        return axiosRequest({
            url:'/edumsm/sendMsm/'+phone,    //单引号拼接路径参数
            method:'get'
        })
    },
    
    //注册
    //method 有引号
    //data 没有引号
    register(registerVo){
        return axiosRequest({
            url:`/educenter/ucenter-member/register`,
            method:'post',
            data:registerVo
        })
    }
}