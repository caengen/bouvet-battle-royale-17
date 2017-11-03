function doSomethingRandom(){
    var commands = [
        "rotate-right",
        "rotate-left",
        "advance",
        "retreat",
        "shoot"
    ];
    var rnd = Math.floor(Math.random() * 5);

    return commands[rnd];
}

function info(){
    return {
        name: "Mr. Randombird",
        team: "The best team"
    }
}

function action (body){
    return {
            command: doSomethingRandom()
            };
}

function getBody(req){
    switch(req.method){
        case 'GET':
            return info();
        case 'POST':
            return action(req);
    }
}

module.exports = {
    command: function(req) {
        return {
            command: doSomethingRandom()
        };
    }
};
