
///============================================
/// WELCOME TO MY CODE!
/// THE ESCAPE WITHIN
/// STRESS MANAGEMENT AND MINDFULNESS
///
/// This game has 5 different rooms.
/// Each room teaches a mindfulness skill.
/// Participants complete challenges to escape.
///============================================


///===========================================
/// GLOBAL VARIABLES
///===========================================

// Canvas
var canvas;
var ctx;
var w = 1000;
var h = 750;

// Game Variables
var phase = 1;
var score = 0;
var gameStarted = false;

var playerName = "";
var teamName = "";
var playerNumber = 0;

// Rooms
var rooms = [
    "Breathing Chamber",
    "Emotion Gallery",
    "Weight of Words",
    "Release Garden",
    "Unity Vault"
];

// Secret Words
var secretWords = [
    "PAUSE",
    "BREATHE",
    "NOTICE",
    "RELEASE",
    "CONNECT"
];

// Breathing Variables
var breathTimer = 0;
var breathCycles = 0;
var brainSize = 1;
var brainFloat = 0;
var breathingFinished = false;

// Drawing Variables
var drawing = false;
var drawingStarted = false;

// Thought Wall Variables
var thoughts = [
    {text:"I'm not good enough", broken:false},
    {text:"I'm going to fail", broken:false},
    {text:"Everyone is judging me", broken:false},
    {text:"I have to be perfect", broken:false}
];

var bricksBroken = 0;

// Garden Variables
var stars = [];
var gardenFinished = false;

// Animation Variables
var animationTimer = 0;


//===========================================
/// EXECUTION SECTION
//===========================================

setUpCanvas();
animationLoop();


// Canvas Mouse Controls
canvas.onclick = function(e) {

    var rect = canvas.getBoundingClientRect();

    var x = (e.clientX - rect.left) * w / rect.width;
    var y = (e.clientY - rect.top) * h / rect.height;

    // Title Screen
    if (phase === 1) {
        phase = 2;
    }

    // Instructions
    else if (phase === 2) {
        phase = 3;
    }

    // Breathing Room
    else if (phase === 3) {
        if (breathingFinished === true) {
            finishRoom();
        }
    }

    // Weight of Words
    else if (phase === 5) {
        clickBrick(x, y);
    }

    // Release Garden
    else if (phase === 6) {
        if (gardenFinished === true) {
            finishRoom();
        }
    }

    // Win Screen
    else if (phase === 8) {
        resetGame();
    }

};


//===========================================
/// MAIN ANIMATION LOOP
//===========================================

function animationLoop() {

    clearBG();
    drawBackground();

    animationTimer++;

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


//===========================================
/// FUNCTION SECTION
//===========================================


///-----------------------------------------
/// SET UP CANVAS
///-----------------------------------------

function setUpCanvas() {

    canvas = document.getElementById("MyCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

}


///-----------------------------------------
/// CLEAR BACKGROUND
///-----------------------------------------

function clearBG() {

    ctx.fillStyle = "#160d30";
    ctx.fillRect(0, 0, w, h);

}


///-----------------------------------------
/// BACKGROUND GRAPHICS
///-----------------------------------------

function drawBackground() {

    var grad = ctx.createLinearGradient(0, 0, 0, h);

    grad.addColorStop(0, "#25134b");
    grad.addColorStop(1, "#533579");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Floating Stars
    for (var i = 0; i < 35; i++) {

        var x = (i * 137) % w;
        var y = (i * 89) % h;

        var size = 2 + Math.sin(animationTimer * 0.03 + i);

        ctx.fillStyle = "#e9d5ff";

        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, size), 0, Math.PI * 2);
        ctx.fill();
    }
}


///-----------------------------------------
/// TITLE SCREEN
///-----------------------------------------

function drawTitleScreen() {

    drawBrainBuddy(w/2, 300, 1);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.font = "bold 55px Arial";
    ctx.fillText("THE ESCAPE WITHIN", w/2, 120);

    ctx.font = "25px Arial";
    ctx.fillText("A Mindfulness Adventure", w/2, 175);

    ctx.font = "22px monospace";
    ctx.fillText("Click to Continue", w/2, 600);
}


///-----------------------------------------
/// INSTRUCTION SCREEN
///-----------------------------------------

function drawInstructions() {

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "bold 45px Arial";
    ctx.fillText("HOW TO PLAY", w/2, 120);

    ctx.font = "22px Arial";

    ctx.fillText("Complete 5 mindfulness challenges.", w/2, 230);
    ctx.fillText("Each room teaches a different skill.", w/2, 280);
    ctx.fillText("Earn 100 points for each room.", w/2, 330);
    ctx.fillText("Work together to unlock the final vault.", w/2, 380);

    ctx.font = "20px monospace";
    ctx.fillText("Click to Enter the First Room", w/2, 550);
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

    gameStarted = true;
    phase = 3;
    score = 0;

    document.getElementById("gameControls").style.display = "none";

    console.log("Welcome " + playerName);
    console.log("Team: " + teamName);
}


