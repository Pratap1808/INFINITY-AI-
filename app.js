// ======================================
// INFINITY AI CONFIG
// ======================================

// API KEY BAAD ME BACKEND ME LAGEGI

const AI_NAME = "INFINITY AI";

const OWNER_NAME = "Pratap Sir";

let currentMode = "Assistant";

let currentLanguage = "en-US";

let currentVoice = null;

// ======================================
// ELEMENTS
// ======================================

const chatBox =
document.getElementById(
"chatBox"
);

const userInput =
document.getElementById(
"userInput"
);

const sendBtn =
document.getElementById(
"sendBtn"
);

const micBtn =
document.getElementById(
"micBtn"
);

const stopBtn =
document.getElementById(
"stopBtn"
);

const languageSelect =
document.getElementById(
"language"
);

const voiceSelect =
document.getElementById(
"voiceSelect"
);

// ======================================
// CHAT FUNCTIONS
// ======================================

function addUserMessage(
text
){

const div =
document.createElement(
"div"
);

div.className =
"user-message";

div.textContent =
text;

chatBox.appendChild(
div
);

chatBox.scrollTop =
chatBox.scrollHeight;

}

function addAIMessage(
text
){

const div =
document.createElement(
"div"
);

div.className =
"ai-message";

div.textContent =
text;

chatBox.appendChild(
div
);

chatBox.scrollTop =
chatBox.scrollHeight;

}

// ======================================
// OWNER COMMAND
// ======================================

function ownerReply(
message
){

const msg =
message.toLowerCase();

if(

msg.includes(
"owner"
)

||

msg.includes(
"creator"
)

||

msg.includes(
"kisne banaya"
)

||

msg.includes(
"who made you"
)

){

return
"Is INFINITY AI ko Pratap Sir ne banaya hai.";

}

return null;

}

// ======================================
// LOAD VOICES
// ======================================

function loadVoices(){

const voices =
speechSynthesis
.getVoices();

voiceSelect.innerHTML =
"";

voices.forEach(

(voice,index)=>{

const option =
document.createElement(
"option"
);

option.value =
index;

option.textContent =
`${voice.name}
(${voice.lang})`;

voiceSelect
.appendChild(
option
);

}

);

}

speechSynthesis
.onvoiceschanged =
loadVoices;

loadVoices();

// ======================================
// VOICE CHANGE
// ======================================

voiceSelect
.addEventListener(

"change",

()=>{

const voices =
speechSynthesis
.getVoices();

currentVoice =
voices[
voiceSelect.value
];

}

);

// ======================================
// LANGUAGE
// ======================================

languageSelect
.addEventListener(

"change",

()=>{

currentLanguage =
languageSelect.value;

}

);

// ======================================
// SPEAK FUNCTION
// ======================================

function speak(
text
){

speechSynthesis
.cancel();

const speech =
new SpeechSynthesisUtterance(
text
);

speech.lang =
currentLanguage;

if(
currentVoice
){

speech.voice =
currentVoice;

}

speech.rate =
1;

speech.pitch =
1;

speechSynthesis
.speak(
speech
);

}

// ======================================
// STOP SPEAKING
// ======================================

stopBtn
.addEventListener(

"click",

()=>{

speechSynthesis
.cancel();

}

);

// ======================================
// START MESSAGE
// ======================================

window.onload =
()=>{

addAIMessage(

"Hello! I am INFINITY AI."

);

console.log(

"INFINITY AI Started"

);

};// ======================================
// SPEECH RECOGNITION
// ======================================

const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;

let recognition = null;

if(SpeechRecognition){

recognition =
new SpeechRecognition();

recognition.continuous =
false;

recognition.interimResults =
false;

}

// ======================================
// MIC BUTTON
// ======================================

micBtn.addEventListener(

"click",

()=>{

if(!recognition){

alert(
"Speech Recognition Not Supported"
);

return;

}

recognition.lang =
currentLanguage;

recognition.start();

micBtn.innerText =
"🎙 Listening...";

}

);

// ======================================
// VOICE RESULT
// ======================================

if(recognition){

recognition.onresult =

(event)=>{

const text =

event.results[0][0]
.transcript;

userInput.value =
text;

micBtn.innerText =
"🎤 Voice";

};

recognition.onerror =

()=>{

micBtn.innerText =
"🎤 Voice";

};

recognition.onend =

()=>{

micBtn.innerText =
"🎤 Voice";

};

}

// ======================================
// AI MODES
// ======================================

const modeButtons =

document.querySelectorAll(
".mode-btn"
);

modeButtons.forEach(

(btn)=>{

btn.addEventListener(

"click",

()=>{

currentMode =
btn.innerText;

modeButtons.forEach(

(b)=>{

b.style.background =
"#111";

b.style.color =
"#fff";

}

);

btn.style.background =
"cyan";

btn.style.color =
"#000";

addAIMessage(

"Mode Changed : "
+
currentMode

);

}

);

}

);

// ======================================
// ENTER KEY SEND
// ======================================

