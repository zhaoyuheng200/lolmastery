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
var paintSim = function(){
  for (var tree = 0; tree < 3; tree++){
    paintTree(tree);
  }
  paintTooltip();
}

var paintTooltip = function(){
  var $tipNode = $("<div>").addClass("tooltip");
  $tipNode.append($("<div>").addClass("tip-icon-name"));
  $tipNode.append($("<div>").addClass("tip-icon-rank"));
  $tipNode.append($("<div>").addClass("tip-icon-content"));
  $("#mastery-sim").append($tipNode);
}

var paintTree = function(index){
  var $treeNode = 
    $("<div>")
      .addClass("tree")
      .attr("id",treeData[index].toLowerCase());
  paintTier($treeNode,masteryData[index]);
  $treeNode.append($("<div>").addClass("tree-name").text(treeData[index]));
  $("#mastery-sim").append($treeNode);
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
    $iconNode
      .on("mouseover",function(event){
        displayTooltip(this);
      })
      .on("mouseout",function(event){
        $(".tooltip").hide();
      })
  }
}

var displayTooltip = function(el){
  var tier = getTier(el);
  var tree = getTree(el);
  var index = getBtnIndex(el);
  var treeBtnIndex = getTreeBtnIndex(el);
  var points = t.masteryState[tree][treeBtnIndex];
  var type = masteryData[tree][tier].type;
  var mastery = masteryData[tree][tier].masteries.filter(function(val){
    if (val.index == index) return true;
  })[0];
  $(".tooltip .tip-icon-name")
    .text(mastery.name)
    .removeClass("ferocity")
    .removeClass("cunning")
    .removeClass("resolve")
    .addClass(treeData[tree].toLowerCase());
  $(".tooltip .tip-icon-rank").text(""+points+"/"+mastery.levels);
  if (points > 0) {
    $(".tooltip .tip-icon-rank").addClass("active");
  }else{
    $(".tooltip .tip-icon-rank").removeClass("active");
  }
  var getDesc = function(mastery,rank){
    var str =  mastery.desc;
    var displayRank = rank > 0 ? rank-1 : 0;
    if (mastery.levelDesc.length > 0){
      str = mastery.levelDesc.reduce(function(p,c){
        return p.split(c.holder).join(c.values[displayRank].toString());
      },str);
    }
    return str;
  }
  //populate description
  if (points == 0 || points == 5 || type == c.TIER_KEY){
    $(".tooltip .tip-icon-content").html(getDesc(mastery,points).replace(/\n/g,"<br>"));
  }
  if (points > 0 && points < mastery.levels){
    var str = getDesc(mastery,points) + "\n\nNext Rank:\n" + getDesc(mastery,points+1);
    str = str.replace(/\n/g,"<br>");
    $(".tooltip .tip-icon-content").html(str);
  } 
  console.log(str);
  $(".tooltip").show();
}


function init(){
  simInit();
}

var simInit = function (){
  //disable right click
  $("#mastery-sim").oncontextmenu = function(){return false;};
  //paint mastery trees
  paintSim();
  //setup t.masteryState;	
  $("#mastery-sim").contextmenu(function(ev){ev.preventDefault();});
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
  //setup mousemove
  $("#mastery-sim").on("mousemove",function(event){
    var offsetx = 20, offsety = 20;
    if (event.pageX - $(this).offset().left > $(this).width() - $(".tooltip").width() - 20){
      offsetx = -$(".tooltip").width() - 20;
    }
    if (event.pageY - $(this).offset().top >  $(this).height() - $(".tooltip").height() - 20){
      offsety = -$(".tooltip").height() - 20;
    }
    $(".tooltip").css({
      left: event.pageX - $(this).offset().left + offsetx,
      top: event.pageY - $(this).offset().top + offsety,
    });
  });
}

var getModifyStatus = function(el,delta){
  var totalPointsInMastery = getTotalPointsInMastery();
  var btnTier = getTier(el);
  var pointsRequired = c.POINTS_REQUIRED[btnTier];
  var pointsInTree = getPointsInTree(el);
  if (delta == 1){
    if (totalPointsInMastery < c.MAX_POINTS){
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
var getTotalPointsInMastery = function(){
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
      }else if (pointsInTier > 0 && (getTotalPointsInMastery() + 1) > c.MAX_POINTS){
        if (treeBtnIndex == tierFirstBtnIndex){
          t.masteryState[tree][tierFirstBtnIndex] += 1;
          t.masteryState[tree][tierFirstBtnIndex+1] -= 1;
	}else {
          t.masteryState[tree][tierFirstBtnIndex] -= 1;
          t.masteryState[tree][tierFirstBtnIndex+1] += 1;
	}
      }else if (pointsInTier == 0 && (getTotalPointsInMastery() + 5) <= c.MAX_POINTS){
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
  displayTooltip(el);
};
var exportMastery = function(){
  var str = "";
  for (var i = 0; i < t.masteryState.length; i++){
    str += t.masteryState[i].join("");
  }
  return str;
}
var importMastery = function(str){
  var array = str.split("");
  for (var i = 0; i < t.masteryState.length; i++){
    for (var j = 0; j < t.masteryState[i].length;j++){
      t.masteryState[i][j] = parseInt(array.shift()); 
    }
  }
}
var validateMastery = function(){
  //TODO
}
var paintMastery = function(){
  //clean up
  $(".points").removeClass("open").removeClass("active");
  $(".icon-frame").removeClass("available");
  $(".icon-frame").removeClass("active");
  $(".icon-button").removeClass("active");
  $(".points-content").text("0/5");
  var totalPointsInMastery = getTotalPointsInMastery();
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
      if (tier == reachedTier && totalPointsInMastery == c.MAX_POINTS && getTierPoints(anchor[0]) == 0 ){
	anchor.find(".icon-frame").removeClass("available");
	anchor.find(".icon-button").removeClass("active");
	anchor.find(".points").removeClass("open");
      }
    }
  }
}

var getTierPoints = function(el){
  var treeBtnIndex = getTreeBtnIndex(el);
  var tierFirstBtnIndex = 0;
  var tier = getTier(el);
  var tree = getTree(el);
  for (var i = 0; i < tier; i++){
    tierFirstBtnIndex += masteryData[tree][i].masteries.length;
  }
  var tierBtnLength = masteryData[tree][tier].masteries.length;
  var pointsInTier = 0;
  for (var i = 0; i < tierBtnLength; i++){
    pointsInTier += t.masteryState[tree][tierFirstBtnIndex+i];
  }
  return pointsInTier;
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


$(document).ready(init);
