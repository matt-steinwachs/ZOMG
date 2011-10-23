function ZView(){
	this.w = 50;
	this.h = 25;
	this.yOff = 0;
	this.xOff = 0;
	this.lastMove = [0,0];
	
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
					cell.css("border-bottom-color", next.eWall.color) : null;
					
				next.eWall.style != last.eWall.style ?
					cell.css("border-bottom-style", next.eWall.style) : null;
					
				//Update eWall color or style if necessary
				next.eWall.color != last.eWall.color ?
					cell.css("border-bottom-color", next.eWall.color) : null;
					
				next.eWall.style != last.eWall.style ?
					cell.css("border-bottom-style", next.eWall.style) : null;
					
				//Update wWall color or style if necessary
				next.wWall.color != last.wWall.color ?
					cell.css("border-bottom-color", next.wWall.color) : null;
					
				next.wWall.style != last.wWall.style ?
					cell.css("border-bottom-style", next.wWall.style) : null;
			}
		}
	},
	
}
