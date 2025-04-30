import {DefaultTheme} from 'vitepress';

export const zhSidebar: DefaultTheme.Sidebar = {
    '/home-lab/services/': [{
        text: 'KMS服务',
        collapsed: false,
        items: [
            {text: 'Windows KMS 激活指南', link: '/home-lab/services/kms/basic/guide'},
            {text: 'Docker搭建本地KMS', link: '/home-lab/services/kms/advanced/docker-kms'},
        ]
    }],
}
