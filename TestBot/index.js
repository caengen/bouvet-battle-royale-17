const astar = require('a-star-search');
const _ = require('lodash');

var mapWidth;
var mapHeight;
var wallDamage;
var penguinDamage;
var weaponDamage;
var visibility;
var weaponRange;
var me;
var nextTile;
/*
 { direction: 'top',
   x: 1,
   y: 4,
   strength: 300,
   ammo: 1000,
   status: 'static',
   weaponDamage: 60,
   weaponRange: 5 },
   */
var enemies; //array of object
var walls; // array of objects  
/*
type Wall {
    x: number;
    y: number;
    strength: number;
}
*/
var bonusTiles;
/*
type BonusTile {
    x: number;
    y: number;
    type: string;
    value: number;
}
*/
var suddenDeath; // antall turer igjen
var fire; // tiles med ild i guess

function gameLoop(body) {
    mapValues(body);
    you = body.you;
    
    // find enemy in range
    var enemy = findEnemyInRange(body);
    if (enemy) {
        // am I healthy
        if (amIStronger(you, enemy)) {
            // is enemy in front => shooot
            if (isEnemyInFront(you, enemy)) {
                return 'shoot';
            }
            // turn/move to enemy 
            if (isEnemyInOtherDirection(you, enemy) && !isEnemyFacingMe(you, enemy)) {
                // return rotate left/right
                return findRotationTowardEnemy(you, enemy);
            }
        }
    }

    const nextTile = findPowerup(you, bonusTiles, walls);
    const rotateAction = getRotation(nextTile);
    if (!rotateAction) {
        if (isWallInFront(you)) {
            return 'shoot';
        }
        return 'advance';
    } else {
        return rotateAction;
    }
}

const directions = {
    'left': 0,
    'top': 1,
    'right': 2,
    'bottom': 3
};

function tests() {

    console.log("test('left', 'bottom') answer:" + test('left', 'bottom'));
    console.log("test('bottom', 'left') answer:" + test('bottom', 'left'));
    console.log("test('left', 'top') answer:" + test('left', 'top'));
    console.log("test('right', 'top') answer:" + test('right', 'top'));

    function test(a, b) {
        const meTest = a;
        const directionTest = b;

        let hack = directions[meTest] + 1;
        if (hack === 4) {
            hack = 0;
        }
        if (directions[directionTest] === hack) {
            return 'rotate-right';
        } else {
            return 'rotate-left';
        }
    }
}


function findEnemyInRange(body) {
    var result = null;
    console.log(body);
    if (!body.enemies){
        return;
    }

    body.enemies.forEach(function (enemy) {
        if (enemy.x && !result){ // i synsfelt
            result = enemy;
        }
    });
    
    return result;
}

function amIStronger(you, enemy) {
    // TODO Maybe? you.strength >= enemy.strength
    return you.strength > enemy.strength;
}

function isEnemyInFront(you, enemy) {
    if (you.direction === 'left'){
        return enemy.x < you.x && enemy.y === you.y; 
    }
    
    if (you.direction === 'right'){
        return enemy.x > you.x && enemy.y === you.y; 
    }

    if (you.direction === 'top'){
        return enemy.y < you.y && enemy.x === you.x; 
    }

    if (you.direction === 'bottom'){
        return enemy.y > you.y && enemy.x === you.x; 
    }

    return false;
}

function isEnemyFacingMe(you, enemy){
    return isEnemyInFront(enemy, you);
}

function isEnemyInOtherDirection(you, enemy) {
    if (you.direction === 'left' || you.direction === 'right') {
        return enemy.x === you.x;
    }
    if (you.direction === 'top' || you.direction === 'bottom') {
        return enemy.y === you.y;
    }
    // if enemy is behind =>
        // turned towards you => run away
    // if the enemy is to the left => turn left
    // if enemy is to the rigt =>turn right
}

function findRotationTowardEnemy(you, enemy) {
    if (you.direction === 'left') {
        if (enemy.y < you.y) {
            // turn right
            return 'rotate-right';
        } else {
            return 'rotate-left';
        }
    }
    if (you.direction === 'right') {
        if (enemy.y < you.y) {
            // turn right
            return 'rotate-left';
        } else {
            return 'rotate-right';
        }
    }
    if (you.direction === 'top') {
        if (enemy.x < you.x) {
            // turn right
            return 'rotate-left';
        } else {
            return 'rotate-right';
        }
    }
    if (you.direction === 'bottom') {
        if (enemy.y < you.y) {
            // turn right
            return 'rotate-left';
        } else {
            return 'rotate-right';
        }
    }
}


