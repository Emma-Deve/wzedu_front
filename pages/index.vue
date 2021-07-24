<template>
  
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <!-- v:for
              :key  （唯一标识）
              :src="图片地址"  (0131纠正,是单向绑定!  v-bind ))
              :alt=""  (0131纠正,是单向绑定!  v-bind ))
               -->
            <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040B1B;">
                <a target="_blank" href="banner.linkUrl">
                    <img :src="banner.imageUrl" :alt="banner.title">
                </a>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 幻灯片 结束 -->
    
     <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <!-- 遍历所有热门课程（8门） -->
                <li v-for="hotCourse in hotCourseList" :key="hotCourse">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <!-- 记得加冒号:  (0131纠正,是单向绑定!  v-bind )) -->
                      <img
                        :src="hotCourse.cover"
                        class="img-responsive"
                        :alt="hotCourse.title"
                      >
                      <div class="cc-mask">
                        <a href="#" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <!-- 使用插值表达式 {{}} 取值 -->
                      <a href="#" :title="hotCourse.title" class="course-title fsize18 c-333">{{hotCourse.title}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="Number(hotCourse.price) === 0 ">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <!-- 插值表达式获取，浏览量 -->
                        <i class="c-999 f-fA">{{hotCourse.viewCount}} 人浏览</i>
                        |
                        <i class="c-999 f-fA">{{hotCourse.lessonNum}} 课时</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <!-- 遍历所有名师（4个） -->
                <li v-for="hotTeacher in hotTeacherList" :key="hotTeacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <!-- 记得加冒号 : (0131纠正,是单向绑定!  v-bind )) -->
                      <a :href="'/teacher/'+ hotTeacher.id" :title="hotTeacher.name">
                        <img :alt="hotTeacher.name" :src="hotTeacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/'+hotTeacher.id" :title="hotTeacher.name" class="fsize18 c-666">{{hotTeacher.name}}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <!-- 讲师头衔 -->
                      <span class="fsize14 c-999">{{hotTeacher.level}}</span>
                    </div>
                    <!-- 讲师简介 -->
                    <div class="mt15 i-q-txt">
                      <p
                        class="c-999 f-fA"
                      >{{hotTeacher.intro}}</p>
                    </div>
                  </section>
                </li>
                
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import banner from '@/api/banner'
import hotIndex from '@/api/index'

export default {
  data () {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      bannerList:[],
      hotCourseList:[],
      hotTeacherList:[]
    }
  },
  created(){
    this.getAllBanner()
    this.getHostCourseAndTeacher()
  },
  methods:{
    //查询前两条banner
    getAllBanner(){
      banner.getAllBanner()
      .then(response =>{
        this.bannerList = response.data.data.allBanner
        //console.log(this.bannerList.title)
        //console.log(this.bannerList.imageUrl)
      })
    },

    //查询前8条课程，查询前4名讲师
      getHostCourseAndTeacher(){
        hotIndex.getHostCourseAndTeacher()
        .then(response =>{
          this.hotCourseList = response.data.data.eightCourselist
          this.hotTeacherList = response.data.data.fourTeacherlist
        })
      }
  }
}
</script>