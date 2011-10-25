function ZMap(){
	this.w  = 400;
	this.h = 300;
	
	this.player = new ZPlayer(this);
	
	this.actorMap = [];
	this.objectMap = [];
	this.terrainMap = [];
	
	this.initMap();
	this.randomTown();
}



ZMap.prototype = {
	getAppearance: function(x,y){
		var obj = {};
		
		if (this.actorMap[y][x] != null){
			
		} else if (this.objectMap[y][x].length > 0){
			
		} else {
			obj.color = this.terrainMap[y][x].color;
			obj.char = this.terrainMap[y][x].char;
		}
		
		obj.nWall = this.terrainMap[y][x].nWall;
		obj.sWall = this.terrainMap[y][x].sWall;
		obj.eWall = this.terrainMap[y][x].eWall;
		obj.wWall = this.terrainMap[y][x].wWall;
		
		return obj;
	},
	
	initMap: function(){
		//Initialize Actor Map to null
		for (var i=0; i < this.h; i++){
			this.actorMap[i] = [];
			for (var j=0; j< this.w; j++){
				this.actorMap[i][j] = null;
			}
		}
		
		//Initialize Object Map to []
		for (var i=0; i < this.h; i++){
			this.objectMap[i] = [];
			for (var j=0; j< this.w; j++){
				this.objectMap[i][j] = [];
			}
		}
		
		//Initilize terrain to grass
		for (var i=0; i < this.h; i++){
			this.terrainMap[i] = [];
			for (var j=0; j< this.w; j++){
				this.terrainMap[i][j] = new ZTerrain("grass");
			}
		}
	},
	
	randomTown: function(){
		var wideRoad;
		var plots = []; 		//{upperLeftCornerX:int, upperLeftCornerY:int, width:int, height:int}
		var vertRoads = []; //{centerX:int, wideOrNot:bool}
		var horRoads = []; 	//{centerY:int, wideOrNot:bool}
		
		//Draw vertical roads at random intervals
		var randVRoad = rand(0,15);
			while (randVRoad < this.w){
			
			if (Math.random() > 0.5) wideRoad = true;
			else wideRoad = false;
			
			vertRoads.push({"x":randVRoad, "wide":wideRoad});
			
			for (var i = 0; i < this.h; i++){
				this.terrainMap[i][randVRoad] = new ZTerrain("roadVDash");
				
				if (wideRoad){
					if (randVRoad - 1 >= 0)
						this.terrainMap[i][randVRoad-1] = new ZTerrain("roadPlain");
					if (randVRoad + 1 < this.w)
						this.terrainMap[i][randVRoad+1] = new ZTerrain("roadPlain");
					if (randVRoad - 2 >= 0)
						this.terrainMap[i][randVRoad-2] = new ZTerrain("roadPlain");
					if (randVRoad + 2 < this.w)
						this.terrainMap[i][randVRoad+2] = new ZTerrain("roadPlain");
					if (randVRoad - 3 >= 0)
						this.terrainMap[i][randVRoad-3] = new ZTerrain("sidewalk");
					if (randVRoad + 3 < this.w)
						this.terrainMap[i][randVRoad+3] = new ZTerrain("sidewalk");
				} else {
					if (randVRoad - 1 >= 0)
						this.terrainMap[i][randVRoad-1] = new ZTerrain("roadPlain");
					if (randVRoad + 1 < this.w)
						this.terrainMap[i][randVRoad+1] = new ZTerrain("roadPlain");
					if (randVRoad - 2 >= 0)
						this.terrainMap[i][randVRoad-2] = new ZTerrain("sidewalk");
					if (randVRoad + 2 < this.w)
						this.terrainMap[i][randVRoad+2] = new ZTerrain("sidewalk");
				}
			}
			
			randVRoad += rand(40, 61);
		}
		
		//Draw horizontal roads at random intervals
		var randHRoad = rand(0,10);
		while (randHRoad < this.h){
			if (Math.random() > 0.5) wideRoad = true;
			else wideRoad = false;
			
			horRoads.push({"y":randHRoad, "wide":wideRoad});
			
			for (var i = 0; i < this.w; i++){
				if (this.terrainMap[randHRoad][i].type == "sidewalk" || 
						this.terrainMap[randHRoad][i].type == "roadPlain" ||
						this.terrainMap[randHRoad][i].type == "roadVDash")
					this.terrainMap[randHRoad][i] = new ZTerrain("roadPlain");
				else
					this.terrainMap[randHRoad][i] = new ZTerrain("roadHDash");
				
				if (wideRoad){
					if (randHRoad - 1 >= 0)
						this.terrainMap[randHRoad-1][i] = new ZTerrain("roadPlain");
					if (randHRoad + 1 < this.h)
						this.terrainMap[randHRoad+1][i] = new ZTerrain("roadPlain");
					if (randHRoad - 2 >= 0)
						this.terrainMap[randHRoad-2][i] = new ZTerrain("roadPlain");
					if (randHRoad + 2 < this.h)
						this.terrainMap[randHRoad+2][i] = new ZTerrain("roadPlain");
					if (randHRoad - 3 >= 0)
						this.terrainMap[randHRoad-3][i].type == "roadPlain" || 
						this.terrainMap[randHRoad-3][i].type == "roadVDash"? 
							this.terrainMap[randHRoad-3][i] = new ZTerrain("roadPlain"): 
							this.terrainMap[randHRoad-3][i] = new ZTerrain("sidewalk");
					if (randHRoad + 3 < this.h)
						this.terrainMap[randHRoad+3][i].type == "roadPlain" ||
						this.terrainMap[randHRoad+3][i].type == "roadVDash"? 
							this.terrainMap[randHRoad+3][i] = new ZTerrain("roadPlain"): 
							this.terrainMap[randHRoad+3][i] = new ZTerrain("sidewalk");
				} else {
					if (randHRoad - 1 >= 0)
						this.terrainMap[randHRoad-1][i] = new ZTerrain("roadPlain");
					if (randHRoad + 1 < this.w)
						this.terrainMap[randHRoad+1][i] = new ZTerrain("roadPlain");
					
					
					if (randHRoad - 2 >= 0)
						this.terrainMap[randHRoad-2][i].type == "roadPlain" ||
						this.terrainMap[randHRoad-2][i].type == "roadVDash"? 
							this.terrainMap[randHRoad-2][i] = new ZTerrain("roadPlain"): 
							this.terrainMap[randHRoad-2][i] = new ZTerrain("sidewalk");
					if (randHRoad + 2 < this.w)
						this.terrainMap[randHRoad+2][i].type == "roadPlain" || 
						this.terrainMap[randHRoad+2][i].type == "roadVDash"? 
							this.terrainMap[randHRoad+2][i] = new ZTerrain("roadPlain"): 
							this.terrainMap[randHRoad+2][i] = new ZTerrain("sidewalk");
				}
			}
			randHRoad += rand(40, 61);
		}
		
		for (var y=1; y < horRoads.length; y++){
			plots[y] = []
			for (var x=1; x < vertRoads.length; x++){
				plots[y].push({	"x":vertRoads[x-1].x + (vertRoads[x-1].wide? 4 : 3),
												"y":horRoads[y-1].y + (horRoads[y-1].wide? 4 : 3),
												"w":(vertRoads[x].x - (vertRoads[x].wide? 4 : 3)) -
														 (vertRoads[x-1].x + (vertRoads[x-1].wide? 4 : 3)),
												"h":(horRoads[y].y - (horRoads[y].wide? 4 : 3)) -
														 (horRoads[y-1].y + (horRoads[y-1].wide? 4 : 3)),
												"used":false
											});
			}
		}
		
		
		//Draw tall fences around all non-edge plots.
		/*
		for (var y=1; y < plots.length; y++){
			for (var x=0; x < plots[y].length; x++){
				for (var h=0; h <= plots[y][x].h; h++){
					this.terrainMap[plots[y][x].y+h][plots[y][x].x].wWall = new ZWall("tallWoodFence");
					this.terrainMap[plots[y][x].y+h][plots[y][x].x-1].eWall = new ZWall("tallWoodFence");
					this.terrainMap[plots[y][x].y+h][plots[y][x].x + plots[y][x].w].eWall = new ZWall("tallWoodFence");
					this.terrainMap[plots[y][x].y+h][plots[y][x].x + plots[y][x].w + 1].wWall = new ZWall("tallWoodFence");
				}
				
				for (var w=0; w <= plots[y][x].w; w++){
					this.terrainMap[plots[y][x].y][plots[y][x].x + w].nWall = new ZWall("tallWoodFence");
					this.terrainMap[plots[y][x].y-1][plots[y][x].x + w].sWall = new ZWall("tallWoodFence");
					this.terrainMap[plots[y][x].y + plots[y][x].h][plots[y][x].x + w].sWall = new ZWall("tallWoodFence");
					this.terrainMap[plots[y][x].y + plots[y][x].h + 1][plots[y][x].x + w].nWall = new ZWall("tallWoodFence");
				}
			}
		}
		*/
		var dirs = ["up","down","left","right"];
		
		//draw four houses on a plot
		for (var y=1; y < plots.length; y++){
			for (var x=0; x < plots[y].length; x++){
				var topLeftSubPlot = {"x": plots[y][x].x,
															"y": plots[y][x].y,
															"w": Math.floor(plots[y][x].w/2),
															"h": Math.floor(plots[y][x].h/2)
														 };
														 
				var topRightSubPlot = {"x": plots[y][x].x + topLeftSubPlot.w,
															"y": plots[y][x].y,
															"w": Math.ceil(plots[y][x].w/2)+1,
															"h": Math.floor(plots[y][x].h/2)
														 };
														 
				var botLeftSubPlot = {"x": plots[y][x].x,
															"y": plots[y][x].y + topLeftSubPlot.h,
															"w": Math.floor(plots[y][x].w/2),
															"h": Math.ceil(plots[y][x].h/2)+1
														 };
														 
				var botRightSubPlot = {"x": plots[y][x].x + topLeftSubPlot.w,
															"y": plots[y][x].y + topLeftSubPlot.h,
															"w": Math.ceil(plots[y][x].w/2)+1,
															"h": Math.ceil(plots[y][x].h/2)+1
														 };
														 
				
				this.house(topLeftSubPlot, dirs[rand(0,2)*2]);
				this.house(topRightSubPlot, dirs[rand(0,2)*3]);
				this.house(botLeftSubPlot, dirs[rand(1,3)]);
				this.house(botRightSubPlot, dirs[rand(0,2)*2 +1]);
			}
		}
		
		//this.drawWall([0,1],10,"top","tallWoodFence");
		//this.drawWall([0,4],10,"bottom","tallWoodFence");
		
		//this.drawWall([11,0],10,"left","tallWoodFence");
		//this.drawWall([14,0],10,"right","tallWoodFence");
		//console.log(plots);
	},
	
	house: function(plot, dir){
		//this.drawThreeSideFence(plot,dir);
		if(dir != "left"){
			this.drawWall([plot.x,plot.y],plot.h,"left","tallWoodFence");
		}
		if (dir != "right"){
			this.drawWall([plot.x+plot.w-1,plot.y],plot.h,"right","tallWoodFence");
		}	
		if (dir != "up"){
			this.drawWall([plot.x,plot.y],plot.w,"top","tallWoodFence");
		}
		if (dir != "down"){
			this.drawWall([plot.x,plot.y+plot.h-1],plot.w,"bottom","tallWoodFence");
		}
	},
	
	drawThreeSideFence: function(plot, dir){
		//Draw fences
		for (var h=0; h <= plot.h; h++){
			if(dir != "left"){
				//left fence
				this.terrainMap[plot.y+h][plot.x].wWall = new ZWall("tallWoodFence");
				this.terrainMap[plot.y+h][plot.x-1].eWall = new ZWall("tallWoodFence");
			}
			if (dir != "right"){
				//right fence
				this.terrainMap[plot.y+h][plot.x + plot.w].eWall = new ZWall("tallWoodFence");
				this.terrainMap[plot.y+h][plot.x + plot.w + 1].wWall = new ZWall("tallWoodFence");
			}	
		}
		
		for (var w=0; w <= plot.w; w++){
			if (dir != "up"){
				//top fence
				this.terrainMap[plot.y][plot.x + w].nWall = new ZWall("tallWoodFence");
				this.terrainMap[plot.y-1][plot.x + w].sWall = new ZWall("tallWoodFence");
			}
			if (dir != "down"){
				//bottom fence
				this.terrainMap[plot.y + plot.h][plot.x + w].sWall = new ZWall("tallWoodFence");
				this.terrainMap[plot.y + plot.h + 1][plot.x + w].nWall = new ZWall("tallWoodFence");
			}
		}
	},
	
	drawWall: function(start, length, side, type){
		if (side == "top"){
			for (var l=0; l < length; l++){
					this.terrainMap[start[1]][start[0] + l].nWall = new ZWall(type);
					if (start[1] > 0)
						this.terrainMap[start[1]-1][start[0] + l].sWall = new ZWall(type);
			}
		} else if (side == "bottom"){
			for (var l=0; l < length; l++){
					this.terrainMap[start[1]][start[0]+l].sWall = new ZWall(type);
					if (start[1] < this.h-1)
						this.terrainMap[start[1]+1][start[0]+l].nWall = new ZWall(type);
			}
		} else if (side == "left"){
			for (var l=0; l < length; l++){
					this.terrainMap[start[1]+l][start[0]].wWall = new ZWall(type);
					if (start[0] > 0)
						this.terrainMap[start[1]+l][start[0]-1].eWall = new ZWall(type);
			}
		} else if (side == "right") {
			for (var l=0; l < length; l++){
					this.terrainMap[start[1]+l][start[0]].eWall = new ZWall(type);
					if (start[0] < this.w-1)
						this.terrainMap[start[1]+l][start[0]+1].wWall = new ZWall(type);
			}
		}
	},
}
