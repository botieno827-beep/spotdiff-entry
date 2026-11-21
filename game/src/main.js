import {scenes, containsDifference} from './scenes.js';
import {drawScene} from './draw.js';
const $ = s => document.querySelector(s);
const canvases = [$('#left'), $('#right')];
const chapterNames = ['01 Harbor','02 Market','03 Rooftop','04 Conservatory'];
let level=0, found=[], hints=3, time=150, started=false, paused=false;
let pulse=null, hover=null, zoom=false, muted=false, particles=[], audio;
let completionTimer, hintTimer;
let records={};
try { records=JSON.parse(localStorage.getItem('little-worlds')||'{}'); } catch {}

function applyInspectionTransform(ctx) {
  if(zoom&&hover){ctx.translate(360,230);ctx.scale(1.6,1.6);ctx.translate(-hover.x*720,-hover.y*460);}
}
function render() {
  canvases.forEach((canvas,i)=>{
    const ctx=canvas.getContext('2d');
    drawScene(ctx,level,i,found,pulse,hover,zoom);
    ctx.save();applyInspectionTransform(ctx);
    particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,4,4);});
    ctx.restore();
  });
  $('#found').textContent=`Found ${found.length} / 8`;
  $('#timer').textContent=`${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`;
  $('#timer').classList.toggle('urgent',time<30);
  $('#hints').textContent=`Hints ${hints}`;
  $('#hint').disabled=hints===0||found.length===8;
  $('#progress').style.width=found.length/8*100+'%';
  $('#remaining').textContent=`${8-found.length} secrets remain`;
}
function sound(frequency) {
  if(muted)return;
  audio ||= new AudioContext();audio.resume();
  const oscillator=audio.createOscillator(),gain=audio.createGain();
  oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(frequency*1.5,audio.currentTime+.14);
  oscillator.connect(gain);gain.connect(audio.destination);
  gain.gain.setValueAtTime(.07,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.25);
  oscillator.start();oscillator.stop(audio.currentTime+.26);
}
function burst(d) {
  for(let j=0;j<25;j++)particles.push({x:d.x*720,y:d.y*460,vx:Math.cos(j*2.4)*(1+j%5),vy:Math.sin(j*2.4)*(1+j%4),life:1,color:['#f6c65c','#ee7155','#fff8d5'][j%3]});
}
function findDifference(i) {
  if(found.includes(i))return;
  found.push(i);pulse=null;burst(scenes[level].diff[i]);sound(650+found.length*65);
  $('#message').textContent=found.length===8?'Chapter complete — a whole little world, restored.':`Found: ${scenes[level].diff[i].name.toLowerCase()}.`;
  if(found.length===8){
    records[level]={time,hints};
    try { localStorage.setItem('little-worlds',JSON.stringify(records)); } catch {}
    document.querySelector(`[data-level="${level}"]`).textContent=chapterNames[level]+' ✓';
    completionTimer=setTimeout(()=>showOverlay('A world restored.',`You found every secret in ${scenes[level].name}. ${time} seconds to spare.`,level===3?'Explore again':'Next chapter',()=>loadLevel((level+1)%4)),900);
  }
  render();
}
function pointerPosition(event,canvas) {
  const bounds=canvas.getBoundingClientRect();
  return {x:(event.clientX-bounds.left)/bounds.width,y:(event.clientY-bounds.top)/bounds.height};
}
function clickScene(event,canvas) {
  if(!started||paused||time===0||found.length===8)return;
  let p=pointerPosition(event,canvas);
  if(zoom&&hover)p={x:hover.x+(p.x-.5)/1.6,y:hover.y+(p.y-.5)/1.6};
  const candidates=scenes[level].diff.map((d,i)=>({d,i}))
    .filter(({d})=>containsDifference(d,p.x,p.y,3))
    .sort((a,b)=>Math.hypot((p.x-a.d.x)*720,(p.y-a.d.y)*460)-Math.hypot((p.x-b.d.x)*720,(p.y-b.d.y)*460));
  const i=candidates[0]?.i??-1;
  if(i>=0){
    if(!found.includes(i))findDifference(i);
    else $('#message').textContent='You already found that one.';
  }else{
    time=Math.max(0,time-3);
    $('#message').textContent='A little too quick — 3 seconds. Look closely and try again.';
    canvas.classList.remove('shake');void canvas.offsetWidth;canvas.classList.add('shake');sound(140);render();
  }
}
function loadLevel(n) {
  clearTimeout(completionTimer);clearTimeout(hintTimer);
  level=n;found=[];hints=3;time=150-n*15;pulse=null;hover=null;zoom=false;particles=[];
  $('#zoom').textContent='＋ Inspect';started=true;paused=false;$('#overlay').style.display='none';
  $('#chapter').textContent=scenes[n].name;$('#chapter-num').textContent=`CHAPTER 0${n+1} / 04`;
  $('#message').textContent=['A salt-kissed morning at Port Sol.','Follow the lanterns through the evening bazaar.','One last coffee beneath a sky full of wishes.','A secret garden, sheltered from the world.'][n];
  document.querySelectorAll('.level').forEach(button=>button.classList.toggle('active',+button.dataset.level===n));render();
}
function showOverlay(title,text,button,action) {
  paused=true;$('#overlay').style.display='grid';$('.overlay-card h2').textContent=title;$('.overlay-card p').textContent=text;
  $('#start').textContent=button;$('#start').onclick=()=>{paused=false;$('#overlay').style.display='none';action();};
}
function hint() {
  if(!started||paused||hints<=0||found.length===8)return;
  hints--;clearTimeout(hintTimer);pulse=scenes[level].diff.find((_,i)=>!found.includes(i));
  $('#message').textContent='Follow the golden ink. A secret waits nearby.';sound(520);
  hintTimer=setTimeout(()=>{pulse=null;},2200);render();
}
canvases.forEach(canvas=>{
  canvas.onclick=event=>clickScene(event,canvas);
  canvas.onpointermove=event=>{if(!zoom)hover=pointerPosition(event,canvas);};
  canvas.onpointerleave=()=>{if(!zoom)hover=null;};
});
document.querySelectorAll('.level').forEach(button=>button.onclick=()=>loadLevel(+button.dataset.level));
$('#hint').onclick=hint;
$('#sound').onclick=()=>{muted=!muted;$('#sound').textContent=muted?'SOUND OFF':'SOUND ON';};
$('#start').onclick=()=>loadLevel(0);
$('#menu').onclick=()=>showOverlay('Choose your little world.','Four chapters, thirty-two secrets. Choose a chapter below, or resume your hunt.','Resume exploring',()=>{});
$('#restart').onclick=()=>loadLevel(level);
$('#zoom').onclick=()=>{zoom=!zoom;hover ||= {x:.5,y:.5};$('#zoom').textContent=zoom?'− Zoom out':'＋ Inspect';};
document.addEventListener('keydown',event=>{
  if(event.code==='KeyH')hint();if(event.code==='KeyM')$('#sound').click();
  if(event.code==='KeyZ')$('#zoom').click();if(event.code==='Escape')$('#menu').click();
  if(event.code==='Enter'&&!started)loadLevel(0);
});
setInterval(()=>{
  if(started&&!paused&&found.length<8&&time>0){
    time--;
    if(time===0)showOverlay('Take another look.','The clock ran out, but every little world deserves another visit.','Try this chapter',()=>loadLevel(level));
    render();
  }
},1000);
let last=0;
function animate(t) {
  if(t-last>30){
    particles=particles.filter(p=>p.life>0);
    particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.08;p.life-=.035;});
    render();last=t;
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
const chapterChoices=document.createElement('div');chapterChoices.className='chapter-choices';
scenes.forEach((scene,n)=>{
  const button=document.createElement('button');button.textContent='0'+(n+1)+' '+scene.name;
  button.onclick=()=>loadLevel(n);chapterChoices.append(button);
});
$('.overlay-card').append(chapterChoices);
