//finger points
const fingerPoints = {
    thumb: [0, 1, 2,  3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
};

//draw hand mesh function
export const drawHand = (predictions, ctx) => {
    //check for predictions
    if (predictions.length>0) {
        //loop and draw
        predictions.forEach((prediction)=> {
            //grab landmarks
            const landmarks = prediction.landmarks;

            //loop through fingers
            for (let i = 0; i < Object.keys(fingerPoints).length; i++) {
                //define finger
                let finger = Object.keys(fingerPoints)[i];
                
                //loop through finger points
                for (let p = 0; p < fingerPoints[finger].length-1;p++) {
                    //get points
                    const firstIndex = fingerPoints[finger][p];
                    const secondIndex = fingerPoints[finger][p+1];

                    //draw path
                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firstIndex][0],
                        landmarks[firstIndex][1]
                    );
                    ctx.lineTo(
                        landmarks[secondIndex][0],
                        landmarks[secondIndex][1]
                    )
                    ctx.strokeStyle = "plum";
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }

            //loop and draw landmarks
            for (let i = 0; i < landmarks.length; i++) {
                //get x
                const x = landmarks[i][0];
                //get y
                const y = landmarks[i][1];
                //draw points
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 3*Math.PI);

                //set line color
                ctx.fillStyle = "indigo";
                ctx.fill();
            }
        })
    }
}