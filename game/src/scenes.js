// Targets follow real object outlines in the illustration's 720 × 460 space.
function changes(objects) {
  return objects.map(([x, y, rx, ry, name]) => ({
    x: x / 720, y: y / 460, rx, ry, r: Math.max(rx, ry) / 720, name,
  }));
}
export const scenes = [
  { name: 'Sunny Coastal Harbor', sky: '#a9d9e4', sun: '#ffd36b', diff: changes([
    [655,103,24,15,'Seagull above the harbor'],
    [322,216,23,23,'Harbor house window shutters'],
    [420,321,24,22,'Stripe on the sailboat sail'],
    [557,86,28,17,'Flag on the lighthouse mast'],
    [505,310,20,24,'Painted harbor buoy'],
    [261,157,22,22,'Hands of the harbor clock tower'],
    [128,108,25,30,'Smoke rising from the chimney'],
    [280,367,17,37,'Wooden pier mooring post'],
  ])},
  { name: 'Golden Sunset Market', sky: '#f5b26b', sun: '#ffe58a', diff: changes([
    [45,132,24,44,'Lantern hanging from the market wire'],
    [99,371,25,23,'Painted wooden fruit crate'],
    [117,245,16,24,'Stripe on the fig stall awning'],
    [667,342,22,19,'Scooter headlight'],
    [454,151,27,27,'Hands on the market clock tower'],
    [272,332,40,54,'Potted plant beside the fruit stalls'],
    [155,328,74,17,'Words on the fig shop sign'],
    [342,281,14,14,'Orange in the citrus display'],
  ])},
  { name: 'Starry Night Rooftop Café', sky: '#28365f', sun: '#f6df9b', diff: changes([
    [620,66,42,42,'Full moon or crescent moon'],
    [164,340,20,17,'Coffee cup on the café table'],
    [440,266,34,23,'Sleeping cat on the railing'],
    [570,293,88,22,'Glow of the MOONBEAN neon sign'],
    [664,119,15,19,'Bulb on the string of lights'],
    [270,247,11,13,'Light in a skyline window'],
    [81,296,39,46,'Extra leaf on the café plant'],
    [113,379,20,13,'Color of the chair cushion'],
  ])},
  { name: 'Lush Botanical Conservatory', sky: '#b5dfc7', sun: '#f5e39c', diff: changes([
    [456,410,19,13,'Extra orange koi in the pond'],
    [216,340,43,25,'Watering can on the garden path'],
    [470,108,19,19,'Flower in the hanging planter'],
    [382,152,36,31,'Open or closed greenhouse roof vent'],
    [199,246,40,53,'Extra fern frond'],
    [100,38,49,36,'Cloud above the glasshouse'],
    [326,262,46,20,'Color of the greenhouse sign'],
    [564,370,20,15,'Lily pad floating in the koi pond'],
  ])},
];
export function containsDifference(d, x, y, padding = 0) {
  return ((x*720-d.x*720)/(d.rx+padding))**2 + ((y*460-d.y*460)/(d.ry+padding))**2 <= 1;
}
