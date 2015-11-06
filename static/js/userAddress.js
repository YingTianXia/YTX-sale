/**
 * Created by hangwei on 15/11/6.
 */
(function($){
    var app = angular.module('myApp', []);
    app.controller('myCtrl', ['$scope', function($scope) {
        $('.false-show').show();
        $scope.back={}
        $scope.reset=function(){
            $scope.back.detail=$scope.send.detail;
            $scope.back.code=$scope.send.code;
            $scope.back.name=$scope.send.name;
            $scope.back.phone=$scope.send.phone;
            $scope.back.province=$scope.send.province;
            $scope.back.city=$scope.send.city;
            $scope.back.area=$scope.send.area;
        }
        $scope.save = function() {
            // check to make sure the form is completely valid
            if ($scope.addressForm.$valid) {
                alert('success');
            }else{
                alert('请填写必须信息')
            }

        };
        console.log($scope)
    }]);
})(jQuery)

