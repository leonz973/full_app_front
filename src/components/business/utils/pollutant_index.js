/**
 * 各个因子对应指标线
 *
 * @format
 */

export const getArrmarkLine = (cons, timeType) => {
    //cons 污染物名称  timeType 时间类型 hour || day
    switch (cons) {
        case 'AQI':
            return [
                {
                    name: '优',
                    value: 50,
                    color: '#24bd5d'
                },
                {
                    name: '良',
                    value: 100,
                    color: '#d8bc37'
                },
                {
                    name: '轻度',
                    value: 150,
                    color: '#f87c12'
                },
                {
                    name: '中度',
                    value: 200,
                    color: '#f60000'
                },
                {
                    name: '重度',
                    value: 300,
                    color: '#94004b'
                },
                {
                    name: '严重',
                    value: 400,
                    color: '#6f001f'
                }
            ];
        case 'SO2':
            if (timeType === 'hour') {
                return [
                    {
                        name: '优',
                        value: 150,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 500,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 650,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 800,
                        color: '#f60000'
                    }
                ];
            } else if (timeType === 'day') {
                return [
                    {
                        name: '优',
                        value: 50,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 150,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 475,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 800,
                        color: '#f60000'
                    },
                    {
                        name: '重度',
                        value: 1600,
                        color: '#94004b'
                    },
                    {
                        name: '严重',
                        value: 2100,
                        color: '#6f001f'
                    }
                ];
            } else {
                break;
            }
        case 'NO2':
            if (timeType === 'hour') {
                return [
                    {
                        name: '优',
                        value: 100,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 200,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 700,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 1200,
                        color: '#f60000'
                    },
                    {
                        name: '重度',
                        value: 2340,
                        color: '#94004b'
                    },
                    {
                        name: '严重',
                        value: 3090,
                        color: '#6f001f'
                    }
                ];
            } else if (timeType === 'day') {
                return [
                    {
                        name: '优',
                        value: 40,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 80,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 180,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 280,
                        color: '#f60000'
                    },
                    {
                        name: '重度',
                        value: 565,
                        color: '#94004b'
                    },
                    {
                        name: '严重',
                        value: 750,
                        color: '#6f001f'
                    }
                ];
            } else {
                break;
            }
        case 'PM10':
            return [
                {
                    name: '优',
                    value: 50,
                    color: '#24bd5d'
                },
                {
                    name: '良',
                    value: 150,
                    color: '#d8bc37'
                },
                {
                    name: '轻度',
                    value: 250,
                    color: '#f87c12'
                },
                {
                    name: '中度',
                    value: 350,
                    color: '#f60000'
                },
                {
                    name: '重度',
                    value: 420,
                    color: '#94004b'
                },
                {
                    name: '严重',
                    value: 500,
                    color: '#6f001f'
                }
            ];
        case 'CO':
            if (timeType === 'hour') {
                return [
                    {
                        name: '优',
                        value: 5,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 10,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 35,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 60,
                        color: '#f60000'
                    },
                    {
                        name: '重度',
                        value: 90,
                        color: '#94004b'
                    },
                    {
                        name: '严重',
                        value: 120,
                        color: '#6f001f'
                    }
                ];
            } else if (timeType === 'day') {
                return [
                    {
                        name: '优',
                        value: 2,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 4,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 14,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 24,
                        color: '#f60000'
                    },
                    {
                        name: '重度',
                        value: 36,
                        color: '#94004b'
                    },
                    {
                        name: '严重',
                        value: 48,
                        color: '#6f001f'
                    }
                ];
            } else {
                break;
            }
        case 'O3':
            if (timeType === 'hour') {
                return [
                    {
                        name: '优',
                        value: 160,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 200,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 300,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 400,
                        color: '#f60000'
                    },
                    {
                        name: '重度',
                        value: 800,
                        color: '#94004b'
                    },
                    {
                        name: '严重',
                        value: 1000,
                        color: '#6f001f'
                    }
                ];
            } else if (timeType === 'day') {
                return [
                    {
                        name: '优',
                        value: 100,
                        color: '#24bd5d'
                    },
                    {
                        name: '良',
                        value: 160,
                        color: '#d8bc37'
                    },
                    {
                        name: '轻度',
                        value: 215,
                        color: '#f87c12'
                    },
                    {
                        name: '中度',
                        value: 265,
                        color: '#f60000'
                    },
                    {
                        name: '重度',
                        value: 800,
                        color: '#94004b'
                    }
                ];
            } else {
                break;
            }
        case 'PM25':
            return [
                {
                    name: '优',
                    value: 35,
                    color: '#24bd5d'
                },
                {
                    name: '良',
                    value: 75,
                    color: '#d8bc37'
                },
                {
                    name: '轻度',
                    value: 115,
                    color: '#f87c12'
                },
                {
                    name: '中度',
                    value: 150,
                    color: '#f60000'
                },
                {
                    name: '重度',
                    value: 250,
                    color: '#94004b'
                },
                {
                    name: '严重',
                    value: 350,
                    color: '#6f001f'
                }
            ];
        default:
            return [];
    }
};
