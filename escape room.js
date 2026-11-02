 // ===================================
 // GLOBAL VARIABLES (TOP OF THE FILE)
 // ===================================

 // GAME INFORMATION
 var gameStarted = false;
 var currentRoom = 0;
 var points = 0;
 var playerName = "";
 var teamName = "";

 // ARRAYS - DIFFERENT ESCAPE ROOMS
 var rooms = [
     "Breathing Chamber",
     "Emotion Gallery",
     "Weight of Words",
     "Release Garden",
     "Unity Vault"
 ];

 // OBJECT - GAME SETTINGS
 var game = {
     title: "The Escape Within",
     pointsPerRoom: 100,
     finished: false
 };

 // ARRAY - NEGATIVE THOUGHTS
 var negativeThoughts = [
     "I'm not good enough",
     "I'm going to fail",
     "Everyone is judging me",
     "I have to be perfect"
 ];

 // ARRAY - FINAL SECRET WORDS
 var secretWords = [
     "PAUSE",
     "BREATHE",
     "NOTICE",
     "RELEASE",
     "CONNECT"
 ];


 // ===================================
 // MAIN PROGRAM (MIDDLE OF THE FILE)
 // ===================================

 console.log("Welcome to The Escape Within!");
 console.log("Stress Management and Mindfulness Escape Room");
 console.log("There are " + rooms.length + " rooms to complete.");

 // Start the game by calling startGame()
 // This will be connected to a button later.


 // ===================================
 // FUNCTION SECTION
 // ===================================


 // ===================================
 // FUNCTION 1: START GAME
 // ===================================

 function startGame() {

     gameStarted = true;
     currentRoom = 0;
     points = 0;
     game.finished = false;

     console.log("Game Started!");

     showRoom();
 }


 // ===================================
 // FUNCTION 2: SHOW CURRENT ROOM
 // ===================================

 function showRoom() {

     if (gameStarted === true) {

         console.log("Current Room: " + rooms[currentRoom]);

         if (currentRoom === 0) {
             breathingChamber();
         }

         else if (currentRoom === 1) {
             emotionGallery();
         }

         else if (currentRoom === 2) {
             weightOfWords();
         }

         else if (currentRoom === 3) {
             releaseGarden();
         }

         else if (currentRoom === 4) {
             unityVault();
         }

     }

 }


 // ===================================
 // FUNCTION 3: BREATHING CHAMBER
 // ===================================

 function breathingChamber() {

     console.log("Welcome to the Breathing Chamber!");
     console.log("Breathe with Brain Buddy.");

     // TO ADD LATER:
     // Draw Brain Buddy using canvas.
     // Make Brain Buddy bigger when breathing in.
     // Make Brain Buddy smaller when breathing out.
     // Repeat breathing cycles.
     // Unlock the next room.

 }


 // ===================================
 // FUNCTION 4: EMOTION GALLERY
 // ===================================

 function emotionGallery() {

     console.log("Welcome to the Emotion Gallery!");
     console.log("Draw what your emotions look like.");

     // TO ADD LATER:
     // Create a drawing canvas.
     // Allow participants to choose colours.
     // Give participants an emotion prompt.
     // Allow participants to draw.
     // Unlock the next room.

 }


 // ===================================
 // FUNCTION 5: WEIGHT OF WORDS
 // ===================================

 function weightOfWords() {

     console.log("Welcome to the Weight of Words!");
     console.log("Break the wall of negative thoughts.");

     // LOOP THROUGH NEGATIVE THOUGHTS
     for (var i = 0; i < negativeThoughts.length; i++) {

         console.log("Brick " + (i + 1) + ": " + negativeThoughts[i]);

     }

     // TO ADD LATER:
     // Draw a wall using rectangles.
     // Put negative thoughts on each brick.
     // Click a brick to answer a question.
     // Break the brick when answered correctly.
     // Unlock the door when all bricks are gone.

 }


 // ===================================
 // FUNCTION 6: RELEASE GARDEN
 // ===================================

 function releaseGarden() {

     console.log("Welcome to the Release Garden!");
     console.log("Let go of a stressful thought.");

     // TO ADD LATER:
     // Draw a garden using canvas.
     // Add flowers, trees, and stars.
     // Create a text box for stressful thoughts.
     // Make the words disappear when released.
     // Ask a mindfulness question.
     // Unlock the next room.

 }


 // ===================================
 // FUNCTION 7: UNITY VAULT
 // ===================================

 function unityVault() {

     console.log("Welcome to the Unity Vault!");
     console.log("Work together to find the final phrase.");

     // SHOW THE SECRET WORDS FOR TESTING
     for (var i = 0; i < secretWords.length; i++) {

         console.log("Word " + (i + 1) + ": " + secretWords[i]);

     }

     // TO ADD LATER:
     // Give each participant one secret word.
     // Participants share their words with the group.
     // Everyone works together to find the phrase.
     // Enter the correct phrase to unlock the vault.

 }


 // ===================================
 // FUNCTION 8: FINISH ROOM
 // ===================================

 function finishRoom() {
     if (gameStarted === true && currentRoom < rooms.length - 1) {
         points += game.pointsPerRoom;
         console.log("Room Completed!");
         console.log("Total Points: " + points);
         currentRoom++;
         showRoom();
     }
     else if (currentRoom === rooms.length - 1) {
         console.log("Complete the Unity Vault to escape!");
     }
 }


 // ===================================
 // FUNCTION 9: CHECK FINAL ANSWER
 // ===================================

 function checkVault(answer) {
     var correctAnswer = "PAUSE BREATHE NOTICE RELEASE CONNECT";
     if (currentRoom === 4 && answer === correctAnswer) {
         points += game.pointsPerRoom;
         endGame();
     }
     else {
         console.log("Incorrect Code! Try Again.");
     }
 }


 // ===================================
 // FUNCTION 10: END GAME
 // ===================================

 function endGame() {

     game.finished = true;
     gameStarted = false;

     console.log("Congratulations!");
     console.log("You Escaped The Escape Within!");
     console.log("Final Score: " + points);
 }


 // ===================================
 // NOTES - THINGS TO ADD LATER
 // ===================================

 // 1. Set up canvas for the graphics.
 // 2. Draw Brain Buddy.
 // 3. Add breathing animations.
 // 4. Create a drawing canvas.
 // 5. Create interactive bricks.
 // 6. Draw the Release Garden.
 // 7. Add clickable buttons.
 // 8. Add team names and scores.
 // 9. Add individual secret words.
 // 10. Add the final escape animation.
