//
//  Project: "I Read You"
//
//  Assignment 2 & 3
//  ARCH1477 Computational Prototyping for Industrial Design
//
//  Patrick Hibbert, s3664204
//

// Global variables
var backgroundColour
var mode
var tutorialScreen
var points = []
var mult = 0.005

// Create and name variables
let left_lens;
let right_lens;
let img;
let video;
let vid;
let flippedVideo;
let label = "";
let font;
let button;
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/srEuXgicq/';

// Fonts and sign language model are pre-loaded for use by the application
// The assets directory is referenced as the location for each file
function preload() {
  font = loadFont('assets/genos_font.ttf');
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

// Project setup elements (including Canvas and Video)
function setup() {
  tutorialScreen =  0;
  createCanvas(1750, 980);
  textFont(font);
  background(30);
  video = createCapture(VIDEO);
  video.size(700, 540);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();

  // Load Images to be used throughout the application
  auslan_b = loadImage('assets/auslan_b.png');
  computer = loadImage('assets/computer.png');
  demo = loadImage('assets/demo_image.png');
  
  // Load Video to be used throughout the application
  vid = createVideo('assets/tutorial_video.mp4');

  // Draw video to the Canvas instead of separate element
  vid.hide();

  // Setup for the flow field animation (constructed below)
  var density = 30
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x, y)
      points.push(p)
    }
  }
  // Size and position of circles used on the "Welcome Screen"
  left_lens = new lens(615, 445, 440);
  right_lens = new lens(1130, 445, 440);

  // Size and position of rounded rectangles used for text boxes
  text_box_1 = new text_box(845, 160, 840, 112, 20);
  text_box_2 = new text_box(845, 360, 840, 112, 20);
  text_box_3 = new text_box(845, 560, 840, 112, 20);
  text_box_4 = new text_box(1380, 783, 300, 40, 20);
  text_box_5 = new text_box(840, 343, 860, 165, 20);
  text_box_6 = new text_box(1449, 783, 240, 40, 20);
  text_box_7 = new text_box(590, 665, 580, 50, 20);
  text_box_8 = new text_box(480, 200, 800, 120, 20);
  text_box_9 = new text_box(246, 640, 344, 40, 20);
  text_box_10 = new text_box(1277, 783, 348, 40, 20);

  // Size and position of circle used for image frames
  frame_1 = new circle_frame(450, 420, 400, 400);
  frame_2 = new circle_frame(450, 420, 400, 400);
  
}

function draw() {
  // Define the screens that will be displayed throughout the program
  // These can be broken-down into 4 distinct categories
  // (1). Welcome Screen, (2). Tutorial Intro, (3). Tutorial, (4). Tutorial Over
  if (tutorialScreen == 0) {
    welcomeScreen();
  } else if (tutorialScreen == 1) {
    tutorialIntroScreen1();
  } else if (tutorialScreen == 2) {
    tutorialIntroScreen2();
  } else if (tutorialScreen == 3) {
    tutorialCanvas();
  } else if (tutorialScreen == 4) {
    tutorialOverScreen();
    }
}

