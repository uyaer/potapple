/**
 * Created by hc on 15/4/16.
 */

var Chapter = cc.Scene.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.chapter_plist);

        var bg = new cc.LayerGradient(cc.color("#47d3f7"), cc.color("#06a5cd"), cc.p(0, 1));
        this.addChild(bg);

        var parall = new cc.ParallaxNode();
        this.addChild(parall);

        var hall = new cc.Sprite("#chapter/hall.png");
        hall.anchorX = hall.anchorY = 0;
        parall.addChild(hall, 1, cc.p(0, 0.2), cc.p(0, 0));


        var treeNode = new cc.Node();
        parall.addChild(treeNode, 3, cc.p(0, 1), cc.p(0, 0));

        var h = 0;
        for (var i = 0; i < 6; i++) {
            var tree = new cc.Sprite("#chapter/tree.png");
            tree.anchorY = 0;
            tree.x = size.width / 2;
            tree.y = 510 * i;
            h += 510;
            treeNode.addChild(tree,0);
        }

        //tree zhi
        for (var i = 0; i < 12; i++) {
            var zhi = new TreeZhi(i);
            zhi.x = size.width / 2;
            zhi.y = 250 * (i + 1);
            if (i % 4 < 2) {
                treeNode.addChild(zhi, 1);
            } else {
                treeNode.addChild(zhi, -1);
            }
        }

        for (var i = 0; i < 3; i++) {
            var yun = new Yun();
            parall.addChild(yun, 2, cc.p(0, 0.2), cc.p(0, h / 7 * (i + 1)));
        }

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                parall.stopAllActions();
                var touch = touches[0];
                this.time = Date.now();
                this.startPos = touch.getLocation();
            },
            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                parall.y += touch.getDelta().y;
                if (parall.y > 0) {
                    parall.y = 0;
                }

                if (parall.y < -h + size.height) {
                    parall.y = -h + size.height;
                }
            },
            onTouchesEnded: function (touches, event) {
                var dt = Date.now() - this.time;
                dt = limit(dt / 1000, 0.5, 1000000);

                var touch = touches[0];
                var len = cc.pDistance(this.startPos, touch.getLocation());
                var speed = len / dt;
                if (speed > 200) {
                    var animPos;
                    if (this.startPos.y > touch.getLocationY()) {//向下移动
                        animPos = cc.p(parall.x, limit(parall.y - speed, -h + size.height, 0));
                    } else {
                        animPos = cc.p(parall.x, limit(parall.y + speed, -h + size.height, 0));
                    }
                    parall.runAction(cc.moveTo(0.65, animPos));
                }
            }
        }, this);

    }
});

var TreeZhi = cc.Node.extend({
    level: 0,
    ctor: function (index) {
        this._super();

        this.level = index;
        var obj = ccs.load(res.branch_json);
        var node = obj.node;
        var isFlap = index % 2 == 0 ? 1 : -1;
        node.scaleX = isFlap;
        this.addChild(node);

        var lvTF = ccui.helper.seekWidgetByName(node, "lvTF");
        lvTF.ignoreContentAdaptWithSize(true);
        lvTF.setString(index + 1);

        if (isFlap) {
            lvTF.scaleX = isFlap;
        }

        //event

        var cir = ccui.helper.seekWidgetByName(node, "tree_yuan");
        cir.addClickEventListener(function () {
            trace("index: ", index);
            Backpack.show(cc.director.getRunningScene());
        });
    }
});

var Yun = cc.Node.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;

        var sp = new cc.Sprite("#chapter/yun.png");
        this.addChild(sp, 2);
        sp.scale = Math.random() * 0.5 + 0.4;
        var move = cc.moveBy(randomInt(5, 30), size.width + sp.width, 0);
        sp.runAction(cc.sequence(
            move, move.reverse()
        ).repeatForever());
    }
});