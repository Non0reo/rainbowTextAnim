
const canvasElement = document.getElementById(
	"output_canvas"
);
const canvasCtx = canvasElement.getContext("2d");

// Canvas setup
canvasCtx.lineWidth = 2;
canvasCtx.strokeStyle = "red";
canvasCtx.fillStyle = "red";


function setArmProgress() {
    
    if(mediaPipe.poseLandmarks[0]) {

        const landmarks = mediaPipe.poseLandmarks[0];
        
        //Draw Right Arm Points
        canvasCtx.beginPath();
        canvasCtx.moveTo(landmarks[12][0], landmarks[12][1]);
        canvasCtx.lineTo(landmarks[14][0], landmarks[14][1]);
        canvasCtx.lineTo(landmarks[16][0], landmarks[16][1]);
        canvasCtx.lineTo(landmarks[18][0], landmarks[18][1]);
        canvasCtx.stroke();

        

    }

}