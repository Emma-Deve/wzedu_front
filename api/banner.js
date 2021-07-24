import axiosRequest from '@/utils/axios_request'

export default{
    //查询前两条banner
    getAllBanner(){
        return axiosRequest({
            url:'/educms/frontbanner/getAllBanner',
            method:'get'
        })
    }
}
