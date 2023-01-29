const New_Game = async function () {
    $.getJSON("/Game/blank.json", function (JSON) {
        AreaStart(JSON, "blank")
    });
}
const GameArea = $("#Game")[0];
let StopVar = false;
const Game ={};
const AreaStart = function (Game_JSON, Game_Name) {
    $(GameArea).show();
    const [World, SObj, PObj, cvs] = InitiateJSON(Game_JSON, Game_Name);
    EventListeners(cvs, SObj, PObj, World);
    DrawMap(cvs, SObj, World);
    const AreaUpdate = function () {
        //check if player bellow game floor
        [PObj.life, cvs.death_refresh, cvs.score_refresh] = (PObj.y > SObj[cvs.lvl].length) ?
            [PObj.life - 1, true, true] : [PObj.life, cvs.death_refresh, cvs.score_refresh];
        //redraw map
        if (cvs.death_refresh) { RefreshCoordinates(cvs, PObj, World); }
        if (cvs.score_refresh) { RefreshScore(cvs, PObj, World); }
        Physics(PObj, SObj, World, cvs);
        DrawViewPort(cvs, PObj, SObj, World);
        if (StopVar || !PObj.life) {
            Stop(cvs, PObj, World, SObj);
        } else {
            window.requestAnimationFrame(AreaUpdate);
        }
    }
    window.requestAnimationFrame(AreaUpdate);
}
//ARROWS/WASD
const EventListeners = function (cvs, SObj, PObj, World) {
    const keydown = function (e) {
        let y = Math.round(PObj.y);
        let x = Math.round(PObj.x);
        try {
            //(^ or W) & check if grounded
            PObj.speedY = ((e.keyCode == 38 || e.keyCode == 87) && (PObj.y == y && CheckCollisionY(PObj, SObj, cvs, x, y + 1))) ? (-World[cvs.lvl].acceleration) : PObj.speedY;
            //(<- or A) & check if not walled left
            PObj.speedX = ((e.keyCode == 37 || e.keyCode == 65) && (PObj.x > x || !CheckCollisionX(PObj, SObj, cvs, x - 1, y))) ? (-World[cvs.lvl].acceleration) : PObj.speedX;
            //(-> or D) & check if not walled right
            PObj.speedX = ((e.keyCode == 39 || e.keyCode == 68) && (PObj.x < x || !CheckCollisionX(PObj, SObj, cvs, x + 1, y))) ? World[cvs.lvl].acceleration : PObj.speedX;
        } catch (err) { }
    }
    const keyup = function (e) {
        //<-/-> or  A/D
        PObj.speedX = (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 68) ? 0 : PObj.speedX;
        //^ or W
        PObj.speedY = (e.keyCode == 38 || e.keyCode == 87) ? 0 : PObj.speedY;
    }
    window.onkeydown = keydown;
    window.onkeyup = keyup;
}

New_Game();