import 'tracking';
import 'tracking/build/data/face';
import angular from 'angular';

import FaceDetectionService from './face-detection.service';

export default angular.module('ng-face-detection.tracking', [])
    .factory('tracking', () => {
        return tracking;
    })
    .service('FaceDetectionService', FaceDetectionService)
    .name;