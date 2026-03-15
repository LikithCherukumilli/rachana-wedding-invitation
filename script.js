/* SCROLL ANIMATION */

const container=document.querySelector(".phone-frame");

container.addEventListener("scroll",()=>{

const scroll=container.scrollTop;

const couple=document.querySelector(".couple");
const rect=couple.getBoundingClientRect();
const screen=window.innerHeight;

let progress=1-(rect.top/screen);
progress=Math.max(0,Math.min(progress,1));

const left=document.querySelector(".left");
const right=document.querySelector(".right");
const text=document.querySelector(".couple-text");

/* IMAGES */

left.style.transform=`translate(${(-180+(180*progress))}px, -50%)`;
right.style.transform=`translate(${(180-(180*progress))}px, -50%)`;

left.style.opacity=progress;
right.style.opacity=progress;

/* TEXT */

text.style.transform=`translate(-50%, ${100-(100*progress)}px)`;
text.style.opacity=progress;

/* PARALLAX */

const heroContent=document.querySelector(".hero-content");
const inviteBlock=document.querySelector(".invite");
const detailsBlock=document.querySelector(".details");
const countdownBlock=document.querySelector(".countdown");

if(heroContent){
  heroContent.style.transform=`translateY(${scroll*0.2}px)`;
}
if(inviteBlock){
  inviteBlock.style.transform=`translateY(${scroll*0.1}px)`;
}
if(detailsBlock){
  detailsBlock.style.transform=`translateY(${scroll*0.08}px)`;
}
if(countdownBlock){
  countdownBlock.style.transform=`translateY(${scroll*0.06}px)`;
}

/* PETALS */

updatePetals(scroll);

});


/* GOLDEN PETALS */

const canvas=document.getElementById("petals");
const ctx=canvas.getContext("2d");

canvas.width=390;
canvas.height=800;

let petals=[];
let count=50;

for(let i=0;i<count;i++){

petals.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*5+3,
speed:Math.random()*0.3+0.2
});

}

function drawPetals(){

ctx.clearRect(0,0,canvas.width,canvas.height);

petals.forEach(p=>{

ctx.fillStyle="gold";

ctx.beginPath();

ctx.ellipse(p.x,p.y,p.size,p.size*0.6,Math.PI/4,0,Math.PI*2);

ctx.fill();

});

}

function updatePetals(scroll){

petals.forEach(p=>{

p.y+=p.speed*(scroll*0.002);

if(p.y>canvas.height){
p.y=0;
}

});

drawPetals();

}

drawPetals();


/* COUNTDOWN */

const weddingDate=new Date("April 30, 2026 00:52:00").getTime();

const daysEl=document.getElementById("days");
const hoursEl=document.getElementById("hours");
const minutesEl=document.getElementById("minutes");
const secondsEl=document.getElementById("seconds");
const progressEl=document.getElementById("progress");

function updateCountdown(){
  const now=new Date().getTime();
  const distance=weddingDate-now;
  const totalDuration=weddingDate - new Date("Jan 1, 2026 00:00:00").getTime();
  const pastDuration=now - new Date("Jan 1, 2026 00:00:00").getTime();
  const percent=Math.max(0, Math.min(100, (pastDuration/totalDuration)*100));

  if(distance<=0){
    daysEl.textContent="0";
    hoursEl.textContent="0";
    minutesEl.textContent="0";
    secondsEl.textContent="0";
    progressEl.style.width="100%";
    return;
  }

  const days=Math.floor(distance/(1000*60*60*24));
  const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
  const seconds=Math.floor((distance%(1000*60))/1000);

  daysEl.textContent=String(days).padStart(2, "0");
  hoursEl.textContent=String(hours).padStart(2, "0");
  minutesEl.textContent=String(minutes).padStart(2, "0");
  secondsEl.textContent=String(seconds).padStart(2, "0");

  progressEl.style.width=`${percent}%`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* BACKGROUND MUSIC AUTOPLAY + FALLBACK */

const bgMusic = document.getElementById("bg-music");

if (bgMusic) {

  bgMusic.volume = 0.35;
  bgMusic.loop = true;

  /* Try autoplay */

  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {

      /* Start music on first user interaction */

      const startMusic = () => {
        bgMusic.play();
        document.removeEventListener("touchstart", startMusic);
        document.removeEventListener("scroll", startMusic);
      };

      document.addEventListener("touchstart", startMusic);
      document.addEventListener("scroll", startMusic);

    });
  }

  /* Music toggle button */

  const btn = document.createElement("button");

  btn.id = "music-toggle";
  btn.textContent = "Pause Music";

  btn.style.cssText =
  "position:fixed;bottom:18px;right:18px;z-index:999;font-size:14px;padding:10px 14px;border:none;border-radius:20px;background:#8b0000;color:#fff;cursor:pointer;";

  document.body.appendChild(btn);

  btn.addEventListener("click", () => {

    if (bgMusic.paused) {
      bgMusic.play();
      btn.textContent = "Pause Music";
    } else {
      bgMusic.pause();
      btn.textContent = "Play Music";
    }

  });

}
