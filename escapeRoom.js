
///============================================
/// THE ESCAPE WITHIN
/// STRESS MANAGEMENT AND MINDFULNESS
///
/// FULL JAVASCRIPT GAME
///
/// ROOM 1 - BREATHING CHAMBER
/// ROOM 2 - EMOTION GALLERY
/// ROOM 3 - WEIGHT OF WORDS
/// ROOM 4 - RELEASE GARDEN
/// ROOM 5 - UNITY VAULT
///============================================


///===========================================
/// GLOBAL VARIABLES
///===========================================

// GAME CANVAS
var canvas;
var ctx;

var w = 1000;
var h = 750;

// WATER CANVAS
var waterCanvas;
var waterCtx;

var waterW = 0;
var waterH = 0;

var waterTimer = 0;
var waterRipples = [];

// GAME COLOURS
var sageGreen = "#dce6d5";
var lightGreen = "#b5cbb1";
var mutedGreen = "#789c79";
var forestGreen = "#416f50";
var darkGreen = "#234c35";
var cream = "#f2f0df";

// GAME VARIABLES
var phase = 1;
var score = 0;
var gameStarted = false;

var playerName = "";
var teamName = "";
var playerNumber = 0;

var animationTimer = 0;

// ROOM NAMES
var rooms = [
    "Breathing Chamber",
    "Emotion Gallery",
    "Weight of Words",
    "Release Garden",
    "Unity Vault"
];

// FINAL SECRET WORDS
var secretWords = [
    "PAUSE",
    "BREATHE",
    "NOTICE",
    "RELEASE",
    "CONNECT"
];

// BREATHING VARIABLES
var breathStartTime = 0;
var breathSeconds = 0;
var breathCycles = 0;
var brainSize = 1;
var breathingFinished = false;

// DRAWING VARIABLES
var drawing = false;
var drawingStarted = false;
var drawingCanvas;
var drawingCtx;

var lastDrawX = 0;
var lastDrawY = 0;

// NEGATIVE THOUGHTS
var thoughts = [
    {
        text: "I'm not good enough",
        broken: false
    },
    {
        text: "I'm going to fail",
        broken: false
    },
    {
        text: "Everyone is judging me",
        broken: false
    },
    {
        text: "I have to be perfect",
        broken: false
    }
];

var bricksBroken = 0;

// GARDEN VARIABLES
var stars = [];
var gardenReleased = false;
var gardenFinished = false;

// GAME SETTINGS
var game = {
    title: "The Escape Within",
    pointsPerRoom: 100,
    finished: false
};


///===========================================
/// MAIN PROGRAM
///===========================================

setUpCanvas();
setUpDrawingCanvas();
setUpWaterCanvas();

setUpMouseControls();

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
/// SET UP DRAWING CANVAS
///-----------------------------------------

function setUpDrawingCanvas() {

    // This canvas saves the player's drawing.
    // It is separate from the animated game canvas.

    drawingCanvas = document.createElement("canvas");

    drawingCanvas.width = 700;
    drawingCanvas.height = 450;

    drawingCtx = drawingCanvas.getContext("2d");

    clearDrawing();

}


///-----------------------------------------
/// SET UP WATER CANVAS
///-----------------------------------------

function setUpWaterCanvas() {

    waterCanvas = document.getElementById("waterCanvas");

    waterCtx = waterCanvas.getContext("2d");

    waterW = window.innerWidth;

    waterH = document.getElementById("welcomePage").offsetHeight;

    waterCanvas.width = waterW;
    waterCanvas.height = waterH;

    waterRipples = [];

    for (var i = 0; i < 12; i++) {

        waterRipples.push({

            x: Math.random() * waterW,

            y: Math.random() * waterH,

            size: 30 + Math.random() * 100,

            speed: 0.2 + Math.random() * 0.4,

            offset: Math.random() * Math.PI * 2

        });

    }

}


///-----------------------------------------
/// DRAW WATER RIPPLES
///-----------------------------------------

