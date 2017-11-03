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
    return commands[rnd];
}

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
