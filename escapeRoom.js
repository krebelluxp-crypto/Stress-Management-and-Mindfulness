
///===========================================
/// THE ESCAPE WITHIN
/// MINDFULNESS ESCAPE ROOM
///===========================================


///===========================================
/// GLOBAL VARIABLES
///===========================================

// GAME CANVAS
var canvas;
var ctx;

var w = 1000;
var h = 750;

// BACKGROUND CANVAS
var waterCanvas;
var waterCtx;

var waterW = 0;
var waterH = 0;

var waterTimer = 0;
var waterRipples = [];

// COLOURS
var sageGreen = "#dce6d5";
var lightGreen = "#b5cbb1";
var mutedGreen = "#78809c";
var forestGreen = "#414c6f";
var darkGreen = "#29234c";
var cream = "#f2f0df";

// GAME
var phase = 1;
var score = 0;
var gameStarted = false;

var playerName = "";
var teamName = "";
var playerNumber = 0;

var animationTimer = 0;

var game = {
    title: "The Escape Within",
    pointsPerRoom: 100,
    finished: false
};

// SECRET WORDS
var secretWords = [
    "YOU",
    "FOUND",
    "YOUR",
    "WAY",
    "WITHIN"
];


// ROOM 1: BREATHING
var breathStartTime = 0;
var breathCycles = 0;
var breathingFinished = false;


// ROOM 2: DRAWING
var drawing = false;
var drawingStarted = false;

var drawingCanvas;
var drawingCtx;

var lastDrawX = 0;
var lastDrawY = 0;

// COLOUR PAIRS: SAME POSITION IN BOTH LISTS = ONE PAIR
// CANVAS IS THE LIGHT COLOUR, PEN IS THE DARK COLOUR
var canvasColours = [
    "#FEE572",   // 0 butter
    "#FEC0F8",   // 1 pink
    "#9AEFDF",   // 2 aqua
    "#FCC5AE",   // 3 peach
    "#FEF97A"    // 4 lemon
];

var penColours = [
    "#A3B75A",   // 0 olive
    "#4466A6",   // 1 blue
    "#5EA266",   // 2 green
    "#C35284",   // 3 rose
    "#DE8B4C"    // 4 orange
];

var drawingBackground = canvasColours[0];
var drawingPen = penColours[0];


// ROOM 3: BRICK WALL
var bricksBroken = 0;
var selectedBrick = -1;
var showBrickQuestion = false;
var brickMessage = "";

var brickPieces = [];
var brickWallFinished = false;
var brickFinishTimer = 0;

// EACH BRICK HAS ITS OWN QUESTION
var thoughts = [

    {
        text: "I'm not good enough",
        question: "How can you challenge this thought?",
        options: [
            "I will never be good enough.",
            "I am learning and growing.",
            "Everyone is better than me."
        ],
        correct: 1,
        broken: false
    },

    {
        text: "I'm going to fail",
        question: "What is a more balanced thought?",
        options: [
            "I can prepare and try my best.",
            "There is no point in trying.",
            "One mistake ruins everything."
        ],
        correct: 0,
        broken: false
    },

    {
        text: "Everyone is judging me",
        question: "Which thought is more helpful?",
        options: [
            "Everyone dislikes me.",
            "I must make everyone happy.",
            "I cannot know what others think."
        ],
        correct: 2,
        broken: false
    },

    {
        text: "I have to be perfect",
        question: "Which reminder is healthier?",
        options: [
            "Mistakes mean I am a failure.",
            "Progress matters more than perfection.",
            "I should never make mistakes."
        ],
        correct: 1,
        broken: false
    },

    {
        text: "Nobody understands me",
        question: "What could help with this feeling?",
        options: [
            "Keep everything to myself forever.",
            "Assume nobody cares.",
            "Talk to someone I trust."
        ],
        correct: 2,
        broken: false
    },

    {
        text: "I can't do anything right",
        question: "What is a fairer way to think?",
        options: [
            "I can learn from mistakes.",
            "I am bad at everything.",
            "I should stop trying."
        ],
        correct: 0,
        broken: false
    },

    {
        text: "I'm falling behind",
        question: "What is a useful next step?",
        options: [
            "Give up on my goals.",
            "Focus on one small task.",
            "Compare myself to everyone."
        ],
        correct: 1,
        broken: false
    },

    {
        text: "I always mess things up",
        question: "Which statement is more accurate?",
        options: [
            "One mistake defines me.",
            "Nothing will improve.",
            "One mistake does not define me."
        ],
        correct: 2,
        broken: false
    },

    {
        text: "I don't belong here",
        question: "What could you remind yourself?",
        options: [
            "I deserve to feel included.",
            "I should avoid everyone.",
            "I will never fit in."
        ],
        correct: 0,
        broken: false
    },

    {
        text: "Things will never improve",
        question: "Which thought creates hope?",
        options: [
            "I should expect the worst.",
            "Feelings and situations can change.",
            "Nothing I do matters."
        ],
        correct: 1,
        broken: false
    },

    {
        text: "I am too stressed",
        question: "What could help right now?",
        options: [
            "Ignore how I feel.",
            "Take on more work.",
            "Pause and take a slow breath."
        ],
        correct: 2,
        broken: false
    },

    {
        text: "Asking for help is weak",
        question: "Which reminder is healthier?",
        options: [
            "Asking for help takes courage.",
            "I must do everything alone.",
            "I should hide my struggles."
        ],
        correct: 0,
        broken: false
    }

];


// ROOM 4: GARDEN
var stars = [];
var gardenReleased = false;
var gardenFinished = false;
var gardenReleaseTimer = 0;
var fireflies = [];


///===========================================
/// MAIN PROGRAM
///===========================================

setUpCanvas();

setUpDrawingCanvas();

setUpWaterCanvas();

setUpMouseControls();

setUpKeyboardControls();

setUpFireflies();

setUpPlayerList();

animationLoop();

drawWaterRipples();

console.log("Welcome to The Escape Within!");


///===========================================
/// FUNCTION SECTION
///===========================================


///-----------------------------------------
/// SET UP GAME CANVAS
///-----------------------------------------

function setUpCanvas() {

    canvas = document.getElementById("MyCanvas");

    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

}


///-----------------------------------------
/// SET UP PLAYER LIST (ONE PLAYER PER SECRET WORD)
///-----------------------------------------

function setUpPlayerList() {

    var list = document.getElementById("playerNumber");

    list.innerHTML = "";

    for (var i = 0; i < secretWords.length; i++) {

        var option = document.createElement("option");

        option.value = i;

        option.textContent = "Player " + (i + 1);

        list.appendChild(option);

    }

}


///-----------------------------------------
/// SET UP DRAWING CANVAS
///-----------------------------------------

