import {scenes} from './scenes.js';
import {paintIllustration} from './illustrations.js';

export function drawScene(ctx,index,variant,found=[],pulse=null,hover=null,zoom=false) {
  ctx.save();ctx.clearRect(0,0,720,460);
  if(zoom&&hover){ctx.translate(360,230);ctx.scale(1.6,1.6);ctx.translate(-hover.x*720,-hover.y*460);}
  const scene=scenes[index],sky=ctx.createLinearGradient(0,0,0,460);
  sky.addColorStop(0,scene.sky);sky.addColorStop(1,index===2?'#b56c85':'#f7deb0');
  ctx.fillStyle=sky;ctx.fillRect(0,0,720,460);
  if(index!==2){ctx.beginPath();ctx.arc(620,66,36,0,Math.PI*2);ctx.fillStyle=scene.sun;ctx.fill();}
  paintIllustration(ctx,index,variant);
  found.forEach((i,order)=>drawInkRing(ctx,scene.diff[i],'#ec614e',order+1,1+.018*Math.sin(performance.now()/300)));
  if(pulse)drawInkRing(ctx,pulse,'#ffe57a',null,1.12+.08*Math.sin(performance.now()/120));
  if(hover){const x=hover.x*720,y=hover.y*460;ctx.beginPath();ctx.moveTo(x-8,y);ctx.lineTo(x+8,y);ctx.moveTo(x,y-8);ctx.lineTo(x,y+8);ctx.strokeStyle='#ffffffb0';ctx.lineWidth=1;ctx.stroke();}
  ctx.restore();
}
function drawInkRing(ctx,d,color,number,scale) {
  const x=d.x*720,y=d.y*460,rx=(d.rx+4)*scale,ry=(d.ry+4)*scale;
  ctx.save();ctx.beginPath();ctx.ellipse(x,y,rx,ry,-.06,0,Math.PI*2);
  ctx.strokeStyle='#fff2d1';ctx.lineWidth=6;ctx.stroke();ctx.strokeStyle=color;ctx.lineWidth=3;ctx.stroke();
  ctx.beginPath();ctx.ellipse(x+2,y-1,rx+3,ry+1,.035,.2,6.1);ctx.lineWidth=1.3;ctx.stroke();
  if(number){const X=x+rx*.75,Y=y-ry*.7;ctx.beginPath();ctx.arc(X,Y,9,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 11px Georgia';ctx.textAlign='center';ctx.fillText(number,X,Y+4);}
  ctx.restore();
}
