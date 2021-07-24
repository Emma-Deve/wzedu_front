<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{courseBaseInfoVo.subjectLevelOne}}</a>
        \
        <span class="c-333 fsize14">{{courseBaseInfoVo.subjectLevelTwo}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img height=357px; v:src="courseBaseInfoVo.cover" :alt="courseBaseInfoVo.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{courseBaseInfoVo.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{courseBaseInfoVo.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{courseBaseInfoVo.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#" >收藏</a>
              </span>

            </section>
            <!-- 如果 已经购买 || 课程免费，显示立即观看 -->
            <section class="c-attr-mt" v-if="isBuy || Number(courseBaseInfoVo.price) === 0">
              <a title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>
            <!-- 否则，显示立即购买-->
            <!-- 点击立即购买，跳转到 createOrder() 方法 -->
            <section class="c-attr-mt" v-else>
              <a @click="createOrder()" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
            </section>

          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseBaseInfoVo.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseBaseInfoVo.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseBaseInfoVo.viewCount}}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <!-- 课程简介，利用 v-html 标签将属性值变成html样式（即解析属性值的html标签） -->
                      <p v-html="courseBaseInfoVo.description">
                        {{courseBaseInfoVo.description}}
                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 章节 -->
                          <li class="lh-menu-stair" v-for="chapter in chapterVideoList" :key="chapter.id">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                            </a>
                            <!-- 小节 -->
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                                <!-- 在 VideoVo 实体类增加 videoId 属性 -->
                                <a :href="'/player/'+video.videoSourceId" title target="_blank">
                                  <span class="fr" v-if="Number(courseBaseInfoVo.price) == 0">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="courseBaseInfoVo.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{courseBaseInfoVo.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseBaseInfoVo.intro}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->


    <!-- 课程评论 -->
    <div class="mt50 commentHtml"><div>
          <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">课程评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
                  </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                    </fieldset>
                    <p class="of mt5 tar pl10 pr10">
                      <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                      <input type="button" @click="addComment()" value="回复" class="lh-reply-btn">
                    </p>
                  </section>
                </div>
              </li>
            </ul>
          </section>
          <section class="">
              <section class="question-list lh-bj-list pr">
                <ul class="pr10">
                  <li v-for="(comment,index) in commentMap.records" v-bind:key="index">
                      <aside class="noter-pic">
                        <img width="50" height="50" class="picImg" :src="comment.avatar">
                        </aside>
                      <div class="of">
                        <span class="fl"> 
                        <font class="fsize12 c-blue"> 
                          {{comment.nickname}}</font>
                        <font class="fsize12 c-999 ml5">评论：</font></span>
                      </div>
                      <div class="noter-txt mt5">
                        <p>{{comment.content}}</p>
                      </div>
                      <div class="of mt5">
                        <span class="fr"><font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font></span>
                      </div>
                    </li>
                  
                  </ul>
              </section>
            </section>

<!-- 公共分页 开始 -->
        
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <!-- @click.prevent 表示禁用默认的a标签跳转,转而实现gotoPage方法 -->
            <!-- commentMap 是 从后端接口返回的 map 对象,里面包含了分页对象的各种信息 -->
            <!-- gotoPage() 会去调用后端接口方法,传入当前页数 -->
            <a
              :class="{undisable: !commentMap.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首页</a>
            <a
              :class="{undisable: !commentMap.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(commentMap.current-1)">&lt;</a>
            <!-- 遍历每一页 -->
            <a
              v-for="page in commentMap.pages"
              :key="page"
              :class="{current: commentMap.current == page, undisable: commentMap.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !commentMap.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(commentMap.current+1)">&gt;</a>
            <a
              :class="{undisable: !commentMap.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(commentMap.pages)">末页</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
  </div>


  </div>
</template>

<script>
import courseApi from '@/api/course'
import comment from '@/api/comment' //评论
import orderApi from '@/api/orders'

export default {
  data(){
    return {
      courseId:'', //课程id（从浏览器地址获取）
      chapterVideoList:[], //章节信息（列表）

      courseBaseInfoVo:{ //课程信息（对象、Vo类）
          title:'', //课程标题
          price:'', //价格
          lessonNum:'', //总课时
          cover:'', //课程封面
          buyCount:'',  //销售数量
          viewCount:'', //浏览数量
          description:'', //课程简介
          teacherName:'', //教师名称
          intro:'', //讲师资历（简介）
          avatar:'',  //讲师头像
          subjectLevelOne:'', //一级课程类别名称
          subjectLevelTwo:'' //二级课程类别名称
      },
      ///////////
      //评论相关
      page:1,
      limit:4,
      total:10,
      comment:{
          content:'', //评论内容
          courseId:'' //课程id
      },
      commentMap:{},

      //////////订单相关//////////
      orderNo:'',//订单编号


      //////
      //订单
      isBuy:false //初始化为没有购买
    }
  },
  created(){
    //从浏览器地址获取课程id
    this.courseId = this.$route.params.id
    if(this.courseId){
      this.getCourseBaseInfo(this.courseId)
      this.initComment()
    }
  },
  methods:{
    //这里是定义方法，参数不用加this
    getCourseBaseInfo(courseId){
      courseApi.getCourseInfo(courseId)
      .then(response=>{
        this.courseBaseInfoVo = response.data.data.courseBaseInfoVo //课程信息
        this.chapterVideoList = response.data.data.chapterVideo //章节信息
        //（02/06）补充：判断课程是否购买
        this.isBuy = response.data.data.isBuy
        //console.log("isBuy 的 值==》"+isBuy)
      })
    },


    /////////////////////////////////////////////

    //评论

    //1、获取评论（分页）
    initComment(){
      comment.getPageList(this.page,this.limit,this.courseId)
      .then(response=>{
        this.commentMap = response.data.data
      })
    },

    //2、添加评论
    addComment(){
      this.comment.courseId = this.courseId
      this.comment.teacherId = this.courseBaseInfoVo.teacherId
      comment.addComment(this.comment)
      .then(response=>{
        this.comment.content = ''
        this.initComment()  //重新加载页面
      })
    },

    
    ////////////////////////////////////////////////////

    //订单

    //1、生成订单
    createOrder(){
      orderApi.makeOrder(this.courseId)
      .then(response=>{
        this.orderNo = response.data.data.orderNo //接收后端接口返回的订单编号orderNo
        console.log("订单编号 ==》"+this.orderNo) //测试
        this.$router.push({path:"/orders/"+this.orderNo })//动态路由：跳转到 pages目录下的 "orders/_orderid.vue" 文件
      })
    }
    
  }
};

</script>
