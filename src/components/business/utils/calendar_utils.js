/**
 * /*
 *
 * @format
 * @Author: Caijw
 * @LastEditors: Caijw
 * @Description: 工具类
 * @Date: 2019-03-28 08:53:24
 * @LastEditTime: 2019-03-28 11:30:49
 */

export default new (class Utils {
    constructor() {
        // 主要色调（用在图表当中）
        this.pColor = [
            '#a9abff',
            '#ff8896',
            '#f66bc7',
            '#6c93ee',
            '#79c628',
            '#2bcba7',
            '#f7a23e',
            '#27bae7',
            '#cb79ff',
            '#f95b5a',
            '#ccaf27',
            '#38b99c'
        ];
    }

    // 替换污染物下标
    replacePltName(value) {
        value = value || '';
        let labelObj = {
            PM2_5: 'PM₂․₅',
            'PM2.5': 'PM₂․₅',
            PM25: 'PM₂․₅',
            PM10: 'PM₁₀',
            O3: 'O₃',
            NO2: 'NO₂',
            SO2: 'SO₂'
        };
        return value.replace(/[A-Z]+[0-9]+\.*\_*[0-9]*/g, function () {
            return labelObj[arguments[0]] || arguments[0];
        });
    }

    // 替换污染物下标
    replacePltLabel(value) {
        value = value || '';
        let labelObj = {
            PM2_5: 'PM<sub>2.5</sub>',
            'PM2.5': 'PM<sub>2.5</sub>',
            PM25: 'PM<sub>2.5</sub>',
            PM10: 'PM<sub>10</sub>',
            O3: 'O<sub>3</sub>',
            NO2: 'NO<sub>2</sub>',
            SO2: 'SO<sub>2</sub>'
        };
        return value.replace(/[A-Z]+[0-9]+\.*\_*[0-9]*/g, function () {
            return labelObj[arguments[0]] || arguments[0];
        });
    }

    //pollutionName 污染物名称,dateType 筛选类型
    getlevelValueByPollution(pollutionName) {
        let num0, num1, num2, num3, num4, num5, num6;
        switch (pollutionName.toUpperCase()) {
            case 'SO2':
                num0 = 0;
                num1 = 75;
                num2 = 150;
                num3 = 500;
                num4 = 650;
                num5 = 800;
                num6 = 1600;
                break;
            case 'NO2':
                num0 = 0;
                num1 = 50;
                num2 = 100;
                num3 = 200;
                num4 = 700;
                num5 = 1200;
                num6 = 2340;
                break;
            case 'CO':
                num0 = 0;
                num1 = 2.5;
                num2 = 5;
                num3 = 10;
                num4 = 35;
                num5 = 60;
                num6 = 90;
                break;
            case 'O3':
                num0 = 0;
                num1 = 80;
                num2 = 160;
                num3 = 200;
                num4 = 300;
                num5 = 400;
                num6 = 800;
                break;
            case 'PM10':
                num0 = 0;
                num1 = 25;
                num2 = 50;
                num3 = 150;
                num4 = 250;
                num5 = 350;
                num6 = 420;
                break;
            case 'PM25':
            case 'PM2.5':
                num0 = 0;
                num1 = 17.5;
                num2 = 35;
                num3 = 75;
                num4 = 115;
                num5 = 150;
                num6 = 250;
                break;
            case 'AQI':
                num0 = 0;
                num1 = 25;
                num2 = 50;
                num3 = 100;
                num4 = 150;
                num5 = 200;
                num6 = 300;
                break;
            default:
                break;
        }
        return [num0, num1, num2, num3, num4, num5, num6];
    }

    //传入污染物的值，然后对应的颜色
    //getLevelPollution('PM10', 100)
    getLevelPollution(pollutionName, value) {
        let color = '';
        let txt = '';
        let num0, num1, num2, num3, num4, num5, num6;
        let result = this.getlevelValueByPollution(pollutionName);
        let level = 0;
        num0 = result[0];
        num1 = result[1];
        num2 = result[2];
        num3 = result[3];
        num4 = result[4];
        num5 = result[5];
        num6 = result[6];
        if (value > num0 && value <= num1) {
            color = '#24BD5D';
            txt = '优';
            level = 1;
        } else if (value >= num1 && value <= num2) {
            color = '#24BD5D';
            txt = '优';
            level = 1;
        } else if (value > num2 && value <= num3) {
            color = '#d8bc37';
            txt = '良';
            level = 2;
        } else if (value > num3 && value <= num4) {
            color = '#f87c12';
            txt = '轻度';
            level = 3;
        } else if (value > num4 && value <= num5) {
            color = '#f60000';
            txt = '中度';
            level = 4;
        } else if (value > num5 && value <= num6) {
            color = '#94004b';
            txt = '重度';
            level = 5;
        } else if (value > num6) {
            color = '#6f001f';
            txt = '严重';
            level = 6;
        } else {
            color = '#cccccc';
        }
        return {
            color: color,
            txt: txt,
            level: level
        };
    }

    // 水站点位信息
    waterDialogInfoStyle(val) {
        let waterColor = '';
        let className = '';
        let shorthand = '';
        let otherClassName = '';
        if (val === '1' || val === 'Ⅰ类') {
            waterColor = '#44c5fd';
            className = 'Ⅰ类';
            shorthand = 'Ⅰ';
            otherClassName = '优';
        } else if (val === '2' || val === 'Ⅱ类') {
            waterColor = '#51a5fd';
            className = 'Ⅱ类';
            shorthand = 'Ⅱ';
            otherClassName = '良';
        } else if (val === '3' || val === 'Ⅲ类') {
            waterColor = '#73bb31';
            className = 'Ⅲ类';
            shorthand = 'Ⅲ';
            otherClassName = '轻度';
        } else if (val === '4' || val === 'Ⅳ类') {
            waterColor = '#eebd15';
            className = 'Ⅳ类';
            shorthand = 'Ⅳ';
            otherClassName = '中度';
        } else if (val === '5' || val === 'Ⅴ类') {
            waterColor = '#f88e17';
            className = 'Ⅴ类';
            shorthand = 'Ⅴ';
            otherClassName = '重度';
        } else if (val === '6' || val === '劣Ⅴ类') {
            waterColor = '#ee3b5b';
            className = '劣Ⅴ类';
            shorthand = '劣Ⅴ';
            otherClassName = '严重';
        } else {
            waterColor = '#999';
            className = '-';
            // shorthand='其他';
            shorthand = '-';
            otherClassName = '其他';
        }
        return {
            waterColor: waterColor,
            className: className,
            shorthand: shorthand,
            otherClassName: otherClassName
        };
    }

    // 碧水排名页面水质类别颜色
    editLeaveColor(val) {
        let leaveColor = '#f00';
        switch (val) {
            case 'Ⅰ类':
                leaveColor = '#44c5fd';
                break;
            case 'Ⅱ类':
                leaveColor = '#51a5fd';
                break;
            case 'Ⅲ类':
                leaveColor = '#73bb31';
                break;
            case 'Ⅳ类':
                leaveColor = '#eebd15';
                break;
            case 'Ⅴ类':
                leaveColor = '#f88e17';
                break;
            case '劣Ⅴ类':
                leaveColor = '#ee3b5b';
                break;
            default:
                break;
        }
        return leaveColor;
    }

    /**
     * 获取时间单位中文
     *
     * @param type
     * @returns {string}
     *
     * @author 黄冠豪
     */
    convertDateTypeToUnit(type) {
        switch (type) {
            case 'MONTH':
                return '月';
            case 'YEAR':
                return '年';
            case 'JD':
                return '季度';
            case 'LJ':
                return '月累计';
            case 'SQ':
                return '水期';
        }
        return '';
    }
    // 时间日期格式化，将yyyy-MM-dd HH格式返回成yyyy-M-d H时
    formatDate(date, format) {
        let ret = date;
        let p = date.slice(0, 10).split('-');
        let t = date.indexOf(' ') > -1 ? date.slice(11).split(':') : [];
        switch (format) {
            case 'yyyy-M-d H':
                ret =
                    p[0] +
                    '年' +
                    parseInt(p[1]) +
                    '月' +
                    parseInt(p[2]) +
                    '日 ' +
                    parseInt(t[0]) +
                    '时';
                break;
            case 'yyyy-M-d':
                ret =
                    p[0] + '年' + parseInt(p[1]) + '月' + parseInt(p[2]) + '日';
                break;
            case 'M-d':
                ret = parseInt(p[1]) + '月' + parseInt(p[2]) + '日';
                break;
            case 'yyyy-M':
                ret = p[0] + '年' + parseInt(p[1]) + '月';
                break;
            case 'M-d H':
                ret =
                    parseInt(p[1]) +
                    '月' +
                    parseInt(p[2]) +
                    '日 ' +
                    parseInt(t[0]) +
                    '时';
                break;
            case 'H:mm':
                ret = parseInt(t[0]) + ':' + t[1];
                break;
            case 'H:m':
                ret = parseInt(t[0]) + ':' + parseInt(t[1]);
                break;
            case 'H':
                ret = parseInt(t[0]) + '时';
                break;
            case 'd H':
                ret = parseInt(p[2]) + '日' + '\n' + parseInt(t[0]) + '时';
                break;
        }
        return ret;
    }

    // 获取当前年月日
    getDate(type) {
        let date = new Date();
        let year = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        if (m.toString().length === 1) {
            m = '0' + m;
        }
        if (d.toString().length === 1) {
            d = '0' + d;
        }
        if (type === 'yyyy-MM-dd') {
            return year + '-' + m + '-' + d;
        }
        if (type === 'yyyy') {
            return year;
        }
        if (type === 'yyyy-M') {
            m = date.getMonth() + 1;
            return year + '-' + m;
        }
        if (type === 'dd') {
            return d;
        }
    }

    // 计算百分比
    computeProportion(a, b) {
        return ((Number(a) / Number(b)) * 100).toFixed(1);
    }
})();
