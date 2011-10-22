function ZGame(){
	//console.log("new ZGame");
	this.view = new ZView();
}

ZGame.prototype = {
	
	
}

var game = {};

var load = function(){
	//console.log("load");
	game = new ZGame();
};


window.onload = load;

