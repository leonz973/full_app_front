/**
 * ***************************************************************************
 * Copyright (C) 2019 ShenZhen Powerdata Information Technology Co.,Ltd
 * All Rights Reserved.
 * 本软件为深圳博沃开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、
 * 复制、修改或发布本软件.
 * ***************************************************************************
 *
 * @format
 */

/**
 * @desc 污染物计算
 * @date 20191114
 * @author 孙昊
 */
var wrwUtil = {};

wrwUtil.wrwArray = [
    {
        name: 'AQI',
        value: 'AQI',
        isCheck: false,
        html: 'AQI',
        unit: ''
    },
    {
        name: 'PM2.5',
        value: 'PM25',
        isCheck: false,
        html: 'PM<sub>2.5</sub>',
        unit: 'μg/m³'
    },
    {
        name: 'PM10',
        value: 'PM10',
        isCheck: false,
        html: 'PM<sub>10</sub>',
        unit: 'μg/m³'
    },
    {
        name: 'O3',
        value: 'O3',
        isCheck: false,
        html: 'O<sub>3</sub>',
        unit: 'μg/m³'
    },
    {
        name: 'NO2',
        value: 'NO2',
        isCheck: false,
        html: 'NO<sub>2</sub>',
        unit: 'μg/m³'
    },
    {
        name: 'SO2',
        value: 'SO2',
        isCheck: false,
        html: 'SO<sub>2</sub>',
        unit: 'μg/m³'
    },
    {
        name: 'CO',
        value: 'CO',
        isCheck: false,
        html: 'CO',
        unit: 'mg/m³'
    }
];

wrwUtil.level = {
    1: '优',
    2: '良',
    3: '轻度',
    4: '中度',
    5: '重度',
    6: '严重'
};
/* wrwUtil.color = {
    "1": "#4dce88",
    "2": "#ffd800",
    "3": "#f09431",
    "4": "#f55555",
    "5": "#b6558c",
    "6": "#984e4e"
} */
wrwUtil.color = {
    1: '#24bd5d',
    2: '#d8bc37',
    3: '#f87c12',
    4: '#f60000',
    5: '#94004b',
    6: '#6f001f'
};
/* wrwUtil.lightColor = {
    "1": "#44e17a",
    "2": "#ffcd00",
    "3": "#f89e00",
    "4": "#f36f5a",
    "5": "#8972f4",
    "6": "#9c4d7c"
} */
wrwUtil.lightColor = {
    1: '#24bd5d',
    2: '#d8bc37',
    3: '#f87c12',
    4: '#f60000',
    5: '#94004b',
    6: '#6f001f'
};
wrwUtil.wrwObj = {
    AQI: {
        unit: '',
        level: [
            {
                yAxis: 50,
                name: '优',
                level: 1
            },
            {
                yAxis: 100,
                name: '良',
                level: 2
            },
            {
                yAxis: 150,
                name: '轻度污染',
                level: 3
            },
            {
                yAxis: 200,
                name: '中度污染',
                level: 4
            },
            {
                yAxis: 300,
                name: '重度污染',
                level: 5
            },
            {
                yAxis: 400,
                name: '严重污染',
                level: 6
            }
        ]
    },
    PM25: {
        unit: 'μg/m³',
        level: [
            {
                yAxis: 35,
                name: '优',
                level: 1
            },
            {
                yAxis: 75,
                name: '良',
                level: 2
            },
            {
                yAxis: 115,
                name: '轻度污染',
                level: 3
            },
            {
                yAxis: 150,
                name: '中度污染',
                level: 4
            },
            {
                yAxis: 250,
                name: '重度污染',
                level: 5
            },
            {
                yAxis: 350,
                name: '严重污染',
                level: 6
            }
        ]
    },
    PM10: {
        unit: 'μg/m³',
        level: [
            {
                yAxis: 50,
                name: '优',
                level: 1
            },
            {
                yAxis: 150,
                name: '良',
                level: 2
            },
            {
                yAxis: 250,
                name: '轻度污染',
                level: 3
            },
            {
                yAxis: 350,
                name: '中度污染',
                level: 4
            },
            {
                yAxis: 420,
                name: '重度污染',
                level: 5
            },
            {
                yAxis: 500,
                name: '严重污染',
                level: 6
            }
        ]
    },
    O3: {
        unit: 'μg/m³',
        level: [
            {
                yAxis: 160,
                name: '优',
                level: 1
            },
            {
                yAxis: 200,
                name: '良',
                level: 2
            },
            {
                yAxis: 300,
                name: '轻度污染',
                level: 3
            },
            {
                yAxis: 400,
                name: '中度污染',
                level: 4
            },
            {
                yAxis: 800,
                name: '重度污染',
                level: 5
            },
            {
                yAxis: 1000,
                name: '严重污染',
                level: 6
            }
        ]
    },
    NO2: {
        unit: 'μg/m³',
        level: [
            {
                yAxis: 100,
                name: '优',
                level: 1
            },
            {
                yAxis: 200,
                name: '良',
                level: 2
            },
            {
                yAxis: 700,
                name: '轻度污染',
                level: 3
            },
            {
                yAxis: 1200,
                name: '中度污染',
                level: 4
            },
            {
                yAxis: 2340,
                name: '重度污染',
                level: 5
            },
            {
                yAxis: 3090,
                name: '严重污染',
                level: 6
            }
        ]
    },
    SO2: {
        unit: 'μg/m³',
        level: [
            {
                yAxis: 150,
                name: '优',
                level: 1
            },
            {
                yAxis: 500,
                name: '良',
                level: 2
            },
            {
                yAxis: 650,
                name: '轻度污染',
                level: 3
            },
            {
                yAxis: 800,
                name: '中度污染',
                level: 4
            }
        ]
    },
    CO: {
        unit: 'mg/m³',
        level: [
            {
                yAxis: 5,
                name: '优',
                level: 1
            },
            {
                yAxis: 10,
                name: '良',
                level: 2
            },
            {
                yAxis: 35,
                name: '轻度污染',
                level: 3
            },
            {
                yAxis: 60,
                name: '中度污染',
                level: 4
            },
            {
                yAxis: 90,
                name: '重度污染',
                level: 5
            },
            {
                yAxis: 120,
                name: '严重污染',
                level: 6
            }
        ]
    }
};
wrwUtil.getWrwLevel = function (wrw, value) {
    wrw = wrw.toUpperCase();
    var obj = this.wrwObj[wrw];
    if (value === '' || value === null || value === undefined) {
        return {
            level: 6,
            unit: obj.unit,
            color: '#d7d7d7'
        };
    }
    var levelArr = obj.level;
    for (var i = 0; i < levelArr.length; i++) {
        if (value <= levelArr[i].yAxis) {
            return {
                level: levelArr[i].level,
                levelName: levelArr[i].name.slice(0, 2),
                levelNameAll: levelArr[i].name,
                unit: obj.unit,
                color: this.color[levelArr[i].level],
                lightColor: this.lightColor[levelArr[i].level]
            };
        }
    }
    return {
        level: 6,
        unit: obj.unit,
        color: this.color['6'],
        lightColor: this.lightColor['6']
    };
};

export default wrwUtil;
