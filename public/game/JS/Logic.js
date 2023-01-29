const Physics = function (PObj, SObj, World, cvs) {
    PObj.x += PObj.speedX;
    PObj.y += PObj.speedY;
    ObjectCollision(PObj, SObj, cvs);
    let y = Math.round(PObj.y);
    let x = Math.round(PObj.x);
    try {//check if not grounded and max g acceleration
        PObj.speedY = (!(PObj.y == y && CheckCollisionY(PObj, SObj, cvs, x, y + 1)) && PObj.speedY <= World[cvs.lvl].acceleration) ? (PObj.speedY + World[cvs.lvl].gravity) : PObj.speedY;
    } catch (err) { }
}
const RefreshCoordinates = function (cvs, PObj, World) {
    //reset player stats
    PObj.x = World[cvs.lvl].x_init;
    PObj.y = World[cvs.lvl].y_init;
    PObj.speedX = PObj.speedY = 0;
    cvs.death_refresh = false;
}
const RefreshScore = function (cvs, PObj, World) {
    cvs.Score.ctx.clearRect(0, 0, cvs.Score.width, cvs.Score.height);
    //draw remaining lifes
    DrawObject(0, 0, World[cvs.lvl].player, cvs.imbg, cvs.Score.ctx, cvs.sq, cvs.sq);
    cvs.Score.ctx.fillText(" x " + PObj.life, cvs.sq, cvs.sq);
    //draw points
    DrawObject(0, cvs.sq, 4, cvs.imbg, cvs.Score.ctx, cvs.sq, cvs.sq);
    cvs.Score.ctx.fillText(" x " + PObj.point, cvs.sq, 2 * cvs.sq);
    cvs.score_refresh = false;
}
const Stop = async function (cvs, PObj, World, SObj) {
    cvs.Scene.ctx.clearRect(0, 0, cvs.Scene.width, cvs.Scene.height);
    cvs.Score.ctx.clearRect(0, 0, cvs.Score.width, cvs.Score.height);
    $(GameArea).hide();
    StopVar = false;
    /*
    //save score
    const score = await fetch_post('/server/game/score', { score: PObj.point, name: cvs.name });
    console.log(score);
    */
    /*
    const P = []
    for (i = 0; i < World.length; i++) { P[i] = [World[i], SObj[i]] }
    await fetch_post('/server/game/create', { name: cvs.name, content: P })
    */
    const table = function () {
        $("#Game").after(
            $("<div id=\'GameTable\'><table><tr><th>Name</th><th>Game</th><th>Score</th></tr></table></div>")
        );
        $("#GameTable").append(
            $("<tr>"
                + "<td>Alfreds Futterkiste</td>"
                + "<td>Maria Anders</td>"
                + "<td>Germany</td>"
                + "</tr>"
            )
        );
    }
    table();
}