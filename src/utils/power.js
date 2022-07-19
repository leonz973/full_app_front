const Constant = {
    aqlRingColors: {
        [-1]: 'rgba(205, 205, 205, 1)',
        1: '#35f87b',
        2: '#f0d917',
        3: '#d8b11f',
        4: '#ff5f5f',
        5: '#b1517e',
        6: '#b45861'
    },
    pollutionUnits: {
        co: 'mg/m^3',
        no2: 'μg/m^3',
        o3: 'μg/m^3',
        pm10: 'μg/m^3',
        pm25: 'μg/m^3',
        so2: 'μg/m^3',
        aqi: ''
    },
    aqlTitles: {
        [-1]: '-',
        1: '优',
        2: '良',
        3: '轻度',
        4: '中度',
        5: '重度',
        6: '严重'
    },
    aqiTips: {
        [-1]: '-',
        1: '可参加户外活动，呼吸清新空气',
        2: '极少数异常敏感人群应减少户外活动',
        3: '避免长时间、高强度的户外锻炼，一般人群适量减少户外活动',
        4: '进一步加剧易感人群症状，对健康人群心脏、呼吸系统有影响',
        5: '一般人群适当减少户外运动，易感人群应减少、停止户外运动',
        6: '所有人应避免户外活动'
    },
    pollutionFormat: {
        'PM10': 'PM_1_0',
        'PM25': 'PM_2_._5',
        'PM2.5': 'PM_2_._5',
        'O3': 'O_3',
        'SO2': 'SO_2',
        'NO2': 'NO_2'
    }
};