function isWallInFront(me) {
    if (me.direction === 'left') {
        return isWall(me.x - 1, me.y);
    }

    if (me.direction === 'right') {
        return isWall(me.x + 1, me.y);
    }

    if (me.direction === 'top') {
        return isWall(me.x, me.y - 1);
    }

    if (me.direction === 'bottom') {
        return isWall(me.x, me.y + 1);
    }
}

function isWall(x, y) {
    var result = false;
    walls.forEach(function (wall) {
        if (wall.x === x && wall.y === y) {
            result = true;
        }
    });

    return result;
}

//good enough
function getRotation(destTile) {
    let direction;
    if (me.x > destTile.xAxis) {
        direction = 'left';
    } else if (me.x < destTile.xAxis) {
        direction = 'right';
    } else if (me.y > destTile.yAxis) {
        direction = 'top';
    } else if (me.y < destTile.yAxis) {
        direction = 'bottom';
    }

    if (direction == me.direction && !isWall(nextTile.xAxis, nextTile.yAxis)) return;

    let hack = directions[me.direction] + 1;
    if (hack === 4) {
        hack = 0;
    }
    if (directions[direction] === hack) {
        return 'rotate-right';
    } else {
        return 'rotate-left';
    }
}

//good enough
function findPowerup(me, bonusTiles, walls) {
    let dest;
    const start = {
        xAxis: me.x,
        yAxis: me.y
    };

    const wallMap = walls.map(function (wall) {
        return {
            xAxis: wall.x,
            yAxis: wall.y
        }
    });
    const environment = {
        blockedLocations: wallMap,
        worldSize: {
            xAxis: mapWidth,
            yAxis: mapHeight
        }
    }
    //const path = astar.run(start, dest, environment);
    let paths;
    if (bonusTiles && bonusTiles.length) {
        paths = bonusTiles.map(function(tile) {
            const dest = {
                xAxis: tile.x,
                yAxis: tile.y
            };
            return astar.run(start, dest, environment)
        });
    } else {
        const dest = {
            xAxis: mapWidth,
            yAxis: mapHeight
        };
        paths = [ astar.run(start, dest, environment)]
    }
    let shortest = _.min(paths, function(i){ return i.length; })    
    nextTile = shortest[1];
    return shortest[1];
}

function tileIsEqual(tileA, tileB) {
    if (tileA.xAxis === tileB.xAxis && tileA.yAxis === tileB.yAxis) {
        return true;
    }
    return false;
}

//Fix: 💩-func fix pls 👇🏽
function findClosestBonus(me, bonusTiles) {
    //let prevNum = Math.abs(me.x - bonusTiles[0].x) + Math.abs(me.y - bonusTiles[0].y);
    let prevNum = Math.sqrt(me.x*bonusTiles[0].x + me.y*bonusTiles[0].y);
    let indexClosest;
    let currNum;

    for (i = 0; i < bonusTiles.length; i++) {
        currNum = Math.sqrt(me.x*bonusTiles[i].x + me.y*bonusTiles[i].y);
        if (currNum < prevNum) {
            indexClosest = i;
        }
        prevNum = currNum;
    }

    return bonusTiles[indexClosest];
}

function mapValues(body) {
    mapWidth = body.mapWidth;
    mapHeight = body.mapHeight;
    wallDamage = body.wallDamage;
    penguinDamage = body.penguinDamage;
    weaponDamage = body.weaponDamage;
    visibility = body.visibility;
    weaponRange = body.weaponRange;
    me = body.you;
    enemies = body.enemies;
    walls = body.walls;
    bonusTiles = _.remove(body.bonusTiles, tile => tile.type !== 'jquery');
    suddenDeath = body.suddenDeath;
    fire = body.fire;
}
/*
function willLoseDuel();
function shouldEscapeToPowerup();
function shouldHuntOpponent();
function calculateSurvivalScore();
function dogfight();
function escape();
*/


function action(body) {
    //console.log(body);
}
module.exports = function (context, req) {
        if(req.query.path === "/command"){
            context.res = { body: { command: gameLoop(req.body) }};
        }
        if(req.query.path === "/info"){
            context.res = { body: { name: 'the fluff', team: 'fluffy-penguins'}};
        }
        // context.log('JavaScript HTTP trigger function processed a request.', req.body);
        // context.res = {
        //     body: getBody(req)
        // };
        context.done();
    };
    