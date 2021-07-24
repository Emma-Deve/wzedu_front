import axiosRequest from '@/utils/axios_request'

export default{

    //根据视频id获取播放凭证（课程视频预览）
    getAliyunPlayAuth(videoId){
        return axiosRequest({
            url:'/eduvod/filevod/getAliyunPlayAuth/'+videoId,
            method:'get'
        })

    }
}