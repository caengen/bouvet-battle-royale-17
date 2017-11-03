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
    var rnd = Math.floor(Math.random() * 5);
    action(body);
    mapValues(body);
    return commands[rnd];
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

function action(body) {
    console.log(body);
}

module.exports = {
    command: function(req) {
        return {
            command: doSomethingRandom(req)
        };
    }
};
