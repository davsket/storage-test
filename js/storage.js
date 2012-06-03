(function(){
	if('Storage' in window){
		Storage.prototype.setValue = function(key, value){
			if(typeof value ==='object')
				this.setItem(key, JSON.stringify(value))
			else 
				this.setItem(key, value)
		}
		Storage.prototype.getValue = function(key){
			var val = this.getItem(key)
			try{
				val = JSON.parse(val)
			}catch(e){}
			return val
		}
		Storage.prototype.removeValue = Storage.prototype.removeItem
	}
	else{
		//MAximum 20 keys recommended
		window.localStorage = {
			setValue: function(key, value){
				if(typeof value ==='object')
					Cookie.write(key, JSON.stringify(value),{domain: location.hostname, duration: 99999})
				else 
					Cookie.write(key, value,{domain: location.hostname, duration: 99999})
			},
			getValue: function(key){
				var val = Cookie.read(key)
				try{
					val = JSON.parse(val)
				}catch(e){}
				return val
			},
			removeValue: function(key){
				Cookie.dispose(key);
			}
		}
	}
})()