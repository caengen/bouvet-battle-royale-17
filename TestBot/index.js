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
    const nextTile = findPowerup(me, bonusTiles, walls);
    const rotateAction = getRotation(nextTile);
    tests();
    if (!rotateAction) {
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

//good enough
function getRotation(destTile) {    
    let direction;
    if (me.x >  destTile.xAxis){
        direction = 'left';
    }
    else if (me.x < destTile.xAxis){
        direction = 'right';
    }
    else if (me.y > destTile.yAxis){
        direction = 'top';
    }
    else if (me.y < destTile.yAxis){
        direction = 'bottom';
    }

    if (direction == me.direction) return null;

    // left 0   bottom 3
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
    const start = {
        xAxis: me.x,
        yAxis: me.y
    };
    const closestBonusTile = findClosestBonus(me, bonusTiles);
    const dest = {
        xAxis: closestBonusTile.x,
        yAxis: closestBonusTile.y
    }
    const wallMap = walls.map(function(wall) {
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
    const path = astar.run(start, dest, environment);
    
    return path[1];
}

//good enough
function findClosestBonus(me, bonusTiles) {
    let prevNum = Math.abs(me.x - bonusTiles[0].x) + Math.abs(me.y - bonusTiles[0].y);
    let indexClosest;
    let currNum;
    for (i = 0; i < bonusTiles.length; i++) {
        currNum = Math.abs(me.x - bonusTiles[i].x) + Math.abs(me.y - bonusTiles[i].y);
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
/*
enum Element = {
    PowerUp
}
*/

function action(body) {
    //console.log(body);
}

module.exports = {
    command: function(body) {
        return {
            command: gameLoop(body)
        };
    }
};
