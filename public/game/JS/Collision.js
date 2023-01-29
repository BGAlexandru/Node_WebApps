const ObjectCollision = function (Obj_1, Obj_2, cvs) {
    let [y, x] = [Math.round(Obj_1.y), Math.round(Obj_1.x)];
    //check Y collision
    [Obj_1.speedY, Obj_1.y] = ((Obj_1.y < y && CheckCollisionY(Obj_1, Obj_2, cvs, x, y - 1)) || (Obj_1.y > y && CheckCollisionY(Obj_1, Obj_2, cvs, x, y + 1)))
        ? [0, y] : [Obj_1.speedY, Obj_1.y];
    //check X collision
    [Obj_1.speedX, Obj_1.x] = ((Obj_1.x < x && CheckCollisionX(Obj_1, Obj_2, cvs, x - 1, y)) || (Obj_1.x > x && CheckCollisionX(Obj_1, Obj_2, cvs, x + 1, y)))
        ? [0, x] : [Obj_1.speedX, Obj_1.x];
}
const CheckCollisionY = function (Obj_1, Obj_2, cvs, x, y) {
    return (CheckObject(Obj_1, Obj_2, cvs, x, y) || (Obj_1.x > x && CheckObject(Obj_1, Obj_2, cvs, x + 1, y)) || (Obj_1.x < x && CheckObject(Obj_1, Obj_2, cvs, x - 1, y)))
        ? true : false;
}
const CheckCollisionX = function (Obj_1, Obj_2, cvs, x, y) {
    return (CheckObject(Obj_1, Obj_2, cvs, x, y) || (Obj_1.y > y && CheckObject(Obj_1, Obj_2, cvs, x, y + 1)) || (Obj_1.y < y && CheckObject(Obj_1, Obj_2, cvs, x, y - 1)))
        ? true : false;
}
const CheckObject = function (Obj_1, Obj_2, cvs, Obj_2_x, Obj_2_y) {
    let x = false;
    try {
        switch (Obj_2[cvs.lvl][Obj_2_y][Obj_2_x]) {
            case 1: {//check solid
                x = true;
                break;
            }
            case 3: {//check check for death
                [Obj_1.life, cvs.death_refresh, cvs.score_refresh] = [Obj_1.life - 1, true, true];
                break;
            }
            case 4: {//check check for blinkies
                [Obj_1.point, Obj_2[cvs.lvl][Obj_2_y][Obj_2_x], cvs.score_refresh] = [Obj_1.point + 1, 0, true];
                break;
            }
            case 6: {//check check for portal
                cvs.lvl = (cvs.lvl + 1 < cvs.lvl_max) ? (cvs.lvl + 1) : cvs.lvl;
                cvs.death_refresh = true;
                break;
            }
        }
    } catch (err) { console.log("Element(", cvs.lvl, Obj_2_y, Obj_2_x, "):", err) }
    return x;
}