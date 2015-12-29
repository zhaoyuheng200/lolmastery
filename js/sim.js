//Global
var c = {
  DEBUG: false,
  MAX_POINTS: 30,
  POINTS_REQUIRED: [0,5,6,11,12,17],
  TREE_MAX_INDEX: [
    masteryData[0][masteryData[0].length-1].masteries[masteryData[0][masteryData[0].length-1].masteries.length-1].index,
    masteryData[1][masteryData[1].length-1].masteries[masteryData[1][masteryData[1].length-1].masteries.length-1].index,
    masteryData[2][masteryData[2].length-1].masteries[masteryData[2][masteryData[2].length-1].masteries.length-1].index],
  TIER_NORMAL: "normal",
  TIER_KEY: "key"
}
var t = {
  treePoints : [0,0,0],
  masteryState : [[],[],[]],
  buttonElements: [[],[],[]]
}
//
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
      .addClass("order-"+masteries[i].order)
      .addClass("index-"+masteries[i].index)
      .on("mouseup",btnMouseClick)
      .on("mousewheel",btnMouseWheel);
    $iconNode.append($("<div>").addClass("icons-"+masteries[i].index).addClass("icon-button"));
    $iconNode.append($("<div>").addClass("icon-frame"));
    if (tierData.type == c.TIER_NORMAL){
      var pointsDiv = $("<div>").addClass("points");
      pointsDiv.append($("<div>").addClass("background"));
      pointsDiv.append($("<div>").addClass("points-content"));
      $iconNode.append(pointsDiv);
    }
    if (tierData.tier == 0){
      $iconNode.find(".icon-frame").addClass("available");
    }else{
      $iconNode.find(".icon-frame").addClass("unavailable");
    }
    $tierNode.append($iconNode);
  }
}

function init(){
  paintSim();
  simInit();
  $("#masterySim").oncontextmenu = function(){return false;};
}
var simInit = function (){
  //setup t.masteryState;	
  $("#masterySim").contextmenu(function(ev){ev.preventDefault();});
  for (var i = 0; i <= c.TREE_MAX_INDEX[0]; i++){
    t.masteryState[0][i] = 0;
  }
  for (var i = 1; i < 3; i++){
    for (var j = 0; j < c.TREE_MAX_INDEX[i]-c.TREE_MAX_INDEX[i-1]; j++)
      t.masteryState[i][j] = 0;
  }
  //setup t.buttonElements;
  var btnSortFn = function(a,b){
    return getBtnIndex(a)<getBtnIndex(b) ? -1 : 1;
  }
  t.buttonElements[0] = $("#ferocity .icon").sort(btnSortFn);
  t.buttonElements[1] = $("#cunning .icon").sort(btnSortFn);
  t.buttonElements[2] = $("#resolve .icon").sort(btnSortFn);
  paintMastery();
}

$(document).ready(init);

var getModifyStatus = function(el,delta){
  var totalPointsInTree = getTotalPointsInTree();
  var btnTier = getTier(el);
  var pointsRequired = c.POINTS_REQUIRED[btnTier];
  var pointsInTree = getPointsInTree(el);
  if (delta == 1){
    if (totalPointsInTree < c.MAX_POINTS){
      if (pointsRequired > pointsInTree){
        return false;
      }else return true;
    }else{
      var treeBtnIndex = getTreeBtnIndex(el);
      var tierFirstBtnIndex = 0;
      var tier = getTier(el);
      var tree = getTree(el);
      for (var i = 0; i < tier; i++){
        tierFirstBtnIndex += masteryData[tree][i].masteries.length;
      }
      var tierBtnLength = masteryData[tree][tier].masteries.length;
      if (masteryData[tree][tier].type == c.TIER_NORMAL){
        if (treeBtnIndex == tierFirstBtnIndex && (t.masteryState[tree][treeBtnIndex+1] > 0)
            || treeBtnIndex != tierFirstBtnIndex && (t.masteryState[tree][tierFirstBtnIndex] > 0)){
          return true;
        }else{
	  return false;
	}
      }else{
	var pointsInTier = 0;
	for (var i = 0; i < tierBtnLength; i++){
	  pointsInTier += t.masteryState[tree][tierFirstBtnIndex+i];
	}
	if (pointsInTier > 0) return true;
	else return false;
      }
    }
  }else if (delta == -1){
    if ( pointsRequired == 17 && pointsInTree >= 17 //last keystone
         || pointsRequired < pointsInTree && pointsInTree <= c.POINTS_REQUIRED[btnTier+1]){
      return true;
    }else return false;
  }
}
var getTotalPointsInTree = function(){
  var retval = 0;
  for (var i = 0; i < t.masteryState.length; i++){
    retval += t.masteryState[i].reduce(function(p,c){return p+c;});
  }
  return retval;
}

var btnMouseClick = function(ev){
  if (ev.button == 0){
    alterMastery(this,1);
  }else if (ev.button == 2){
    alterMastery(this,-1);
  }
  /*console.log(this);
  console.log(getBtnIndex(this));
  console.log(getTreeBtnIndex(this));
  console.log(getTier(this));
  console.log(getTree(this));*/
};

var btnMouseWheel = function(ev){
  alterMastery(this,ev.deltaY)
};

