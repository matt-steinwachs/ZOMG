//int between lo(inclusive) and hi(exclusive)
function rand(lo, hi){
	if (hi >= lo)
		return Math.floor(Math.random()*(hi-lo)+lo);
	else 
		return Math.random()*(lo-hi)+hi;
}

//traverses an enclosed area or area within a limit
//can traverse through walls with sight or not
//and applies a function to terrain if provided
function dijkstra(func, vis, limit){
	
	
}
