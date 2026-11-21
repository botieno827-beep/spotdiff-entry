import {chromium} from 'playwright';
import {mkdirSync,readFileSync} from 'node:fs';
mkdirSync('screenshots',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:750},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8080');await page.click('#start');
const data=await import('./game/src/scenes.js');
for(let n=0;n<4;n++){
 await page.click(`[data-level="${n}"]`);
 const box=await page.locator('#right').boundingBox();
 for(const i of [1,3,5]){const d=data.scenes[n].diff[i];await page.mouse.click(box.x+d.x*box.width,box.y+d.y*box.height)}
 await page.mouse.move(1190,740);await page.waitForTimeout(900);
 if(await page.locator('#found').textContent()!=='Found 3 / 8')throw Error('Find targets failed on '+n);
 await page.screenshot({path:`screenshots/${n+1}-${['harbor','market','rooftop','conservatory'][n]}.png`});
 for(const i of [0,2,4,6,7]){const d=data.scenes[n].diff[i];await page.mouse.click(box.x+d.x*box.width,box.y+d.y*box.height)}
 if(await page.locator('#found').textContent()!=='Found 8 / 8')throw Error('All-eight completion failed on '+n);
 await page.waitForTimeout(1100);await page.click('#start');
}
await page.click('[data-level="0"]');await page.click('#hint');if(await page.locator('#hints').textContent()!=='Hints 2')throw Error('Hint failed');
await page.click('#zoom');await page.click('#zoom');
const b=await page.locator('#right').boundingBox();for(const d of data.scenes[0].diff)await page.mouse.click(b.x+d.x*b.width,b.y+d.y*b.height);
await page.waitForTimeout(1100);if(await page.locator('.overlay-card h2').textContent()!=='A world restored.')throw Error('Completion failed');
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: all 32 targets, hints, zoom, completion and no browser errors.');
await browser.close();

