function WebcamService($q) {
    const service = this;

    service.getWebcamStream = getWebcamStream;
    service.stopWebcamStream = stopWebcamStream;
    service.attachStreamToVideoElement = attachStreamToVideoElement;
;
    function getWebcamStream() {
        return $q((resolve, reject) => {
            navigator.getUserMedia({ video: true }, resolve, reject)
        });
    }

    function stopWebcamStream(stream) {
        stream.getVideoTracks()[0].stop();
    }

    function attachStreamToVideoElement(videoElement, stream) {
        videoElement.src = window.URL.createObjectURL(stream);
        videoElement.play();
    }
}

WebcamService.$inject = [
    '$q'
]

export default WebcamService;