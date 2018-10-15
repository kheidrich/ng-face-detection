import angular from 'angular';

import TrackingModule from './detection/face-detection.module';

import DetectorComponent from './detector.component';
import WebcamService from  './webcam/webcam.service';

export default angular.module('ng-face-detection', [TrackingModule])
    .component('ngFaceDetector', DetectorComponent)
    .service('WebcamService', WebcamService)
    .name;