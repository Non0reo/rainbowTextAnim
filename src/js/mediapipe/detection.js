// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
	PoseLandmarker,
	FilesetResolver,
	DrawingUtils
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.21";


let poseLandmarker = undefined;
let runningMode = "VIDEO";
let enableWebcamButton;
let webcamRunning = false;
/* const videoHeight = "720px";
const videoWidth = "1280px"; */
const videoHeight = "216px";
const videoWidth = "384px";

const mediaPipe = {
	poseLandmarks: [],
	worldLandmarks: [],
  };

// Before we can use PoseLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
const createPoseLandmarker = async () => {
	const vision = await FilesetResolver.forVisionTasks(
		"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm"
	);
	poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
		baseOptions: {
			modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task`,
			delegate: "GPU"
		},
		runningMode: runningMode,
		numPoses: 1
	});
	await enableCam();
};

createPoseLandmarker();



/********************************************************************
// Demo 2: Continuously grab image from webcam stream and detect it.
********************************************************************/

const video = document.getElementById("webcam");
const canvasElement = document.getElementById(
	"output_canvas"
);
const canvasCtx = canvasElement.getContext("2d");
const drawingUtils = new DrawingUtils(canvasCtx);

// Check if webcam access is supported.
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
	enableWebcamButton = document.getElementById("webcamButton");
	/* enableWebcamButton.addEventListener("click", enableCam); */
	/* enableCam(); */
} else {
	console.warn("getUserMedia() is not supported by your browser");
}

// Enable the live webcam view and start detection.
function enableCam() {
	if (!poseLandmarker) {
		console.log("Wait! poseLandmaker not loaded yet.");
		return;
	}

	if (webcamRunning === true) {
		webcamRunning = false;
		enableWebcamButton.innerText = "ENABLE PREDICTIONS";
	} else {
		webcamRunning = true;
		enableWebcamButton.innerText = "DISABLE PREDICTIONS";
	}

	// getUsermedia parameters.
	const constraints = {
		video: true
	};

	// Activate the webcam stream.
	navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
		video.srcObject = stream;

		video.style.width = videoWidth;
		video.style.height = videoHeight;
	
		canvasElement.style.width = videoWidth;
		canvasElement.style.height = videoHeight;
		
		video.addEventListener("loadeddata", predictWebcam);
	});
}

let lastVideoTime = -1;
async function predictWebcam() {
	
	// Now let's start detecting the stream.
	if (runningMode === "IMAGE") {
		runningMode = "VIDEO";
		await poseLandmarker.setOptions({ runningMode: "VIDEO" });
	}
	let startTimeMs = performance.now();
	if (lastVideoTime !== video.currentTime) {
		lastVideoTime = video.currentTime;
		/* poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
			canvasCtx.save();
			canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
			for (const landmark of result.landmarks) {
				drawingUtils.drawLandmarks(landmark, {
					radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
				});
				drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
			}
			canvasCtx.restore();
		}); */
		const poseResults = poseLandmarker.detectForVideo(video, startTimeMs);
		mediaPipe.poseLandmarks = poseResults.landmarks;
		mediaPipe.worldLandmarks = poseResults.worldLandmarks
		
		setArmProgress();
	}

	// Call this function again to keep predicting when the browser is ready.
	if (webcamRunning === true) {
		window.requestAnimationFrame(predictWebcam);
	}
}

export { mediaPipe, DrawingUtils, PoseLandmarker };