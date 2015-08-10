/**
 * Created by hc on 15/4/22.
 */

var Backpack = ModuleBase.extend({
    pageIndex: 0,
    ctor: function () {
        this.resurl = res.backpack_json;

        this._super(700,900);

        Backpack.instance = this;

        var node = this.node;

        var scrollView = ccui.helper.seekWidgetByName(node, "scrollView");
        scrollView.setTouchEnabled(true);
        scrollView.setInnerContainerSize(cc.size(630, 1290));
        var itemParent = new cc.Node();
        scrollView.addChild(itemParent);
        for (var i = 0; i < 10; i++) {
            var listItem = new BackpackItem();
            listItem.y = i * 125+20;
            listItem.x = 15;
            itemParent.addChild(listItem);
        }

        var isHorizontalMove = false;
        var offsetX = 100;
        var lastMovePosX = 0;
        var lastMovePosY = 0;
        scrollView.addTouchEventListener(function (target, phase) {
            switch (phase) {
                case ccui.Widget.TOUCH_BEGAN:
                    isHorizontalMove = false;
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    var d = target.getTouchMovePosition().x - target.getTouchBeganPosition().x;
                    if (!isHorizontalMove && Math.abs(d) > offsetX) {
                        isHorizontalMove = true;
                        lastMovePosX = target.getTouchMovePosition().x;
                        lastMovePosY = scrollView.getInnerContainer().y;
                    }
                    if (isHorizontalMove) {
                        var deltax = target.getTouchMovePosition().x - lastMovePosX;
                        lastMovePosX = target.getTouchMovePosition().x;
                        itemParent.x += deltax;
                        scrollView.getInnerContainer().y = lastMovePosY;
                    }
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                case ccui.Widget.TOUCH_ENDED:
                    itemParent.x = 0;
                    break;
            }

        });
    }
});

Backpack.instance = null;
Backpack.show = function (root) {
    if (!Backpack.instance) {
        new Backpack();
    }

    ModuleBase.show(root,Backpack.instance);
}