var alterMastery = function(el,delta){
  if (!getModifyStatus(el,delta)) return;
  var tree = getTree(el);
  var tier = getTier(el);
  var treeBtnIndex = getTreeBtnIndex(el);
  var tierFirstBtnIndex = 0;
  for (var i = 0; i < tier; i++){
    tierFirstBtnIndex += masteryData[tree][i].masteries.length;
  }
  var tierLength = masteryData[tree][tier].masteries.length;
  if (masteryData[tree][tier].type == c.TIER_NORMAL){
    if (delta == 1){
      var pointsInTier = 0;
      for (var i = 0; i < tierLength; i++){
        pointsInTier += t.masteryState[tree][tierFirstBtnIndex+i];
      } 
      if (pointsInTier == 5){
        if (t.masteryState[tree][treeBtnIndex] == 5)
          return;
	else {
          if (treeBtnIndex == tierFirstBtnIndex){
            t.masteryState[tree][tierFirstBtnIndex] += 1;
            t.masteryState[tree][tierFirstBtnIndex+1] -= 1;
	  }else{
            t.masteryState[tree][tierFirstBtnIndex] -= 1;
            t.masteryState[tree][tierFirstBtnIndex+1] += 1;
	  }
	}
      }else if (pointsInTier > 0 && (getTotalPointsInTree() + 1) > c.MAX_POINTS){
        if (treeBtnIndex == tierFirstBtnIndex){
          t.masteryState[tree][tierFirstBtnIndex] += 1;
          t.masteryState[tree][tierFirstBtnIndex+1] -= 1;
	}else {
          t.masteryState[tree][tierFirstBtnIndex] -= 1;
          t.masteryState[tree][tierFirstBtnIndex+1] += 1;
	}
      }else if (pointsInTier == 0 && (getTotalPointsInTree() + 5) <= c.MAX_POINTS){
        t.masteryState[tree][treeBtnIndex] += 5;
      }else{
        t.masteryState[tree][treeBtnIndex] += 1;
      }
    }else if (delta == -1 && t.masteryState[tree][treeBtnIndex] >= 1){
      t.masteryState[tree][treeBtnIndex] -= 1;
    }
  }else if (masteryData[tree][tier].type == c.TIER_KEY){
    if (delta == 1){
      if (t.masteryState[tree][treeBtnIndex] == 1) return;
      else {
        for (var i = 0; i < tierLength; i++){
	  t.masteryState[tree][tierFirstBtnIndex+i] = 0;
	}
	t.masteryState[tree][treeBtnIndex] = 1;
      }
    } else if (delta == -1){
      t.masteryState[tree][treeBtnIndex] = 0;
    }
  }
  paintMastery();
};

var paintMastery = function(){
  //clean up
  $(".points").removeClass("open").removeClass("active");
  $(".icon-frame").removeClass("available");
  $(".icon-frame").removeClass("active");
  $(".icon-button").removeClass("active");
  $(".points-content").text("0/5");
  //
  for (var i = 0; i < t.masteryState.length; i++){
    var pointsInTree = t.masteryState[i].reduce(function(p,c){return p+c;});
    var reachedTier = c.POINTS_REQUIRED.reduce(function(p,cv,ci,arr){
      if (pointsInTree < cv) return p;
      else{
        if (pointsInTree >= cv) return ci;
      }
    });
    for (var j = 0; j < t.masteryState[i].length; j++){
      var anchor = $(t.buttonElements[i][j]);
      var tier  = getTier(t.buttonElements[i][j]);
      if (tier <= reachedTier){
	if (tier%2 == 0){
	  anchor.find(".points-content").text(t.masteryState[i][j] + "/5");
	  anchor.find(".icon-frame").addClass("available");
	  if(t.masteryState[i][j] >= 1){
	    anchor.find(".icon-button").addClass("active");
	    anchor.find(".points").addClass("active");
	  }else{
	    anchor.find(".icon-button").addClass("active");
	    anchor.find(".points").addClass("open");
	  }
	}else{
	    anchor.find(".icon-button").addClass("active");
          if (t.masteryState[i][j] == 1){
	    anchor.find(".icon-frame").addClass("active");
	  }else{
	    anchor.find(".icon-frame").addClass("available");
	  }
	}
      }
    }
  }
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

var getPointsInTree = function(el){
  var tree = getTree(el);
  return t.masteryState[tree].reduce(function(p,c){return p+c;});
}

var getBtnIndex = function(el){
  return getClassNumber(/index\-[0-9]+/,el);
}

var getTreeBtnIndex = function(el){
  var index = getClassNumber(/index-[0-9]+/,el);
  if (index > c.TREE_MAX_INDEX[1]){
    return index-c.TREE_MAX_INDEX[1]-1;
  }else if (index > c.TREE_MAX_INDEX[0]){
    return index-c.TREE_MAX_INDEX[0]-1;
  }else return index;
}

var getTier = function(el){
  if ($(el).hasClass("tier")){
    return getClassNumber(/tier-[0-9]/,el);
  }else{
    return getClassNumber(/tier-[0-9]/,$(el).parents(".tier")[0]);
  }
}

var getTree = function(el){
  if (!$(el).hasClass(".tree")){
    el = $(el).parents(".tree")[0]
  }
  var i = 0;
  while(treeData[i].toLowerCase() != $(el).attr("id")){
    i++;
    if (i > treeData.length){
      console.log("something is wrong, I can't find the correct mastery tree for the button");
      break;
    }
  };
  return i;
}

var getClassNumber = function(regex,el){
  var classStrArray = el.className.split(" ").filter(
    function(val){
      return regex.test(val);
    }
  )[0].split("-");
  return parseInt(classStrArray[classStrArray.length-1]);
}


