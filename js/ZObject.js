function ZObject(type){
	this.type = type;
	
	this.class = undefined;  			//string either terrain, equippable, usable
	this.rep = undefined;					//character or image
	this.passable = undefined;		//bool
	this.passive = undefined;
	
	this[type]();
}

ZObject.prototype = {
	
}