userInput.addEventListener(

"keydown",

(event)=>{

if(

event.key === "Enter"

&&

!event.shiftKey

){

event.preventDefault();

sendMessage();

}

}

);

// ======================================
// LIVE CLOCK
// ======================================

function updateClock(){

const clock =
document.getElementById(
"clock"
);

if(!clock){

return;

}

const now =
new Date();

clock.innerText =

now.toLocaleTimeString();

}

setInterval(
updateClock,
1000
);

updateClock();

// ======================================
// NETWORK STATUS
// ======================================

function updateNetwork(){

const network =

document.getElementById(
"network"
);

if(!network){

return;

}

network.innerText =

navigator.onLine

?

"🟢 Online"

:

"🔴 Offline";

}

window.addEventListener(
"online",
updateNetwork
);

window.addEventListener(
"offline",
updateNetwork
);

updateNetwork();

// ======================================
// BATTERY STATUS
// ======================================

if(

navigator.getBattery

){

navigator
.getBattery()

.then(

(battery)=>{

const batteryText =

document.getElementById(
"battery"
);

function updateBattery(){

batteryText.innerText =

"🔋 "

+

Math.round(

battery.level
*100

)

+

"%";

}

updateBattery();

battery.addEventListener(

"levelchange",

updateBattery

);

}

);

}// ======================================
// THINKING MESSAGE
// ======================================

function createThinking(){

const div =
document.createElement(
"div"
);

div.className =
"ai-message";

div.innerText =
"🤖 Thinking...";

chatBox.appendChild(
div
);

chatBox.scrollTop =
chatBox.scrollHeight;

return div;

}

// ======================================
// SMART REPLY SYSTEM
// ======================================

function smartReply(
message
){

const owner =
ownerReply(
message
);

if(owner){

return owner;

}

const msg =
message.toLowerCase();

// Greetings

if(
msg === "hi"
||
msg === "hello"
||
msg === "hey"
){

return
"Hello! I am INFINITY AI.";

}

// Version

if(
msg === "/version"
){

return
"INFINITY AI v1.0 Ultimate";

}

// Help

if(
msg === "/help"
){

return
`
Commands:

/help

/version

/clear

Owner

Time

Date

Weather
`;

}

// Clear

if(
msg === "/clear"
){

chatBox.innerHTML = "";

return
"Chat Cleared.";

}

// Time

if(
msg.includes(
"time"
)
){

return
new Date()
.toLocaleTimeString();

}

// Date

if(
msg.includes(
"date"
)
){

return
new Date()
.toLocaleDateString();

}

// Weather

if(
msg.includes(
"weather"
)
){

return
"Live Weather API will be connected later.";

}

// News

if(
msg.includes(
"news"
)
){

return
"Live News API will be connected later.";

}

// Image

if(
msg.includes(
"image"
)
){

return
"AI Image Generator will be added later.";

}

// Video

if(
msg.includes(
"video"
)
){

return
"AI Video Generator will be added later.";

}

// Default

return
null;

}

// ======================================
// SEND MESSAGE
// ======================================

async function sendMessage(){

const message =
userInput.value.trim();

if(
!message
){

return;

}

addUserMessage(
message
);

userInput.value =
"";

const thinking =
createThinking();

const localReply =
smartReply(
message
);

if(
localReply
){

thinking.innerText =
localReply;

speak(
localReply
);

return;

}

// Backend AI baad me connect hoga

async function sendMessage(){

const message =
userInput.value.trim();

if(!message){
return;
}

addUserMessage(message);

userInput.value = "";

const thinking =
createThinking();

const localReply =
smartReply(message);

if(localReply){

thinking.innerText =
localReply;

speak(localReply);

return;

}

try{

const response =
await fetch(
"https://infinity-ai-production-e5f1.up.railway.app/chat",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

message:message

})

}

);

const data =
await response.json();

const aiReply =

data.candidates?.[0]
?.content?.parts?.[0]
?.text

||

"No response from AI.";

thinking.innerText =
aiReply;

speak(aiReply);

}

catch(error){

thinking.innerText =
"Server Error : "
+
error.message;

}

}

thinking.innerText =
aiReply;

speak(
aiReply

);

}

// ======================================
// SEND BUTTON
// ======================================

sendBtn
.addEventListener(

"click",

sendMessage

);

// ======================================
// STARTUP MESSAGE
// ======================================

setTimeout(

()=>{

addAIMessage(

"🚀 INFINITY AI Ultimate Ready."

);

},

1000

);

// ======================================
// SYSTEM LOG
// ======================================

console.log(

"INFINITY AI Chat System Loaded"

);// ======================================
// CHAT HISTORY
// ======================================

function saveChat(){

localStorage.setItem(

"infinity_ai_chat",

chatBox.innerHTML

);

}

function loadChat(){

const data =

localStorage.getItem(

"infinity_ai_chat"

);

if(data){

chatBox.innerHTML =
data;

}

}

loadChat();

// ======================================
// AUTO SAVE CHAT
// ======================================

const oldUser =
addUserMessage;

addUserMessage =

function(text){

oldUser(text);

saveChat();

};

const oldAI =
addAIMessage;

