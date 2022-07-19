import {
    ULR_BASE,
    URL_DATA
} from '@/utils/config.js'


export function getResion(map) {
    return new Promise((resolve, reject) => {
        map.getRegion({
            success: res => {
                resolve(res);
            }
        });
    });
}

let utils = {
    checkFileExist(filePath) {
        if (!this._checkFileExistCache) {
            this._checkFileExistCache = {};
        }
        return new Promise(resolve => {
            if (this._checkFileExistCache.hasOwnProperty(filePath)) {
                resolve(this._checkFileExistCache[filePath]);
            }
            uni.getSavedFileInfo({
                filePath: filePath,
                success: () => {
                    // 把检查结果缓存到内存中，提高性能
                    this._checkFileExistCache[filePath] = true;
                    resolve(true);
                },
                fail: () => {
                    this._checkFileExistCache[filePath] = false;
                    resolve(false);
                }
            })
        });
    },
    _downloadMapIconFile(url) {
        // 用于防止重复下载
        if (!this._mapIconLoadEvent) {
            this._mapIconLoadEvent = {};
        }

        if (this._mapIconLoadEvent[url]) {
            return new Promise(resolve => {
                this._mapIconLoadEvent[url].push(resolve);
            });
        } else {
            this._mapIconLoadEvent[url] = [];
        }

        let saveFile = function (tempFilePath) {
            return new Promise(resolve => {
                uni.saveFile({
                    tempFilePath: tempFilePath,
                    success: function (res) {
                        resolve(res.savedFilePath);
                    }
                });
            });
        };

        let downloadFile = function (url) {
            return new Promise(resolve => {
                uni.downloadFile({
                    url: ULR_BASE + url,
                    success: function (res) {
                        if (res.statusCode === 200) {
                            resolve(res.tempFilePath);
                        }
                    }
                });
            });
        };


        return downloadFile(url).then(res => {
            return saveFile(res);
        }).then(res => {
            uni.setStorageSync('dowload-cache-' + url, res);

            // 调用等待下载的图标
            let callback = this._mapIconLoadEvent[url];
            this._mapIconLoadEvent[url] = null;
            callback.forEach(resolve => {
                resolve(res);
            });

            return res;
        });
    },
    downloadMapIconFile(opts) {
        let param = `value=${opts.value}&level=${opts.level}`;
        let url = `/smart/wx/general/generalcontroller/createmapstationicon?${param}`;

        // TODO 还要判定文件是否存在
        let cache = uni.getStorageSync('dowload-cache-' + url);
        if (cache) {
            // 检查文件是否存在
            return this.checkFileExist(cache).then(exist => {
                if (exist) {
                    return cache;
                } else {
                    uni.removeStorageSync('dowload-cache-' + url);
                    return this._downloadMapIconFile(url);
                }
            });
        } else {
            return this._downloadMapIconFile(url);
        }
    }
};

export function downloadMapIconFile(opts) {
    return utils.downloadMapIconFile(opts);
}
