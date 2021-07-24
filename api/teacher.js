import axiosRequest from '@/utils/axios_request'

export default{

    //分页查询讲师列表
    //参数1:当前页
    //参数2:每页条数限制
    getTeacherPage(current,limit){
        return axiosRequest({
            url:`/eduservice/index/getTeacherPage/${current}/${limit}`,
            method:'get'
        })
    },

    //查询讲师列表
    //1、根据讲师id查询讲师基本信息
    //2、根据讲师id查询讲师所讲课程
    getTeacherInfo(teacherId){
        return axiosRequest({
            url:`/eduservice/index/getTeacherFrontInfo/${teacherId}`,
            method:'get'
        })
    }
}