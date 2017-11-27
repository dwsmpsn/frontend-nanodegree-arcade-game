// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 70;
    this.height = 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = -202;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    //taking basic attributes from enemy class
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 83;
    this.height = 83;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    this.speed += this.speed * dt;
    //checking if player has reached the waterline
    if (this.y < 50) {
        setTimeout(youWin(),2000);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        if (player.x > 0) {
            player.x -= 101;
        }
    }
    if (key == 'right') {
        if (player.x < 404) {
            player.x += 101;
        }
    }
    if (key == 'up') {
        if (player.y > 0) {
            player.y -= 83;
        }
    }
    if (key == 'down') {
        if (player.y < 308) {
            player.y += 83;
        }
    }
};

var score = 0;

var checkCollisions = function() {
    for (i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + allEnemies[i].width  && 
            player.x + player.width  > allEnemies[i].x &&
            player.y < allEnemies[i].y + allEnemies[i].height && 
            player.y + player.height > allEnemies[i].y) 
        {
            score = 0;
            document.getElementById('score').innerHTML = "<h1>Score reset...</h1><br><h3>Wins: " + score + "</h3>";
            player.x = 202;
            player.y = 390;
        }
    }
};

var youWin = function() {
    score += 1;
    document.getElementById('score').innerHTML = "<h1>You win!</h1><br><h3>Wins: " + score + "</h3>";

    player.x = 202;
    player.y = 390;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//creating array variables of enemy track y-values
var enemyTracks = [60, 143, 226];

//generating enemies to push to allEnemies
for (i = 0; i < 4; i++) {
    //randomly choose a stone track to generate on
    var rand = enemyTracks[Math.floor(Math.random() * enemyTracks.length)];
    //create enemy, spawn off-canvas, and set speed with a minimum
    var enemy = new Enemy(-202, rand, Math.floor(Math.random() * 300 + 50));
    allEnemies.push(enemy);
}

var player = new Player(202, 390, 200);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

