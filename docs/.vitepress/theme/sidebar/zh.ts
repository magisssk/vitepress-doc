import {DefaultTheme} from 'vitepress';

export const zhSidebar: DefaultTheme.Sidebar = {
    '/core-tech/frontend/vitepress/': [{
        text: 'Vitepress',
        collapsed: false,
        items: [
            {text: '首页', link: '/core-tech/frontend/vitepress/'},
            {text: '部署', link: '/core-tech/frontend/vitepress/basic/deploy'},
            {text: '国际化', link: '/core-tech/frontend/vitepress/advanced/i18n'},
            {text: '页面美化', link: '/core-tech/frontend/vitepress/advanced/customize'}
        ]
    }],
}
