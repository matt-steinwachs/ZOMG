//int between lo(inclusive) and hi(exclusive)
function rand(lo, hi){
	if (hi >= lo)
		return Math.floor(Math.random()*(hi-lo)+lo);
	else 
		return Math.random()*(lo-hi)+hi;
}
