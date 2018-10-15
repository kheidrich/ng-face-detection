import angular from 'angular';
import template from './test.html';

angular.module('test-module', ['ng-face-detection'])
    .component('testComponent', {
        controllerAs: 'test',
        controller: function ($scope) {
            let ctrl = this;
            let canvas = document.querySelector('canvas');

            ctrl.onDetect = (faces) => {
                for (let face of faces) {
                    let formData = new FormData()

                    formData.append('face', face);
                    formData.append('id', 'hehe');
                    fetch('http://localhost:4001/students', {
                        method: 'POST',
                        body: formData
                    })
                }
            };
            ctrl.active = true;


            setTimeout(() => {
                ctrl.active = false;
                $scope.$digest();
            }, 2000);

            return;
            setTimeout(() => {
                ctrl.active = true;
                $scope.$digest();
            }, 2000);

            setTimeout(() => {
                ctrl.active = false;
                $scope.$digest();
            }, 3000);
        },
        template
    });