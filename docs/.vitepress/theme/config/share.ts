import {defineConfig} from 'vitepress';

export const sharedConfig = defineConfig({
    // 网站配置
    title: "vitepress",
    titleTemplate: "Hi，终于等到你",
    lang: "zh",
    description: "A VitePress Site",
    base: "/vitepress-doc/"
})