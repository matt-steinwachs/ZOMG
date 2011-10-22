function ZView(){
	//console.log("new ZView");
		
	this.w = 30;
	this.h = 15;
	this.yOff = 0;
	this.xOff = 0;
	
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
		
		//console.log(keyString);
		
		switch(keyString){
			case "a":
				if (view.xOff > 0)
					view.xOff--;
				break;
			
			case "s":
				if (view.yOff+view.h < view.map.h)
					view.yOff++;
				break;
				
			case "d":
				if (view.xOff+view.w < view.map.w)
					view.xOff++;
				break;
				
			case "w":
				if (view.yOff > 0)
					view.yOff--;
				break;
			default:
				break;
		}
		
		//view.generateCanvas();
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
	},
	
	/*
	generateCanvas: function(){
		for (var i=0; i<this.h; i++){
			this.canvas[i] = [];
		}
		for (var x=0; x<this.w; x++){
			for (var y=0; y<this.h; y++){
				this.canvas[y][x] = this.map.terrainMap[y+this.yOff][x+this.xOff]
			}
		}
	},
	*/
	
	render: function(){
		for (var x=0; x<this.w; x++){
			for (var y=0; y<this.h; y++){
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
			}
		}
	},
	
	/*
	toString: function(){
		var string = "";
		
		this.canvas.forEach(function(row){
			row.forEach(function(cell){
				string += cell;
			});
			string += "\n";
		});
		return string;
	}
	*/
	
}
