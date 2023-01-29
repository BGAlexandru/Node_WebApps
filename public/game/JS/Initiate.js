const InitiateJSON = function(Game_JSON, Game_Name){
    //setup components
    const World = [];
    const SObj = [];
    if (typeof Game_JSON === 'string') { Game_JSON = JSON.parse("[" + Game_JSON + "]"); }
    for (let i = 0; i < Game_JSON.length; i++) {
        World[i] = Game_JSON[i][0];
        SObj[i] = Game_JSON[i][1];
    }
    const PObj = {};
    PObj.life = World[0].life_init;
    PObj.x = PObj.y = PObj.speedX = PObj.speedY = PObj.point = 0;
    //setup game area
    const cvs = {};
    cvs.death_refresh = cvs.score_refresh = true;
    cvs.name = Game_Name;
    cvs.lvl = 0;
    cvs.lvl_max = SObj.length;
    cvs.width = SObj[cvs.lvl][0].length;
    cvs.height = SObj[cvs.lvl].length;
    cvs.ratio = 3;
    cvs.sq = GameArea.offsetHeight / (cvs.height / cvs.ratio);
    cvs.Scene = $("#GScene")[0];
    cvs.Scene.ctx = cvs.Scene.getContext("2d");
    cvs.Score = $("#GScore")[0];
    cvs.Score.ctx = cvs.Score.getContext("2d");
    cvs.Scene.width = cvs.Score.width = GameArea.offsetWidth;
    cvs.Scene.height = cvs.Score.height = GameArea.offsetHeight;
    cvs.Score.ctx.font = cvs.sq + "px Arial";
    cvs.Score.ctx.fillStyle = "black";
    //draw game area
    cvs.imbg = $("#image")[0];
    cvs.imdt = [];
    return [World, SObj, PObj, cvs];
}