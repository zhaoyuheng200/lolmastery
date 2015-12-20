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

function init(){
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
webapp.controller("simController", function($scope){
  //clone data;
  $scope.masteryData = JSON.parse(JSON.stringify(masteryData));
  $scope.treeData = JSON.parse(JSON.stringify(treeData));
  $scope.getKeyTierClass = function(tier){
    var className = "";
    if (tier.type == "key"){
      className = className + "key-tier-" + (tier.tier-1)/2;
    }
    return className;
  }
});