function setUpDrawingCanvas() {

    drawingCanvas = document.createElement("canvas");

    drawingCanvas.width = 700;
    drawingCanvas.height = 450;

    drawingCtx = drawingCanvas.getContext("2d");

    clearDrawing();

}


///-----------------------------------------
/// SET UP BACKGROUND CANVAS
///-----------------------------------------

function setUpWaterCanvas() {

    waterCanvas = document.getElementById("waterCanvas");

    waterCtx = waterCanvas.getContext("2d");

    waterW = window.innerWidth;
    waterH = window.innerHeight;

    waterCanvas.width = waterW;
    waterCanvas.height = waterH;

    waterRipples = [];

    for (var i = 0; i < 15; i++) {

        waterRipples.push({

            x: Math.random() * waterW,

            y: Math.random() * waterH,

            size: 100 + Math.random() * 150,

            speed: 0.15 + Math.random() * 0.25,

            offset: Math.random() * Math.PI * 2

        });

    }

}


///-----------------------------------------
/// DRAW BACKGROUND ANIMATION
///-----------------------------------------

function drawWaterRipples() {

    waterCtx.clearRect(0, 0, waterW, waterH);

    waterTimer += 0.015;

    for (var i = 0; i < waterRipples.length; i++) {

        var r = waterRipples[i];

        var movement =
            Math.sin(waterTimer + r.offset) * 25;

        var radius = r.size + movement;

        for (var j = 0; j < 5; j++) {

            var ringSize = radius + j * 30;

            waterCtx.beginPath();

            waterCtx.ellipse(
                r.x,
                r.y,
                ringSize,
                ringSize * 0.55,
                0,
                0,
                Math.PI * 2
            );

            waterCtx.strokeStyle =
                "rgba(255,255,255," +
                (0.55 - j * 0.07) +
                ")";

            waterCtx.lineWidth = 3;

            waterCtx.stroke();

        }

        r.y -= r.speed;

        if (r.y < -350) {
            r.y = waterH + 350;
        }

    }

    requestAnimationFrame(drawWaterRipples);

}


///-----------------------------------------
/// START GAME
///-----------------------------------------

//SHOW PLAYER DETAILS PAGE - FIRST THING I DID

function showDetailsPage() {

    // HIDE THE WELCOME PAGE
    document.getElementById("welcomePage").style.display =
        "none";

    // SHOW THE GAME PAGE
    document.getElementById("gamePage").style.display =
        "block";

    // SHOW THE PLAYER DETAILS FORM
    // ("flex" so the title and card are centred on screen)
    document.getElementById("gameControls").style.display =
        "flex";

    // HIDE THE SMALL GAME TITLE (THE BIG ONE IS ON THIS PAGE)
    document.getElementById("gameTitle").style.display =
        "none";

    // KEEP THE GAME CANVAS HIDDEN UNTIL "START GAME"
    document.getElementById("MyCanvas").style.display =
        "none";

}

function startGame() {

    playerName =
        document.getElementById("playerName").value;

    teamName =
        document.getElementById("teamName").value;

    playerNumber = Number(
        document.getElementById("playerNumber").value
    );

    // REMOVE EXTRA SPACES FROM THE START AND END
    playerName = playerName.trim();
    teamName = teamName.trim();

    // MESSAGE LINE AND INPUT BOXES ON THE DETAILS CARD
    var detailsMessage =
        document.getElementById("detailsMessage");

    var nameBox =
        document.getElementById("playerName");

    var teamBox =
        document.getElementById("teamName");

    // CLEAR ANY OLD MESSAGE AND RED OUTLINES
    detailsMessage.textContent = "";

    nameBox.classList.remove("inputError");
    teamBox.classList.remove("inputError");

    // STOP CHECK: NAME IS REQUIRED
    if (playerName === "") {

        detailsMessage.textContent =
            "Please enter your name before starting.";

        nameBox.classList.add("inputError");

        nameBox.focus();

        return;

    }

    // STOP CHECK: TEAM NAME IS REQUIRED
    if (teamName === "") {

        detailsMessage.textContent =
            "Please enter your team name before starting.";

        teamBox.classList.add("inputError");

        teamBox.focus();

        return;

    }


    score = 0;

    gameStarted = true;
    game.finished = false;

    resetRoomVariables();

    phase = 3;

    // HIDE THE PLAYER DETAILS FORM
    document.getElementById("gameControls").style.display =
        "none";

    // SHOW THE SMALL GAME TITLE AGAIN
    document.getElementById("gameTitle").style.display =
        "";

    // SHOW THE GAME CANVAS
    document.getElementById("MyCanvas").style.display =
        "";

    console.log("Game Started!");

}


///-----------------------------------------
/// RESET ROOM VARIABLES
///-----------------------------------------

function resetRoomVariables() {

    // BREATHING
    breathStartTime = 0;
    breathCycles = 0;
    breathingFinished = false;

    // DRAWING
    drawing = false;
    drawingStarted = false;

    clearDrawing();

    // BRICK WALL
    bricksBroken = 0;
    selectedBrick = -1;
    showBrickQuestion = false;
    brickMessage = "";

    brickPieces = [];
    brickWallFinished = false;
    brickFinishTimer = 0;

    for (var i = 0; i < thoughts.length; i++) {

        thoughts[i].broken = false;

    }

    // GARDEN
    stars = [];
    gardenReleased = false;
    gardenFinished = false;
    gardenReleaseTimer = 0;

    document.getElementById("stressThought").value = "";

    // VAULT
    document.getElementById("vaultAnswer").value = "";

    hideControls();

}


///-----------------------------------------
/// HIDE ROOM CONTROLS
///-----------------------------------------

function hideControls() {

    document.getElementById("drawingControls").style.display =
        "none";

    document.getElementById("gardenControls").style.display =
        "none";

    document.getElementById("vaultControls").style.display =
        "none";

}


///-----------------------------------------
/// MAIN ANIMATION LOOP
///-----------------------------------------

function animationLoop() {

    animationTimer++;

    clearBG();

    drawBackground();

    if (phase === 3) {

        breathingChamber();

    }

    else if (phase === 4) {

        emotionGallery();

    }

    else if (phase === 5) {

        weightOfWords();

    }

    else if (phase === 6) {

        releaseGarden();

    }

    else if (phase === 7) {

        unityVault();

    }

    else if (phase === 8) {

        drawWinScreen();

    }

    requestAnimationFrame(animationLoop);

}


///-----------------------------------------
/// CLEAR GAME CANVAS
///-----------------------------------------

function clearBG() {

    ctx.clearRect(0, 0, w, h);

}


///-----------------------------------------
/// DRAW GAME BACKGROUND
///-----------------------------------------

