(function () {
  'use strict';

  /**
 * @ngdoc overview
 * @name RoyApp
 * @requires FactoriesModule 
 * @requires DirectivesModule
 * @description
 * This is the main application module, which does the following:
 *
 *   - loads all the submodules
 *   - defines routes via `ENUMS`
 * https://github.com/angular/dgeni-packages/blob/master/NOTES.md#ngdoc-tags
 **/
  var app = angular.module('_Spy_', [ ]);


/**
 * @ngdoc method
 * @name RoyApp.controller:MainCtrl#run
 * @requires $templateCache
 * @methodOf RoyApp.controller:MainCtrl
 * @description
 * Speed up my AngularJS app by automatically minifying, combining, and automatically caching your HTML templates with $templateCache
 */
 app.run(["$templateCache", function ($templateCache){
  var st= '<div id="treeContainer"></div>';
  $templateCache.put('container.html', st);
 }]);




/**
    * @ngdoc directive 
    * @name DirectivesModule.directive:shoppingCart 
    * @restrict E 
    * @element <shopping-cart></shopping-cart>
    * @priority 1000 
    * @scope  true 
**/
app.directive("diagram", function($templateCache) {
    return {
        restrict: "E",
        transclude: true,
        scope: {
           mainApp:'@app'
        },
        template: $templateCache.get('container.html') ,
        controller: function($scope, $element, $attrs, $transclude) { 
                var root;
                var tree;

                var svg;
                var i =0;
                var diagonal;
            
                var margin = {top: 200, right: 120, bottom: 20, left: 120};
                var width = 960 - margin.right - margin.left;
                var height = 1000 - margin.top - margin.bottom;
                
                var generatedData = [];



                function initialized(){
                    tree = d3.layout.tree().size([height, width]);
                    diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });

                    svg = d3.select("#treeContainer").append("svg")
                     .attr("width", width + margin.right + margin.left)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                }

                function getRootData (){
                    return root;
                }

                $scope.buidMembers = function (membersArray, targetContainer){
                  for (var i = 0; i < membersArray.length; i++) {
                    var ngType = membersArray[i][1];
                    var name = membersArray[i][2][0];
                    var varType = typeof(membersArray[i][2][1]);
                    var tmpl = {"name": name, "ng":ngType ,  "type": varType , "inject": membersArray[i][2][1].$inject };
                    targetContainer.push(tmpl);
                  };
                }

                $scope.buidData= function (nodeName, targetContainer){
                  //console.info('@@@@@@@@@@@', nodeName);
                  var tmpl = {"name": nodeName, "type":"module" , "color": "LightCoral" , "children": [] , "members": []};
                  targetContainer.push(tmpl);
                  $scope.buidMembers(angular.module(nodeName)._invokeQueue, tmpl.members);

                  var requires = angular.module(nodeName).requires;
                  if (requires.length===0 ){
                    return;  //recursion stop  
                  }
                 
                  for (var i = 0; i < requires.length; i++) {
                    if (requires[i] !== "_Spy_"){ 
                      $scope.buidData(requires[i] , tmpl.children); //add hierarchy
                    }
                  };

                  //console.info("#######", JSON.stringify( tmpl, null , 2));                                                             
                }

                $scope.setRootData= function (data){
                    root = data[0];
                     console.info("#######", JSON.stringify( root, null , 2));    
                }

                // ************** Generate the tree diagram  *****************

                function buildBox (node) {
                  // Enter the nodes.
                  var nodeNew = node.enter().append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; }); //place the position on the node on the end of the edge


                  //Create the container of the box
                  var boxWidth = 100, boxHeight = 150;
                  var nodeEnter= nodeNew.append("g").attr("transform", function(d) {return "translate(" + (-boxWidth/2) + "," + (-boxHeight/2) + ")"; });// plcase the box in the middle
                  nodeEnter.append("rect")
                   .attr("width", boxWidth)
                   .attr("height", boxHeight)

                  //Create the title container
                  var titleBoxHeight = 20; 
                  nodeEnter.append("rect")
                   .attr("width", boxWidth)
                   .attr("height", titleBoxHeight)
                   .style("fill", function(d) { return d.color; });

                  nodeEnter.append("text")
                   .attr("x", boxWidth/2) //center the title
                   .attr("y", titleBoxHeight/2)
                   .attr("dy", ".35em")
                   .attr("text-anchor", "middle")
                   .text(function(d) { return d.name; })
                   .style("fill-opacity", 1);  

                   
                  //Add all methods within an entity 
                  var membersHeight =  titleBoxHeight * 1.5 ;
                  nodeEnter.selectAll("AddMemebers").data(function(d) { return d.members; })
                  .enter()
                  .append("circle")
                  .attr("cx", 6)
                  .attr("cy", function(d,i){
                        return membersHeight+ titleBoxHeight * i ;
                   })
                  .attr("r", 3)
                  .style("fill", function(d) {
                      var colour;
                      switch (d.ng) {
                          case "directive":
                              colour = "lightsteelblue";
                              break;
                          case "factory":
                              colour = "brown";
                              break;
                          case "constant":
                              colour = "purple";
                              break;
                          case "register":
                              colour = "green";
                              break;
                       } 
                    return colour;
                  });
                  
                  //Add all methods within an entity 
                  var membersHeight =  titleBoxHeight * 1.5 ;
                  nodeEnter.selectAll("AddMemebers").data(function(d) { return d.members; })
                  .enter()                  
                  .append("text")
                  .attr("x", 10) 
                  .attr("y", function(d,i){
                        return membersHeight+ titleBoxHeight * i ;
                   })
                  .attr("dy", ".35em")
                  .attr("text-anchor", "left")
                  .text(function(d) { 
                     return d.name; 
                   })
                  .style("fill-opacity", 1);  

                }

                function update () {

                 var container = svg.append("g").attr("id","container");

                  // Compute the new tree layout.
                  var nodes = tree.nodes(root).reverse(),
                   links = tree.links(nodes);

                  // Normalize for fixed-depth.
                  nodes.forEach(function(d) { d.y = d.depth * 200; });

                  // Declare the nodesâ€¦
                 var node = container.selectAll("g.rrr").data(nodes, function(d) { return d.id || (d.id = ++i); });
                 buildBox(node);


                  // Declare the linksâ€¦
                  var link = container.selectAll("path.link").data(links, function(d) { return d.target.id; });

                  // Enter the links.
                  link.enter().insert("path", "g")
                   .attr("class", "link")
                   .attr("d", diagonal);

                }

                $scope.draw  = function () {
                    if (d3.select('#container')[0][0] !=null){
                        d3.select('#container').remove();
                    }
                    
                    update();
                }

               

                initialized();                

                $scope.buidData($scope.mainApp, generatedData);
                $scope.setRootData(generatedData);      
                $scope.draw();

        },
        link: function(scope) {


        }
    };
});







})();

