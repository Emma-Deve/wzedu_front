<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="dataMap.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list"  v-if="dataMap.total>0">
            <ul class="of">
              <li v-for="teacher in dataMap.records" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <!-- 冒号,单向绑定,拼接每个讲师的id -->
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank">
                      <img :src="teacher.avatar" :alt="teacher.avatar">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank" class="fsize18 c-666">{{teacher.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.intro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.career}}</p>
                  </div>
                </section>
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
            <!-- dataMap 是 从后端接口返回的 map 对象,里面包含了分页对象的各种信息 -->
            <!-- gotoPage() 会去调用后端接口方法,传入当前页数 -->
            <a
              :class="{undisable: !dataMap.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首页</a>
            <a
              :class="{undisable: !dataMap.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(dataMap.current-1)">&lt;</a>
            <!-- 遍历每一页 -->
            <a
              v-for="page in dataMap.pages"
              :key="page"
              :class="{current: dataMap.current == page, undisable: dataMap.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !dataMap.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(dataMap.current+1)">&gt;</a>
            <a
              :class="{undisable: !dataMap.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(dataMap.pages)">末页</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->

      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>


<script>
import teacherApi from '@/api/teacher'


export default {

  //另一种渲染前自动调用方法(之前使用 data() 和 created() ,现在用这种)
  //异步调用(只调用一次)
  //params:相当于  之前的 this.$route.params.id  等价于现在的  params.id
  asyncData({params,error}){
    //刚开始渲染之前,先加载第一页,8条数据
    return teacherApi.getTeacherPage(1,8) //这个return 和 调用方法 要写在一行,不能隔行,会有bug...
    .then(response=>{
      //相当于之前的 this.dataMap = response.data.data
      //注:dataMap 在这里接收返回数据了,就相当于定义了,之后要用就直接 this.dataMap 就可以了,不需要再定义!
      return {dataMap: response.data.data}
    })
  },

  methods:{
    gotoPage(page){
      teacherApi.getTeacherPage(page,8)
      .then(response=>{
        this.dataMap = response.data.data
      })
    }
  }

};
</script>