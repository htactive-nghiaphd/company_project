import Vue from 'vue'
import Vuex from 'vuex'
import taikhoan from '../store/module/taikhoan'
import Interface from '../store/module/interface'
import Intership from '../store/module/Intership'
import SalaryBasic from '../store/module/salary_basic'
import CvApply from '../store/module/cv_apply'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    taikhoan,
    Interface,
    Intership,
    SalaryBasic,
    CvApply
  }
})
