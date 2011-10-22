function ZWall(type){
	this.type = type;
	
	this.color;		//Color drawn on map
	this.line;		//Border stroke style
	this.pass;		//Can actor pass through
	this.vis;			//Can actor see through
	
	this[type]();
}

ZWall.prototype = {
	none: function(){
		this.color = "black";
		this.line = "solid";
		this.pass = true;
		this.vis = true;
	},
	
	shortWoodFence: function(){
		this.color = "brown";
		this.line = "dashed";
		this.pass = true;
		this.vis = true;
	},
	
	tallWoodFence: function(){
		this.color = "brown";
		this.line = "solid";
		this.pass = false;
		this.vis = false;
	},
	
	chainLinkFence: function(){
		this.color = "grey";
		this.line = "dashed";
	},
	
	doorOpen: function(){
		
	},
	
	doorClosed: function(){
		
	},
	
	

}
