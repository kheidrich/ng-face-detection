import template from './detector.component.html'

function DetectorComponent(
    $element,
    FaceDetectionService,
    WebcamService
) {
    const ctrl = this;
    let webcamVideoStreamer = $element.find('video')[0];
    let webcamStream;

    ctrl.$onInit = $onInit;
    ctrl.$onDestroy = $onDestroy;

    async function $onInit() {
        webcamStream = await WebcamService.getWebcamStream();
        WebcamService.attachStreamToVideoElement(webcamVideoStreamer, webcamStream);
        FaceDetectionService.detectFaces(webcamVideoStreamer);
        FaceDetectionService.onDetection(faces => {
            ctrl.onDetect({ faces });
        });
    }

    function $onDestroy() {
        WebcamService.stopWebcamStream(webcamStream);
        FaceDetectionService.stopDetection();
    }
}

DetectorComponent.$inject = [
    '$element',
    'FaceDetectionService',
    'WebcamService'
]

export default {
    controller: DetectorComponent,
    controllerAs: 'detector',
    bindings: {
        height: '@',
        width: '@',
        onDetect: '&'
    },
    template
}