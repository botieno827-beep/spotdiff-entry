# Little Worlds

An original offline spot-the-difference game: four illustrated chapters, 32 changes, mirrored inspection, ink-ring finds, hint pulses, synthesized sound and local completion records.

Run `node serve.ts`, then open http://localhost:8080. Click either picture. H gives a hint, Z toggles synchronized inspection, M toggles sound. Each wrong click costs three seconds. The chapter menu and restart button let you replay any world.

`node capture.mjs` captures four real 1200 × 750 browser PNGs and verifies interactions using Playwright and Microsoft Edge. Install Playwright for development with `npm install --no-save playwright`. The delivered game itself needs no dependencies or build.

`MAKEFUN_OUTPUT_DIR=out node main.ts` packages the static files, screenshots and the unchanged kit dossier generator. This kit does not publish its scorer; grading happens on make.fun.

Art and synthesized effects were authored for this entry. The original MIT LICENSE is retained, with an SPDX declaration added for the submission checker.
