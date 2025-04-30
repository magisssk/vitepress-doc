import {DefaultTheme} from 'vitepress';

export const zhNavbar: DefaultTheme.NavItem[] = [
    {text: 'Home', link: '/'},
    {
        text: 'HomeLab',
        items: [{text: 'Network', link: '/home-lab/network'}]
    },

    {text: 'Examples', link: '/markdown-examples'},
]
