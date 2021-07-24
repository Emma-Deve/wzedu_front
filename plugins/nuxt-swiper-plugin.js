import Vue from 'vue'

// 幻灯片组件
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'

// element-ui 组件  
import ElementUI from 'element-ui'  //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

//微信二维码支付
import VueQriously from 'vue-qriously'


Vue.use(VueAwesomeSwiper)

Vue.use(ElementUI)

Vue.use(VueQriously)
