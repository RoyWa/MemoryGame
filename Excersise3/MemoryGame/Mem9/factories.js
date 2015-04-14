
app.constant('ENUMS', {
	Providers: {
		Numbers:	{id:1 ,title: 'Numbers'},
		Colours:	{id:2 ,title: 'Colours'},
		Names: 		{id:3 ,title: 'Names'},
		Pictures:	{id:4 ,title: 'Pictures'}
	}
});

			
			
			
			

app.factory('factoryNumbers', function() {
	var colors = tinycolor.analogous("steelblue", 20, 20);
	var  rndIndex = Math.floor((Math.random() * colors.length) + 1);
	var c = colors[rndIndex].toHexString();
	var data = [];
	for(var i = 1; i<=3; i++){
		var obj = {id:i ,  name:i , colour:c};
		data.push(obj);
		data.push(angular.copy(obj));
	}
    return data;
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

	return data;
});

app.factory('factoryNames', function() {
	var data = [
					{id:1 ,  name:'Tomy'},
					{id:2 ,  name:'Galit'},
					{id:3 ,  name:'Michael'},
					{id:4 ,  name:'Roy'},
					{id:5 ,  name:'James'},
					{id:6 ,  name:'David'},
					{id:7 ,  name:'Lital'},						
					{id:8 ,  name:'John'},
					{id:9 ,  name:'Bill'},						
					{id:10 , name:'Bar'}
					];

	var colors = tinycolor.analogous("steelblue", data.length+1, data.length+1);

	var dataExtended = [];	
	angular.forEach(data, function(value, key) {
		value.colour = colors[key].toHexString();
		var value2 =angular.copy(value);

		this.push(value);
		this.push(value2);			
	}, 	dataExtended);	
    return dataExtended;
});

app.factory('FactoryCards',function(ENUMS, factoryNames, factoryNumbers, factoryColours) {
	
	var FactoryCards = function(providerType){
		var provider = null;
		var pType = null;
		
		switch(providerType) {
			case ENUMS.Providers.Numbers.id:
				provider = factoryNumbers;
				pType = ENUMS.Providers.Numbers;
				break;
			case ENUMS.Providers.Colours.id:
				provider = factoryColours;
				pType = ENUMS.Providers.Colours;
				break;			
			case ENUMS.Providers.Names.id:
				provider = factoryNames;
				pType = ENUMS.Providers.Names;
				break;
			case ENUMS.Providers.Pictures.id:
				provider = null;
				pType = ENUMS.Providers.Pictures;
				break;
			default:
				provider = factoryNumbers;
				pType = ENUMS.Providers.Numbers;
		}
		
		// Define the initialize function
		this.initialize = function() {

		};


		this.shuffle = function (o){ 
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};		
		
		this.getData = function(){
			return this.shuffle(provider);
		}
		
		this.getTitle = function(){
			return pType.title;
		}		

		// Call the initialize function for every new instance
		this.initialize();
	}
 
	// Return a reference to the function
	return (FactoryCards);	
});
 