<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#">全部</a>
                </li>
                <!-- 一级分类 -->
                <!-- @click 点击一级分类触发方法查询二级分类(传入一级分类id) -->
                <li v-for="(item,index) in oneSubject" :key="index">
                  <a :title="item.title" href="#" @click="getOneSubject(item.id,index)" :class="{active: oneIndex == index}">{{item.title}}</a>
                </li>
                
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <!-- 二级分类 -->
                <li>
                   <li v-for="(item,index) in twoSubject" :key="index">
                  <a :title="item.title" href="#" @click="getTwoSubject(item.id,index)" :class="{active: twoIndex == index}">{{item.title}}</a>
                </li>
                
                
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>

          <!-- 三个排序：销量、时间、价格 -->
          <!-- 点击，触发相应的方法，查询 -->
          <!-- 记得点击某一个时将其他两个数属性值置空,避免缓存干扰 -->
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>

        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <!-- 如果后端返回的 map集合 为空,则为没有课程数据 -->
          <section class="no-data-wrap" v-if="courseVoPageMap.length == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="(course,index) in courseVoPageMap.records" :key="index">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" :title="course.title" class="comm-btn c-btn-1">{{course.title}}</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price) == 0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.buyCount}} 人学习</i>
                      |
                      <i class="c-999 f-fA">{{course.viewCount}} 人浏览</i>
                    </span>
                  </section>
                </div>
              </li>
              
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <!-- @click.prevent 表示禁用默认的a标签跳转,转而实现gotoPage方法 -->
            <!-- courseVoPageMap 是 从后端接口返回的 map 对象,里面包含了分页对象的各种信息 -->
            <!-- gotoPage() 会去调用后端接口方法,传入当前页数 -->
            <a
              :class="{undisable: !courseVoPageMap.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首页</a>
            <a
              :class="{undisable: !courseVoPageMap.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(courseVoPageMap.current-1)">&lt;</a>
            <!-- 遍历每一页 -->
            <a
              v-for="page in courseVoPageMap.pages"
              :key="page"
              :class="{current: courseVoPageMap.current == page, undisable: courseVoPageMap.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !courseVoPageMap.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(courseVoPageMap.current+1)">&gt;</a>
            <a
              :class="{undisable: !courseVoPageMap.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(courseVoPageMap.pages)">末页</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course'

export default {
  data(){
    return{
      courseVo:{},  //查询表单对象
      courseVoPageMap:[],  //后端接口返回的map,封装了查询结果集合
      page:1, //页面
      oneSubject:[],  //一级分类
      twoSubject:[],  //二级分类
      buyCountSort:'',  //销量
      gmtCreateSort:'',//创建时间
      priceSort:'',  //价格
      oneIndex:'',  //一级分类背景色标注
      twoIndex:''//二级分类背景色标注
    }
  },
  created(){
    //1 进入页面,首页获取第一页数据
    this.gotoPage(1)
    //2 再获取所有课程分类(一级分类)
    this.getAllSubject()

  },
  methods:{
    //1 条件带分页查询课程列表方法
    //当前页:page
    //每页限制数 limit=8
    //页面传入对象 this.courseVo
    gotoPage(page){
      this.page = page  //赋值!
      courseApi.getCourseVoPage(page,8,this.courseVo)
      .then(response=>{
        //后端接口返回map集合
        this.courseVoPageMap = response.data.data
      })

    },

    //2 获取所有课程分类(一级+二级)
    //返回的是一级分类(因为二级分类需要通过一级分类取出)
    getAllSubject(){
      courseApi.getAllSubject()
      .then(response=>{
        this.oneSubject = response.data.data.allSubjectList
      })
    },

    //3 根据一级分类查询二级分类
    getOneSubject(OneSubjectId,index){

      //补充功能2:点击以及分类,背景色颜色标注
      this.oneIndex = index

      //补充功能3:查询一级分类时把二级分类值清空(缓存)
      this.twoIndex = -1
      this.twoSubject = []
      this.courseVo.subjectId = ''

      
      //补充功能1:将一级分类id复制给页面封装的Vo对象,再调用分页查询显示该一级分类下的所有课程
      this.courseVo.subjectParentId = OneSubjectId
      this.gotoPage(1)  //默认显示第一页

      //遍历所有一级分类,找到id与传入id相同的(即为点击的那个一级分类)
      for(var i=0;i<this.oneSubject.length;i++){
        if(this.oneSubject[i].id == OneSubjectId){
          this.twoSubject = this.oneSubject[i].children
        }
      }

    },


    //4 点击二级分类查询课程
    getTwoSubject(TwoSubjectId,index){
      //背景色标注
      this.twoIndex = index

      //根据二级分类id查询课程
      this.courseVo.subjectId = TwoSubjectId
      this.gotoPage(1)

    },

    //5 根据销量排序
    searchBuyCount(){
      //是否为空，不为空则显示样式（表示选中）
      this.buyCountSort = '1' //任意写个值，不为空就行
      this.gmtCreateSort=''
      this.priceSort=''

      //后端方法是根据这几个值是否为空决定是否调用查询方法的
      //所以这三个值在这都要赋值
      this.courseVo.buyCountSort = this.buyCountSort
      this.courseVo.gmtCreateSort=this.gmtCreateSort
      this.courseVo.priceSort=this.priceSort

      this.gotoPage(1)
    },

    //6 根据时间排序 （同理）
    searchGmtCreate(){
      //是否为空，不为空则显示样式（表示选中）
      this.buyCountSort = '' //任意写个值，不为空就行
      this.gmtCreateSort='1'
      this.priceSort=''

      //后端方法是根据这几个值是否为空决定是否调用查询方法的
      //所以这三个值在这都要赋值
      this.courseVo.buyCountSort = this.buyCountSort
      this.courseVo.gmtCreateSort=this.gmtCreateSort
      this.courseVo.priceSort=this.priceSort

      this.gotoPage(1)
    },

    //7 根据价格排序 （同理）
    searchPrice(){
      //是否为空，不为空则显示样式（表示选中）
      this.buyCountSort = '' //任意写个值，不为空就行
      this.gmtCreateSort=''
      this.priceSort='1'

      //后端方法是根据这几个值是否为空决定是否调用查询方法的
      //所以这三个值在这都要赋值
      this.courseVo.buyCountSort = this.buyCountSort
      this.courseVo.gmtCreateSort=this.gmtCreateSort
      this.courseVo.priceSort=this.priceSort

      this.gotoPage(1)
    }



  }

};

</script>
<style scoped>
.active {
  background: #84CAF1;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>