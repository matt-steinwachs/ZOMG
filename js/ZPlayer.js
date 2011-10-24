function ZPlayer(map){
	this.pos = {"x":0, "y":0};
	this.color = "rgb(255, 0, 0)";
	this.char = "X";
	
	this.curMap = map;
	//Stats eventually
}

ZPlayer.prototype = {
	moveLeft: function(){
		if (this.pos.x > 0 && this.curMap.terrainMap[this.pos.y][this.pos.x].wWall.pass){
			this.pos.x--;
			return [1,0];
		}
		else return [0,0];
	},
	
	moveRight: function(){
		if (this.pos.x < this.curMap.w-1 && this.curMap.terrainMap[this.pos.y][this.pos.x].eWall.pass){
			this.pos.x++;
			return [-1,0];
		}
		else return [0,0];
	},
	
	moveUp: function(){
		if (this.pos.y > 0 && this.curMap.terrainMap[this.pos.y][this.pos.x].nWall.pass){
			this.pos.y--;
			return [0,1];
		}
		else return [0,0];
	},
	
	moveDown: function(){
		if (this.pos.y < this.curMap.h-1 && this.curMap.terrainMap[this.pos.y][this.pos.x].sWall.pass){
			this.pos.y++;
			return [0,-1];
		}
		else return [0,0];
	},

}
