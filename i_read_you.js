//
//  Project: "I Read You"
//
//  Assignment 2 & 3
//  ARCH1477 Computational Prototyping for Industrial Design
//
//  Patrick Hibbert, s3664204
//

// global variables
var backgroundColour
var mode
var tutorialScreen
var points = []
var mult = 0.005

let font;

// fonts are pre-loaded for use by the application
// the assets directory is referenced as the location for each file
function preload() {
  font = loadFont('assets/genos_font.ttf');
}

// project setup elements, including cavas size
function setup() {
  tutorialScreen =  0;
  createCanvas(1750, 950);
  textFont(font);
  background(30);


  // Setup for the flow field animation (constructed below)
  var density = 30
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x, y)
      points.push(p)
    }
  }
}

function draw() {
  if (tutorialScreen == 0) {
    welcomeScreen();
  } else if (tutorialScreen == 1) {
    tutorialScreen();
  } else if (tutorialScreen == 2) {
    tutorialOverScreen();
    }
}

function welcomeScreen() {
  // Welcome page / splash screen to introduce the user to the project
  // Flow field animation is used to set the tone of the project
  // Animation will be positioned inside the lenses of a pair of glasses (constructed below)
  noStroke()
  fill(255)

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
  textSize(40);
  text('Welcome to...', 40, 60);
  fill(200);
  textSize(90);
  text('"I Read You"', 40, 130);
  textSize(35);
  text('Hosted By', 40, 760);
  textSize(50);
  text('Patrick Hibbert', 40, 800);
  // Apply flashing text to guide user input
  strokeWeight(2);
  fill(200 + sin(frameCount*0.06) * 128);
  textSize(40);
  text('Press ENTER to Begin...', 1320, 810);

  // Create the components, position and style of the glasses
  stroke(255);
  strokeWeight(3);
  noFill();
  // Component: Left lens
  circle(615, 430, 440);
  // Component: Right lens
  circle(1130, 430, 440);
  // Component: Bridge
  arc(873, 408, 140, 140, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
  }

function tutorialScreen() {
}

function mousePressed() {
  if (tutorialScreen == 0) {
    startTutorial();
  }
}

function startTutorial() {
  tutorialScreen = 1;
}
