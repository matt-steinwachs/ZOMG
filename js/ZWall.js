function ZWall(type){
	this.type = type;
	
	this.color;		//Color drawn on map
	this.style;		//Border stroke style
	this.pass;		//Can actor pass through
	this.vis;			//Can actor see through
	
	this[type]();
}

ZWall.prototype = {
	//wall type initializers
	none: function(){
		this.color = "rgb(0, 0, 0)";
		this.style = "solid";
		this.pass = true;
		this.vis = true;
	},
	
	shortWoodFence: function(){
		this.color = "rgb(139, 105, 20)";
		this.style = "dashed";
		this.pass = true;
		this.vis = true;
	},
	
	tallWoodFence: function(){
		this.color = "rgb(139, 105, 20)";
		this.style = "solid";
		this.pass = false;
		this.vis = false;
	},
	
	chainLinkFence: function(){
		this.color = "rgb(191, 191, 191)";
		this.style = "dashed";
		this.pass = false;
		this.vis = true;
	},
	
	doorOpen: function(){
		this.color = "rgb(207, 186, 136)";
		this.style = "dotted";
		this.pass = true;
		this.vis = false;
	},
	
	doorClosed: function(){
		this.color = "rgb(207, 186, 136)";
		this.style = "solid";
		this.pass = false;
		this.vis = false;
	},
	
	woodExterior: function(){
		this.color = "rgb(240, 240, 240)";
		this.style = "solid";
		this.pass = false;
		this.vis = false;
	},
	
	woodInterior: function(){
		
	},
	
	metalExterior: function(){
		
	},
	
	metalInterior: function(){
		
	},
	
	drywallInterior: function(){
		this.color = "rgb(255, 255, 255)";
		this.style = "solid";
		this.pass = false;
		this.vis = false;
	},
	
	//type specific modifiers
	openDoor: function(){
		this.type = "doorOpen";
		this.doorOpen();
		
	},
	
	closeDoor: function(){
		this.type = "doorClosed";
		this.doorClosed();
		
	},
	

}
