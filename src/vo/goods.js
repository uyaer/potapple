var GoodsBase = cc.Class.extend({
    /**
     * @type number
     */
    id: 0,
    /**
     * @type string
     */
    name: null,
    /**
     * @type number
     */
    exp: 0,
    /**
     * @type number
     */
    gold: 0,
    /**
     * @type number
     */
    rmb: 0,
    /**
     * @type boolean
     */
    autouse: false,
    /**
     * @type boolean
     */
    shop: false,
    ctor: function () {
        this._super();
    },

    setData: function (data) {
        this.id = data.id;
        this.name = data.name;
        this.exp = data.exp;
        this.gold = data.gold;
        this.rmb = data.rmb;
        this.autouse = data.autouse;
        this.shop = data.shop;
    }
});

var Goods = cc.Class.extend({
    /**
     * @type number
     */
    id: 0,
    /**
     * @type number
     */
    baseId: 0,
    /**
     * @type GoodsBase
     */
    base: null,
    ctor: function (id, baseId) {
        this._super();

        this.id = id;
        this.baseId = baseId;

        this.base = GoodsBaseManager.getBaseVo(baseId);
    }

});

var GoodsManager = {
    /**
     * @type Array
     */
    _data: null,

    /**
     *加载数据后初始化数据
     * @param {Array}arr
     */
    setData: function (arr) {
        this._data = [];
        if (!arr)return;
        if (cc.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                this.addItem(arr[i]);
            }
        }
    },

    /**
     * 添加一个元素
     * @param item
     */
    addItem: function (item) {
        var vo = new Goods(item.id, item.baseId);
        this._data.push(vo);
    },

    /**
     * 根据物品id移除物品
     * @param id
     */
    removeItem: function (id) {
        for (var i = this._data.length - 1; i >= 0; i--) {
            if (id == this._data[i].id) {
                this._data.splice(i, 1);
                return;
            }
        }
    },

    /**
     * 得到物品,根据经验排序
     * @param page start 0
     * @param num default 10
     * @return Array
     */
    getDataPageExp: function (page, num) {
        num = num || 10;
        this._data.sort(function (a, b) {
            b.exp > a.exp ? 1 : -1;
        });

        return this._getDataPage(page, num);
    },
    /**
     * 得到物品,根据金币排序
     * @param page start 0
     * @param num default 10
     * @return Array
     */
    getDataPageGold: function (page, num) {
        num = num || 10;
        this._data.sort(function (a, b) {
            b.gold > a.gold ? 1 : -1;
        });

        return this._getDataPage(page, num);
    },

    _getDataPage: function (page, num) {
        var arr = [];
        var allPage = Math.floor(this._data.length / page);
        page = page % allPage;

        var start = page * num;
        var end = (page + 1) * num;
        end = Math.min(end, this._data.length);
        for (var i = start; i < end; i++) {
            arr.push(this._data[i]);
        }
        return arr;
    }
}

var GoodsBaseManager = {
    /**
     * @type Object
     */
    _data: null,
    init: function () {
        var that = this;
        cc.loader.loadJson(res.data_json, function (err, data) {
            if (err)trace("load err!!! ", res.data_json, err);
            that._data = {};
            var goodsArr = data["Gooods"];
            for (var i = 0; i < goodsArr.length; i++) {
                var vo = new GoodsBase();
                vo.setData(goodsArr[i]);
                that._data[vo.id] = vo;
            }
        });
    },

    getBaseVo: function (baseId) {
        return this._data[baseId];
    }
}