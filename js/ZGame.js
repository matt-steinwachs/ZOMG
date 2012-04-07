function ZGame(){
	this.view = new ZView();
	this.menu = new ZMenu();
}

ZGame.prototype = {
	
}

var game = {};

var load = function(){
	game = new ZGame();
};


window.onload = load;

