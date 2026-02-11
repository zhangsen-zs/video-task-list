import { createApp } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import '@/style/global.css';

import App from './App.vue';

dayjs.locale('zh-cn');

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.mount('#app');
