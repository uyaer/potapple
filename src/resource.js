var res = {
    data_json: "res/data.json",

    bignum_fnt: "res/font/bignum.fnt",
    bignum_png: "res/font/bignum.png",
    zhfont_fnt: "res/font/zhfont.fnt",
    zhfont1_png: "res/font/zhfont.png",

    chapter_plist: "res/chapter.plist",
    chapter_png: "res/chapter.png",
    panel_plist: "res/panel.plist",
    panel_png: "res/panel.png",

    branch_json: "res/branch.json",
    backpackitem_json: "res/backpackitem.json",
    backpack_json: "res/backpack.json",

    bullet: "res/bullet.png",

    floor: "res/map/floor.png",
    map1: "res/map/map1.png",
    apple1: "res/apple1.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
