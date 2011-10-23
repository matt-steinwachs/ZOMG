function ZView(){
	//console.log("new ZView");
		
	this.w = 30;
	this.h = 15;
	this.yOff = 0;
	this.xOff = 0;
	this.lastMove = [0,0];
	
	this.map = new ZMap();
	this.canvas = [];
	this.initView();
	//this.generateCanvas();
	this.render();
	
	if (document.layers) { document.captureEvents(Event.KEYPRESS); }
	document.onkeypress = this.keyCap;
}

ZView.prototype = {
	keyCap: function(keyStroke){
		var view = game.view;
		var keyCode = (document.layers) ? keyStroke.which : event.keyCode;
		var keyString = String.fromCharCode(keyCode).toLowerCase();
		
		switch(keyString){
			case "a":
				if (view.xOff > 0){
					view.xOff--;
					view.lastMove = [1,0];
				}
				break;
			
			case "s":
				if (view.yOff+view.h < view.map.h){
					view.yOff++;
					view.lastMove = [0,-1];
				}
				break;
				
			case "d":
				if (view.xOff+view.w < view.map.w){
					view.xOff++;
					view.lastMove = [-1,0];
				}
				break;
				
			case "w":
				if (view.yOff > 0){
					view.yOff--;
					view.lastMove = [0,1];
				}
				break;
			default:
				break;
		}
		
		view.render();
		
	},
	
	initView: function(){
		var string = "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0px\">";
		
		for (var y=0; y<this.h; y++){
			string+="<tr>"
			for(var x=0; x<this.w; x++){
				string += "<td class=\"cell\" id=\"cell"+x+"-"+y+"\"></td>";
			}
			string += "</tr>";
		}
		string += "</table>";
		
		$('#view').html(string);
		
		for (var y=0; y<this.h; y++){
			for(var x=0; x<this.w; x++){
				$("#cell"+x+"-"+y).css("color", this.map.terrainMap[y+this.yOff][x+this.xOff].color)
													.css("border-top", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.style+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.color)
													.css("border-bottom", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.style+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.color)
													.css("border-left", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.style+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.color)
													.css("border-right", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.style+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color)
													.html(this.map.terrainMap[y+this.yOff][x+this.xOff].char);
			}
		}
	},
	
	render: function(){
		for (var x=0; x<this.w; x++){
			for (var y=0; y<this.h; y++){
				var cell = $("#cell"+x+"-"+y);
				
				//Update cell font color or character if necessary
				this.map.terrainMap[y+this.yOff][x+this.xOff].color != this.map.terrainMap[(y+this.yOff+this.lastMove[1])][(x+this.xOff+this.lastMove[0])].color ?
					cell.css("color", this.map.terrainMap[y+this.yOff][x+this.xOff].color) : null;
					
				this.map.terrainMap[y+this.yOff][x+this.xOff].char != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].char ?
					cell.html(this.map.terrainMap[y+this.yOff][x+this.xOff].char) : null;
					
				//Update nWall color or style if necessary
				this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.color != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].nWall.color ?
					cell.css("border-top-color", this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.color) : null;
					
				this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.style != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].nWall.style ?
					cell.css("border-top-style", this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.style) : null;
					
				//Update sWall color or style if necessary
				this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.color != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].sWall.color ?
					cell.css("border-bottom-color", this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.color) : null;
					
				this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.style != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].sWall.style ?
					cell.css("border-bottom-style", this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.style) : null;
					
				//Update eWall color or style if necessary
				this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].eWall.color ?
					cell.css("border-bottom-color", this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color) : null;
					
				this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.style != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].eWall.style ?
					cell.css("border-bottom-style", this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.style) : null;
					
				//Update eWall color or style if necessary
				this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].eWall.color ?
					cell.css("border-bottom-color", this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color) : null;
					
				this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.style != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].eWall.style ?
					cell.css("border-bottom-style", this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.style) : null;
					
				//Update wWall color or style if necessary
				this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.color != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].wWall.color ?
					cell.css("border-bottom-color", this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.color) : null;
					
				this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.style != this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]].wWall.style ?
					cell.css("border-bottom-style", this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.style) : null;
					
				
				/*
				var cell = $("#cell"+x+"-"+y);
				
				
				
				
				(cell.css("color") != this.map.terrainMap[y+this.yOff][x+this.xOff].color) ?
					cell.css("color", this.map.terrainMap[y+this.yOff][x+this.xOff].color) : null;
				
				(cell.css("border-top-color") != this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.color) ?
					cell.css("border-top-color", this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.color) : null;
					
				(cell.css("border-top-style") != this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.style) ?
					cell.css("border-top-style", this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.style) : null;
					
				
				(cell.css("border-bottom-color") != this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.color) ?
					cell.css("border-bottom-color", this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.color) : null;
					
				(cell.css("border-bottom-style") != this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.style) ?
					cell.css("border-bottom-style", this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.style) : null;
					
					
				(cell.css("border-right-color") != this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color) ?
					cell.css("border-right-color", this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color) : null;
					
				(cell.css("border-right-style") != this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.style) ?
					cell.css("border-right-style", this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.style) : null;
					
					
				(cell.css("border-left-color") != this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.color) ?
					cell.css("border-left-color", this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.color) : null;
					
				(cell.css("border-left-style") != this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.style) ?
					cell.css("border-left-style", this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.style) : null;
					
				(cell.html() != this.map.terrainMap[y+this.yOff][x+this.xOff].char) ?
					cell.html(this.map.terrainMap[y+this.yOff][x+this.xOff].char) : null;
				*/
				
				/*
				$("#cell"+x+"-"+y).css("color", this.map.terrainMap[y+this.yOff][x+this.xOff].color)
													.css("border-top", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.line+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].nWall.color)
													.css("border-bottom", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.line+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].sWall.color)
													.css("border-left", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.line+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].wWall.color)
													.css("border-right", "1px "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.line+" "+
																						this.map.terrainMap[y+this.yOff][x+this.xOff].eWall.color)
													.html(this.map.terrainMap[y+this.yOff][x+this.xOff].char);
													* 
													**/
			}
		}
	},
	
}
