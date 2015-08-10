/**
 * Created by hc on 15/4/22.
 */

var BackpackItem = cc.Node.extend({
   ctor:function(){
       this._super();

       var node = ccs.load(res.backpackitem_json).node;

       this.addChild(node);

       var select = ccui.helper.seekWidgetByName(node,"select");
       select.addClickEventListener(function () {
           trace("select click");
           select.loadTexture("panel/select.png",ccui.Widget.PLIST_TEXTURE);
       });

       var iconbg = ccui.helper.seekWidgetByName(node,"iconbg");
       iconbg.addClickEventListener(function(target){
           trace("===");
       });

       var nameTF = ccui.helper.seekWidgetByName(node,"nameTF");
       trace(nameTF);
   }
});