function drawWaterRipples() {

    if (document.getElementById("welcomePage").style.display !== "none") {

        waterCtx.clearRect(0, 0, waterW, waterH);

        waterTimer += 0.02;

        for (var i = 0; i < waterRipples.length; i++) {

            var r = waterRipples[i];

            var movement = Math.sin(waterTimer + r.offset) * 15;

            var radius = r.size + movement;

            for (var j = 0; j < 4; j++) {

                var ringSize = radius + j * 22;

                waterCtx.beginPath();

                waterCtx.ellipse(
                    r.x,
                    r.y,
                    ringSize,
                    ringSize * 0.5,
                    0,
                    0,
                    Math.PI * 2
                );

                waterCtx.strokeStyle =
                    "rgba(255,255,255," + (0.18 - j * 0.035) + ")";

                waterCtx.lineWidth = 2;

                waterCtx.stroke();

            }

            r.y -= r.speed;

            if (r.y < -200) {
                r.y = waterH + 200;
            }

        }

    }

    requestAnimationFrame(drawWaterRipples);

}


///-----------------------------------------
/// ENTER GAME FROM WELCOME PAGE
///-----------------------------------------

function enterGame() {

    document.getElementById("welcomePage").style.display = "none";

    document.getElementById("gamePage").style.display = "block";

    phase = 1;

    console.log("Entering The Escape Within!");

}


///-----------------------------------------
/// START GAME
///-----------------------------------------

function startGame() {

    playerName = document.getElementById("playerName").value;

    teamName = document.getElementById("teamName").value;

    playerNumber = Number(
        document.getElementById("playerNumber").value
    );

    if (playerName === "") {
        playerName = "Player";
    }

    if (teamName === "") {
        teamName = "Team Mindful";
    }

    resetRoomVariables();

    score = 0;

    gameStarted = true;
    game.finished = false;

    phase = 2;

    document.getElementById("gameControls").style.display = "none";

    console.log("Player: " + playerName);
    console.log("Team: " + teamName);

}


///-----------------------------------------
/// RESET ROOM VARIABLES
///-----------------------------------------

function resetRoomVariables() {

    breathStartTime = 0;
    breathSeconds = 0;
    breathCycles = 0;
    brainSize = 1;
    breathingFinished = false;

    drawing = false;
    drawingStarted = false;

    clearDrawing();

    bricksBroken = 0;

    for (var i = 0; i < thoughts.length; i++) {
        thoughts[i].broken = false;
    }

    stars = [];

    gardenReleased = false;
    gardenFinished = false;

    document.getElementById("stressThought").value = "";

    document.getElementById("vaultAnswer").value = "";

    hideControls();

}


///-----------------------------------------
/// HIDE GAME CONTROLS
///-----------------------------------------

function hideControls() {

    document.getElementById("drawingControls").style.display = "none";

    document.getElementById("gardenControls").style.display = "none";

    document.getElementById("vaultControls").style.display = "none";

}


///-----------------------------------------
/// MAIN ANIMATION LOOP
///-----------------------------------------

