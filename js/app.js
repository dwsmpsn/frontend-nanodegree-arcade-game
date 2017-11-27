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

    console.log(player.x + player.width);
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
    //checkCollisions();
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

var checkCollisions = function() {
    /*if (player.x > enemy.x &&
        player.x < enemy.x+enemy.width &&
        player.y > enemy.y &&
        player.y < enemy.y+enemy.height) {
        player.x = 202;
        player.y = 390;
    }*/
    if (player.x < enemy.x + enemy.width  && player.x + player.width  > enemy.x &&
        player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
        // The objects are touching
        player.x = 202;
        player.y = 390;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//creating array variables of enemy track y-values
var enemyTracks = [60, 143, 226];

for (i = 0; i < 4; i++) {
    var rand = enemyTracks[Math.floor(Math.random() * enemyTracks.length)];
    var enemy = new Enemy(-202, rand, Math.floor(Math.random() * 300));
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

