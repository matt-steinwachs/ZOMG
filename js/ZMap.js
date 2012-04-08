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
		if (x < 0 || y < 0 || x >= this.w || y >= this.h)
			return null;
		
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
		var buildings = [];	//{upperLeftCornerX:int, upperLeftCornerY:int, width:int, height:int}
		
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
			
			randVRoad += rand(30, 51);
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
			randHRoad += rand(30, 51);
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
		
		var dirs = ["up","down","left","right"];
		
		//draw four houses on a plot
		for (var y=1; y < plots.length; y++){
			for (var x=0; x < plots[y].length; x++){
				//if (rand(0,2)){
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
															 
					
					buildings.push(this.house(topLeftSubPlot, dirs[rand(0,2)*2]));
					buildings.push(this.house(topRightSubPlot, dirs[rand(0,2)*3]));
					buildings.push(this.house(botLeftSubPlot, dirs[rand(1,3)]));
					buildings.push(this.house(botRightSubPlot, dirs[rand(0,2)*2 +1]));
				//}
			}
		}
	},
	
	house: function(plot, dir){
		var building = {"x":null,
										"y":null,
										"h":null,
										"w":null
									 }
		
		//Draw fence
		if(dir != "left"){
			this.drawWall([plot.x,plot.y],plot.h,"left","tallWoodFence","tallWoodFence");
		}
		if (dir != "right"){
			this.drawWall([plot.x+plot.w-1,plot.y],plot.h,"right","tallWoodFence","tallWoodFence");
		}	
		if (dir != "up"){
			this.drawWall([plot.x,plot.y],plot.w,"top","tallWoodFence","tallWoodFence");
		}
		if (dir != "down"){
			this.drawWall([plot.x,plot.y+plot.h-1],plot.w,"bottom","tallWoodFence","tallWoodFence");
		}
		
		//calc random building attributes
		if (dir == "up" || dir == "down"){
			building.x = plot.x + rand(1,3);
			building.y = plot.y + rand(2, (plot.h/10 +1));
			building.h = plot.h - (building.y - plot.y) - 
										rand(2, plot.h/5 + 1);
			building.w = plot.w - (building.x - plot.x) - rand(1,3);
		} else {
			building.x = plot.x + rand(2,(plot.w/10 + 1));
			building.y = plot.y + rand(1,3);
			building.h = plot.h - (building.y - plot.y) - rand(1,3);
			building.w = plot.w - (building.x - plot.x) - 
										rand(2,(plot.w/5 + 1));
		}
		
		//top wall
		var tRandLength = parseInt(building.w/2+rand(-(building.w/10+1),building.w/10));
		this.drawWall([building.x,building.y-1],
									tRandLength - ((dir == "up" || dir == "down")?1:0),
									"bottom",
									"woodExterior",
									"drywallInterior"
									);
									
		//top door
		if (dir == "up" || dir == "down")
			this.drawWall([building.x+tRandLength-1,building.y-1],
									1,
									"bottom",
									"doorOpen",
									"doorOpen"
									);
									
		var tOffset = rand(0,2);
		
		if (tOffset == 1)
			this.drawWall([building.x+tRandLength-
											(this.terrainMap[building.y][building.x+tRandLength].nWall.type == "none" ? 1:0), 
										 building.y],
										1,
										"right",
										"woodExterior",
										"drywallInterior"
									 );
		
		this.drawWall([building.x+tRandLength+
										(this.terrainMap[building.y+tOffset-1][building.x+tRandLength].nWall.type == "none" || tOffset == 0 ? 0:1),
									building.y+tOffset-1],
									building.w-tRandLength,
									"bottom",
									"woodExterior",
									"drywallInterior"
									)
									
		//right wall
		var rRandLength = parseInt(building.h/2+rand(-(building.h/10+1),building.h/10));
		this.drawWall([building.x+building.w-1-
										(this.terrainMap[building.y+tOffset][building.x+building.w-1].nWall.type == "none" ? 1:0),
									building.y+tOffset],
									rRandLength,
									"right",
									"drywallInterior",
									"woodExterior"
									);
		
		var rOffset = rand(0,2);
		
		var xAdjusted = building.x+building.w-1-
											(this.terrainMap[building.y+tOffset][building.x+building.w-1].nWall.type == "none" ? 1:0);
		var yAdjust = this.terrainMap[building.y + rRandLength][xAdjusted].eWall.type == "none"? -1 : 0;
		
		if (rOffset == 1)
			this.drawWall([xAdjusted, building.y + rRandLength + yAdjust],
										1,
										"bottom",
										"drywallInterior",
										"woodExterior"
									 );
		
		this.drawWall([xAdjusted, building.y + rRandLength + yAdjust + 1],
									 building.h-rRandLength-1,
									 rOffset == 1 ? "left":"right",
									 rOffset == 1 ? "woodExterior":"drywallInterior",
									 rOffset == 1 ? "drywallInterior":"woodExterior"
									);
									
		//left wall
		var lRandLength = parseInt(building.h/2+rand(-(building.h/10+1),building.h/10));
		this.drawWall([building.x,building.y],
									lRandLength,
									"left",
									"drywallInterior",
									"woodExterior"
								 );
									
		var lOffset = rand(0,2);
		
		if (lOffset == 1)
			this.drawWall([building.x, building.y+lRandLength],
										1,
										"top",
										"woodExterior",
										"drywallInterior"
									 );
		
		this.drawWall([building.x,building.y+lRandLength],
									building.h-lRandLength,
									lOffset == 1 ? "right" : "left",
									lOffset == 1 ? "woodExterior" : "drywallInterior",
									lOffset == 1 ? "drywallInterior" : "woodExterior"
								 );
									
		//bottom wall
		var bRandLength = parseInt(building.w/2+rand(-(building.w/10+1),building.w/10));
		this.drawWall([building.x+lOffset, building.y+building.h],
									bRandLength,//building.w-lOffset-rOffset,
									"top",
									"woodExterior",
									"drywallInterior"
								 );
		
		if (tOffset == 0)
			this.drawWall([building.x+lOffset+bRandLength, building.y+building.h-1],
										1,
										"left",
										"woodExterior",
										"drywallInterior"
									 );
		
		this.drawWall([building.x+lOffset+bRandLength, building.y+building.h-1],
										building.w-bRandLength-lOffset-rOffset,
										tOffset == 0 ? "top" : "bottom",
										tOffset == 0 ? "woodExterior" : "drywallInterior",
										tOffset == 0 ? "drywallInterior" :"woodExterior"  
									 );
									 
		return building;
	},
	
	//drawThreeSideFence: function(plot, dir){
		////Draw fences
		//for (var h=0; h <= plot.h; h++){
			//if(dir != "left"){
				////left fence
				//this.terrainMap[plot.y+h][plot.x].wWall = new ZWall("tallWoodFence");
				//this.terrainMap[plot.y+h][plot.x-1].eWall = new ZWall("tallWoodFence");
			//}
			//if (dir != "right"){
				////right fence
				//this.terrainMap[plot.y+h][plot.x + plot.w].eWall = new ZWall("tallWoodFence");
				//this.terrainMap[plot.y+h][plot.x + plot.w + 1].wWall = new ZWall("tallWoodFence");
			//}	
		//}
		
		//for (var w=0; w <= plot.w; w++){
			//if (dir != "up"){
				////top fence
				//this.terrainMap[plot.y][plot.x + w].nWall = new ZWall("tallWoodFence");
				//this.terrainMap[plot.y-1][plot.x + w].sWall = new ZWall("tallWoodFence");
			//}
			//if (dir != "down"){
				////bottom fence
				//this.terrainMap[plot.y + plot.h][plot.x + w].sWall = new ZWall("tallWoodFence");
				//this.terrainMap[plot.y + plot.h + 1][plot.x + w].nWall = new ZWall("tallWoodFence");
			//}
		//}
	//},
	
	drawWall: function(start, length, side, type1, type2){
		if (side == "top"){
			for (var l=0; l < length; l++){
					this.terrainMap[start[1]][start[0] + l].nWall = new ZWall(type1);
					if (start[1] > 0)
						this.terrainMap[start[1]-1][start[0] + l].sWall = new ZWall(type2);
			}
		} else if (side == "bottom"){
			for (var l=0; l < length; l++){
					this.terrainMap[start[1]][start[0]+l].sWall = new ZWall(type1);
					if (start[1] < this.h-1)
						this.terrainMap[start[1]+1][start[0]+l].nWall = new ZWall(type2);
			}
		} else if (side == "left"){
			for (var l=0; l < length; l++){
					this.terrainMap[start[1]+l][start[0]].wWall = new ZWall(type1);
					if (start[0] > 0)
						this.terrainMap[start[1]+l][start[0]-1].eWall = new ZWall(type2);
			}
		} else if (side == "right") {
			for (var l=0; l < length; l++){
					//console.log((start[1]+l)+"..."+start[0]);
					this.terrainMap[start[1]+l][start[0]].eWall = new ZWall(type1);
					if (start[0] < this.w-1)
						this.terrainMap[start[1]+l][start[0]+1].wWall = new ZWall(type2);
			}
		}
	},
	
}