function animationLoop() {

    animationTimer++;

    clearBG();

    drawBackground();

    if (phase === 1) {
        drawTitleScreen();
    }

    else if (phase === 2) {
        drawInstructions();
    }

    else if (phase === 3) {
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
/// CLEAR BACKGROUND
///-----------------------------------------

function clearBG() {

    ctx.clearRect(0, 0, w, h);

}


///-----------------------------------------
/// DRAW GREEN BACKGROUND
///-----------------------------------------

function drawBackground() {

    var gradient = ctx.createLinearGradient(0, 0, w, h);

    gradient.addColorStop(0, sageGreen);

    gradient.addColorStop(0.3, lightGreen);

    gradient.addColorStop(0.6, mutedGreen);

    gradient.addColorStop(1, forestGreen);

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, w, h);

    drawGameRipples();

}


///-----------------------------------------
/// DRAW GAME WATER RIPPLES
///-----------------------------------------

function drawGameRipples() {

    for (var i = 0; i < 8; i++) {

        var x = 100 + (i % 4) * 270;

        var y = 100 + Math.floor(i / 4) * 450;

        var movement = Math.sin(animationTimer * 0.015 + i) * 18;

        for (var j = 0; j < 3; j++) {

            var size = 60 + j * 35 + movement;

            ctx.beginPath();

            ctx.ellipse(
                x,
                y,
                Math.max(5, size),
                Math.max(5, size * 0.45),
                0,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle = "rgba(255,255,255,0.15)";

            ctx.lineWidth = 2;

            ctx.stroke();

        }

    }

}


///-----------------------------------------
/// DRAW TITLE SCREEN
///-----------------------------------------

function drawTitleScreen() {

    ctx.fillStyle = darkGreen;

    ctx.textAlign = "center";

    ctx.font = "500 95px Cormorant Garamond";

    ctx.fillText("the escape", w / 2, 230);

    ctx.font = "italic 105px Cormorant Garamond";

    ctx.fillText("within.", w / 2, 335);

    ctx.font = "italic 35px Cormorant Garamond";

    ctx.fillText(
        "inhale. exhale. begin again.",
        w / 2,
        420
    );

    ctx.font = "25px Georgia";

    ctx.fillText(
        "Click to Continue",
        w / 2,
        610
    );

}


///-----------------------------------------
/// DRAW INSTRUCTIONS
///-----------------------------------------

function drawInstructions() {

    ctx.fillStyle = darkGreen;

    ctx.textAlign = "center";

    ctx.font = "500 65px Cormorant Garamond";

    ctx.fillText("your journey begins.", w / 2, 135);

    ctx.font = "25px Georgia";

    ctx.fillText(
        "Complete five mindfulness challenges.",
        w / 2,
        245
    );

    ctx.fillText(
        "Each room teaches a different stress-management skill.",
        w / 2,
        300
    );

    ctx.fillText(
        "Earn 100 points for each completed room.",
        w / 2,
        355
    );

    ctx.fillText(
        "Work with your team to unlock the final vault.",
        w / 2,
        410
    );

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "There is no need to rush.",
        w / 2,
        510
    );

    ctx.font = "25px Georgia";

    ctx.fillText(
        "Click to Enter the Breathing Chamber",
        w / 2,
        625
    );

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


///-----------------------------------------
/// DRAW BRAIN BUDDY
///-----------------------------------------

function drawBrainBuddy(x, y, size) {

    ctx.save();

    ctx.translate(x, y);

    ctx.scale(size, size);

    // BODY
    ctx.fillStyle = "#91c7a7";

    ctx.beginPath();

    ctx.ellipse(0, 85, 65, 75, 0, 0, Math.PI * 2);

    ctx.fill();

    // ARMS
    ctx.strokeStyle = "#91c7a7";

    ctx.lineWidth = 20;

    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(-55, 50);
    ctx.lineTo(-85, 95);

    ctx.moveTo(55, 50);
    ctx.lineTo(85, 95);

    ctx.stroke();

    // LEGS
    ctx.beginPath();

    ctx.moveTo(-30, 140);
    ctx.lineTo(-35, 175);

    ctx.moveTo(30, 140);
    ctx.lineTo(35, 175);

    ctx.stroke();

    // BRAIN
    ctx.fillStyle = "#f0b7c9";

    ctx.strokeStyle = "#b9758d";

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.ellipse(0, -35, 105, 85, 0, 0, Math.PI * 2);

    ctx.fill();
    ctx.stroke();

    // BRAIN FOLDS
    ctx.strokeStyle = "#d98ea9";

    ctx.lineWidth = 4;

    for (var i = 0; i < 5; i++) {

        ctx.beginPath();

        ctx.arc(
            -55 + i * 27,
            -60,
            18,
            0,
            Math.PI
        );

        ctx.stroke();

    }

    // EYES
    ctx.fillStyle = darkGreen;

    ctx.beginPath();

    ctx.arc(-35, -20, 9, 0, Math.PI * 2);

    ctx.arc(35, -20, 9, 0, Math.PI * 2);

    ctx.fill();

    // CHEEKS
    ctx.fillStyle = "#e98fa9";

    ctx.beginPath();

    ctx.ellipse(-65, 0, 15, 8, 0, 0, Math.PI * 2);

    ctx.ellipse(65, 0, 15, 8, 0, 0, Math.PI * 2);

    ctx.fill();

    // SMILE
    ctx.strokeStyle = darkGreen;

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(0, -5, 18, 0, Math.PI);

    ctx.stroke();

    ctx.restore();

}


///-----------------------------------------
/// ROOM 1: BREATHING CHAMBER
///-----------------------------------------

function breathingChamber() {

    drawRoomTitle("the breathing chamber.");

    // START TIMER ONCE
    if (breathStartTime === 0) {
        breathStartTime = Date.now();
    }

    var elapsed = (Date.now() - breathStartTime) / 1000;

    breathSeconds = Math.floor(elapsed);

    breathCycles = Math.floor(elapsed / 8);

    var breathPosition = elapsed % 8;

    // GROW DURING INHALE
    // SHRINK DURING EXHALE
    if (breathPosition < 4) {

        brainSize = 0.9 + (breathPosition / 4) * 0.2;

    }

    else {

        brainSize = 1.1 - ((breathPosition - 4) / 4) * 0.2;

    }

    // STOP AFTER 3 CYCLES
    if (elapsed >= 24) {

        breathingFinished = true;

        brainSize = 1;

    }

    // FLOATING MOVEMENT
    var floatY = Math.sin(animationTimer * 0.03) * 8;

    drawBrainBuddy(w / 2, 345 + floatY, brainSize);

    ctx.fillStyle = darkGreen;

    ctx.textAlign = "center";

    ctx.font = "italic 33px Cormorant Garamond";

    ctx.fillText(
        "Follow Brain Buddy's breathing rhythm.",
        w / 2,
        145
    );

    ctx.font = "500 45px Cormorant Garamond";

    if (breathingFinished === true) {

        ctx.fillText(
            "beautifully done.",
            w / 2,
            580
        );

        ctx.font = "25px Georgia";

        ctx.fillText(
            "Click anywhere to continue.",
            w / 2,
            630
        );

    }

    else {

        if (breathPosition < 4) {

            ctx.fillText(
                "inhale.",
                w / 2,
                580
            );

        }

        else {

            ctx.fillText(
                "exhale.",
                w / 2,
                580
            );

        }

        ctx.font = "22px Georgia";

        ctx.fillText(
            "Breathing Cycles: " +
            Math.min(breathCycles, 3) + "/3",
            w / 2,
            635
        );

    }

}


///-----------------------------------------
/// ROOM 2: EMOTION GALLERY
///-----------------------------------------

function emotionGallery() {

    drawRoomTitle("the emotion gallery.");

    ctx.fillStyle = darkGreen;

    ctx.textAlign = "center";

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "Draw what calmness looks like to you.",
        w / 2,
        150
    );

    // DRAWING BACKGROUND
    ctx.fillStyle = cream;

    ctx.fillRect(150, 180, 700, 450);

    // SAVED DRAWING
    ctx.drawImage(drawingCanvas, 150, 180);

    // BORDER
    ctx.strokeStyle = forestGreen;

    ctx.lineWidth = 4;

    ctx.strokeRect(150, 180, 700, 450);

}


///-----------------------------------------
/// GET MOUSE POSITION
///-----------------------------------------

function getMousePosition(e) {

    var rect = canvas.getBoundingClientRect();

    var x = (e.clientX - rect.left) * w / rect.width;

    var y = (e.clientY - rect.top) * h / rect.height;

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

    if (x >= 0 && x <= 700 && y >= 0 && y <= 450) {

        var color = document.getElementById("drawColor").value;

        drawingCtx.strokeStyle = color;

        drawingCtx.fillStyle = color;

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

            drawingCtx.arc(x, y, 6, 0, Math.PI * 2);

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

    drawingCtx.fillStyle = cream;

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


///-----------------------------------------
/// ROOM 3: WEIGHT OF WORDS
///-----------------------------------------

function weightOfWords() {

    drawRoomTitle("the weight of words.");

    ctx.fillStyle = darkGreen;

    ctx.textAlign = "center";

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "A thought is not always a fact.",
        w / 2,
        150
    );

    // DRAW BRICKS
    for (var i = 0; i < thoughts.length; i++) {

        if (thoughts[i].broken === false) {

            var x = 120 + (i % 2) * 400;

            var y = 230 + Math.floor(i / 2) * 160;

            ctx.fillStyle = forestGreen;

            ctx.fillRect(x, y, 360, 120);

            ctx.strokeStyle = cream;

            ctx.lineWidth = 3;

            ctx.strokeRect(x, y, 360, 120);

            ctx.fillStyle = cream;

            ctx.font = "28px Cormorant Garamond";

            ctx.textAlign = "center";

            ctx.fillText(
                thoughts[i].text,
                x + 180,
                y + 68
            );

        }

    }

    ctx.fillStyle = darkGreen;

    ctx.font = "24px Georgia";

    ctx.textAlign = "center";

    ctx.fillText(
        "Bricks Broken: " + bricksBroken + "/4",
        w / 2,
        650
    );

}


///-----------------------------------------
/// CLICK ON THOUGHT BRICKS
///-----------------------------------------

function clickBrick(x, y) {

    for (var i = 0; i < thoughts.length; i++) {

        var bx = 120 + (i % 2) * 400;

        var by = 230 + Math.floor(i / 2) * 160;

        if (
            thoughts[i].broken === false &&
            x > bx &&
            x < bx + 360 &&
            y > by &&
            y < by + 120
        ) {

            var answer = prompt(
                "Thought: " + thoughts[i].text +
                "\n\nWhich reminder is most helpful?" +
                "\n\n1. Every negative thought is true." +
                "\n2. A thought is not always a fact." +
                "\n3. I should never feel stressed." +
                "\n\nEnter 1, 2, or 3."
            );

            if (answer === "2") {

                thoughts[i].broken = true;

                bricksBroken++;

                if (bricksBroken === thoughts.length) {

                    alert("You broke through the wall!");

                    finishRoom();

                }

                else {

                    alert("Great job! Another brick has disappeared.");

                }

            }

            else if (answer !== null) {

                alert(
                    "Try again! Remember, thoughts are not always facts."
                );

            }

            break;

        }

    }

}


///-----------------------------------------
/// ROOM 4: RELEASE GARDEN
///-----------------------------------------

function releaseGarden() {

    drawRoomTitle("the release garden.");

    drawGarden();

    ctx.fillStyle = darkGreen;

    ctx.textAlign = "center";

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "Release what you no longer need to carry.",
        w / 2,
        150
    );

    // FLOATING STARS
    for (var i = 0; i < stars.length; i++) {

        stars[i].y -= stars[i].speed;

        ctx.fillStyle = cream;

        ctx.beginPath();

        ctx.arc(
            stars[i].x,
            stars[i].y,
            stars[i].size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (stars[i].y < 0) {

            stars.splice(i, 1);

            i--;

        }

    }

    if (gardenFinished === true) {

        ctx.fillStyle = cream;

        ctx.font = "28px Georgia";

        ctx.fillText(
            "Click anywhere to continue.",
            w / 2,
            660
        );

    }

}


///-----------------------------------------
/// DRAW GARDEN
///-----------------------------------------

function drawGarden() {

    // GRASS
    ctx.fillStyle = forestGreen;

    ctx.fillRect(0, 520, w, 230);

    // MOON
    ctx.fillStyle = cream;

    ctx.beginPath();

    ctx.arc(850, 200, 65, 0, Math.PI * 2);

    ctx.fill();

    // TREES
    drawTree(100, 500);

    drawTree(900, 500);

    // FLOWERS
    for (var i = 0; i < 12; i++) {

        var x = 60 + i * 80;

        var y = 590 + Math.sin(i) * 25;

        drawFlower(x, y);

    }

}


///-----------------------------------------
/// DRAW FLOWER
///-----------------------------------------

function drawFlower(x, y) {

    // STEM
    ctx.strokeStyle = sageGreen;

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.lineTo(x, y + 55);

    ctx.stroke();

    // PETALS
    ctx.fillStyle = cream;

    for (var i = 0; i < 5; i++) {

        var angle = Math.PI * 2 * i / 5;

        ctx.beginPath();

        ctx.arc(
            x + Math.cos(angle) * 15,
            y + Math.sin(angle) * 15,
            12,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

    // FLOWER CENTER
    ctx.fillStyle = "#e5ce8b";

    ctx.beginPath();

    ctx.arc(x, y, 10, 0, Math.PI * 2);

    ctx.fill();

}


///-----------------------------------------
/// DRAW TREE
///-----------------------------------------

function drawTree(x, y) {

    // TRUNK
    ctx.fillStyle = "#765b45";

    ctx.fillRect(x - 15, y - 100, 30, 180);

    // LEAVES
    ctx.fillStyle = darkGreen;

    ctx.beginPath();

    ctx.arc(x, y - 120, 85, 0, Math.PI * 2);

    ctx.fill();

}


///-----------------------------------------
/// RELEASE STRESSFUL THOUGHT
///-----------------------------------------

function releaseThought() {

    if (phase !== 6) {
        return;
    }

    var thought = document.getElementById("stressThought").value;

    if (thought.trim() === "") {

        alert("Enter a thought or use a made-up example.");

        return;

    }

    // CLEAR THE THOUGHT
    // WE DO NOT SAVE IT OR PRINT IT

    document.getElementById("stressThought").value = "";

    gardenReleased = true;

    // CREATE FLOATING STARS
    for (var i = 0; i < 35; i++) {

        stars.push({

            x: 350 + Math.random() * 300,

            y: 480 + Math.random() * 100,

            size: 2 + Math.random() * 5,

            speed: 1 + Math.random() * 3

        });

    }

    askGardenQuestion();

}


///-----------------------------------------
/// GARDEN QUESTION
///-----------------------------------------

function askGardenQuestion() {

    var answer = prompt(
        "You have a lot of assignments due and feel overwhelmed." +
        "\n\nWhat could you do?" +
        "\n\n1. Ignore everything." +
        "\n2. Pause, breathe, and make a plan." +
        "\n3. Tell yourself you are failing." +
        "\n\nEnter 1, 2, or 3."
    );

    if (answer === "2") {

        gardenFinished = true;

        alert(
            "Great job! You found a helpful way to manage stress."
        );

    }

    else if (answer !== null) {

        alert(
            "Try again. Think about a healthy way to manage stress."
        );

        // ASK AGAIN WITHOUT REQUIRING A NEW THOUGHT
        askGardenQuestion();

    }

}


///-----------------------------------------
/// ROOM 5: UNITY VAULT
///-----------------------------------------

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

    ctx.arc(w / 2, 395, 165, 0, Math.PI * 2);

    ctx.fill();

    ctx.strokeStyle = cream;

    ctx.lineWidth = 8;

    ctx.stroke();

    // INNER VAULT
    ctx.fillStyle = darkGreen;

    ctx.beginPath();

    ctx.arc(w / 2, 395, 130, 0, Math.PI * 2);

    ctx.fill();

    // LOCK
    ctx.fillStyle = cream;

    ctx.fillRect(w / 2 - 30, 370, 60, 65);

    ctx.fillStyle = darkGreen;

    ctx.beginPath();

    ctx.arc(w / 2, 397, 8, 0, Math.PI * 2);

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
/// CHECK FINAL ANSWER
///-----------------------------------------

function checkVault() {

    if (phase !== 7) {
        return;
    }

    var answer = document.getElementById("vaultAnswer").value;

    answer = answer.toUpperCase().trim();

    // ALLOW EXTRA SPACES BETWEEN WORDS
    answer = answer.replace(/\s+/g, " ");

    var correctAnswer =
        "PAUSE BREATHE NOTICE RELEASE CONNECT";

    if (answer === correctAnswer) {

        score += game.pointsPerRoom;

        game.finished = true;

        phase = 8;

        hideControls();

        console.log("Vault Unlocked!");

    }

    else {

        alert("Incorrect phrase! Work together and try again.");

    }

}


///-----------------------------------------
/// FINISH ROOM
///-----------------------------------------

function finishRoom() {

    if (phase < 3 || phase > 6) {
        return;
    }

    score += game.pointsPerRoom;

    phase++;

    hideControls();

    if (phase === 4) {

        document.getElementById("drawingControls").style.display = "block";

    }

    else if (phase === 6) {

        document.getElementById("gardenControls").style.display = "block";

    }

    else if (phase === 7) {

        document.getElementById("vaultControls").style.display = "block";

    }

    console.log("Room Completed!");

    console.log("Total Score: " + score);

}


///-----------------------------------------
/// DRAW WIN SCREEN
///-----------------------------------------

function drawWinScreen() {

    drawBrainBuddy(w / 2, 340, 1);

    ctx.fillStyle = darkGreen;

    ctx.textAlign = "center";

    ctx.font = "500 80px Cormorant Garamond";

    ctx.fillText(
        "you escaped.",
        w / 2,
        115
    );

    ctx.font = "italic 32px Cormorant Garamond";

    ctx.fillText(
        "a moment to pause. a space to grow.",
        w / 2,
        175
    );

    ctx.font = "26px Georgia";

    ctx.fillText(
        "Congratulations, " + playerName + "!",
        w / 2,
        555
    );

    ctx.fillText(
        "Team: " + teamName,
        w / 2,
        595
    );

    ctx.fillText(
        "Final Score: " + score,
        w / 2,
        635
    );

    ctx.font = "italic 28px Cormorant Garamond";

    ctx.fillText(
        "click to begin again",
        w / 2,
        685
    );

}


///-----------------------------------------
/// RESET GAME
///-----------------------------------------

function resetGame() {

    score = 0;

    gameStarted = false;

    game.finished = false;

    resetRoomVariables();

    phase = 1;

    document.getElementById("gameControls").style.display = "block";

    console.log("Game Reset!");

}


///-----------------------------------------
/// SET UP MOUSE CONTROLS
///-----------------------------------------

function setUpMouseControls() {

    // CLICKING THE GAME CANVAS
    canvas.onclick = function(e) {

        var mouse = getMousePosition(e);

        var x = mouse.x;
        var y = mouse.y;

        // TITLE SCREEN
        if (phase === 1 && gameStarted === true) {

            phase = 2;

        }

        // INSTRUCTIONS
        else if (phase === 2) {

            phase = 3;

        }

        // BREATHING CHAMBER
        else if (phase === 3) {

            if (breathingFinished === true) {
                finishRoom();
            }

        }

        // WEIGHT OF WORDS
        else if (phase === 5) {

            clickBrick(x, y);

        }

        // RELEASE GARDEN
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

        if (phase === 4 && drawing === true) {

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


///-----------------------------------------
/// RESIZE WATER BACKGROUND
///-----------------------------------------

window.onresize = function() {

    setUpWaterCanvas();

};


///===========================================
/// END OF JAVASCRIPT
///===========================================

// The game uses:
// var variables
// arrays
// objects
// functions
// if / else if / else
// for loops
// canvas drawing
// Math.sin()
// Math.cos()
// Math.random()
// requestAnimationFrame()
// mouse controls
// HTML buttons
// DOM methods

// Each room is worth 100 points.
// Maximum score = 500 points.

// This version works in one browser.
// Players share their final words verbally.
// Real-time multiplayer would require a server.




///===========================================
/// NOTES
///===========================================

// NOTE #1
// Global variables store information used
// throughout the game.

// NOTE #2
// Phase controls which room is displayed.
// This is similar to the phases in Assignment 4.

// NOTE #3
// requestAnimationFrame keeps the game
// updating and animating.

// NOTE #4
// Math.sin creates gentle movement.
// This is used for Brain Buddy and flowers.

// NOTE #5
// Arrays store rooms, thoughts, and secret words.

// NOTE #6
// Objects store information about each brick.

// NOTE #7
// For loops repeat graphics and game objects.

// NOTE #8
// If statements check the current game phase.

// NOTE #9
// Canvas methods draw Brain Buddy, flowers,
// trees, bricks, stars, and the vault.

// NOTE #10
// The final puzzle encourages participants
// to work together to escape.

