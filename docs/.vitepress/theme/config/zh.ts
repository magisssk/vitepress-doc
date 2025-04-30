import {zhNavbar} from '../navbar';
import {zhSidebar} from '../sidebar';
import type {DefaultTheme, LocaleSpecificConfig} from 'vitepress';

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 本地配置
        search: {
            provider: 'local'
        },
        // 导航栏配置
        nav: zhNavbar,
        //侧边栏配置
        sidebar: zhSidebar,
        // 社交帐户链接配置
        socialLinks: [
            {icon: 'github', link: 'https://github.com/magisssk/vitepress-doc'}
        ],
        // 更新时间
        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },
        // 右侧内容导航栏配置
        outline: {
            level: [2, 6],
            label: "目录"
        },
        // 翻页配置
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },
        // github 编辑
        editLink: {
            pattern: 'https://github.com/magisssk/vitepress-doc/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        }
    }
}