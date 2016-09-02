 Fengs.add('940/utils/info', function(S, $){
 
	 	var obj = function(){
	 		var u = {
	 			aa:function(){
	 				alert(22222)
	 			},
	 			bb:function(){
	 				this.aa();
	 			}
	 		}

	 		return u;
	 	}

	 	return obj
			 	
 })