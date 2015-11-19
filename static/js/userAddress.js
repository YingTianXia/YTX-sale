/**
 * Created by hangwei on 15/11/6.
 */
(function($){
    var app = angular.module('myApp', []);
    app.controller('myCtrl', ['$scope', function($scope) {

        $('.false-show').show();

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

