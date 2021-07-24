import axiosRequest from '@/utils/axios_request'

export default{
    //查询前8条课程，查询前4名讲师
    getHostCourseAndTeacher(){
        return axiosRequest({
            url:'/eduservice/index/getHostCourseAndTeacher',
            method:'get'
        })
    }
}
