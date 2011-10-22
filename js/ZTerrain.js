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
		this.color = "#039102";
	},
	
	roadVDash: function(){
		this.char = "|";
		this.color = "#FFFD02";
	},
	
	roadPlain: function(){
		this.char = ".";
		this.color = "#333333";
	},
	
	roadHDash: function(){
		this.char = "-";
		this.color = "#FFFD02";
	},
	
	sidewalk: function(){
		this.char = "#";
		this.color = "#555555";
	},
}
