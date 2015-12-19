//Global
var c = {
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
    $tierNode.addClass("tier-"+tiers[i].tier);
    if (tiers[i].type == c.TIER_NORMAL){
      $tierNode.addClass(c.TIER_NORMAL);
    }else{
      $tierNode.addClass(c.TIER_KEY);
      switch(tiers[i].tier){
        case 1:
          $tierNode.addClass(c.TIER_KEY+"-0");
	  break;
        case 3:
          $tierNode.addClass(c.TIER_KEY+"-1");
	  break;
        case 5:
          $tierNode.addClass(c.TIER_KEY+"-2");
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
    $iconNode.addClass("icons-"+masteries[i].index);
    if (tierData.type == c.TIER_NORMAL){
      $iconNode.append($("<div>").addClass("points"));
    }
    $tierNode.append($iconNode);
  }
}


paintSim();
