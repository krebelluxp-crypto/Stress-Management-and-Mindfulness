/* THE ESCAPE WITHIN — EASY-TO-EDIT GAME FUNCTIONS
   Runs on GitHub Pages (no server required).
   Players progress independently and collaborate verbally in the final vault.
*/

// SECTION 1: GAME SETTINGS AND STATE
const ROOM_NAMES = ['Breathing Chamber','Emotion Gallery','Weight of Words','Release Garden','Grounding Observatory','Unity Vault'];
const SECRET_WORDS = ['PAUSE','AND','BREATHE','NOTICE','YOUR','THOUGHTS','LET','THEM','PASS','WE','CONNECT','TOGETHER'];
const FINAL_PHRASE = SECRET_WORDS.join(' ');
const $ = id => document.getElementById(id);
let game = { name:'',team:'',number:1,room:0,score:0 };
let breathingTimer = null;

// SECTION 2: START, NAVIGATION, AND POINTS
function startGame(){
  const name = $('playerName').value.trim();
  const number = Number($('playerNumber').value);
  if(!name || !Number.isInteger(number) || number<1 || number>12){alert('Enter your name and a player number from 1 to 12.');return;}
  game = {name,team:$('team').value,number,room:0,score:0};
  $('setup').classList.add('hidden');$('game').classList.remove('hidden');
  showRoom();
}
function showRoom(){
  clearInterval(breathingTimer);
  $('playerInfo').textContent=`${game.name} • Team ${game.team} • Player ${game.number}`;
  $('score').textContent=`${game.score} points`;
  $('progress').textContent=`${'✦ '.repeat(game.room)}${'◇ '.repeat(6-game.room)}  Room ${game.room+1} of 6`;
  $('roomTitle').textContent=ROOM_NAMES[game.room];
  $('feedback').textContent='';
  [showBreathingRoom,showDrawingRoom,showWordsRoom,showGardenRoom,showGroundingRoom,showUnityVault][game.room]();
}
function finishRoom(){
  game.score+=100;
  game.room++;
  if(game.room===6){$('game').classList.add('hidden');$('victory').classList.remove('hidden');return;}
  showRoom();
}
function feedback(message){$('feedback').textContent=message;}
function escapeHTML(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

// SECTION 3: ROOM 1 — BREATHE WITH BRAIN BUDDY
function showBreathingRoom(){
  $('roomContent').innerHTML=`<p>Follow Brain Buddy: inhale gently for 4 seconds, then exhale for 4 seconds. Complete three cycles. Breathe naturally if this pace is uncomfortable.</p><img class="buddy" id="breathingBuddy" src="brain-buddy.png" alt="Brain Buddy breathing"><p class="center" id="breathPrompt">Ready to begin?</p><div class="center"><button id="breatheButton">Start guided breathing</button><button id="breathNext" disabled>Unlock door</button></div>`;
  $('breatheButton').onclick=startBreathing;
  $('breathNext').onclick=finishRoom;
}
function startBreathing(){
  clearInterval(breathingTimer);
  $('breatheButton').disabled=true;
  $('breathingBuddy').classList.add('breathing');
  let seconds=0;
  $('breathPrompt').textContent='Breathe in • cycle 1 of 3';
  breathingTimer=setInterval(()=>{
    seconds++;
    if(seconds>=24){clearInterval(breathingTimer);$('breathingBuddy').classList.remove('breathing');$('breathPrompt').textContent='Well done! You completed the guided exercise.';$('breathNext').disabled=false;return;}
    $('breathPrompt').textContent=`${seconds%8<4?'Breathe in':'Breathe out'} • cycle ${Math.floor(seconds/8)+1} of 3`;
  },1000);
}

// SECTION 4: ROOM 2 — EMOTION DRAWING
function showDrawingRoom(){
  $('roomContent').innerHTML=`<p>Draw what calm, happiness, sadness, or frustration looks like to you. There is no wrong answer.</p><canvas class="draw" id="drawing" width="700" height="300" aria-label="Emotion drawing canvas"></canvas><button id="clearCanvas" class="secondary">Clear canvas</button><button id="drawingNext" disabled>Finish drawing</button>`;
  const canvas=$('drawing'),ctx=canvas.getContext('2d');let drawing=false;
  ctx.strokeStyle='#8d54be';ctx.lineWidth=5;ctx.lineCap='round';
  const point=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height};};
  canvas.onpointerdown=e=>{drawing=true;canvas.setPointerCapture(e.pointerId);const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+.1,p.y+.1);ctx.stroke();$('drawingNext').disabled=false;};
  canvas.onpointermove=e=>{if(!drawing)return;const p=point(e);ctx.lineTo(p.x,p.y);ctx.stroke();};
  canvas.onpointerup=canvas.onpointercancel=()=>drawing=false;
  $('clearCanvas').onclick=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);$('drawingNext').disabled=true;};
  $('drawingNext').onclick=finishRoom;
}

