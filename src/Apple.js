/**
 * Created by hc on 15/4/14.
 */
var Apple = cc.Node.extend({
    /**
     * 当前生命
     * @type number
     */
    hp: 100,
    /**
     * 最大生命
     * @type number
     */
    maxHp: 100,
    /**
     * @type cc.Sprite
     */
    sp: null,

    ctor: function () {
        this._super();

        var size = cc.winSize;

        this.sp = new cc.Sprite(res.apple1);
        this.sp.x = size.width / 2;
        this.sp.y = size.height + this.sp.height / 2;
        this.addChild(this.sp);

        this.sp.runAction(cc.sequence(
            cc.moveBy(1, 0, FLOOR_H - size.height),
            cc.callFunc(this.moveEnd)
        ));
    },

    moveEnd: function () {
        trace("===move end=====");
    },

    checkCollision: function (bullet) {
        var d = Math.pow((bullet.x - this.sp.x), 2) + Math.pow((bullet.y - this.sp.y), 2);
        var n = Math.pow(this.sp.width / 2, 2);
        if (d <= n) {
            return true;
        }
        return false;
    }
});