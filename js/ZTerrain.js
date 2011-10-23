function ZTerrain(type){
	this.type = type;
	
	this.color;
	this.char;
	
	this.nWall = new ZWall("none");
	this.sWall = new ZWall("none");
	this.eWall = new ZWall("none");
	this.wWall = new ZWall("none");
	
	this[type]();
}

ZTerrain.prototype = {
	//Terrain type initializers
	grass: function(){
		this.char = "\"";
		this.color = "rgb(3, 145, 2)";
	},
	
	roadVDash: function(){
		this.char = "|";
		this.color = "rgb(255, 253, 2)";
	},
	
	roadPlain: function(){
		this.char = ".";
		this.color = "rgb(51, 51, 51)";
	},
	
	roadHDash: function(){
		this.char = "-";
		this.color = "rgb(255, 253, 2)";
	},
	
	sidewalk: function(){
		this.char = "#";
		this.color = "rgb(85, 85, 85)";
	},
}
