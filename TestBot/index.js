const astar = require('a-star-search');

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

function doSomethingRandom(body){
    var commands = [
        "rotate-right",
        "rotate-left",
        "advance",
        "retreat",
        "shoot"
    ];
    if (shouldShoot(body)){
        return "shoot";
    }
    action(body);
    mapValues(body);
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

function shouldShoot(body) {
    var shouldShoot = false;
    body.enemies.forEach(function (enemy) {
        if (enemy.x){ // i synsfelt
            shouldShoot = isEnemyInFront(body.you, enemy);            
        }
    });
    
    return shouldShoot;
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
module.exports = {
    command: function(req) {
        return {
            command: doSomethingRandom(req)
        };
    }
};
