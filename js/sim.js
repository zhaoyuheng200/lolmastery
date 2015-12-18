//Global
var MAX_POINTS = 30;
var POINTS_REQUIRED = [0,5,6,11,12,17];
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
    for (var level =0; level< masteryData[tree].length; level++){
      var paintedLevel = paintLevel(tree,level);
      var tier = masteryData[tree][level];
      for (var icon=0; icon< tier.length; icon++){
        paintIcon(paintedLevel,tier
      }
    }
  }
}

var paintLevel = function(tree,level){
}
