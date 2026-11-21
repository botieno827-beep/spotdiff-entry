// Original storybook illustrations. Every variant lives inside the object it changes.
let c;
const ink = '#294e59';
function path(points, fill, stroke = ink, width = 2) {
  c.beginPath();
  points.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p));
  c.closePath(); c.fillStyle = fill; c.fill();
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
}
function box(x,y,w,h,color,stroke=ink) {
  c.fillStyle=color; c.fillRect(x,y,w,h);
  if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.strokeRect(x,y,w,h);}
}
function oval(x,y,rx,ry,color,angle=0,stroke=null) {
  c.beginPath();c.ellipse(x,y,rx,ry,angle,0,Math.PI*2);c.fillStyle=color;c.fill();
  if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}
}
function line(x,y,X,Y,color=ink,width=2) {
  c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.strokeStyle=color;c.lineWidth=width;c.stroke();
}
function label(text,x,y,size=12,color=ink) {
  c.fillStyle=color;c.font=`bold ${size}px Georgia`;c.textAlign='center';c.fillText(text,x,y);
}
function cloud(x,y) {
  oval(x,y,38,10,'#fff6e2');oval(x-14,y-7,17,12,'#fff6e2');oval(x+8,y-13,22,18,'#fff6e2');
}
function house(x,y,w,h,color) {
  box(x,y,w,h,color);path([[x-5,y],[x+w/2,y-30],[x+w+5,y]],'#d77c5c');
  for(let dx=10;dx<w-12;dx+=25)for(let dy=15;dy<h-20;dy+=32){
    box(x+dx,y+dy,13,20,'#fff2c3');line(x+dx+6,y+dy,x+dx+6,y+dy+20);line(x+dx,y+dy+9,x+dx+13,y+dy+9);
  }
  box(x+w/2-9,y+h-25,18,25,'#426b70');
}
function plant(x,y,size=1,extra=false) {
  c.save();c.translate(x,y);c.scale(size,size);
  path([[-16,0],[16,0],[12,30],[-11,30]],'#d88460');
  for(let j=0;j<7;j++){
    const a=(j-3)*.38;
    line(0,0,Math.sin(a)*40,-28-Math.cos(a)*30,'#316c54',2);
    oval(Math.sin(a)*31,-30-Math.cos(a)*22,9,23,j%2?'#4c9668':'#256d59',a);
  }
  if(extra){line(0,0,42,-52,'#316c54',2);oval(42,-52,9,23,'#4c9668',.65);}
  c.restore();
}
function boat(x,y,color,stripe=false) {
  oval(x,y+16,51,8,'#387e8c');path([[x-48,y],[x+49,y],[x+30,y+22],[x-29,y+22]],color);
  line(x,y,x,y-89);path([[x-4,y-80],[x-4,y-8],[x-47,y-8]],'#fff0cd');
  if(stripe)path([[x-31,y-29],[x-4,y-29],[x-4,y-20],[x-37,y-20]],'#d9775c',null);
  path([[x+4,y-67],[x+38,y-8],[x+4,y-8]],'#eab65f');line(x-28,y+9,x+29,y+9,'#fff3d1');
}
function clock(x,y,v) {
  oval(x,y,18,18,'#fff0c0',0,ink);
  for(let a=0;a<Math.PI*2;a+=Math.PI/2)line(x+Math.sin(a)*13,y+Math.cos(a)*13,x+Math.sin(a)*15,y+Math.cos(a)*15,'#76918a',1);
  line(x,y,v?x-10:x,v?y:y-12,ink,3);line(x,y,x+9,y+5,ink,3);oval(x,y,2,2,ink);
}
function table(x,y,cup=true) {
  oval(x,y,37,13,'#e9af7b',0,ink);line(x,y+10,x,y+54);line(x,y+54,x-25,y+65);line(x,y+54,x+25,y+65);
  if(cup){box(x-10,y-15,16,13,'#fff2cd');oval(x+7,y-9,5,5,'#fff2cd',0,ink);oval(x-2,y-16,9,3,'#5b4034');}
}
function flower(x,y,color) {
  line(x,y+20,x,y,'#376d54',2);
  for(let j=0;j<5;j++)oval(x+Math.cos(j*1.257)*6,y+Math.sin(j*1.257)*6,5,5,color);
  oval(x,y,3,3,'#ffe69d');
}
function sleepingCat(x,y) {
  oval(x+4,y+2,20,10,'#d69764',0,ink);oval(x-14,y-1,10,8,'#d69764',0,ink);
  path([[x-23,y-4],[x-20,y-13],[x-15,y-7]],'#d69764');
  path([[x-13,y-7],[x-7,y-13],[x-6,y-3]],'#d69764');
  line(x-20,y-1,x-16,y+1);line(x-16,y+1,x-12,y-1);
  c.beginPath();c.moveTo(x+18,y+8);c.bezierCurveTo(x+31,y+8,x+27,y-6,x+13,y-5);c.strokeStyle='#996447';c.lineWidth=4;c.stroke();
}
function wateringCan(x,y) {
  box(x-12,y-8,25,23,'#6b9ead');path([[x+13,y],[x+32,y-13],[x+35,y-9],[x+14,y+9]],'#6b9ead');
  c.beginPath();c.arc(x-16,y+1,10,0,7);c.strokeStyle='#385d65';c.lineWidth=3;c.stroke();
}
function koi(x,y,color,angle=0) {
  c.save();c.translate(x,y);c.rotate(angle);
  path([[-7,0],[-15,-5],[-13,5]],color,null);oval(0,0,10,4.5,color);
  oval(4,0,3,3,'#fff1d2');oval(8,-1,1,1,ink);c.restore();
}
function harbor(v) {
  cloud(95,65);cloud(370,85);
  path([[0,212],[130,160],[255,215],[390,170],[540,225],[720,182],[720,300],[0,300]],'#82b9b3',null);
  box(0,265,720,195,'#63b5c0',null);
  for(let j=0;j<38;j++){const x=(j*93)%720,y=278+(j*37)%180;line(x,y,x+20+j%4*8,y,'#add6ce');}
  // Smoke grows from this house's chimney, never from a detached icon.
  box(119,126,12,26,'#bf7964');box(116,124,18,5,'#dfab8c');
  if(!v){oval(125,117,7,7,'#fff3de');oval(132,105,9,7,'#fff3de');oval(126,92,10,6,'#fff3de');}
  house(23,187,66,100,'#f3ce99');house(94,175,67,112,'#e69d86');
  house(166,196,58,91,'#f1dfac');house(228,172,69,115,'#8db9ae');house(305,191,62,95,'#e7a06f');
  // The little clock turret is physically joined to the harbor house below it.
  box(243,140,36,40,'#f1dfac');path([[239,140],[261,123],[283,140]],'#d77c5c');clock(261,157,v);
  if(v){box(314,205,15,23,'#5b9290');for(let y=210;y<226;y+=5)line(315,y,328,y,'#c8ddd0',1);}
  else{box(307,205,6,23,'#5b9290');box(330,205,6,23,'#5b9290');}
  path([[517,268],[529,127],[560,127],[574,268]],'#fff2d1');
  path([[525,167],[563,167],[568,190],[522,190]],'#df715c');box(523,117,43,23,'#f4c66d');
  path([[516,117],[545,96],[573,117]],'#d75d50');line(545,96,545,70);oval(545,67,3,3,'#f7d770');
  path([[546,73],[574,81],[546,89]],v?'#76b9b3':'#df715c');box(537,217,15,27,'#3e6c78');
  path([[0,358],[365,320],[486,346],[0,425]],'#c89367');
  for(let j=0;j<15;j++)line(j*35,355-j*3.8,j*35+25,410-j*4.5,'#9b6d50');
  for(let x=35;x<390;x+=80){if(v&&x===275)continue;const y=365-x*.1;box(x,y,11,63,'#8b6653');oval(x+5,y,9,4,'#eac69b');}
  boat(440,350,'#de7357',!v);boat(625,403,'#f6c25d');plant(55,371,.6);
  oval(505,326,17,4,'#438f9e');line(505,290,505,300);oval(505,300,4,4,ink);
  oval(505,313,11,15,v?'#efc55e':'#db7058',0,ink);line(496,311,514,311,'#fff0d1',3);
  if(!v){line(638,103,655,108,'#456a76');line(655,108,673,101,'#456a76');oval(654,106,4,2,'#fff2d6');}
  label('PORT SOL',195,268,13);
}
function market(v) {
  cloud(120,65);cloud(365,82);box(0,310,720,150,'#d99c73',null);
  for(let y=340;y<460;y+=30)line(0,y,720,y,'#b87f64');
  for(let x=-200;x<900;x+=85)line(360,290,x,460,'#b87f64');
  house(15,180,90,137,'#e98f73');house(120,160,100,155,'#e9c47c');
  house(505,174,85,145,'#bd8d8b');house(605,197,99,122,'#e8b56e');
  box(421,124,66,195,'#f2c18a');box(413,112,82,20,'#d57959');
  path([[418,112],[454,74],[491,112]],'#77586b');clock(454,151,v);
  for(let k=0;k<2;k++){
    const x=70+k*240;box(x,288,170,70,'#b87c50');box(x,264,170,35,'#f0b86d');
    for(let j=0;j<9;j++)box(x+j*19,225,19,40,v&&k===0&&j===2?'#f5dfb0':j%2?'#f5dfb0':'#c85855');
    line(x,225,x+170,225);line(x,263,x,357);line(x+170,263,x+170,357);
    for(let j=0;j<15;j++){
      if(v&&k===1&&j===1)continue;
      oval(x+12+(j%8)*20,281-Math.floor(j/8)*14,8,8,k?'#e8b94f':'#da6950',0,ink);
    }
    label(k?'CITRUS & SUN':v?'THE FIG SHOP':'THE FIG STALL',x+85,328,13,'#fff1c4');
  }
  line(0,95,720,125);
  for(let x=45;x<720;x+=100){
    if(x===445||(v&&x===45))continue; // Keep the tower clock unobstructed.
    line(x,96+x/24,x,140);oval(x,151,12,17,'#ef9c56',0,ink);line(x-10,148,x+10,148,'#f8d47b');
  }
  // A slatted crate rests on the cobbles in front of the stall.
  box(79,353,40,34,v?'#7caa8b':'#c57558');
  for(let y=360;y<384;y+=9)line(81,y,117,y,'#f3d2a0');
  line(85,354,85,386);line(113,354,113,386);
  oval(585,383,20,20,'#3a5860');oval(667,383,20,20,'#3a5860');box(582,346,70,25,'#7cb5ae');
  path([[638,371],[652,324],[668,324],[667,371]],'#7cb5ae');line(649,323,678,323);box(589,336,34,8,'#614e48');
  if(!v)plant(272,354,.65);
  oval(665,342,7,6,v?'#ffe68d':'#7f9b98',0,ink);
  if(v){line(675,337,681,334,'#ffe68d');line(676,343,684,343,'#ffe68d');line(675,348,681,352,'#ffe68d');}
}
function rooftop(v) {
  for(let j=0;j<65;j++){const x=(j*127+21)%720,y=(j*43+12)%235;oval(x,y,j%4===0?2:1,1.5,'#f4e4b3');}
  if(v){
    c.beginPath();c.arc(620,66,36,-1.13,1.13,true);c.quadraticCurveTo(590,66,635.36,33.45);c.closePath();c.fillStyle='#f6df9b';c.fill();
  }else oval(620,66,36,36,'#f6df9b');
  for(let j=0;j<12;j++){
    const x=j*65,y=190+(j*29)%75;box(x,y,55,140,'#384a70',null);
    for(let xx=8;xx<48;xx+=13)for(let yy=12;yy<100;yy+=22){
      const color=v&&j===4&&xx===8&&yy===12?'#384a70':(j+yy)%3?'#e2b87a':'#596d8a';
      box(x+xx,y+yy,5,8,color,null);
    }
  }
  box(0,307,720,153,'#b77d70',null);for(let y=330;y<460;y+=27)line(0,y,720,y,'#976576');
  box(0,281,720,20,'#d2a19c');for(let x=15;x<720;x+=28)line(x,300,x,326,'#f1c7a2',3);
  c.beginPath();c.moveTo(0,83);c.quadraticCurveTo(360,175,720,78);c.strokeStyle='#152b49';c.lineWidth=3;c.stroke();
  for(let x=20;x<720;x+=46){
    if(v&&x===664)continue;
    const y=85+67*Math.sin(x/720*Math.PI);line(x,y,x,y+12);oval(x,y+18,10,12,'#ffdb7b22');oval(x,y+18,5,8,'#ffdb7b');
  }
  box(480,261,183,91,'#324f66');box(473,251,197,15,'#edb47e');box(510,211,80,40,'#b8c3bd');
  box(519,223,60,12,'#294653');box(518,239,8,12,'#d47f64');box(560,239,8,12,'#d47f64');
  c.save();c.shadowColor=v?'#87e4d5':'#ffd58b';c.shadowBlur=5;label('MOONBEAN',570,297,18,v?'#87e4d5':'#ffd58b');c.restore();
  label('ESPRESSO · AFTER DARK',570,318,9,'#ecb38b');
  table(165,354,!v);table(347,393);plant(59,330,.9,v);plant(693,326,.7);
  for(let x of [100,210,290,400]){
    box(x,375,26,9,v&&x===100?'#72b8ae':'#e4a97f');line(x+4,384,x,419);line(x+23,384,x+27,419);
    line(x,375,x,347);line(x+26,375,x+26,347);line(x,347,x+26,347);
  }
  if(!v)sleepingCat(440,266);
}
function botanical(v) {
  if(!v)cloud(100,43);
  path([[40,295],[40,190],[102,95],[230,53],[489,53],[618,95],[680,190],[680,295]],'#d9e8ca');
  for(let x of [40,145,250,360,470,575,680]){line(x,295,x,186,'#6a9c87',3);line(x,186,360,36,'#6a9c87',3);}
  line(40,190,680,190,'#6a9c87',3);line(98,101,622,101,'#6a9c87',3);
  // A framed roof pane, hinged to the mullion, opens outward in the changed scene.
  path([[360,130],[400,130],[400,174],[360,174]],'#dce8cb','#6a9c87');
  if(v){path([[360,130],[400,130],[412,154],[372,154]],'#b7d6c5','#5c8c79');line(372,154,365,172,'#5c8c79');}
  line(361,130,399,130,'#527b68',3);
  box(0,295,720,165,'#a2ba85',null);path([[245,290],[396,290],[500,460],[110,460]],'#e4c99a',null);
  for(let y=315;y<460;y+=28)line(130,y,470,y,'#c4aa7e');
  for(let x of [40,105,170,555,620,690])plant(x,320-(x%3)*20,1+(x%4)*.12,v&&x===170);
  for(let x of [100,250,470,610]){line(x,60,x-18,150,'#6f8d70');line(x,60,x+18,150,'#6f8d70');plant(x,137,.5);}
  flower(470,108,v?'#f7ca6c':'#d981a4');
  oval(495,391,138,53,'#e2d2a5',-.15,ink);oval(495,391,123,42,'#69b8ad',-.15);
  for(let j=0;j<7;j++){
    koi(410+j*27,390+Math.sin(j)*19,j%2?'#ed9b5d':'#f7e5be',j*.5);
    if(!(v&&j===4))oval(428+j*34,370+(j%2)*32,13,7,'#4f986b',.1);
  }
  if(v)koi(456,410,'#f19150',-.2);
  box(285,230,83,62,'#88b7a0');path([[283,230],[326,200],[370,230]],'#719b86');
  box(291,250,70,24,v?'#eeb97b':'#f4e4b6');label('THE GREENHOUSE',326,265,8);
  plant(250,363,.6);if(!v)wateringCan(215,340);
}
export function paintIllustration(ctx,index,variant) {
  c=ctx;[harbor,market,rooftop,botanical][index](Boolean(variant));
}