function drawBackground() {

    var gradient =
        ctx.createLinearGradient(0, 0, w, h);

    gradient.addColorStop(0, sageGreen);
    gradient.addColorStop(0.3, lightGreen);
    gradient.addColorStop(0.6, mutedGreen);
    gradient.addColorStop(1, forestGreen);

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, w, h);

}


///-----------------------------------------
/// DRAW ROOM TITLE
///-----------------------------------------

function drawRoomTitle(title) {

    ctx.fillStyle = darkGreen;
    ctx.textAlign = "center";

    ctx.font = "500 52px Cormorant Garamond";

    ctx.fillText(title, w / 2, 85);

    ctx.strokeStyle = forestGreen;
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(350, 110);
    ctx.lineTo(650, 110);

    ctx.stroke();

    ctx.fillStyle = darkGreen;
    ctx.font = "22px Georgia";

    ctx.fillText(
        "Team: " + teamName + "  |  Score: " + score,
        w / 2,
        710
    );

}


///===========================================
/// ROOM 1: BREATHING CHAMBER
///===========================================

function breathingChamber() {

    drawRoomTitle("the breathing chamber.");

    if (breathStartTime === 0) {

        breathStartTime = Date.now();

    }

    var elapsed =
        (Date.now() - breathStartTime) / 1000;

    breathCycles = Math.floor(elapsed / 8);

    var breathPosition = elapsed % 8;

    if (elapsed >= 24) {

        breathingFinished = true;

    }

    drawBreathingMountain();

    var ballX;
    var ballY;

    // INHALE: ROLL UP
    if (breathPosition < 4) {

        var progress = breathPosition / 4;

        ballX = 210 + progress * 290;
        ballY = 505 - progress * 260;

    }

    // EXHALE: ROLL DOWN
    else {

        var progress = (breathPosition - 4) / 4;

        ballX = 500 + progress * 290;
        ballY = 245 + progress * 260;

    }

    if (breathingFinished === true) {

        ballX = 790;
        ballY = 505;

    }

    drawBreathingBall(ballX, ballY);

    ctx.fillStyle = darkGreen;
    ctx.textAlign = "center";

    ctx.font = "italic 30px Cormorant Garamond";

    ctx.fillText(
        "Follow the ball as it travels over the mountain.",
        w / 2,
        150
    );

    if (breathingFinished === true) {

        ctx.font = "500 48px Cormorant Garamond";

        ctx.fillText(
            "beautifully done.",
            w / 2,
            615
        );

        ctx.font = "24px Georgia";

        ctx.fillText(
            "Click anywhere to continue.",
            w / 2,
            655
        );

    }

    else {

        var secondsLeft;

        ctx.font = "500 46px Cormorant Garamond";

        if (breathPosition < 4) {

            secondsLeft =
                4 - Math.floor(breathPosition);

            ctx.fillText(
                "inhale.",
                w / 2,
                605
            );

        }

        else {

            secondsLeft =
                4 - Math.floor(breathPosition - 4);

            ctx.fillText(
                "exhale.",
                w / 2,
                605
            );

        }

        ctx.font = "23px Georgia";

        ctx.fillText(
            secondsLeft + " seconds",
            w / 2,
            640
        );

        ctx.fillText(
            "Cycle " +
            Math.min(breathCycles + 1, 3) +
            " of 3",
            w / 2,
            675
        );

    }

}


///-----------------------------------------
/// DRAW MOUNTAIN
///-----------------------------------------

function drawBreathingMountain() {

    var sky =
        ctx.createLinearGradient(0, 175, 0, 560);

    sky.addColorStop(0, "#d4e9e4");
    sky.addColorStop(1, "#f1efd9");

    ctx.fillStyle = sky;

    ctx.fillRect(100, 180, 800, 375);

    // SUN
    ctx.fillStyle = "#fff4c4";

    ctx.beginPath();

    ctx.arc(780, 265, 55, 0, Math.PI * 2);

    ctx.fill();

    // DISTANT MOUNTAINS
    ctx.fillStyle = "#a6c6b1";

    ctx.beginPath();

    ctx.moveTo(100, 480);
    ctx.lineTo(280, 310);
    ctx.lineTo(440, 480);
    ctx.lineTo(610, 330);
    ctx.lineTo(900, 480);
    ctx.lineTo(900, 555);
    ctx.lineTo(100, 555);

    ctx.closePath();
    ctx.fill();

    // MAIN MOUNTAIN
    ctx.fillStyle = forestGreen;

    ctx.beginPath();

    ctx.moveTo(160, 535);
    ctx.lineTo(500, 225);
    ctx.lineTo(840, 535);

    ctx.closePath();
    ctx.fill();

    // LIGHT SIDE
    ctx.fillStyle = mutedGreen;

    ctx.beginPath();

    ctx.moveTo(160, 535);
    ctx.lineTo(500, 225);
    ctx.lineTo(500, 535);

    ctx.closePath();
    ctx.fill();

    // SNOW
    ctx.fillStyle = cream;

    ctx.beginPath();

    ctx.moveTo(500, 225);
    ctx.lineTo(438, 282);
    ctx.lineTo(475, 275);
    ctx.lineTo(500, 302);
    ctx.lineTo(524, 275);
    ctx.lineTo(562, 282);

    ctx.closePath();
    ctx.fill();

    // BALL PATH
    ctx.strokeStyle = "#fff7dc";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(210, 505);
    ctx.lineTo(500, 245);
    ctx.lineTo(790, 505);

    ctx.stroke();

    // GROUND
    ctx.fillStyle = darkGreen;

    ctx.fillRect(100, 535, 800, 20);

    // BORDER
    ctx.strokeStyle = cream;
    ctx.lineWidth = 4;

    ctx.strokeRect(100, 180, 800, 375);

}


///-----------------------------------------
/// DRAW BREATHING BALL
///-----------------------------------------

function drawBreathingBall(x, y) {

    ctx.fillStyle = "rgba(255,255,255,0.3)";

    ctx.beginPath();

    ctx.arc(x, y, 36, 0, Math.PI * 2);

    ctx.fill();

    ctx.fillStyle = "#f6d68d";

    ctx.beginPath();

    ctx.arc(x, y, 25, 0, Math.PI * 2);

    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;

    ctx.stroke();

    var rotation = animationTimer * 0.07;

    ctx.strokeStyle = "#d49e54";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        x + Math.cos(rotation) * 15,
        y + Math.sin(rotation) * 15
    );

    ctx.lineTo(
        x - Math.cos(rotation) * 15,
        y - Math.sin(rotation) * 15
    );

    ctx.stroke();

    ctx.fillStyle = cream;

    ctx.beginPath();

    ctx.arc(x, y, 5, 0, Math.PI * 2);

    ctx.fill();

}


///-----------------------------------------
/// SPACEBAR BREATHING SHORTCUT
///-----------------------------------------