addAIMessage =

function(text){

oldAI(text);

saveChat();

};

// ======================================
// CLEAR CHAT
// ======================================

const clearChat =

document.getElementById(
"clearChat"
);

if(clearChat){

clearChat
.addEventListener(

"click",

()=>{

chatBox.innerHTML =
"";

saveChat();

addAIMessage(

"Chat Cleared."

);

}

);

}

// ======================================
// COPY CHAT
// ======================================

const copyChat =

document.getElementById(
"copyChat"
);

if(copyChat){

copyChat
.addEventListener(

"click",

()=>{

navigator.clipboard
.writeText(

chatBox.innerText

);

addAIMessage(

"Chat Copied."

);

}

);

}

// ======================================
// DOWNLOAD CHAT
// ======================================

const downloadChat =

document.getElementById(
"downloadChat"
);

if(downloadChat){

downloadChat
.addEventListener(

"click",

()=>{

const blob =

new Blob(

[chatBox.innerText],

{
type:"text/plain"
}

);

const a =
document.createElement(
"a"
);

a.href =
URL.createObjectURL(
blob
);

a.download =
"infinity_ai_chat.txt";

a.click();

}

);

}

// ======================================
// SHARE CHAT
// ======================================

const shareChat =

document.getElementById(
"shareChat"
);

if(

shareChat

&&

navigator.share

){

shareChat
.addEventListener(

"click",

()=>{

navigator.share({

title:
"INFINITY AI",

text:
chatBox.innerText

});

}

);

}

// ======================================
// THEME SYSTEM
// ======================================

let darkMode =
true;

function toggleTheme(){

if(darkMode){

document.body.style.background =
"#ffffff";

document.body.style.color =
"#000000";

darkMode =
false;

}

else{

document.body.style.background =
"#000000";

document.body.style.color =
"#ffffff";

darkMode =
true;

}

}

// ======================================
// FLOATING PARTICLES
// ======================================

const particles =

document.getElementById(
"particles"
);

if(particles){

for(

let i=0;

i<40;

i++

){

const dot =

document.createElement(
"div"
);

dot.style.position =
"absolute";

dot.style.width =
"4px";

dot.style.height =
"4px";

dot.style.borderRadius =
"50%";

dot.style.background =
"cyan";

dot.style.left =
Math.random()*100
+"%";

dot.style.top =
Math.random()*100
+"%";

dot.style.opacity =
Math.random();

particles
.appendChild(
dot
);

}

}

// ======================================
// STARTUP SAVE
// ======================================

window.addEventListener(

"beforeunload",

saveChat

);

// ======================================
// SYSTEM READY
// ======================================

console.log(

"INFINITY AI Smart Tools Loaded"

);// ======================================
// WEATHER PLACEHOLDER
// ======================================

function weatherSystem(){

return
"🌦 Live Weather System will be connected later.";

}

// ======================================
// NEWS PLACEHOLDER
// ======================================

function newsSystem(){

return
"📰 Live News System will be connected later.";

}

// ======================================
// IMAGE AI PLACEHOLDER
// ======================================

function imageGenerator(){

return
"🖼 AI Image Generator will be connected later.";

}

// ======================================
// VIDEO AI PLACEHOLDER
// ======================================

function videoGenerator(){

return
"🎬 AI Video Generator will be connected later.";

}

// ======================================
// WEB SEARCH PLACEHOLDER
// ======================================

function webSearch(){

return
"🌐 Live Web Search will be connected later.";

}

// ======================================
// SMART COMMANDS
// ======================================

function extraCommands(message){

const msg =
message.toLowerCase();

if(
msg === "/weather"
){

return weatherSystem();

}

if(
msg === "/news"
){

return newsSystem();

}

if(
msg === "/image"
){

return imageGenerator();

}

if(
msg === "/video"
){

return videoGenerator();

}

if(
msg === "/search"
){

return webSearch();

}

return null;

}

// ======================================
// INFINITY STARTUP
// ======================================

setTimeout(

()=>{

addAIMessage(

"🌌 Welcome to INFINITY AI Ultimate."

);

},

2000

);

// ======================================
// FINAL SYSTEM CHECK
// ======================================

function systemCheck(){

console.log(
"===================="
);

console.log(
"INFINITY AI READY"
);

console.log(
"Owner : Pratap Sir"
);

console.log(
"Voice : OK"
);

console.log(
"Language : OK"
);

console.log(
"Chat : OK"
);

console.log(
"Smart Tools : OK"
);

console.log(
"History : OK"
);

console.log(
"Particles : OK"
);

console.log(
"Backend : Pending"
);

console.log(
"===================="
);

}

systemCheck();

// ======================================
// FUTURE FEATURES
// ======================================

const futureFeatures = [

"AI Vision",

"Camera AI",

"YouTube Summary",

"Website Summary",

"PDF Reader",

"OCR",

"Advanced Coding",

"Image AI",

"Video AI",

"Live Search"

];

console.log(
futureFeatures
);

// ======================================
// END
// ======================================

console.log(
"INFINITY AI Loaded Successfully"
);
