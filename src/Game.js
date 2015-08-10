/**
 * Created by hc on 15/4/14.
 */
var Game = cc.Layer.extend({
    /**
     * 子弹数组
     * @type Array
     */
    bullets: [],
    /**
     * @type Apple
     */
    apple:null,

    ctor: function () {
        this._super();

        var size = cc.winSize;

        var bg = new cc.Sprite(res.map1);
        bg.anchorX = 0;
        bg.anchorY = 0;
        this.addChild(bg);

        var floor = new cc.Sprite(res.floor);
        floor.anchorX = 0;
        floor.anchorY = 0;
        this.addChild(floor,2);

        var apple = new Apple();
        this.addChild(apple,1);
        this.apple = apple;

        var that = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchEnded: function (touch, event) {
                var bullet = new Bullet();
                bullet.x = touch.getLocationX();
                bullet.y = 0;
                that.addChild(bullet,10);
                that.bullets.push(bullet);
            }
        });

        cc.eventManager.addListener(listener, this);

        this.scheduleUpdate();
    },

    update:function(dt){
        var len = this.bullets.length;
        var bullet;
        for(var i = len - 1 ; i >= 0; i--){
            bullet = this.bullets[i];
            bullet.update(dt);
            //check bounds
            if(bullet.y - bullet.height > cc.winSize.height){
                this.bullets.splice(i,1);
                bullet.removeFromParent();
                continue;
            }
            //check collision
            if(this.apple.checkCollision(bullet)){
                this.bullets.splice(i,1);
                bullet.removeFromParent();
            }

        }
    }
});


Game.create = function () {
    var sc = new cc.Scene();
    var layer = new Game();
    sc.addChild(layer);

    return sc;
}