function setUpKeyboardControls() {

    document.onkeydown = function(e) {

        if (phase === 3 && e.code === "Space") {

            e.preventDefault();

            if (e.repeat === true) {
                return;
            }

            if (breathingFinished === false) {

                var elapsed =
                    (Date.now() - breathStartTime) / 1000;

                var currentCycle =
                    Math.floor(elapsed / 8);

                var nextCycle = currentCycle + 1;

                if (nextCycle >= 3) {

                    breathingFinished = true;

                }

                else {

                    breathStartTime =
                        Date.now() - nextCycle * 8000;

                }

            }

        }

    };

}


///===========================================
/// ROOM 2: EMOTION GALLERY
///===========================================

function emotionGallery() {

    drawRoomTitle("the emotion gallery.");

    ctx.fillStyle = darkGreen;
    ctx.textAlign = "center";

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "Express how you feel through colour and art.",
        w / 2,
        150
    );

    ctx.drawImage(drawingCanvas, 150, 180);

    ctx.strokeStyle = cream;
    ctx.lineWidth = 5;

    ctx.strokeRect(150, 180, 700, 450);

    ctx.fillStyle = darkGreen;
    ctx.font = "20px Georgia";

    ctx.fillText(
        "Your pen colour complements your canvas.",
        w / 2,
        660
    );

}


///-----------------------------------------
/// CHOOSE DRAWING COLOURS
///-----------------------------------------

function chooseDrawingColours() {

    var teamNumber = 0;

    var teamText = teamName.toLowerCase().trim();

    for (var i = 0; i < teamText.length; i++) {

        teamNumber += teamText.charCodeAt(i);

    }

    var colourNumber =
        (playerNumber + teamNumber) % canvasColours.length;

    drawingBackground = canvasColours[colourNumber];

    drawingPen = penColours[colourNumber];

    clearDrawing();

}


///-----------------------------------------
/// GET MOUSE POSITION
///-----------------------------------------

function getMousePosition(e) {

    var rect = canvas.getBoundingClientRect();

    var x =
        (e.clientX - rect.left) * w / rect.width;

    var y =
        (e.clientY - rect.top) * h / rect.height;

    return {
        x: x,
        y: y
    };

}


///-----------------------------------------
/// DRAW ON CANVAS
///-----------------------------------------

function drawOnCanvas(e) {

    var mouse = getMousePosition(e);

    var x = mouse.x - 150;
    var y = mouse.y - 180;

    if (
        x >= 0 &&
        x <= 700 &&
        y >= 0 &&
        y <= 450
    ) {

        drawingCtx.strokeStyle = drawingPen;
        drawingCtx.fillStyle = drawingPen;

        drawingCtx.lineWidth = 12;
        drawingCtx.lineCap = "round";

        if (drawing === true) {

            drawingCtx.beginPath();

            drawingCtx.moveTo(lastDrawX, lastDrawY);
            drawingCtx.lineTo(x, y);

            drawingCtx.stroke();

        }

        else {

            drawingCtx.beginPath();

            drawingCtx.arc(
                x, y, 6, 0, Math.PI * 2
            );

            drawingCtx.fill();

        }

        lastDrawX = x;
        lastDrawY = y;

        drawingStarted = true;

    }

}


///-----------------------------------------
/// CLEAR DRAWING
///-----------------------------------------

function clearDrawing() {

    drawingCtx.fillStyle = drawingBackground;

    drawingCtx.fillRect(0, 0, 700, 450);

    drawingStarted = false;

}


///-----------------------------------------
/// FINISH DRAWING
///-----------------------------------------

function finishDrawing() {

    if (phase !== 4) {
        return;
    }

    if (drawingStarted === true) {

        finishRoom();

    }

    else {

        alert("Draw something before continuing!");

    }

}


///===========================================
/// ROOM 3: WEIGHT OF WORDS
///===========================================

function weightOfWords() {

    drawRoomTitle("the weight of words.");

    ctx.fillStyle = darkGreen;
    ctx.textAlign = "center";

    ctx.font = "italic 29px Cormorant Garamond";

    ctx.fillText(
        "Choose four thoughts to challenge and break free.",
        w / 2,
        145
    );

    drawBrickWall();

    drawBrickPieces();

    ctx.fillStyle = darkGreen;
    ctx.font = "25px Georgia";

    ctx.fillText(
        "Bricks Broken: " + bricksBroken + " / 4",
        w / 2,
        645
    );

    if (brickMessage !== "") {

        ctx.font = "20px Georgia";

        ctx.fillText(
            brickMessage,
            w / 2,
            675
        );

    }

    if (showBrickQuestion === true) {

        drawBrickQuestion();

    }

    // WAIT FOR THE LAST BRICK TO SHATTER
    if (brickWallFinished === true) {

        brickFinishTimer++;

        if (brickFinishTimer > 75) {

            brickWallFinished = false;

            finishRoom();

        }

    }

}


///-----------------------------------------
/// DRAW REALISTIC BRICK WALL
///-----------------------------------------

function drawBrickWall() {

    // WALL SHADOW
    ctx.fillStyle = "#2d4434";

    ctx.fillRect(58, 190, 884, 426);

    // MORTAR BACKGROUND
    ctx.fillStyle = "#d5d0bf";

    ctx.fillRect(65, 195, 870, 410);

    // FOUR ROWS OF BRICKS
    for (var i = 0; i < thoughts.length; i++) {

        var column = i % 3;

        var row = Math.floor(i / 3);

        var x = 75 + column * 285;

        var y = 205 + row * 100;

        // STAGGER ALTERNATE ROWS VISUALLY
        var offset = 0;

        if (row % 2 === 1) {
            offset = 12;
        }

        x = x + offset;

        // DRAW UNBROKEN BRICK
        if (thoughts[i].broken === false) {

            drawSingleBrick(x, y, 270, 90, i);

        }

        // DRAW HOLE WHERE BRICK WAS
        else {

            drawBrokenHole(x, y, 270, 90);

        }

    }

    // OUTER WALL FRAME
    ctx.strokeStyle = "#f2f0df";
    ctx.lineWidth = 5;

    ctx.strokeRect(65, 195, 870, 410);

}


///-----------------------------------------
/// DRAW ONE TEXTURED BRICK
///-----------------------------------------

