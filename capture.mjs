import {chromium} from 'playwright';
import {mkdirSync,statSync,writeFileSync} from 'node:fs';
import {scenes} from './game/src/scenes.js';

mkdirSync('screenshots',{recursive:true});
mkdirSync('verification',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:750},deviceScaleFactor:1});
const errors=[],remoteRequests=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8080')&&!r.url().startsWith('data:'))remoteRequests.push(r.url());});
const assert=(ok,message)=>{if(!ok)throw Error(message);};
const clickTarget=async(n,i,side='right',offset={x:0,y:0})=>{
  const b=await page.locator('#'+side).boundingBox(),d=scenes[n].diff[i];
  await page.mouse.click(b.x+(d.x+offset.x/720)*b.width,b.y+(d.y+offset.y/460)*b.height);
};
const readTime=async()=>{const [m,s]=(await page.locator('#timer').textContent()).split(':').map(Number);return m*60+s;};
await page.goto('http://127.0.0.1:8080');
await page.screenshot({path:'verification/title-menu.png'});
assert(await page.locator('.chapter-choices button').count()===4,'Title menu lacks chapters');
await page.click('#start');
const selection=[[3,2,7],[0,3,6],[0,1,2],[1,3,7]];
for(let n=0;n<4;n++){
  await page.click(`[data-level="${n}"]`);
  const first=selection[n];
  for(const i of first)await clickTarget(n,i);
  await page.mouse.move(1190,740);await page.waitForTimeout(950);
  assert(await page.locator('#found').textContent()==='Found 3 / 8','Screenshot find count failed on '+n);
  const path=`screenshots/${n+1}-${['harbor','market','rooftop','conservatory'][n]}.png`;
  await page.screenshot({path});
  assert(statSync(path).size<=262144,'Screenshot exceeds 256 KiB: '+path);
  for(const i of scenes[n].diff.keys())if(!first.includes(i))await clickTarget(n,i,i%2?'left':'right');
  assert(await page.locator('#found').textContent()==='Found 8 / 8','All-eight completion failed on '+n);
  await page.waitForTimeout(1050);
  assert(await page.locator('.overlay-card h2').textContent()==='A world restored.','Completion overlay failed');
  await page.click('#start');
}
// Fair hit zones: the wide sign's outer letters and the cat silhouette accept clicks.
await page.click('[data-level="2"]');await clickTarget(2,3,'left',{x:68,y:0});
assert(await page.locator('#found').textContent()==='Found 1 / 8','Sign edge rejected');
await clickTarget(2,2,'right',{x:-19,y:-8});
assert(await page.locator('#found').textContent()==='Found 2 / 8','Cat silhouette rejected');
// Zoom uses the same scene coordinates on both panels.
await page.click('[data-level="0"]');
const bounds=await page.locator('#right').boundingBox(),target=scenes[0].diff[4];
await page.mouse.move(bounds.x+target.x*bounds.width,bounds.y+target.y*bounds.height);
await page.keyboard.press('z');
await page.mouse.click(bounds.x+bounds.width/2,bounds.y+bounds.height/2);
assert(await page.locator('#found').textContent()==='Found 1 / 8','Zoomed target click failed');
await page.click('[data-level="1"]');
assert((await page.locator('#zoom').textContent()).includes('Inspect'),'Zoom did not reset on chapter switch');
await page.keyboard.press('h');assert(await page.locator('#hints').textContent()==='Hints 2','Hint failed');
await page.keyboard.press('m');assert(await page.locator('#sound').textContent()==='SOUND OFF','Mute failed');
const before=await readTime(),b=await page.locator('#right').boundingBox();
await page.mouse.click(b.x+b.width*.5,b.y+b.height*.94);
assert(before-await readTime()>=3,'Wrong click did not deduct three seconds');
assert((await page.locator('#message').textContent()).includes('3 seconds'),'Wrong click feedback missing');
await page.keyboard.press('Escape');assert(await page.locator('#overlay').isVisible(),'Menu failed');
await page.click('.chapter-choices button:last-child');
assert((await page.locator('#chapter').textContent()).includes('Conservatory'),'Chapter menu did not navigate');
assert(!errors.length,errors.join('\n'));assert(!remoteRequests.length,'Game made external requests');
writeFileSync('verification/browser-checks.json',JSON.stringify({passed:true,targets:32,screenshotSizes:selection.map((_,n)=>statSync(`screenshots/${n+1}-${['harbor','market','rooftop','conservatory'][n]}.png`).size),checks:['offline requests','all 32 targets in both panels','completion overlays','wide sign edge','cat silhouette','zoomed click','chapter zoom reset','hints','mute keyboard shortcut','wrong-click penalty','chapter menu'],errors},null,2));
console.log('PASS: all 32 targets, object edges, zoomed clicking, penalty, hints, mute, menu, screenshot caps and offline loading.');
await browser.close();
