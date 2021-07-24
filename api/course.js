import axiosRequest from '@/utils/axios_request'

export default{

    //1 条件带分页查询课程列表
    //参数1:当前页
    //参数2:每页条数限制
    //参数3:页面对象(Vo)
    getCourseVoPage(current,limit,courseVo){
        return axiosRequest({
            url:`/eduservice/course/getCourseVoPage/${current}/${limit}`,
            method:'post',
            data:courseVo
        })
    },

    //2 查询所有课程分类
    //获取所有课程分类信息（一级+二级）
    //直接查一级，就能查出所有（因为一级绑定了二级）
    getAllSubject(){
        return axiosRequest({
            url:`/eduservice/edu-subject/getAllSubject`,
            method:'get'
        })
    },


    /////////////////////////////////


    //课程详情页（多表查询）
    getCourseInfo(courseId){
        return axiosRequest({
            url:`/eduservice/course/getCourseBaseInfoVo/${courseId}`,
            method:'get'
        })
    }
}