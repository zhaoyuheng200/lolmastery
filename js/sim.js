//Global
var c = {
  DEBUG: true,
  MAX_POINTS: 30,
  POINTS_REQUIRED: [0,5,6,11,12,17],
  TIER_NORMAL: "normal",
  TIER_KEY: "key"
}
var POINTS_STYLES = {
  width: 64,
  height: 64,
  normal: {
  },
  key:{
  }
}
var treeNames = ["Ferocity","Cunning","Resolve"];
var paintSim = function(){
  for (var tree = 0; tree < 3; tree++){
    paintTree(tree);
  }
}

var paintTree = function(index){
  var $treeNode = 
    $("<div>")
      .addClass("tree")
      .attr("id",treeData[index].toLowerCase());
  paintTier($treeNode,masteryData[index]);
  $("#masterySim").append($treeNode);
}

var paintTier = function($treeNode,tiers){
  for (var i = 0; i < tiers.length; i++){
    var $tierNode = $("<div>");
    $tierNode
      .addClass("tier")
      .addClass("tier-"+tiers[i].tier);
    if (tiers[i].type == c.TIER_NORMAL){
      $tierNode.addClass(c.TIER_NORMAL+"-length-"+tiers[i].masteries.length);
    }else{
      $tierNode.addClass(c.TIER_KEY+"-length-"+tiers[i].masteries.length);
      switch(tiers[i].tier){
        case 1:
          $tierNode.addClass(c.TIER_KEY+"-tier-0");
	  break;
        case 3:
          $tierNode.addClass(c.TIER_KEY+"-tier-1");
	  break;
        case 5:
          $tierNode.addClass(c.TIER_KEY+"-tier-2");
	  break;
      }
    }
    paintIcons($tierNode,tiers[i]);
    $treeNode.append($tierNode);
  }
}

var paintIcons = function($tierNode,tierData){
  var masteries = tierData.masteries;
  for (var i = 0; i < masteries.length; i++){
    var $iconNode = $("<div>");
    $iconNode
      .addClass("icon")
      .addClass("order-"+masteries[i].order);
    $iconNode.append($("<div>").addClass("icons-"+masteries[i].index).addClass("iconButton"));
    $iconNode.append($("<div>").addClass("icon-frame"));
    if (tierData.type == c.TIER_NORMAL){
      $iconNode.append($("<div>").addClass("points"));
    }
    $tierNode.append($iconNode);
  }
}

function init(){
  paintSim();
  if (c.DEBUG){
    $(".icons-0").siblings(".icon-frame").addClass("unavailable");
    $(".icons-1").siblings(".icon-frame").addClass("available");
    $(".icons-1").addClass("active");
    $(".icons-2").siblings(".icon-frame").addClass("active");
    $(".icons-6").siblings(".icon-frame").addClass("active");
    $(".icons-10").siblings(".icon-frame").addClass("active");
    $(".icons-15").siblings(".icon-frame").addClass("active");
    $(".icons-20").siblings(".icon-frame").addClass("active");
    $(".icons-24").siblings(".icon-frame").addClass("active");
    $(".icons-27").siblings(".icon-frame").addClass("active");
    $(".icons-30").siblings(".icon-frame").addClass("active");
    $(".icons-34").siblings(".icon-frame").addClass("active");
    $(".icons-37").siblings(".icon-frame").addClass("active");
  }
}

$(document).ready(init)

var webapp = angular.module("webapp",[]);
app.controller("simController", function($scope){
}

