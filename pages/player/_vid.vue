<template>
    <div>
        <!-- 引入 脚本文件 和 css 文件  -->
        <!-- 阿里云提供 -->
        <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css" />
        <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"></script>
    

        <!-- 定义播放器dom -->
        <!-- 必须定义这个，否则无法播放 -->
        <div id="J_prismPlayer" class="prism-player"/>

    </div>
</template>

<script>

import videoApi from '@/api/video'

export default{
    layout:'video',

    data(){
        return {
            videoId:'',  //视频id（从浏览器地址获取）
            playAuth:'' //播放凭证
        }
    },

    created(){

        this.videoId = this.$route.params.vid  //注意是 vid，不是id（对应页面命名）
        if(this.videoId){
            this.getPlayAuth(this.videoId)
            //console.log('videoId ==> '+this.videoId)
            
        }

        
    },

    methods:{

        getPlayAuth(videoId){
            //传入 videoId
            videoApi.getAliyunPlayAuth(videoId)
            .then(response=>{
                this.playAuth = response.data.data.playAuth
                //console.log('playAuth22 ==> '+this.playAuth)
                
                
                var player= new Aliplayer({
                    id: 'J_prismPlayer',
                    width: '100%',
                    cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',  
                    //播放配置
                    //视频地址播放 or 视频凭证播放（推荐）
                    encryptType:'1',//如果播放加密视频，则设置encryptType=1，非加密视频无需设置此项
                    vid : this.videoId, //传入视频id
                    playauth : this.playAuth,   //传入视频凭证

                    //////////////////////
                    
                    // 以下可选设置
                    qualitySort: 'asc', // 清晰度排序
                    mediaType: 'video', // 返回音频还是视频
                    autoplay: false, // 自动播放
                    isLive: false, // 直播
                    rePlay: false, // 循环播放
                    preload: true,
                    controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
                    useH5Prism: true, // 播放器类型：html5
                    
                },function(player){
                    //console.log('播放器创建好了。')
                })


            })
        }
        
        

        
        
    }
       

}

        
</script>


