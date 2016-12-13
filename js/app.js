// Draw the images on the screen
Object.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reset Player to start position
Object.prototype.reset = function() {
	player.x = 200;
	player.y = 400;
}

// Enemies our player must avoid it
var Enemy = function(x, y) {
    //image for the enemies
    this.sprite = 'images/enemy-bug.png';
	
	//coordinates for the enemies and they speed
	this.x = x;
	this.y = y;
	this.speed = Math.floor((Math.random() * 175) + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	//Reset the position of the enemies whent they cross the screen, if not cross keep moving
	if(this.x <= 550){
		this.x += this.speed * dt;
	} else {
		this.x = -2;
	}
	
	//if the player meet the enemies reset the player
	if(player.x >= this.x - 50 && player.x <= this.x + 50){
		if(player.y >= this.y - 50 && player.y <= this.y + 50){
			this.reset();
		}
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
	Player
*/

//Class player and init stats
var Player = function() {
	this.sprite = "images/char-boy.png";
	this.x = 200;
	this.y = 400;
}

//Update Player
Player.prototype.update = function() {
	//if player isn't in edge of map, do a movement according to the key pressed
	if(this.ctrlKey === "left" && this.x > 0){
		this.x -= 95;
	} else if(this.ctrlKey === "right" && this.x != 400){
		this.x += 95;
	} else if(this.ctrlKey === "down" && this.y != 400){
		this.y += 95;
	} else if(this.ctrlKey === "up"){
		this.y -= 95;
	}
	this.ctrlKey = null;
	
	//if on water, reset
	if(this.y < 20){
		this.reset();
	}
}

//allow the player press some Key to move
Player.prototype.moveInput = function(e){
	this.ctrlKey = e;
}

//put the player and enemies in your position on the screen
var allEnemies = [];
(function setEnemies(){
	allEnemies.push(new Enemy(-2, 58));
	allEnemies.push(new Enemy(-2, 98));
	allEnemies.push(new Enemy(-2, 145));
	allEnemies.push(new Enemy(-2, 226));
}());

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.moveInput(allowedKeys[e.keyCode]);
});
