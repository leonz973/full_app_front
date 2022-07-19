/** @format */

module.exports = {
    title: 'p-mui',
    description: '基于uview的 uniapp 移动端组件',
    // 注入到当前页面的 HTML <head> 中的标签
    // head: [
    //     ['link', {
    //         rel: 'icon',
    //         href: '/favicon.ico'
    //     }], // 增加一个自定义的 favicon(网页标签的图标)
    // ],
    // base: '/',
    base: '/docs/', // 打包的时候用这个，不然路径不正常，不能用相对路径
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        url: 'http://202.104.140.36:3000/docsDemo/#',
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        nav: [
            { text: '首页', link: '/' },
            { text: 'ui组件', link: '/ui/' },
            { text: '业务组件', link: '/component/' },
            { text: '模板', link: '/template/' },
            {
                text: '页面生成器',
                link: 'http://202.104.140.36:3000/frontal/#/'
            }
        ],
        sidebar: {
            '/ui/': genSidebarConfig('ui'),
            '/component/': genSidebarConfig('component'),
            '/template/': genSidebarConfig('template')
        }
    }
};

function genSidebarConfig(title) {
    switch (title) {
        case 'ui':
            return [
                {
                    title: '起步',
                    collapsable: false,

                    children: ['']
                },
                {
                    title: '基础组件',
                    collapsable: false,
                    children: [
                        'button',
                        'icon',
                        'layout',
                        'cell',
                        'badge',
                        'tag',
                        'search',
                        'tabBar',
                        'wrapper'
                    ]
                },
                {
                    title: '表单组件',
                    collapsable: false,
                    children: [
                        'radio',
                        'checkbox',
                        'input',
                        'textarea',
                        'select',
                        'switch',
                        'slider',
                        'calendar',
                        'datePicker',
                        'upload',
                        'rate',
                        'form'
                    ]
                },
                {
                    title: '数据组件',
                    collapsable: false,
                    children: ['list', 'utable', 'table', 'tree']
                },
                {
                    title: '反馈组件',
                    collapsable: false,
                    children: ['actionSheet', 'modal']
                },
                {
                    title: '无状态组件',
                    collapsable: false,
                    children: ['statelessNoMessage']
                },
                {
                    title: '提示性组件',
                    collapsable: false,
                    children: [
                        'popCommit',
                        'popReason',
                        'popNotarize',
                        'popExplain'
                    ]
                }
            ];
            break;
        case 'component':
            return [
                {
                    title: '气组件',
                    collapsable: false,
                    children: [
                        'airCurrentQuality',
                        'airQualityForecast',
                        'airLastHoursChange',
                        'airCheck'
                    ]
                },
                {
                    title: '水组件',
                    collapsable: false,
                    children: [
                        'waterRiverQualityGood',
                        'waterCityRiverQuality',
                        'waterFractureSurface',
                        'waterCityQualityRank'
                    ]
                },
                {
                    title: '搜索',
                    collapsable: false,
                    children: ['searchCurrentTotal']
                }
            ];
            break;
        case 'template':
            return [
                {
                    title: '日历模板',
                    collapsable: false,
                    children: ['airQualityCalendar']
                }
            ];
            break;
        default:
            break;
    }
}
