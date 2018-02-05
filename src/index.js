import Vue from 'vue';
import App from "./app.vue"


import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/accountClose.png'


/* 在body中插入一个div，用作组件插入 */
const root = document.createElement("div");
document.body.appendChild(root);

/* 将vue挂载到root上 */
new Vue({
    render: (h) => h(App)
}).$mount(root)