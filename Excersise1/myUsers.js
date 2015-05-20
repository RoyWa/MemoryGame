angular.module('myApp', []).controller('userController', ['$scope', function($scope) {
$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.users = [
{id:1, fName:'Hege',  lName:"Pege" },
{id:2, fName:'Kim',   lName:"Pim" },
{id:3, fName:'Sal',   lName:"Smith" },
{id:4, fName:'Jack',  lName:"Jones" },
{id:5, fName:'John',  lName:"Doe" },
{id:6, fName:'Peter', lName:"Pan" }
];
$scope.edit = true;
$scope.guyID = 10;
$scope.error = false;
$scope.incomplete = false; 
$scope.editUser = function(id) {
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    } else {
    $scope.edit = false;
    $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName; 
  }
};

$scope.saveUser = function() {
	$scope.guyID ++;
	console.log("$scope.saveUser start");
	console.log($scope.users);	
	console.log("$scope.guyID-" + $scope.guyID);
	$scope.users[$scope.users.length] = {id:$scope.guyID, fName:$scope.fName, lName:$scope.lName }
	console.log("$scope.saveUser stop");
};

$scope.deleteUser = function(index) {
	console.log("$scope.deleteUser start");


/*	opt - 1
	console.log("id-"+ id);
	for(var i=0; i<$scope.users.length; i++) {
        if ($scope.users[i].id === id) {
			console.log("index-"+ i);
			$scope.users.splice( i , 1);
			break;
		}
    }
*/

/*  opt - 2
  var IDs=  $scope.users.map(function(d) {var tt= d['id'];return  tt;})
  var index = IDs.indexOf(id);
  $scope.users.splice( index , 1);
*/
 
	$scope.users.splice( index , 1);
 
	console.log("$scope.deleteUser stop");
};


$scope.$watch('passw1',function() {$scope.test();});
$scope.$watch('passw2',function() {$scope.test();});
$scope.$watch('fName', function() {$scope.test();});
$scope.$watch('lName', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
       $scope.incomplete = true;
  }
};
}])