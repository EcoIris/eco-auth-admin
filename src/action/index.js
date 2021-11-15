import {createStore } from 'redux'
import reducers from './reducers.js'

// 创建store实例
let store = createStore(reducers);

export default store;