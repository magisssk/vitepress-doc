import {defineConfig} from 'vitepress';
import {sharedConfig} from './theme/config/share';
import {zhConfig} from './theme/config/zh';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    sharedConfig,
    locales: { // 多语言
        root: {
            label: '简体中文',
            lang: 'zh',
            ...zhConfig
        }
    }
})