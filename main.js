song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1_status = "";
song2_status = "";
scorerightWrist = 0
scoreleftWrist=0
function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("PoseNet Is Initialized");
}

function draw() {
  image(video, 0, 0, 600, 500);
  song1_status = song1.isPlaying();
  song2_status = song2.isPlaying();
  fill("red")
  stroke("red")
  if (scorerightWrist>0.2) {
    circle(rightWristX, rightWristY, 20)
    song1.stop()
    if (song2_status ==false) {
      song2.play()
      document.getElementById("song").innerHTML = "playing hypeboy";
    }
  }
  if (scoreleftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    song2.stop();
    if (song1_status == false) {
      song1.play();
      document.getElementById("song").innerHTML = "playing dandelions";
    }
  }

}

function preload() {
  song1 = loadSound("dandelions.mp3");
  song2 = loadSound("hypeboy.mp3");
}
function gotPoses(results) {
  if (results.length > 0) {
  
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreleftWrist = " + scoreleftWrist);

    scorerightWrist = results[0].pose.keypoints[10].score;
    console.log("scorerightWrist = " + scorerightWrist);
  }
}