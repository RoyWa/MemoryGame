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
             
                var tree;

                var svg;
                var i =0;
                var diagonal;
            
                var margin = {top: 20, right: 120, bottom: 20, left: 120};
                var width = 960 - margin.right - margin.left;
                var height = 500 - margin.top - margin.bottom;
                
                var root;


                var duration = 750; 

                var generatedData = {"name": $scope.mainApp , "children": [] }



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

                $scope.buidData= function (node, targetNode){
                  console.info('@@@@@@@@@@@', node);

                  var requires = angular.module(node).requires;
                  if (requires.length===0 || angular.module(node)._Spy_) return;

                  //angular.module(node)._Spy_ = true ; //Dirty flag to avoid graph recursion
                  angular.forEach(requires, function(value, key) {
                    if (value!='_Spy_'){
                      var obj = {"name": value, "color": "red" , "children": [] };
                      $scope.buidData(value , obj.children);
                      this.push(obj);
                    }
                  }, targetNode);

                  console.info("#######", JSON.stringify( generatedData, null , 2));                                    
                  
                  $scope.setRootData(generatedData);                     
                }

                $scope.setRootData= function (data){
                    root = data;
                    root.x0 = height / 2;
                    root.y0 = 0;
                }

                // ************** Generate the tree diagram  *****************
                function update (source) {

                 var container = svg.append("g").attr("id","container");

                  // Compute the new tree layout.
                  var nodes = tree.nodes(root).reverse(),
                   links = tree.links(nodes);

                  // Normalize for fixed-depth.
                  nodes.forEach(function(d) { d.y = d.depth * 100; });

                  // Declare the nodesâ€¦
                 var node = container.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

                  // Enter the nodes.
                  var nodeEnter = node.enter().append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) {return "translate(" + source.x0 + "," + source.y0 + ")"; })
                   .on("click", click);

                  nodeEnter.append("circle")
                   .attr("r", 10)
                   .style("fill", function(d) { return d.color; });

                  nodeEnter.append("text")
                     .attr("y", function(d) { return d.children || d._children ? -18 : 18; })
                     .attr("dy", ".35em")
                     .attr("text-anchor", "middle")
                     .text(function(d) { return d.name; })
                     .style("fill-opacity", 1);


  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  nodeUpdate.select("circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);

                  // Declare the linksâ€¦
                  var link = container.selectAll("path.link")
                   .data(links, function(d) { return d.target.id; });

                  // Enter the links.
                  link.enter().insert("path", "g")
                   .attr("class", "link")
                     .attr("d", function(d) {
    var o = {x: source.x0, y: source.y0};
    return diagonal({source: o, target: o});
    });


 // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
    var o = {x: source.x, y: source.y};
    return diagonal({source: o, target: o});
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
  d.x0 = d.x;
  d.y0 = d.y;
  });


                }


// Toggle children on click.
function click(d) {
  if (d.children) {
  d._children = d.children;
  d.children = null;
  } else {
  d.children = d._children;
  d._children = null;
  }
  $scope.draw(d);
}


                $scope.draw  = function (d) {
                    if (d3.select('#container')[0][0] !=null){
                        d3.select('#container').remove();
                    }
                    
                    update(d);
                }

               

                initialized();                

                $scope.buidData($scope.mainApp, generatedData.children);
                $scope.draw(root);

        },
        link: function(scope) {


        }
    };
});







})();

