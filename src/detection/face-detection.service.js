function FaceDetectionService(
    $q,
    tracking
) {
    const service = this;
    let faceTracker = new tracking.ObjectTracker(['face']);
    let trackerTask;
    let trackedVideo;

    service.detectFaces = detectFaces;
    service.onDetection = onDetection;
    service.stopDetection = stopDetection;

    function detectFaces(videoElement) {
        trackedVideo = videoElement;
        trackerTask = tracking.track(videoElement, faceTracker);
    }

    function onDetection(listener) {
        faceTracker.on('track', async (event) => {
            let facesPositions = event.data;
            let frame = captureVideoFrameToCanvas(trackedVideo);
            let faces = await cropFacesFromFrame(facesPositions, frame);

            listener(faces);
        });
    }

    function stopDetection() {
        faceTracker.removeAllListeners();
        trackerTask.stop();
    }

    function captureVideoFrameToCanvas(videoElement) {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        canvas.width = videoElement.width;
        canvas.height = videoElement.height;
        context.drawImage(videoElement, 0, 0, videoElement.width, videoElement.height);

        return canvas;
    }

    function cropFacesFromFrame(facePositions, frame) {
        let faces = [];

        for (let face of facePositions) {
            let context = frame.getContext('2d');
            let faceCanvas = document.createElement('canvas');

            faceCanvas.width = face.width;
            faceCanvas.height = face.height;
            faceCanvas.getContext('2d')
                .putImageData(
                    context.getImageData(face.x, face.y, face.width, face.height),
                    face.width,
                    face.height
                );
            faces.push(
                $q(resolve => {
                    faceCanvas.toBlob((blob) => {
                        resolve(blob);
                    });
                })
            )
        }

        return $q.all(faces);
    }
}

FaceDetectionService.$inject = [
    '$q',
    'tracking'
];

export default FaceDetectionService; 