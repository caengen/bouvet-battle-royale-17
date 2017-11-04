const astar = require('a-star-search');
// var commands = [
    //     "rotate-right",
    //     "rotate-left",
    //     "advance",
    //     "retreat",
    //     "shoot"
    // ];

var mapWidth;
var mapHeight;
var wallDamage;
var penguinDamage;
var weaponDamage;
var visibility;
var weaponRange;
var you;
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

function doSomething(body){
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
        
    action(body);
    mapValues(body);
    // TODO remove when path finding is in place.
    return "advance"
}

function gameLoop(body) {
    mapValues(body);
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
    bonusTiles = body.bonusTiles;
    suddenDeath = body.suddenDeath; 
    fire = body.fire;
}
/*
function willLoseDuel();
function shouldEscapeToPowerup();
function shouldHuntOpponent();
function calculateSurvivalScore();
*/
/*
enum Element = {
    PowerUp
}
*/

// TODO Find first enemy, return enemy
function findEnemyInRange(body) {
    var result = null;
    console.log(body);
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

function action(body) {
    console.log(body);
    
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

module.exports = {
    command: function(req) {
        return {
            command: doSomething(req)
        };
    }
};