let LevelUtils = {
    ceilAqi: function (value) {
        if (value <= 0) {
            return 0;
        }
        if (value <= Constant.aqiLevelTopNu[1]) {
            return Constant.aqiLevelTopNu[1];
        }
        if (value <= Constant.aqiLevelTopNu[2]) {
            return Constant.aqiLevelTopNu[2];
        }
        if (value <= Constant.aqiLevelTopNu[3]) {
            return Constant.aqiLevelTopNu[3];
        }
        if (value <= Constant.aqiLevelTopNu[4]) {
            return Constant.aqiLevelTopNu[4];
        }
        if (value <= Constant.aqiLevelTopNu[5]) {
            return Constant.aqiLevelTopNu[5];
        }
        return value;
    },
    aqi: function (value) {
        if (value <= 0 || !value) {
            // 无法判定，一般是无效数据或无数据
            return -1;
        }
        if (value <= 50) {
            return 1;
        }
        if (value > 50 && value <= 100) {
            return 2;
        }
        if (value > 100 && value <= 150) {
            return 3;
        }
        if (value > 150 && value <= 200) {
            return 4;
        }
        if (value > 200 && value <= 300) {
            return 5;
        }
        return 6;
    },
    pm25: function (value) {
        if (value <= 0 || !value) {
            // 无法判定，一般是无效数据或无数据
            return -1;
        }
        if (value <= 35) {
            return 1;
        }
        if (value > 35 && value <= 75) {
            return 2;
        }
        if (value > 75 && value <= 115) {
            return 3;
        }
        if (value > 115 && value <= 150) {
            return 4;
        }
        if (value > 150 && value <= 250) {
            return 5;
        }
        return 6;
    },
    pm10: function (value) {
        if (value <= 0 || !value) {
            // 无法判定，一般是无效数据或无数据
            return -1;
        }
        if (value <= 50) {
            return 1;
        }
        if (value > 50 && value <= 150) {
            return 2;
        }
        if (value > 150 && value <= 250) {
            return 3;
        }
        if (value > 250 && value <= 350) {
            return 4;
        }
        if (value > 350 && value <= 420) {
            return 5;
        }
        return 6;
    },
    o3: function (value) {
        if (value <= 0 || !value) {
            // 无法判定，一般是无效数据或无数据
            return -1;
        }
        if (value <= 160) {
            return 1;
        }
        if (value > 160 && value <= 200) {
            return 2;
        }
        if (value > 200 && value <= 300) {
            return 3;
        }
        if (value > 300 && value <= 400) {
            return 4;
        }
        if (value > 400 && value <= 800) {
            return 5;
        }
        return 6;
    },
    o3d: function (value) {
        if (value <= 100) {
            return 1;
        }
        if (value > 100 && value <= 160) {
            return 2;
        }
        if (value > 160 && value <= 215) {
            return 3;
        }
        if (value > 215 && value <= 265) {
            return 4;
        }
        if (value > 265 && value <= 800) {
            return 5;
        }
        return 6;
    },
    so2: function (value) {
        if (value <= 0 || !value) {
            // 无法判定，一般是无效数据或无数据
            return -1;
        }
        if (value <= 150) {
            return 1;
        }
        if (value > 150 && value <= 500) {
            return 2;
        }
        if (value > 500 && value <= 650) {
            return 3;
        }
        if (value > 650 && value <= 800) {
            return 4;
        }
        // TODO 此处高于800没有标准
        return 6;
    },
    so2d: function (value) {
        if (value <= 50) {
            return 1;
        }
        if (value > 50 && value <= 150) {
            return 2;
        }
        if (value > 150 && value <= 475) {
            return 3;
        }
        if (value > 475 && value <= 800) {
            return 4;
        }
        if (value > 800 && value <= 1600) {
            return 5;
        }
        return 6;
    },
    co: function (value) {
        if (value <= 0 || !value) {
            // 无法判定，一般是无效数据或无数据
            return -1;
        }
        if (value <= 5) {
            return 1;
        }
        if (value > 5 && value <= 10) {
            return 2;
        }
        if (value > 10 && value <= 35) {
            return 3;
        }
        if (value > 35 && value <= 60) {
            return 4;
        }
        if (value > 60 && value <= 90) {
            return 5;
        }
        return 6;
    },
    cod: function (value) {
        if (value <= 2) {
            return 1;
        }
        if (value > 2 && value <= 4) {
            return 2;
        }
        if (value > 4 && value <= 14) {
            return 3;
        }
        if (value > 14 && value <= 24) {
            return 4;
        }
        if (value > 24 && value <= 36) {
            return 5;
        }
        return 6;
    },
    no2: function (value) {
        if (value <= 0 || !value) {
            // 无法判定，一般是无效数据或无数据
            return -1;
        }
        if (value <= 100) {
            return 1;
        }
        if (value > 100 && value <= 200) {
            return 2;
        }
        if (value > 200 && value <= 700) {
            return 3;
        }
        if (value > 700 && value <= 1200) {
            return 4;
        }
        if (value > 1200 && value <= 2340) {
            return 5;
        }
        return 6;
    },
    no2d: function (value) {
        if (value <= 40) {
            return 1;
        }
        if (value > 40 && value <= 80) {
            return 2;
        }
        if (value > 80 && value <= 180) {
            return 3;
        }
        if (value > 180 && value <= 280) {
            return 4;
        }
        if (value > 280 && value <= 565) {
            return 5;
        }
        return 6;
    }
};


let StringUtils = {
    params(opts) {
        let p = [];
        for (let key in opts) {
            if (opts.hasOwnProperty(key)) {
                p.push(key + '=' + (opts[key] || ''));
            }
        }
        return p.join('&');
    },
    parse_query_string(query) {
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    },
    formatPollution(pol) {
        let format = Constant.pollutionFormat[pol];
        return format || pol;
    }
};

let systemInfo;
let SystemUtils = {
    getSystemInfo() {
        if (systemInfo) {
            return systemInfo;
        }
        systemInfo = uni.getSystemInfoSync();
        return systemInfo;
    },
    getPxToRpxRate() {
        return this.getSystemInfo().screenWidth / 750;
    }
};

export {
    LevelUtils,
    StringUtils,
    SystemUtils,
    Constant
};
