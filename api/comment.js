import request from '@/utils/axios_request'

export default {

    //查询评论（带分页）
    getPageList(page, limit, courseId) {
        return request({
            url: `/eduservice/edu-comment/getPageComment/${page}/${limit}`,
            method: 'get',
            params: {courseId}
        })
    },

    //添加评论
    //注：request 请求直接到时候可以获取，不用作为参数传入
    addComment(comment) {
        return request({
            url: `/eduservice/edu-comment/addComment`,
            method: 'post',
            data: comment
        })
    }
}