(function () {
  'use strict';

var app = angular.module('DirectivesModule', [ ]);


/**
    * @ngdoc directive 
    * @name DirectivesModule.directive:shoppingCart 
    * @restrict E 
    * @element <shopping-cart></shopping-cart>
    * @priority 1000 
    * @scope  true 
**/
app.directive("diagram", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: true, //true = meaning should act as a child scop with ref to the parent
        template: '<div id="treeContainer"></div>',
        controller: function($scope, $element, $attrs, $transclude) { 

        },
        link: function(scope) {
                var root;
                var tree ;

                var svg;
                var i =0;
                var diagonal;
            
                 var margin = {top: 20, right: 120, bottom: 20, left: 120},
                 width = 960 - margin.right - margin.left,
                 height = 500 - margin.top - margin.bottom;
                 
                 i = 0;

                 tree = d3.layout.tree()
                 .size([height, width]);

                 diagonal = d3.svg.diagonal()
                 .projection(function(d) { return [d.y, d.x]; });

                 svg = d3.select("#treeContainer").append("svg")
                 .attr("width", width + margin.right + margin.left)
                 .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                root = treeData[0];
                  
                update(root);



                function update(source) {

                  // Compute the new tree layout.
                  var nodes = tree.nodes(root).reverse(),
                   links = tree.links(nodes);

                  // Normalize for fixed-depth.
                  nodes.forEach(function(d) { d.y = d.depth * 180; });

                  // Declare the nodesâ€¦
                 var node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

                  // Enter the nodes.
                  var nodeEnter = node.enter().append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) { 
                    return "translate(" + d.y + "," + d.x + ")"; });

                  nodeEnter.append("circle")
                   .attr("r", 10)
                   .style("fill", "#fff");

                  nodeEnter.append("text")
                   .attr("x", function(d) { 
                    return d.children || d._children ? -13 : 13; })
                   .attr("dy", ".35em")
                   .attr("text-anchor", function(d) { 
                    return d.children || d._children ? "end" : "start"; })
                   .text(function(d) { return d.name; })
                   .style("fill-opacity", 1);

                  // Declare the linksâ€¦
                  var link = svg.selectAll("path.link")
                   .data(links, function(d) { return d.target.id; });

                  // Enter the links.
                  link.enter().insert("path", "g")
                   .attr("class", "link")
                   .attr("d", diagonal);

                }




//******

        }
    };
});


})();