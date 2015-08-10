/**
 * Created by hc on 15/4/21.
 *
 * local data ,not net
 **/


var VERIFY_KEY = "uyaer20111111";
var NET_BACKPACK = "backpack";

var Net = Net || {};
/**
 * 模拟加载数据
 * @param key
 * @param {Function} callback
 */
Net.load = function(key,callback){
    var data = cc.sys.localStorage.getItem(key);
    if(!data){
        callback && callback(null);
        return;
    }
    data = JSON.parse(data);
    var md5key = data.md5;
    var data = data.data;

    var verify = md5(key+VERIFY_KEY+JSON.stringify(data));
    if(verify != md5key){
        trace("invalid data with "+key);
        callback && callback(null);
        return;
    }
    callback && callback(data);
}

/**
 * 模拟保存数据
 * @param key
 * @param data
 * @param {Function} callback
 */
Net.save = function(key,data,callback){
    var verify = md5(key+VERIFY_KEY+JSON.stringify(data));
    var obj = {"md5":verify,"data":data};

    cc.sys.localStorage.setItem(key,JSON.stringify(obj));

    callback && callback();
}