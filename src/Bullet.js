/**
 * Created by hc on 15/4/14.
 */

var Bullet = cc.Node.extend({
    /**
     * 子弹等级
     * @type number
     */
    level: 1,
    /**
     * @type cc.Sprite
     */
    sp: null,
    /**
     * 威力
     * @type number
     */
    power:10,
    /**
     * 速度
     * @type number
     */
    speed:2000,

    ctor: function () {
        this._super();

        this.sp = new cc.Sprite(res.bullet);
        this.sp.anchorX = 0;
        this.sp.anchorY = 1;
        this.addChild(this.sp);

        this.setContentSize(this.sp.getContentSize());
    },

    update:function(dt){
        this.y += this.speed * dt;
    }
});