// SECTION 5: ROOM 3 — THE WEIGHT OF WORDS
const THOUGHTS=['I always fail','Nobody likes me','I must be perfect','I am not good enough'];
function showWordsRoom(){
  $('roomContent').innerHTML=`<p>The doorway is blocked by heavy thoughts. Click each brick and choose a helpful way to relate to the thought. Thoughts are not always facts.</p><div class="brickWall" id="brickWall"></div><div id="brickQuestion"></div><button id="wordsNext" disabled>Open the doorway</button>`;
  THOUGHTS.forEach((thought,index)=>{const b=document.createElement('button');b.className='brick';b.textContent='🧱 '+thought;b.onclick=()=>askAboutThought(index,b);$('brickWall').append(b);});
  $('wordsNext').onclick=finishRoom;
}
function askAboutThought(index,brick){
  $('brickQuestion').innerHTML=`<p><strong>How could you respond to “${escapeHTML(THOUGHTS[index])}”?</strong></p><button class="choice" id="goodThought">“I notice I'm having the thought that ${escapeHTML(THOUGHTS[index].toLowerCase())}.”</button><button class="choice" id="badThought">“This thought must be completely true.”</button>`;
  $('goodThought').onclick=()=>{brick.classList.add('done');$('brickQuestion').innerHTML='<p>✨ The brick dissolves. You made room for a different perspective.</p>';if(document.querySelectorAll('.brick.done').length===THOUGHTS.length)$('wordsNext').disabled=false;};
  $('badThought').onclick=()=>feedback('Try putting some distance between yourself and the thought.');
}

// SECTION 6: ROOM 4 — THE RELEASE GARDEN
function showGardenRoom(){
  $('roomContent').innerHTML=`<p>In this peaceful garden, write a stressful thought or use an imaginary example. It stays on this device and is never sent anywhere.</p><div class="garden"><div id="skyWords">✨ ☁️ ✨</div><label for="releaseInput">A thought to release (optional)</label><input id="releaseInput" placeholder="For example: I have to get everything right"><button id="releaseButton">Release into the stars ✨</button></div><div id="gardenQuestion" class="hidden"><p><strong>Your friend is overwhelmed before a test. Which response is most supportive?</strong></p><button class="choice" id="gardenCorrect">“Let's pause, breathe, and take one small step.”</button><button class="choice" id="gardenWrong">“Just stop worrying.”</button></div>`;
  $('releaseButton').onclick=releaseThought;
}
function releaseThought(){
  const words=$('releaseInput').value.trim()||'A difficult thought';
  $('skyWords').textContent=words;
  $('skyWords').classList.remove('released');void $('skyWords').offsetWidth;$('skyWords').classList.add('released');
  $('releaseInput').value='';$('releaseButton').disabled=true;
  $('gardenQuestion').classList.remove('hidden');
  $('gardenCorrect').onclick=finishRoom;
  $('gardenWrong').onclick=()=>feedback('Try a response that validates the feeling and suggests a manageable step.');
}

// SECTION 7: ROOM 5 — GROUNDING OBSERVATORY
function showGroundingRoom(){
  $('roomContent').innerHTML=`<p>Take a look around you. The 5-4-3-2-1 technique helps bring attention to the present moment.</p><p><strong>Which sequence matches the grounding exercise?</strong></p><button class="choice" id="groundCorrect">5 things you see • 4 feel • 3 hear • 2 smell • 1 taste</button><button class="choice" id="groundWrong">5 worries • 4 fears • 3 regrets • 2 mistakes • 1 problem</button>`;
  $('groundCorrect').onclick=finishRoom;
  $('groundWrong').onclick=()=>feedback('Try focusing on your senses and what is happening around you.');
}

// SECTION 8: ROOM 6 — UNITY VAULT (TEAM COLLABORATION)
function showUnityVault(){
  const word=SECRET_WORDS[game.number-1];
  $('roomContent').innerHTML=`<p>You've reached the final door! Each participant has a different numbered clue. Read your word aloud on the group call, combine the clues in numerical order, and enter the full phrase.</p><div class="clue">Clue ${game.number}: ${word}</div><p class="small">The facilitator should assign numbers 1–12 to 12 participants. For smaller groups, the facilitator can distribute the remaining numbers so every word is available.</p><label>Complete phrase<input id="vaultAnswer" autocomplete="off" placeholder="Enter all the words in order"></label><button id="unlockVault">Unlock the Unity Vault</button>`;
  $('unlockVault').onclick=checkVault;
}
function checkVault(){
  const normalized=text=>text.toUpperCase().replace(/[^A-Z ]/g,'').replace(/\s+/g,' ').trim();
  if(normalized($('vaultAnswer').value)===FINAL_PHRASE){finishRoom();}
  else feedback('The vault is still locked. Ask everyone to share their numbered clue and check the order.');
}

// SECTION 9: BUTTON EVENTS
$('startButton').addEventListener('click',startGame);
$('restartButton').addEventListener('click',()=>location.reload());
