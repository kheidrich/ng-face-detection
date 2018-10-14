import angular from 'angular';
import template from './test.html';

angular.module('test-module', ['ng-face-detection'])
    .component('testComponent', {
        controller: function () {

        },
        template
    });