function welcomeScreen() {
  // Welcome page / splash screen to introduce the user to the project
  // Flow field animation is used to set the tone of the project
  // Animation will be positioned inside the lenses of a pair of glasses (constructed below)
  noStroke()
  fill(255, 210, 0)

  for (var i = 0; i < points.length; i++) {

    var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 200)

    points[i].add(createVector(cos(angle), sin(angle)))

    // Defining the position of the flow field animation (left lens)
    if (dist(width / 2.85, height / 2.2, points[i].x, points[i].y) < 200) {
     ellipse(points[i].x, points[i].y, 1)
    }

    // Defining the position of the flow field animation (right lens)
    if (dist(width / 1.55, height / 2.2, points[i].x, points[i].y) < 200) {
     ellipse(points[i].x, points[i].y, 1)
    }
  }
  
  // Text is used to welcome the user to the application
  fill(200);
  textSize(40);
  text('Welcome to...', 60, 60);
  fill(200);
  textSize(90);
  text('"I Read You"', 60, 130);
  textSize(35);
  text('Hosted By', 60, 760);
  textSize(50);
  text('Patrick Hibbert', 60, 800);
  // Apply flashing text to guide user input
  fill(255, 210, 0 + sin(frameCount*0.1) * 200);
  textSize(40);
  stroke(40);
  text('Press ENTER to Begin...', 1320, 810);

  // Create the components, position and style of the glasses
  noFill();
  stroke(255);
  strokeWeight(3);
  // Component: Bridge
  arc(873, 418, 140, 140, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
  // Lenses of the glasses constructed in class ("Circle") below
  left_lens.display();
  right_lens.display();
  }

function tutorialIntroScreen1() {
  // Tutorial Intro page (1)
  // Explains the fundamentals of the program to the user
  background(30); 
  // Flow field animation that will surround the text (sets the relaxing tone for the program)
  var density = 30
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x, y)
      points.push(p)
    }
  }
  
  noStroke();
  fill(255);

  for (var i = 0; i < points.length; i++) {

    var angle = map(noise(points[i].x * mult, points[i].y * mult), 100, 1, 1, 900)

    points[i].add(createVector(cos(angle), sin(angle)))

    // Defining the position of the flow field animation
    ellipse(points[i].x, points[i].y, 1)
  }

  // Framing surrounding text blocks (designed for legibiliy)
  text_box_1.display();
  text_box_2.display();
  text_box_3.display();
  text_box_4.display();
  
  // Circular framing for imagery
  frame_1.display();

  // AUSLAN "B" image
  image(auslan_b, 305, 275, auslan_b.width / 7, auslan_b.height / 7)

   // Introduction text (no effects applied)
  strokeWeight(1);
  fill(255, 210, 0);
  textSize(40);
   // Text Block (1)
  text('"I Read You" is an application designed to teach people', 865, 200);
  text('sign language (AUSLAN).', 865, 250);
   // Text Block (2)
  text('AUSLAN is the predominant sign language of the', 865, 400);
  text('Australian Deaf Community.', 865, 450);
   // Text Block (3)
  text('Nearly 20,000 people converse in AUSLAN every day.', 865, 600);
  text('This tutorial will show you just how easy it is!', 865, 650);
  textSize(30);
  text('Press "N" to Continue...', 1405, 810);
  textSize(50);
  strokeWeight(3);
  stroke(255, 190, 10)
  fill(255, 190, 10);
  text('B', 432, 550);
  }

function tutorialIntroScreen2() {
  // Tutorial Intro page (2)
  // Explains the fundamentals of the program to the user
  background(30);

  // Flow field animation that will surround the text (sets the relaxing tone for the program)
  var density = 30
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x, y)
      points.push(p)
    }
  }

  noStroke();
  fill(255);

  for (var i = 0; i < points.length; i++) {

    var angle = map(noise(points[i].x * mult, points[i].y * mult), 100, 1, 1, 900)

    points[i].add(createVector(cos(angle), sin(angle)))

    // Defining the position of the flow field animation
    ellipse(points[i].x, points[i].y, 1) 
  }

  // Framing surrounding text blocks
  text_box_5.display();
  text_box_6.display();
  text_box_9.display();

   // Explanatory text
  strokeWeight(1);
  fill(255, 210, 0);
  textSize(40);
   // Text Block
  text('This tutorial uses the webcam to read your gestures.', 865, 382);
  text('For accurate results, make sure you are in a well-lit', 865, 432);
  text('space and the camera is focused on your hands.', 865, 482);
  textSize(30);
  text('Press "S" to Start...', 1464, 810);
  text('Press OPTION to Play Video', 262, 667);

  // Formatting for tutorial video playback
  image(vid, 98, 240, vid.width / 3, vid.height / 3);

  // Position the border for video playback
  noFill();
  strokeWeight(8);
  rect(95, 240, 646, 364, 20);
}