function drawSingleBrick(x, y, bw, bh, number) {

    // DARK SHADOW UNDER BRICK
    ctx.fillStyle = "#314f3b";

    ctx.fillRect(
        x + 4,
        y + 5,
        bw,
        bh
    );

    // BRICK GRADIENT
    var brickGradient =
        ctx.createLinearGradient(x, y, x, y + bh);

    brickGradient.addColorStop(0, "#91ae94");
    brickGradient.addColorStop(0.3, "#779a7e");
    brickGradient.addColorStop(1, "#4e7359");

    ctx.fillStyle = brickGradient;

    ctx.fillRect(x, y, bw, bh);

    // TOP HIGHLIGHT
    ctx.fillStyle = "rgba(255,255,255,0.23)";

    ctx.fillRect(
        x + 4,
        y + 4,
        bw - 8,
        10
    );

    // BOTTOM SHADOW
    ctx.fillStyle = "rgba(20,45,30,0.22)";

    ctx.fillRect(
        x + 4,
        y + bh - 14,
        bw - 8,
        10
    );

    // BRICK TEXTURE MARKS
    for (var i = 0; i < 10; i++) {

        var markX =
            x + 12 + ((i * 37 + number * 13) % 245);

        var markY =
            y + 12 + ((i * 23 + number * 7) % 65);

        ctx.fillStyle = "rgba(30,65,40,0.16)";

        ctx.fillRect(
            markX,
            markY,
            12,
            3
        );

    }

    // SMALL SURFACE CRACKS
    ctx.strokeStyle = "rgba(35,65,42,0.32)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();

    ctx.moveTo(x + 30, y + 18);
    ctx.lineTo(x + 40, y + 26);
    ctx.lineTo(x + 37, y + 38);

    ctx.moveTo(x + bw - 42, y + 55);
    ctx.lineTo(x + bw - 30, y + 63);
    ctx.lineTo(x + bw - 36, y + 75);

    ctx.stroke();

    // MORTAR OUTLINE
    ctx.strokeStyle = "#e9e5d8";
    ctx.lineWidth = 4;

    ctx.strokeRect(x, y, bw, bh);

    // NEGATIVE THOUGHT
    ctx.fillStyle = "#ffffff";

    ctx.textAlign = "center";

    ctx.font = "19px Georgia";

    ctx.fillText(
        thoughts[number].text,
        x + bw / 2,
        y + 53,
        bw - 20
    );

}


///-----------------------------------------
/// DRAW BROKEN HOLE IN WALL
///-----------------------------------------

function drawBrokenHole(x, y, bw, bh) {

    // DARK INTERIOR
    ctx.fillStyle = "#294936";

    ctx.fillRect(x, y, bw, bh);

    // INNER DEPTH
    ctx.fillStyle = "#3d6048";

    ctx.fillRect(
        x + 10,
        y + 10,
        bw - 20,
        bh - 20
    );

    // IRREGULAR BROKEN EDGES
    ctx.fillStyle = "#8aa48a";

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + 35, y + 9);
    ctx.lineTo(x + 65, y);
    ctx.lineTo(x + 100, y + 12);
    ctx.lineTo(x + 145, y);
    ctx.lineTo(x + bw, y);
    ctx.lineTo(x + bw, y + 15);
    ctx.lineTo(x + bw - 20, y + 25);
    ctx.lineTo(x + bw, y + 45);
    ctx.lineTo(x + bw, y + bh);
    ctx.lineTo(x + bw - 45, y + bh - 10);
    ctx.lineTo(x + bw - 90, y + bh);
    ctx.lineTo(x + 80, y + bh - 10);
    ctx.lineTo(x + 30, y + bh);
    ctx.lineTo(x, y + bh);
    ctx.lineTo(x + 12, y + 55);
    ctx.lineTo(x, y + 30);

    ctx.closePath();
    ctx.fill();

    // CENTER OF HOLE
    ctx.fillStyle = "#294936";

    ctx.fillRect(
        x + 22,
        y + 22,
        bw - 44,
        bh - 44
    );

    // SMALL CRACKS AROUND EDGE
    ctx.strokeStyle = "#d0d7c6";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(x + 35, y + 10);
    ctx.lineTo(x + 48, y + 22);
    ctx.lineTo(x + 42, y + 32);

    ctx.moveTo(x + bw - 30, y + 15);
    ctx.lineTo(x + bw - 45, y + 28);

    ctx.stroke();

}


///-----------------------------------------
/// CREATE SHATTERING BRICK PIECES
///-----------------------------------------

function breakBrick(number) {

    var column = number % 3;

    var row = Math.floor(number / 3);

    var x = 75 + column * 285;

    var y = 205 + row * 100;

    if (row % 2 === 1) {
        x = x + 12;
    }

    // CREATE SMALL FALLING FRAGMENTS
    for (var i = 0; i < 28; i++) {

        brickPieces.push({

            x: x + Math.random() * 270,

            y: y + Math.random() * 90,

            size: 7 + Math.random() * 16,

            speedX: -5 + Math.random() * 10,

            speedY: -7 + Math.random() * 4,

            rotation: Math.random() * 6,

            rotationSpeed: -0.1 + Math.random() * 0.2,

            colour: i % 2 === 0
                ? "#779a7e"
                : "#4e7359",

            life: 0

        });

    }

}


///-----------------------------------------
/// DRAW FALLING BRICK PIECES
///-----------------------------------------

function drawBrickPieces() {

    for (var i = 0; i < brickPieces.length; i++) {

        var p = brickPieces[i];

        // GRAVITY
        p.speedY += 0.25;

        p.x += p.speedX;
        p.y += p.speedY;

        p.rotation += p.rotationSpeed;

        p.life++;

        ctx.save();

        ctx.translate(p.x, p.y);

        ctx.rotate(p.rotation);

        ctx.fillStyle = p.colour;

        ctx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size * 0.65
        );

        ctx.strokeStyle = "#d5d0bf";
        ctx.lineWidth = 1;

        ctx.strokeRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size * 0.65
        );

        ctx.restore();

        // REMOVE PIECES AFTER FALLING
        if (p.y > 720 || p.life > 110) {

            brickPieces.splice(i, 1);

            i--;

        }
    }
}


///-----------------------------------------
/// DRAW IN-GAME QUESTION
///-----------------------------------------

