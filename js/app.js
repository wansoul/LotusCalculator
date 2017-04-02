'use strict'

var app = angular.module("calculatorApp", []);

app.controller("calculatorCtrl", function($scope){
  
  $scope.result = "";
  $scope.expression = "";
  $scope.errorCounter = 0;
  $scope.firstTime = true;
  $scope.hideResult = true;
  $scope.resultSize = "large";
  resetDisplay();
  
  $scope.clear = function(clearAll){
    if(clearAll == false){
      var size = $scope.expression.length;
      if(size > 1 && $scope.firstTime == false){
        $scope.expression = $scope.expression.substr(0, size-1);
        evaluateExpression();
        return;
      } 
    }
    resetDisplay();
  }
  
  $scope.handleClick = function(i){
    if($scope.firstTime){
      $scope.firstTime = false;
      $scope.expression = i;
      return;
    }
    $scope.expression += i;
    evaluateExpression();
  }
  
  function evaluateExpression(){
    try {
      $scope.result = eval($scope.expression);
      $scope.hideResult = false;
      $scope.errorCounter = 0;  
    } catch (e) {
      $scope.hideResult = true;
      $scope.errorCounter++;
    }
  }
  
  function resetDisplay(){
    $scope.firstTime = true;
    $scope.result = "";
    $scope.expression = "LotusCalculator";
    $scope.errorCounter = 0;
    $scope.hideResult = true;
  }
  
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
    console.log('Service Worker registered');
  }).catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}