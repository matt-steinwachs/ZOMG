function ZMap(){
	this.w  = 400;
	this.h = 300;
	
	this.playerPos = {"x": 0, "y":0};
	
	this.actorMap = [];
	this.objectMap = [];
	this.terrainMap = [];
	
	this.initMap();
	this.randomTown();
}



ZMap.prototype = {
	getAppearance: function(x,y){
		var obj = {};
		
		if (this.playerPos.x == x && this.playerPos.y == y){
			obj.color = "rgb(255, 0, 0)";
			obj.char = "H";
		}	else if (this.actorMap[y][x] != null){
			
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
		//Initialize Actor Map to None
		for (var i=0; i < this.h; i++){
			this.actorMap[i] = [];
			for (var j=0; j< this.w; j++){
				this.actorMap[i][j] = null;
			}
		}
		
		//Initialize Object Map to None
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
			
			randVRoad += rand(20, 40);
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
			randHRoad += rand(20, 40);
		}
		
		for (var y=1; y < horRoads.length; y++){
			plots[y] = []
			for (var x=1; x < vertRoads.length; x++){
				plots[y].push({"x":vertRoads[x-1].x + (vertRoads[x-1].wide? 4 : 3),
									 "y":horRoads[y-1].y + (horRoads[y-1].wide? 4 : 3),
									 "w":(vertRoads[x].x - (vertRoads[x].wide? 4 : 3)) -
											 (vertRoads[x-1].x + (vertRoads[x-1].wide? 4 : 3)),
									 "h":(horRoads[y].y - (horRoads[y].wide? 4 : 3)) -
											 (horRoads[y-1].y + (horRoads[y-1].wide? 4 : 3))});
			}
		}
		
		console.log(plots);
	}
	
}