function drawBrickQuestion() {

    var brick = thoughts[selectedBrick];

    // DARK OVERLAY
    ctx.fillStyle = "rgba(20,45,30,0.70)";

    ctx.fillRect(0, 0, w, h);

    // SOFT PANEL SHADOW
    ctx.fillStyle = "rgba(0,0,0,0.18)";

    ctx.fillRect(150, 145, 720, 485);

    // QUESTION PANEL
    ctx.fillStyle = cream;

    ctx.fillRect(140, 135, 720, 485);

    ctx.strokeStyle = forestGreen;
    ctx.lineWidth = 6;

    ctx.strokeRect(140, 135, 720, 485);

    ctx.fillStyle = forestGreen;
    ctx.textAlign = "center";

    ctx.font = "500 43px Cormorant Garamond";

    ctx.fillText(
        "challenge the thought.",
        w / 2,
        195
    );

    ctx.font = "italic 25px Cormorant Garamond";

    ctx.fillText(
        '"' + brick.text + '"',
        w / 2,
        240
    );

    ctx.font = "22px Georgia";

    ctx.fillText(
        brick.question,
        w / 2,
        285,
        660
    );

    // CLICKABLE ANSWERS
    for (var i = 0; i < 3; i++) {

        var optionY = 315 + i * 82;

        ctx.fillStyle = "#dce6d5";

        ctx.fillRect(
            205,
            optionY,
            590,
            65
        );

        ctx.strokeStyle = mutedGreen;
        ctx.lineWidth = 2;

        ctx.strokeRect(
            205,
            optionY,
            590,
            65
        );

        ctx.fillStyle = darkGreen;
        ctx.font = "20px Georgia";

        ctx.fillText(
            brick.options[i],
            w / 2,
            optionY + 39,
            555
        );

    }

    ctx.fillStyle = forestGreen;
    ctx.font = "18px Georgia";

    ctx.fillText(
        "Choose the most helpful response.",
        w / 2,
        595
    );

}


///-----------------------------------------
/// CLICK A BRICK
///-----------------------------------------

function clickBrick(x, y) {

    if (showBrickQuestion === true) {

        clickBrickAnswer(x, y);

        return;

    }

    if (brickWallFinished === true) {
        return;
    }

    for (var i = 0; i < thoughts.length; i++) {

        var column = i % 3;

        var row = Math.floor(i / 3);

        var bx = 75 + column * 285;

        var by = 205 + row * 100;

        if (row % 2 === 1) {
            bx = bx + 12;
        }

        if (
            thoughts[i].broken === false &&
            x >= bx &&
            x <= bx + 270 &&
            y >= by &&
            y <= by + 90
        ) {

            selectedBrick = i;

            showBrickQuestion = true;

            brickMessage = "";

            break;

        }
    }
}


///-----------------------------------------
/// CLICK ANSWER OPTION
///-----------------------------------------

function clickBrickAnswer(x, y) {

    for (var i = 0; i < 3; i++) {

        var optionY = 315 + i * 82;

        if (
            x >= 205 &&
            x <= 795 &&
            y >= optionY &&
            y <= optionY + 65
        ) {

            if (i === thoughts[selectedBrick].correct) {

                // START SHATTER ANIMATION
                breakBrick(selectedBrick);

                thoughts[selectedBrick].broken = true;

                bricksBroken++;

                brickMessage =
                    "Well done! You challenged that thought.";

                showBrickQuestion = false;

                selectedBrick = -1;

                // ONLY FOUR BRICKS NEEDED
                if (bricksBroken >= 4) {

                    brickWallFinished = true;

                    brickFinishTimer = 0;

                }

            }

            break;

        }

    }

}


///===========================================
/// ROOM 4: RELEASE GARDEN
///===========================================

function releaseGarden() {

    drawRoomTitle("the release garden.");

    // BEAUTIFUL GARDEN BACKGROUND
    drawGarden();

    // FLOATING RELEASE STARS
    drawGardenStars();

    ctx.textAlign = "center";

    if (gardenReleased === false) {

        ctx.fillStyle = darkGreen;

        ctx.font = "italic 32px Cormorant Garamond";

        ctx.fillText(
            "Release what you no longer need to carry.",
            w / 2,
            150
        );

    }

    else {

        gardenReleaseTimer++;

        ctx.fillStyle = cream;

        ctx.font = "italic 39px Cormorant Garamond";

        ctx.fillText(
            "let it go.",
            w / 2,
            165
        );

        // ALLOW STARS TO FLOAT FIRST
        if (gardenReleaseTimer > 120) {

            gardenFinished = true;

        }

        if (gardenFinished === true) {

            ctx.font = "24px Georgia";

            ctx.fillText(
                "Click anywhere to continue.",
                w / 2,
                655
            );

        }

    }

}


///-----------------------------------------
/// SET UP FIREFLIES
///-----------------------------------------

function setUpFireflies() {

    fireflies = [];

    for (var i = 0; i < 28; i++) {

        fireflies.push({

            x: 80 + Math.random() * 840,

            y: 260 + Math.random() * 330,

            size: 2 + Math.random() * 3,

            offset: Math.random() * Math.PI * 2

        });

    }

}


///-----------------------------------------
/// DRAW BEAUTIFUL GARDEN
///-----------------------------------------

function drawGarden() {

    // EVENING SKY
    var sky =
        ctx.createLinearGradient(0, 120, 0, 650);

    sky.addColorStop(0, "#afcfc0");
    sky.addColorStop(0.4, "#d5dfbf");
    sky.addColorStop(1, "#f0dcae");

    ctx.fillStyle = sky;

    ctx.fillRect(0, 115, w, 575);

    // SOFT MOON GLOW
    var moonGlow =
        ctx.createRadialGradient(
            800, 235, 10,
            800, 235, 130
        );

    moonGlow.addColorStop(
        0,
        "rgba(255,249,213,0.75)"
    );

    moonGlow.addColorStop(
        1,
        "rgba(255,249,213,0)"
    );

    ctx.fillStyle = moonGlow;

    ctx.beginPath();

    ctx.arc(
        800, 235, 130,
        0, Math.PI * 2
    );

    ctx.fill();

    // MOON
    ctx.fillStyle = "#fff8dc";

    ctx.beginPath();

    ctx.arc(
        800, 235, 53,
        0, Math.PI * 2
    );

    ctx.fill();

    // DISTANT HILLS
    ctx.fillStyle = "#a6c5a6";

    ctx.beginPath();

    ctx.moveTo(0, 475);

    ctx.quadraticCurveTo(
        230, 350,
        490, 475
    );

    ctx.quadraticCurveTo(
        740, 350,
        1000, 460
    );

    ctx.lineTo(1000, 690);
    ctx.lineTo(0, 690);

    ctx.closePath();
    ctx.fill();

    // MIDDLE HILLS
    ctx.fillStyle = "#759b79";

    ctx.beginPath();

    ctx.moveTo(0, 530);

    ctx.quadraticCurveTo(
        250, 420,
        530, 540
    );

    ctx.quadraticCurveTo(
        780, 450,
        1000, 530
    );

    ctx.lineTo(1000, 690);
    ctx.lineTo(0, 690);

    ctx.closePath();
    ctx.fill();

    // FOREGROUND GRASS
    ctx.fillStyle = "#416f50";

    ctx.beginPath();

    ctx.moveTo(0, 595);

    ctx.quadraticCurveTo(
        300, 530,
        520, 600
    );

    ctx.quadraticCurveTo(
        750, 540,
        1000, 590
    );

    ctx.lineTo(1000, 690);
    ctx.lineTo(0, 690);

    ctx.closePath();
    ctx.fill();

    // TREES
    drawGardenTree(100, 490, 1.1);
    drawGardenTree(900, 485, 1.2);
    drawGardenTree(225, 500, 0.65);
    drawGardenTree(750, 495, 0.7);

    // FLOWERS AND MOVING GRASS
    for (var i = 0; i < 24; i++) {

        var x = 30 + i * 41;

        var y =
            595 + Math.sin(i * 1.7) * 35;

        var sway =
            Math.sin(animationTimer * 0.025 + i) * 5;

        drawFlower(
            x + sway,
            y,
            i
        );

    }

    // GLOWING FIREFLIES
    drawFireflies();

}


