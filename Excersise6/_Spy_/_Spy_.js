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
        scope: true, //true = meaning should act as a child scop with ref to the parent
        template: $templateCache.get('container.html') ,
        controller: function($scope, $element, $attrs, $transclude) { 
                var root;
                var tree;

                var svg;
                var i =0;
                var diagonal;
            
                var margin = {top: 20, right: 120, bottom: 20, left: 120};
                var width = 960 - margin.right - margin.left;
                var height = 500 - margin.top - margin.bottom;
                 


                function initialized(){
                    tree = d3.layout.tree().size([height, width]);
                    diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });

                    svg = d3.select("#treeContainer").append("svg")
                     .attr("width", width + margin.right + margin.left)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    
                     root=  getRootData();
                }

                function getRootData (){
                    var treeData = [
                                      {
                                        "name": "Top Level",
                                        "children": [
                                          {
                                            "name": "Level 2: A",
                                            "children": [
                                              {
                                                "name": "Son of A"
                                              },
                                              {
                                                "name": "Daughter of A"
                                              }
                                            ]
                                          },
                                          {
                                            "name": "Level 2: B"
                                          }
                                        ]
                                      }
                                    ];
                    return treeData[0];
                }

                $scope.setRootData= function (data){
                    root = getRootData2();//data;
                }

                function getRootData2(){
                    var treeData = [
                                      {
                                        "name": "Top Level",
                                        "children": [
                                          {
                                            "name": "Level 2: A",
                                            "children": [
                                              {
                                                "name": "Son of A"
                                              },
                                              {
                                                "name": "Daughter of A"
                                              },
                                              {
                                                "name": "Daughter of A"
                                              },
                                              {
                                                "name": "Daughter of A"
                                              }                                                                                            
                                            ]
                                          },
                                          {
                                            "name": "Level 2: B"
                                          }
                                        ]
                                      }
                                    ];
                    return treeData[0];
                }


                // ************** Generate the tree diagram  *****************
                function update () {

                 var container = svg.append("g").attr("id","container");

                  // Compute the new tree layout.
                  var nodes = tree.nodes(root).reverse(),
                   links = tree.links(nodes);

                  // Normalize for fixed-depth.
                  nodes.forEach(function(d) { d.y = d.depth * 180; });

                  // Declare the nodesâ€¦
                 var node = container.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

                  // Enter the nodes.
                  var nodeEnter = node.enter().append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) { 
                    return "translate(" + d.y + "," + d.x + ")"; });

                  nodeEnter.append("circle")
                   .attr("r", 10)
                   .style("fill", "#fff");

                  nodeEnter.append("text")
                   .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
                   .attr("dy", ".35em")
                   .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                   .text(function(d) { return d.name; })
                   .style("fill-opacity", 1);

                  // Declare the linksâ€¦
                  var link = container.selectAll("path.link")
                   .data(links, function(d) { return d.target.id; });

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
                $scope.draw();
        },
        link: function(scope) {


        }
    };
});







})();

