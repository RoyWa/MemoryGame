
app.constant('ENUMS', {
	Providers: {
		Numbers: 1,
		Colours: 2,
		Names: 3,
		Pictures: 4
	}
});



app.factory('factoryNumbers', function() {
	var colors = tinycolor.analogous("steelblue", 20, 20);
	var  rndIndex = Math.floor((Math.random() * colors.length) + 1);
	var c = colors[rndIndex].toHexString();
	var data = [];
	for(var i = 1; i<=10; i++){
		var obj = {id:i ,  name:i , colour:c};
		data.push(obj);
		data.push(angular.copy(obj));
	}

	
	var provider = {
		title: 'מיספרים',
		data:data
	};	

    return provider;
});

app.factory('factoryColours', function() {
	var data = [
					{id:1 ,  name:'',  colour:'Blue' },
					{id:2 ,  name:'',  colour:'DarkMagenta' },
					{id:3 ,  name:'',  colour:'Chocolate' },
					{id:4 ,  name:'',  colour:'DarkRed' },
					{id:5 ,  name:'',  colour:'CornflowerBlue' },
					{id:6 ,  name:'',  colour:'Chartreuse' },
					{id:7 ,  name:'',  colour:'DarkGreen' },						
					{id:8 ,  name:'',  colour:'Fuchsia' },
					{id:9 ,  name:'',  colour:'Gold' },						
					{id:10 , name:'',  colour:'HoneyDew'}
					];
					
	for(var i = 0; i<10; i++){
		data.push(angular.copy(data[i]));
	}

	var provider = {
		title: 'צבעים',
		data:data
	};	

    return provider;
});

app.factory('factoryNames', function() {
	var data = [
					{id:1 ,  name:'תום'},
					{id:2 ,  name:'לילך'},
					{id:3 ,  name:'דידי'},
					{id:4 ,  name:'רועי'},
					{id:5 ,  name:'דין'},
					{id:6 ,  name:'הוק'},
					{id:7 ,  name:'רותי'},						
					{id:8 ,  name:'אבנר'},
					{id:9 ,  name:'גילי'},						
					{id:10 , name:'חסיה'}
					];

	var colors = tinycolor.analogous("steelblue", data.length+1, data.length+1);

	var dataExtended = [];	
	angular.forEach(data, function(value, key) {
		value.colour = colors[key].toHexString();
		var value2 =angular.copy(value);

		this.push(value);
		this.push(value2);			
	}, 	dataExtended);	

	var provider = {
		title: 'שמות',
		data:dataExtended
	};	

    return provider;
});

app.factory('FactoryCards',function(ENUMS, factoryNames, factoryNumbers, factoryColours) {
	var FactoryCards = function(providerType){
		var provider = null;
		
		switch(providerType) {
			case ENUMS.Providers.Numbers:
				provider = factoryNumbers;
				break;
			case ENUMS.Providers.Colours:
				provider = factoryColours;
				break;			
			case ENUMS.Providers.Names:
				provider = factoryNames;
				break;
			case ENUMS.Providers.Pictures:
				provider = null;
				break;
			default:
				provider = factoryNumbers;
		}
		
		// Define the initialize function
		this.initialize = function() {

		};

		this.shuffle = function (o){ 
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};			
		
		this.getData = function(){
			console.table(provider.data);	
			return this.shuffle(provider.data);
		}
		
		this.getTitle = function(){
			return provider.title;
		}		

		// Call the initialize function for every new instance
		this.initialize();
	}
 
	// Return a reference to the function
	return (FactoryCards);	
});
 