///-----------------------------------------
/// DRAW BRAIN BUDDY
///-----------------------------------------

function drawBrainBuddy(x, y, size) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(size, size);

    // Body
    ctx.fillStyle = "#8dd9cc";

    ctx.beginPath();
    ctx.ellipse(0, 85, 65, 75, 0, 0, Math.PI * 2);
    ctx.fill();

    // Arms
    ctx.strokeStyle = "#8dd9cc";
    ctx.lineWidth = 20;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(-55, 50);
    ctx.lineTo(-85, 95);
    ctx.moveTo(55, 50);
    ctx.lineTo(85, 95);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(-30, 140);
    ctx.lineTo(-35, 175);
    ctx.moveTo(30, 140);
    ctx.lineTo(35, 175);
    ctx.stroke();

    // Brain Shape
    ctx.fillStyle = "#ffb5d8";
    ctx.strokeStyle = "#b967a3";
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.ellipse(0, -35, 105, 85, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Brain Folds
    ctx.strokeStyle = "#e57eb4";
    ctx.lineWidth = 4;

    for (var i = 0; i < 5; i++) {

        ctx.beginPath();

        ctx.arc(-55 + i * 27, -60, 18, 0, Math.PI);
        ctx.stroke();
    }

    // Eyes
    ctx.fillStyle = "#302044";

    ctx.beginPath();
    ctx.arc(-35, -20, 9, 0, Math.PI * 2);
    ctx.arc(35, -20, 9, 0, Math.PI * 2);
    ctx.fill();

    // Blush
    ctx.fillStyle = "#ff80aa";

    ctx.beginPath();
    ctx.ellipse(-65, 0, 15, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(65, 0, 15, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = "#302044";
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

    drawRoomTitle("ROOM 1: BREATHING CHAMBER");

    // Breathing Animation
    // About 60 frames per second
    breathTimer++;

    var seconds = Math.floor(breathTimer / 60);

    // One cycle is 8 seconds
    var breathPosition = seconds % 8;

    if (breathPosition < 4) {
        brainSize += 0.001;
    }

    else {
        brainSize -= 0.001;
    }

    brainSize = Math.max(0.95, Math.min(1.1, brainSize));

    brainFloat += 0.04;

    var floatY = Math.sin(brainFloat) * 10;

    drawBrainBuddy(w/2, 340 + floatY, brainSize);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "25px Arial";

    if (breathPosition < 4) {
        ctx.fillText("BREATHE IN", w/2, 580);
    }

    else {
        ctx.fillText("BREATHE OUT", w/2, 580);
    }

    breathCycles = Math.floor(seconds / 8);

    ctx.font = "20px Arial";
    ctx.fillText("Breathing Cycles: " +
        Math.min(breathCycles, 3) + "/3", w/2, 625);

    if (breathCycles >= 3) {

        breathingFinished = true;

        ctx.fillText("Great Job! Click to Continue", w/2, 680);
    }
}


///-----------------------------------------
/// ROOM 2: EMOTION GALLERY
///-----------------------------------------

function emotionGallery() {

    drawRoomTitle("ROOM 2: EMOTION GALLERY");

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "22px Arial";

    ctx.fillText("Draw what CALMNESS looks like to you.", w/2, 135);

    // Drawing Area
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(150, 180, 700, 450);

    ctx.strokeStyle = "#cda9ff";
    ctx.lineWidth = 5;
    ctx.strokeRect(150, 180, 700, 450);
}


///-----------------------------------------
/// DRAWING CONTROLS
///-----------------------------------------

canvas.onmousedown = function(e) {

    if (phase === 4) {
        drawing = true;
        drawingStarted = true;
        drawOnCanvas(e);
    }
};

canvas.onmousemove = function(e) {

    if (phase === 4 && drawing === true) {
        drawOnCanvas(e);
    }
};

canvas.onmouseup = function() {
    drawing = false;
};

function drawOnCanvas(e) {

    var rect = canvas.getBoundingClientRect();

    var x = (e.clientX - rect.left) * w / rect.width;
    var y = (e.clientY - rect.top) * h / rect.height;

    if (x > 150 && x < 850 && y > 180 && y < 630) {

        var color = document.getElementById("drawColor").value;

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function clearDrawing() {

    ctx.fillStyle = "white";
    ctx.fillRect(150, 180, 700, 450);

    drawingStarted = false;
}

function finishDrawing() {

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

    drawRoomTitle("ROOM 3: WEIGHT OF WORDS");

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "22px Arial";

    ctx.fillText("Break through the wall of stressful thoughts!", w/2, 135);

    // Draw Bricks
    for (var i = 0; i < thoughts.length; i++) {

        if (thoughts[i].broken === false) {

            var x = 120 + (i % 2) * 400;
            var y = 230 + Math.floor(i / 2) * 160;

            ctx.fillStyle = "#a26cbb";
            ctx.fillRect(x, y, 360, 120);

            ctx.strokeStyle = "#f2d5ff";
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, 360, 120);

            ctx.fillStyle = "white";
            ctx.font = "19px Arial";
            ctx.textAlign = "center";

            ctx.fillText(thoughts[i].text, x + 180, y + 65);
        }
    }

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.textAlign = "center";

    ctx.fillText("Bricks Broken: " + bricksBroken + "/4", w/2, 650);
}


///-----------------------------------------
/// CLICK ON BRICKS
///-----------------------------------------

function clickBrick(x, y) {

    for (var i = 0; i < thoughts.length; i++) {

        var bx = 120 + (i % 2) * 400;
        var by = 230 + Math.floor(i / 2) * 160;

        if (thoughts[i].broken === false &&
            x > bx && x < bx + 360 &&
            y > by && y < by + 120) {

            var answer = prompt(
                "Thought: " + thoughts[i].text +
                "\n\nWhat can you remind yourself?" +
                "\n1. Every negative thought is true." +
                "\n2. A thought is not always a fact." +
                "\n3. I should never feel stressed." +
                "\n\nEnter 1, 2, or 3."
            );

            if (answer === "2") {

                thoughts[i].broken = true;
                bricksBroken++;

                console.log("Brick Broken!");

                if (bricksBroken === thoughts.length) {
                    alert("You broke the wall!");
                    finishRoom();
                }
            }

            else {
                alert("Try Again! Remember, thoughts are not always facts.");
            }

            break;
        }
    }
}


///-----------------------------------------
/// ROOM 4: RELEASE GARDEN
///-----------------------------------------

function releaseGarden() {

    drawRoomTitle("ROOM 4: RELEASE GARDEN");

    drawGarden();

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "22px Arial";

    ctx.fillText("Take a moment to let go of a stressful thought.", w/2, 135);

    // Stars Released
    for (var i = 0; i < stars.length; i++) {

        stars[i].y -= stars[i].speed;

        ctx.fillStyle = "#ffe8a3";

        ctx.beginPath();
        ctx.arc(stars[i].x, stars[i].y, stars[i].size,
            0, Math.PI * 2);
        ctx.fill();

        if (stars[i].y < 0) {
            stars.splice(i, 1);
            i--;
        }
    }

    if (gardenFinished === true) {

        ctx.fillStyle = "white";
        ctx.font = "22px Arial";

        ctx.fillText("Click to Continue", w/2, 650);
    }
}


///-----------------------------------------
/// DRAW GARDEN
///-----------------------------------------

function drawGarden() {

    // Grass
    ctx.fillStyle = "#326b52";
    ctx.fillRect(0, 520, w, 230);

    // Moon
    ctx.fillStyle = "#fff2bd";
    ctx.beginPath();
    ctx.arc(850, 160, 65, 0, Math.PI * 2);
    ctx.fill();

    // Flowers
    for (var i = 0; i < 12; i++) {

        var x = 60 + i * 80;
        var y = 600 + Math.sin(i) * 30;

        drawFlower(x, y);
    }

    // Trees
    drawTree(100, 490);
    drawTree(900, 490);
}


///-----------------------------------------
/// DRAW FLOWER
///-----------------------------------------

function drawFlower(x, y) {

    // Stem
    ctx.strokeStyle = "#6dd39e";
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 55);
    ctx.stroke();

    // Petals
    ctx.fillStyle = "#ff9ac8";

    for (var i = 0; i < 5; i++) {

        var angle = Math.PI * 2 * i / 5;

        ctx.beginPath();

        ctx.arc(
            x + Math.cos(angle) * 15,
            y + Math.sin(angle) * 15,
            12, 0, Math.PI * 2
        );

        ctx.fill();
    }

    // Center
    ctx.fillStyle = "#ffdf7c";

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}


///-----------------------------------------
/// DRAW TREE
///-----------------------------------------

function drawTree(x, y) {

    ctx.fillStyle = "#76503b";
    ctx.fillRect(x - 15, y - 100, 30, 180);

    ctx.fillStyle = "#438c71";

    ctx.beginPath();
    ctx.arc(x, y - 120, 85, 0, Math.PI * 2);
    ctx.fill();
}


///-----------------------------------------
/// RELEASE THOUGHT
///-----------------------------------------

function releaseThought() {

    var thought = document.getElementById("stressThought").value;

    if (thought === "") {
        alert("Enter a thought or use a made-up example.");
        return;
    }

    // We do not save or print the thought.
    document.getElementById("stressThought").value = "";

    // Create Stars
    for (var i = 0; i < 25; i++) {

        stars.push({
            x: 350 + Math.random() * 300,
            y: 500 + Math.random() * 100,
            size: 2 + Math.random() * 5,
            speed: 1 + Math.random() * 3
        });
    }

    var answer = prompt(
        "You have a lot of assignments and feel overwhelmed." +
        "\nWhat could you do?" +
        "\n\n1. Ignore everything." +
        "\n2. Pause, breathe, and make a plan." +
        "\n3. Tell yourself you are failing." +
        "\n\nEnter 1, 2, or 3."
    );

    if (answer === "2") {
        gardenFinished = true;
        alert("Great job! You found the garden key.");
    }

    else {
        alert("Try again. Think about a helpful way to manage stress.");
    }
}


///-----------------------------------------
/// ROOM 5: UNITY VAULT
///-----------------------------------------

function unityVault() {

    drawRoomTitle("ROOM 5: THE UNITY VAULT");

    ctx.fillStyle = "#e9c9ff";
    ctx.textAlign = "center";

    // Vault Door
    ctx.beginPath();
    ctx.arc(w/2, 370, 160, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#5b348b";

    ctx.beginPath();
    ctx.arc(w/2, 370, 125, 0, Math.PI * 2);
    ctx.fill();

    // Lock
    ctx.fillStyle = "#ffd98a";
    ctx.fillRect(w/2 - 30, 345, 60, 65);

    ctx.font = "22px Arial";
    ctx.fillStyle = "white";

    ctx.fillText("Your Secret Word:", w/2, 180);

    ctx.font = "bold 35px Arial";
    ctx.fillText(secretWords[playerNumber], w/2, 230);

    ctx.font = "20px Arial";
    ctx.fillText("Share your word with your group!", w/2, 585);
    ctx.fillText("Work together to unlock the vault.", w/2, 625);
}


///-----------------------------------------
/// CHECK FINAL ANSWER
///-----------------------------------------

function checkVault() {

    var answer = document.getElementById("vaultAnswer").value;

    answer = answer.toUpperCase().trim();

    var correctAnswer = "PAUSE BREATHE NOTICE RELEASE CONNECT";

    if (answer === correctAnswer) {

        score += 100;

        phase = 8;

        document.getElementById("vaultControls").style.display = "none";

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

    score += 100;

    phase++;

    console.log("Room Completed!");
    console.log("Total Score: " + score);

    // Hide All Controls
    document.getElementById("drawingControls").style.display = "none";
    document.getElementById("gardenControls").style.display = "none";
    document.getElementById("vaultControls").style.display = "none";

    if (phase === 4) {
        document.getElementById("drawingControls").style.display = "block";
    }

    else if (phase === 6) {
        document.getElementById("gardenControls").style.display = "block";
    }

    else if (phase === 7) {
        document.getElementById("vaultControls").style.display = "block";
    }
}


///-----------------------------------------
/// DRAW ROOM TITLE
///-----------------------------------------

function drawRoomTitle(title) {

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 35px Arial";

    ctx.fillText(title, w/2, 75);

    ctx.font = "18px Arial";
    ctx.fillText("Team: " + teamName + " | Score: " + score, w/2, 710);
}


///-----------------------------------------
/// WIN SCREEN
///-----------------------------------------

function drawWinScreen() {

    drawBrainBuddy(w/2, 350, 1);

    ctx.fillStyle = "#ffdf8a";
    ctx.textAlign = "center";

    ctx.font = "bold 55px Arial";
    ctx.fillText("YOU ESCAPED!", w/2, 115);

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";

    ctx.fillText("Congratulations " + playerName + "!", w/2, 175);

    ctx.fillText("Team: " + teamName, w/2, 560);
    ctx.fillText("Final Score: " + score, w/2, 605);

    ctx.font = "18px monospace";
    ctx.fillText("Click to Play Again", w/2, 680);
}


///-----------------------------------------
/// RESET GAME
///-----------------------------------------

function resetGame() {

    phase = 1;
    score = 0;

    breathTimer = 0;
    breathCycles = 0;
    brainSize = 1;
    breathingFinished = false;

    bricksBroken = 0;
    gardenFinished = false;

    stars = [];
    drawingStarted = false;

    for (var i = 0; i < thoughts.length; i++) {
        thoughts[i].broken = false;
    }

    document.getElementById("gameControls").style.display = "block";

    document.getElementById("drawingControls").style.display = "none";
    document.getElementById("gardenControls").style.display = "none";
    document.getElementById("vaultControls").style.display = "none";

    console.log("Game Reset!");
}


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

