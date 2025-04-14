let progress = 0.0;

const canvasElement = document.getElementById(
	"output_canvas"
);
const canvasCtx = canvasElement.getContext("2d");
const video = document.getElementById("webcam");

// Canvas setup
canvasCtx.lineWidth = 2;
canvasCtx.strokeStyle = "red";
canvasCtx.fillStyle = "red";


function setArmProgress() {

    // Clear the canvas
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // Draw the video frame
    //canvasCtx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    // Get the current video time
    const currentTime = video.currentTime;
    // Get the current video frame
    const currentFrame = Math.floor(currentTime * video.frameRate);
    // Get the current video frame width and height

    if(mediaPipe.poseLandmarks[0]) {

        const landmarks = mediaPipe.poseLandmarks[0];
        
        //Draw line between elbow and wrist
        canvasCtx.strokeStyle = "red";
        canvasCtx.beginPath();
        canvasCtx.moveTo(landmarks[14].x * canvasElement.width, landmarks[14].y * canvasElement.height);
        canvasCtx.lineTo(landmarks[16].x * canvasElement.width, landmarks[16].y * canvasElement.height);
        canvasCtx.stroke();

        canvasCtx.strokeStyle = "green";
        canvasCtx.beginPath();
        canvasCtx.moveTo(landmarks[13].x * canvasElement.width, landmarks[13].y * canvasElement.height);
        canvasCtx.lineTo(landmarks[15].x * canvasElement.width, landmarks[15].y * canvasElement.height);
        canvasCtx.stroke();

        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        const map = (num, in_min, in_max, out_min, out_max) => {
            return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        }

        let elbowWristAngle = Math.atan2(
            landmarks[15].y - landmarks[13].y,
            landmarks[15].x - landmarks[13].x
        ) * (180 / Math.PI) + 180;

        elbowWristAngle = (elbowWristAngle + 360) % 360;

        progress = clamp(elbowWristAngle / 180, 0, 1);

        if (elbowWristAngle > 270) { 
            progress = 0;
        }

        progress = clamp(map(progress, 0.2, 0.7, 0, 1), 0, 1);


        // Draw the progress bar
        canvasCtx.fillStyle = "black";
        canvasCtx.fillRect(10, 10, 200, 20);
        canvasCtx.fillStyle = "green";
        canvasCtx.fillRect(10, 10, 200 * progress, 20);
        canvasCtx.fillStyle = "white";
        canvasCtx.font = "16px Arial";
        canvasCtx.fillText("Progress: " + Math.round(progress * 100) + "%", 10, 30);

        // Draw the angle
        canvasCtx.fillStyle = "white";
        canvasCtx.font = "16px Arial";
        canvasCtx.fillText("Angle: " + Math.round(elbowWristAngle) + "°", 10, 50);


        setLines();
        
    }

}