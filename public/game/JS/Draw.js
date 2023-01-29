const DrawMap = function (cvs, SObj, World) {
    //draw map
    const DrSt = document.createElement('canvas');
    DrSt.ctx = DrSt.getContext('2d');
    DrSt.width = cvs.width * cvs.sq;
    DrSt.height = cvs.height * cvs.sq;
    for (let lvl = 0; lvl < cvs.lvl_max; lvl++) {
        DrSt.ctx.clearRect(0, 0, DrSt.width, DrSt.height);
        //draw background
        DrawObject(0, 0, World[lvl].canvas, cvs.imbg, DrSt.ctx, DrSt.width, DrSt.height);
        //draw static objects
        for (let i = 0; i < SObj[lvl].length; i++) {
            for (let j = 0; j < SObj[lvl][0].length; j++) {
                if (SObj[lvl][i][j] != 0 && SObj[lvl][i][j] != 4) {
                    DrawObject(j * cvs.sq, i * cvs.sq, SObj[lvl][i][j], cvs.imbg, DrSt.ctx, cvs.sq, cvs.sq);
                }
            }
        }
        cvs.imdt[lvl] = new Image();
        cvs.imdt[lvl].src = DrSt.toDataURL("image/png");
    }
    DrSt.remove();
}
const DrawViewPort = function (cvs, PObj, SObj, World) {
    //clear canvas
    cvs.Scene.ctx.clearRect(0, 0, cvs.Scene.width, cvs.Scene.height);
    //check viewport x axis limits
    const lower_x = cvs.Scene.width / (cvs.sq * 2);
    const upper_x = cvs.width - lower_x;
    //viewport x if middle elseif upper
    const draw_x = (PObj.x >= lower_x && PObj.x <= upper_x) ? PObj.x - lower_x :
        (PObj.x > upper_x) ? upper_x - lower_x : 0;
    //check viewport y axis limits
    const lower_y = cvs.Scene.height / (cvs.sq * 2);
    const upper_y = cvs.height - lower_y;
    //viewport y if middle elseif upper
    const draw_y = (PObj.y >= lower_y && PObj.y <= upper_y) ? PObj.y - lower_y :
        (PObj.y > upper_y) ? upper_y - lower_y : 0;
    cvs.Scene.ctx.drawImage(cvs.imdt[cvs.lvl], draw_x * cvs.sq, draw_y * cvs.sq, cvs.Scene.width, cvs.Scene.height, 0, 0, cvs.Scene.width, cvs.Scene.height);
    //draw blinking objects
    const [i_max, j_max] = [Math.floor(draw_y + 2 * lower_y), Math.floor(draw_x + 2 * lower_x)]
    for (let i = Math.floor(draw_y); i < i_max; i++) {
        for (let j = Math.floor(draw_x); j < j_max; j++) {
            try {
                if (SObj[cvs.lvl][i][j] == 4) {
                    DrawObject((-draw_x + j) * cvs.sq, (-draw_y + i) * cvs.sq, SObj[cvs.lvl][i][j], cvs.imbg, cvs.Scene.ctx, cvs.sq, cvs.sq);
                }
            } catch (e) { /*Obstacle not defined!*/ }
        }
    }
    DrawObject((-draw_x + PObj.x) * cvs.sq, (-draw_y + PObj.y) * cvs.sq, World[cvs.lvl].player, cvs.imbg, cvs.Scene.ctx, cvs.sq, cvs.sq);
}
const DrawObject = function (x, y, index, imbg, ctx, w, h) {
    switch (index) {
        case 1: { return ctx.drawImage(imbg, 8, 0, 7, 7, x, y, w, h); }
        case 2: { return ctx.drawImage(imbg, 0, 0, 7, 7, x, y, w, h); }
        case 3: { return ctx.drawImage(imbg, 16, 0, 7, 7, x, y, w, h); }
        case 4: { return ctx.drawImage(imbg, 24, 0, 7, 7, x, y, w, h); }
        case 5: { return ctx.drawImage(imbg, 32, 0, 7, 7, x, y, w, h); }
        case 6: { return ctx.drawImage(imbg, 40, 0, 7, 7, x, y, w, h); }
        case 7: { return ctx.drawImage(imbg, 48, 0, 7, 7, x, y, w, h); }
    }
}