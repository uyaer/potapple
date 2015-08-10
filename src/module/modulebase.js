/**
 * Created by hc on 15/4/22.
 */

var ModuleBase = cc.Layer.extend({
    /**
     * 资源路径
     * @type string
     */
    resurl:"",
    /**
     * 资源解析出来的根
     * @type cc.Node
     */
    node:null,
    /**
     * 资源解析出来的动画
     * @type cc.Action
     */
    action:null,
    /**
     * 遮罩
     * @type cc.LayerColor
     */
    mask:null,
    ctor: function (w,h) {
        this._super();

        var size = cc.winSize;

        this.mask = new cc.LayerColor(cc.color(255,255,255,50),size.width,size.height);
        this.addChild(this.mask);


        var obj = ccs.load(this.resurl);
        var node = obj.node;
        this.node = obj.node;
        this.action = obj.action;

        node.setContentSize(cc.size(w, h));
        node.anchorX = 0.5;
        node.anchorY = 0.5;
        node.x = size.width / 2;
        node.y = size.height / 2;
        this.addChild(node,1);

        var closeBtn = ccui.helper.seekWidgetByName(node,"closeBtn");
        var that = this;
        closeBtn.addClickEventListener(function(){
            closeBtn.runAction(cc.rotateBy(0.5,360));
            cc.async.series([
                function(cb){
                    node.runAction(
                        cc.sequence(
                            cc.scaleTo(0.5,0).easing(cc.easeBackIn()),
                            cc.callFunc(function(){cb()})
                        )
                    );
                },
                function(cb){
                    that.runAction(cc.removeSelf());
                }
            ],function(err,result){
                trace(err,result)
            });
        });

    },
    onEnter:function(){
        this._super();

        var maskEvent = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(){
                return true;
            }
        });
        cc.eventManager.addListener(maskEvent,this.mask);
    },
    onExit:function(){
        this._super();

        cc.eventManager.removeListeners(this.mask);
    }
});

ModuleBase.show = function (root,instance) {
    root.addChild(instance);
    instance.node.scale = 0;
    instance.node.runAction(
        cc.scaleTo(0.5,1).easing(cc.easeBackOut())
    );
}