///-----------------------------------------
/// DRAW GARDEN TREE
///-----------------------------------------

function drawGardenTree(x, y, size) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(size, size);

    // TRUNK
    ctx.fillStyle = "#705d47";

    ctx.fillRect(-12, -95, 24, 135);

    // LEAF CLUSTERS
    ctx.fillStyle = "#315f45";

    ctx.beginPath();

    ctx.arc(-35, -105, 45, 0, Math.PI * 2);
    ctx.arc(30, -115, 50, 0, Math.PI * 2);
    ctx.arc(0, -155, 58, 0, Math.PI * 2);

    ctx.fill();

    // LIGHTER LEAVES
    ctx.fillStyle = "#598c65";

    ctx.beginPath();

    ctx.arc(-25, -150, 30, 0, Math.PI * 2);
    ctx.arc(35, -145, 28, 0, Math.PI * 2);

    ctx.fill();

    ctx.restore();

}


///-----------------------------------------
/// DRAW GARDEN FLOWER
///-----------------------------------------

function drawFlower(x, y, number) {

    // STEM
    ctx.strokeStyle = "#a9c89b";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(x, y + 30);
    ctx.lineTo(x, y);

    ctx.stroke();

    // LEAVES
    ctx.fillStyle = "#8bb58b";

    ctx.beginPath();

    ctx.ellipse(
        x - 8, y + 18,
        10, 4,
        -0.5,
        0, Math.PI * 2
    );

    ctx.fill();

    // FLOWER COLOUR
    if (number % 3 === 0) {

        ctx.fillStyle = "#f5d5dc";

    }

    else if (number % 3 === 1) {

        ctx.fillStyle = "#fff1c2";

    }

    else {

        ctx.fillStyle = "#e5dcf5";

    }

    // PETALS
    for (var i = 0; i < 5; i++) {

        var angle =
            Math.PI * 2 * i / 5;

        ctx.beginPath();

        ctx.arc(
            x + Math.cos(angle) * 9,
            y + Math.sin(angle) * 9,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

    // FLOWER CENTER
    ctx.fillStyle = "#e6b96b";

    ctx.beginPath();

    ctx.arc(
        x, y, 6,
        0, Math.PI * 2
    );

    ctx.fill();

}


///-----------------------------------------
/// DRAW FIREFLIES
///-----------------------------------------

function drawFireflies() {

    for (var i = 0; i < fireflies.length; i++) {

        var f = fireflies[i];

        var floatX =
            f.x +
            Math.sin(animationTimer * 0.012 + f.offset) * 18;

        var floatY =
            f.y +
            Math.cos(animationTimer * 0.016 + f.offset) * 12;

        var glow =
            0.35 +
            Math.sin(animationTimer * 0.04 + f.offset) * 0.25;

        // OUTER GLOW
        ctx.fillStyle =
            "rgba(255,244,180," + glow + ")";

        ctx.beginPath();

        ctx.arc(
            floatX,
            floatY,
            f.size * 3,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // BRIGHT CENTER
        ctx.fillStyle = "#fff7d4";

        ctx.beginPath();

        ctx.arc(
            floatX,
            floatY,
            f.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}


///-----------------------------------------
/// RELEASE THOUGHT
///-----------------------------------------

function releaseThought() {

    if (phase !== 6) {
        return;
    }

    if (gardenReleased === true) {
        return;
    }

    var thought =
        document.getElementById("stressThought").value;

    if (thought.trim() === "") {

        alert(
            "Enter a thought or use a made-up example."
        );

        return;

    }

    // CLEAR THE THOUGHT
    // IT IS NOT STORED ANYWHERE
    document.getElementById("stressThought").value = "";

    gardenReleased = true;
    gardenReleaseTimer = 0;

    // HIDE INPUT CONTROLS
    document.getElementById("gardenControls").style.display =
        "none";

    // CREATE FLOATING STARS
    for (var i = 0; i < 65; i++) {

        stars.push({

            x: 300 + Math.random() * 400,

            y: 500 + Math.random() * 90,

            size: 2 + Math.random() * 5,

            speed: 1 + Math.random() * 2,

            sway: Math.random() * Math.PI * 2,

            life: 0

        });

    }

}


///-----------------------------------------
/// DRAW FLOATING RELEASE STARS
///-----------------------------------------

function drawGardenStars() {

    for (var i = 0; i < stars.length; i++) {

        var s = stars[i];

        s.life++;

        s.y -= s.speed;

        var x =
            s.x +
            Math.sin(s.life * 0.03 + s.sway) * 20;

        var alpha = 1;

        if (s.y < 200) {

            alpha = s.y / 200;

        }

        if (alpha < 0) {
            alpha = 0;
        }

        // STAR GLOW
        ctx.fillStyle =
            "rgba(255,249,204," +
            (alpha * 0.35) +
            ")";

        ctx.beginPath();

        ctx.arc(
            x,
            s.y,
            s.size * 3,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // STAR CENTER
        ctx.fillStyle =
            "rgba(255,255,235," +
            alpha +
            ")";

        ctx.beginPath();

        ctx.arc(
            x,
            s.y,
            s.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // REMOVE STAR WHEN OFF SCREEN
        if (s.y < 0) {

            stars.splice(i, 1);

            i--;

        }

    }

}


///===========================================
/// ROOM 5: UNITY VAULT
///===========================================

function unityVault() {

    drawRoomTitle("the unity vault.");

    ctx.fillStyle = darkGreen;
    ctx.textAlign = "center";

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "We find our way forward together.",
        w / 2,
        150
    );

    // OUTER VAULT
    ctx.fillStyle = lightGreen;

    ctx.beginPath();

    ctx.arc(
        w / 2,
        425,
        140,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle = cream;
    ctx.lineWidth = 8;

    ctx.stroke();

    // INNER VAULT
    ctx.fillStyle = darkGreen;

    ctx.beginPath();

    ctx.arc(
        w / 2,
        425,
        110,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // LOCK
    ctx.fillStyle = cream;

    ctx.fillRect(
        w / 2 - 30,
        400,
        60,
        65
    );

    ctx.fillStyle = darkGreen;

    ctx.beginPath();

    ctx.arc(
        w / 2,
        427,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // SECRET WORD
    ctx.fillStyle = darkGreen;

    ctx.font = "27px Georgia";

    ctx.fillText(
        "Your Secret Word:",
        w / 2,
        205
    );

    ctx.font = "500 48px Cormorant Garamond";

    ctx.fillText(
        secretWords[playerNumber],
        w / 2,
        255
    );

    ctx.font = "24px Georgia";

    ctx.fillText(
        "Share your word with your team.",
        w / 2,
        610
    );

    ctx.fillText(
        "Work together to unlock the vault.",
        w / 2,
        650
    );

}


///-----------------------------------------
/// CHECK VAULT ANSWER
///-----------------------------------------

function checkVault() {

    if (phase !== 7) {
        return;
    }

    var answer =
        document.getElementById("vaultAnswer").value;

    answer = answer.toUpperCase().trim();

    answer = answer.replace(/\s+/g, " ");

    // ALL CAPITALS, BECAUSE THE TYPED ANSWER IS MADE CAPITALS ABOVE
    // (SO "you found...", "YOU FOUND..." AND "You Found..." ALL WORK)
    var correctAnswer =
        "YOU FOUND YOUR WAY WITHIN";

    if (answer === correctAnswer) {

        score += game.pointsPerRoom;

        game.finished = true;

        phase = 8;

        hideControls();

        console.log("Vault Unlocked!");
    }

    else {

        alert(
            "Incorrect phrase! Work together and try again."
        );
    }

}


///===========================================
/// FINISH ROOM
///===========================================

function finishRoom() {

    if (phase < 3 || phase > 6) {
        return;
    }

    score += game.pointsPerRoom;

    phase++;

    hideControls();

    // ENTER ROOM 2
    if (phase === 4) {

        chooseDrawingColours();

        document.getElementById("drawingControls").style.display =
            "block";
    }

    // ENTER ROOM 4
    else if (phase === 6) {

        document.getElementById("gardenControls").style.display =
            "block";
    }

    // ENTER ROOM 5
    else if (phase === 7) {

        document.getElementById("vaultControls").style.display =
            "block";
    }

    console.log("Room Completed!");
    console.log("Score: " + score);

}


///===========================================
/// WIN SCREEN
///===========================================

function drawWinScreen() {

    ctx.fillStyle = darkGreen;
    ctx.textAlign = "center";

    ctx.font = "500 80px Cormorant Garamond";

    ctx.fillText(
        "you escaped.",
        w / 2,
        140
    );

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "a moment to pause. a space to grow.",
        w / 2,
        205
    );

    // CELEBRATION CIRCLES
    for (var i = 0; i < 12; i++) {

        var angle =
            Math.PI * 2 * i / 12 +
            animationTimer * 0.01;

        var x =
            500 + Math.cos(angle) * 150;

        var y =
            365 + Math.sin(angle) * 115;

        ctx.fillStyle = cream;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

    // CENTER SYMBOL
    ctx.fillStyle = cream;

    ctx.beginPath();

    ctx.arc(
        500,
        365,
        75,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = forestGreen;

    ctx.font = "75px Georgia";

    ctx.fillText(
        "✓",
        500,
        390
    );

    // RESULTS
    ctx.fillStyle = darkGreen;

    ctx.font = "26px Georgia";

    ctx.fillText(
        "Congratulations, " + playerName + "!",
        w / 2,
        540
    );

    ctx.fillText(
        "Team: " + teamName,
        w / 2,
        585
    );

    ctx.fillText(
        "Final Score: " + score + "/500",
        w / 2,
        630
    );

    ctx.font = "italic 28px Cormorant Garamond";

    ctx.fillText(
        "click to begin again",
        w / 2,
        680
    );
}


///===========================================
/// RESET GAME
///===========================================

function resetGame() {
    score = 0;
    gameStarted = false;
    game.finished = false;
    resetRoomVariables();
    phase = 1;
    document.getElementById("welcomePage").style.display =
        "block";
    document.getElementById("gamePage").style.display =
        "none";
    document.getElementById("gameControls").style.display =
        "block";
    console.log("Game Reset!");
}


///===========================================
/// MOUSE CONTROLS
///===========================================

function setUpMouseControls() {
    canvas.onclick = function(e) {

        var mouse = getMousePosition(e);
        var x = mouse.x;
        var y = mouse.y;

        // ROOM 1
        if (phase === 3) {

            if (breathingFinished === true) {
                finishRoom();
            }
        }

        // ROOM 3
        else if (phase === 5) {
            clickBrick(x, y);
        }

        // ROOM 4
        else if (phase === 6) {
            if (gardenFinished === true) {
                finishRoom();
            }
        }

        // WIN SCREEN
        else if (phase === 8) {
            resetGame();
        }
    };


    // START DRAWING
    canvas.onmousedown = function(e) {
        if (phase === 4) {
            drawing = false;
            drawOnCanvas(e);
            drawing = true;
        }
    };


    // CONTINUE DRAWING
    canvas.onmousemove = function(e) {

        if (
            phase === 4 &&
            drawing === true
        ) {
            drawOnCanvas(e);
        }
    };


    // STOP DRAWING
    canvas.onmouseup = function() {

        drawing = false;
    };


    canvas.onmouseleave = function() {
        drawing = false;
    };
}


///===========================================
/// RESIZE BACKGROUND
///===========================================

window.onresize = function() {

    setUpWaterCanvas();
};


///===========================================
/// END OF JAVASCRIPT
///===========================================

// ROOM 1 - BREATHING CHAMBER
// ROOM 2 - EMOTION GALLERY
// ROOM 3 - WEIGHT OF WORDS
// ROOM 4 - RELEASE GARDEN
// ROOM 5 - UNITY VAULT
//
// 100 POINTS PER ROOM
// MAXIMUM SCORE = 500


///-----------------------------------------------------------------------------------------
///CHANGES TO MAKE ---------------------------------------------------------
/// Add the Enter your details page at the beggining before the breathing chamber 
/// Room 4: Release Garden - Make the box for releasing in Room 4 a bit bigger. 
/// CHNAGE THE PHRASE - think abut the  fact that there might not be enought for 4 rooms. 
//// Ensure each player gets thier word and as a team work together to uncode the entire phrase. Each Player number has a different word. (randomized) 
/// Add Closing of the Site. 
/// After Room 3 - Have a pop up saying congrats you broke the wall. (add some positive note here.)

/// The closing of the site. but also the phrase. 
/// You Found Your Way Within. 
// “You came here to escape, but perhaps what you really needed was to reconnect.
// Take a deep breath. Leave behind what no longer serves you. Carry forward the peace, strength, and hope you discovered within yourself.
// Your journey doesn't end here. It begins with you.