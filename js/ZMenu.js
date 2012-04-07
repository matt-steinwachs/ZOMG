function ZMenu(){
	this.curViewX = 31;
	this.curViewY = 21;
	
	this.registerHandlers();
}

ZMenu.prototype = {
	registerHandlers: function(){
		var menu = this;
		
		//view size X text box
		$('#displayX').change(function(event){
			var val = parseInt(this.value);
			if (isNaN(val) || val < 31){
				this.value = menu.curViewX;
			} else {
				menu.curViewX = val;
				game.view.w = val;
				game.view.reinitView();
				$('#displayX').blur();
			}
		});

		//view size Y text box
		$('#displayY').change(function(event){
			var val = parseInt(this.value);
			if (isNaN(val) || val < 21){
				this.value = menu.curViewY;
			} else {
				console.log("test");
				menu.curViewY = val;
				game.view.h = val;
				game.view.reinitView();
				$('#displayY').blur();
			}
		});
	},
	
}






