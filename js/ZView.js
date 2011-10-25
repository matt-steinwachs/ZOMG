function ZView(){
	this.w = 31;
	this.h = 21;
	this.yOff = 0;
	this.xOff = 0;
	this.lastMove = [0,0];
	this.lastPlayerMove = [0,0];
	
	this.map = new ZMap();
	this.canvas = [];
	this.initView();
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
				view.lastPlayerMove = view.map.player.moveLeft();
				if (view.xOff > 0 && 
						view.map.player.pos.x - view.xOff < view.w/2 &&
						(view.lastPlayerMove[0] != 0 || view.lastPlayerMove[1] != 0)){
					view.xOff--;
					view.lastMove = [1,0];
					
				}
				break;
			
			case "s":
				view.lastPlayerMove = view.map.player.moveDown();
				if (view.yOff+view.h < view.map.h && 
						view.map.player.pos.y - view.yOff > view.h/2 &&
						(view.lastPlayerMove[0] != 0 || view.lastPlayerMove[1] != 0)){
					view.yOff++;
					view.lastMove = [0,-1];
				}
				break;
				
			case "d":
				view.lastPlayerMove = view.map.player.moveRight();
				if (view.xOff+view.w < view.map.w &&
						view.map.player.pos.x - view.xOff > view.w/2 &&
						(view.lastPlayerMove[0] != 0 || view.lastPlayerMove[1] != 0)){
					view.xOff++;
					view.lastMove = [-1,0];
				}
				break;
				
			case "w":
				view.lastPlayerMove = view.map.player.moveUp();
				if (view.yOff > 0 &&
						view.map.player.pos.y - view.yOff < view.h/2 &&
						(view.lastPlayerMove[0] == 1 || view.lastPlayerMove[1] == 1)){
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
				var display = this.map.getAppearance(x,y);
				$("#cell"+x+"-"+y).css("color", display.color)
													.css("border-top", "1px "+
																						display.nWall.style+" "+
																						display.nWall.color)
													.css("border-bottom", "1px "+
																						display.sWall.style+" "+
																						display.sWall.color)
													.css("border-left", "1px "+
																						display.wWall.style+" "+
																						display.wWall.color)
													.css("border-right", "1px "+
																						display.eWall.style+" "+
																						display.eWall.color)
													.html(display.char);
			}
		}
		$("#cell"+this.map.player.pos.x+"-"+this.map.player.pos.y).css("color", this.map.player.color)
																															.html(this.map.player.char);
	},
	
	render: function(){
		for (var x=0; x<this.w; x++){
			for (var y=0; y<this.h; y++){
				var cell = $("#cell"+x+"-"+y);
				var next = this.map.getAppearance(x+this.xOff,y+this.yOff);		//this.map.terrainMap[y+this.yOff][x+this.xOff];
				var last = this.map.getAppearance(x+this.xOff+this.lastMove[0],
																					y+this.yOff+this.lastMove[1]);//this.map.terrainMap[y+this.yOff+this.lastMove[1]][x+this.xOff+this.lastMove[0]];
				
				//Update cell font color or character if necessary
				next.color != last.color ?
					cell.css("color", next.color) : null;
					
				next.char != last.char ?
					cell.html(next.char) : null;
					
				//Update nWall color or style if necessary
				next.nWall.color != last.nWall.color ?
					cell.css("border-top-color", next.nWall.color) : null;
					
				next.nWall.style != last.nWall.style ?
					cell.css("border-top-style", next.nWall.style) : null;
					
				//Update sWall color or style if necessary
				next.sWall.color != last.sWall.color ?
					cell.css("border-bottom-color", next.sWall.color) : null;
					
				next.sWall.style != last.sWall.style ?
					cell.css("border-bottom-style", next.sWall.style) : null;
					
				//Update eWall color or style if necessary
				next.eWall.color != last.eWall.color ?
					cell.css("border-right-color", next.eWall.color) : null;
					
				next.eWall.style != last.eWall.style ?
					cell.css("border-right-style", next.eWall.style) : null;
					
				//Update wWall color or style if necessary
				next.wWall.color != last.wWall.color ?
					cell.css("border-left-color", next.wWall.color) : null;
					
				next.wWall.style != last.wWall.style ?
					cell.css("border-left-style", next.wWall.style) : null;
				
				
			}
		}
		
		if (this.lastPlayerMove[0] != 0 || this.lastPlayerMove[1] != 0){
			var nextPlayer = [this.map.player.pos.x-this.xOff,
												this.map.player.pos.y-this.yOff];
												
			var lastPlayer = [this.map.player.pos.x+this.lastPlayerMove[0]-this.xOff,
												this.map.player.pos.y+this.lastPlayerMove[1]-this.yOff];
												
			$("#cell"+nextPlayer[0]+"-"+nextPlayer[1]).css("color", this.map.player.color)
																													.html(this.map.player.char);
																													
			$("#cell"+lastPlayer[0]+"-"+lastPlayer[1])
				.css("color", this.map.getAppearance(this.map.player.pos.x+this.lastPlayerMove[0],
																						 this.map.player.pos.y+this.lastPlayerMove[1]).color)
				
				.html(this.map.getAppearance(this.map.player.pos.x+this.lastPlayerMove[0],
																		 this.map.player.pos.y+this.lastPlayerMove[1]).char);
		} else {
			var nextPlayer = [this.map.player.pos.x-this.xOff,
												this.map.player.pos.y-this.yOff];
												
			$("#cell"+nextPlayer[0]+"-"+nextPlayer[1]).css("color", this.map.player.color)
																													.html(this.map.player.char);
		}
		
	},
	
}