function tutorialCanvas() {
  // Tutorial Page / Canvas
  // Full tutorial takes place on this page
  background(30);

  // Framing surrounding text blocks
  text_box_10.display();

  // User prompt text
  strokeWeight(1);
  fill(255, 210, 0);
  textSize(30);
  text('Press ESC to End Session...', 1450, 810);
  

  // Position the video feed on the tutorial page
  image(flippedVideo, 920, 180);
  fill(255);
  strokeWeight(1);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  // Position the border for the video feed
  noFill();
  strokeWeight(7);
  rect(914, 178, 710, 544, 20);
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}

function tutorialOverScreen() {
  // Tutorial Over Screen
  // Signals the end of the tutorial and offers the user the option to try again
  background(30);

  // Flow field animation colour has changed to signal the conclusion of the tutorial
  var density = 30
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x, y)
      points.push(p)
    }
  }

  noStroke();
  fill(255, 210, 0);

  for (var i = 0; i < points.length; i++) {

    var angle = map(noise(points[i].x * mult, points[i].y * mult), 10, 0, 1, 1200)

    points[i].add(createVector(cos(angle), sin(angle)))

    // Defining the position of the flow field animation
    ellipse(points[i].x, points[i].y, 1) 
  }

  // Display pre-sized text box
  text_box_7.display();
  text_box_8.display();

  // Formatting for text
  strokeWeight(2);
  fill(255);
  textSize(100);

   // Text Block
  text('Incredible Work!', 870, 282);


  // Apply flashing text to guide user input
  fill(255 + sin(frameCount*0.4) * 200);
  textSize(40);
  stroke(40);

  // Prompt to restart tutorial
  text('Click ANYWHERE to restart tutorial...', 882, 700);

}

function incorrectAnswer() {
  // Function that results in too many incorrect answers leading to "Tutorial Over Screen"
  answer -= answerIncorrect;
  if (answer <= 0) {
    tutorialOver();
  }
}

function restart() {
  tutorialScreen = 3;
}

function keyPressed() {
  // When 'ENTER' is pressed at the welcome screen, the user is taken to the Tutorial Intro
  if (keyCode === ENTER) {
    tutorialScreen = 1;
  // Pressing the 'LEFT_ARROW' key paginates back on the tutorial intro
  } else if (keyCode === LEFT_ARROW) {
    tutorialScreen = 1;
    // Pressing the 'OPTION' key plays the tutorial video
  } else if (keyCode === OPTION) {
    vid.play();
    // Pressing the 'ESCAPE' key ends the tutorial
  } else if (keyCode === ESCAPE) {
    tutorialScreen = 4;
  }
}

function keyTyped() {
  // When 'S' is typed, the tutorial screen is displayed
  if (key === 's') {
    tutorialScreen = 3;
  // When 'N' is typed, paginate between Tutorial Introduction Screens
  } else if (key === 'n') {
    tutorialScreen = 2;
  }
}

function mousePressed() {
  if (tutorialScreen == 4) {
    restart();
  }
}

function startTutorialIntroScreen1() {
  tutorialScreen = 1;
  }

  // Class for "Lens" imagery used on the "Welcome Screen"
class lens {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }
}

// Class for text boxes used on "Tutorial Intro Screen(s)"
class text_box {
  constructor(x, y, width, height, tl) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tl = tl;
  }

  display() {
    stroke(255);
    strokeWeight(1);
    fill(30);
    rect(this.x, this.y, this.width, this.height, this.tl);
    }
  }

  // Class for circular frames used on "Tutorial Intro Screen(s)" to contain imagery
class circle_frame {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  display() {
    fill(30);
    stroke(255);
    ellipse(this.x, this.y, this.size);
    }
  }