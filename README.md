# Little Worlds

An original offline spot-the-difference game: four illustrated chapters, 32 changes, mirrored inspection, ink-ring finds, hint pulses, synthesized sound and local completion records.

Run `node serve.ts`, then open http://localhost:8080. Click either picture. H gives a hint, Z toggles synchronized inspection, M toggles sound. Each wrong click costs three seconds. The chapter menu and restart button let you replay any world.

`node capture.mjs` captures four real 1200 × 750 browser PNGs and verifies interactions using Playwright and Microsoft Edge. Install Playwright for development with `npm install --no-save playwright`. The delivered game itself needs no dependencies or build.

`MAKEFUN_OUTPUT_DIR=out node main.ts` packages the static files, screenshots and the unchanged kit dossier generator. This kit does not publish its scorer; grading happens on make.fun.

Art and synthesized effects were authored for this entry. The original MIT LICENSE is retained, with an SPDX declaration added for the submission checker.

[![make.fun](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![Rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/botieno827-beep/spotdiff-entry/rank.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![Reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/botieno827-beep/spotdiff-entry/reward.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)

The scene variants are now drawn inside their own objects: a clock on a harbor turret, a lighthouse flag, sail stripe and mooring post; market lanterns, crate, awning, scooter and shop; moon, cups, sleeping cat, neon, skyline window, leaf and cushion; koi, lily pad, hanging flower, watering can, hinged glass vent, fern, cloud and sign. Oval hit regions cover each object, including long signs.

The capture command also saves `verification/title-menu.png` for local inspection. Only the four active-play PNGs under `screenshots/` are handed in, as the kit permits at most four. Browser verification checks every target in both panels, edge clicks, zoomed clicking, hints, wrong-click penalties, mute, chapter navigation, offline loading and screenshot byte caps.
