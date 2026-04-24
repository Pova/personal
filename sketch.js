// Particle-steering behaviour sketch.
// Configurable via data attributes on #canvasContainer:
//   data-words="Welcome|to my|Website"   Pipe-separated lines to animate (default shown).
//   data-font-src="assets/font2.otf"     Path to the OTF font, relative to the HTML page.
//   data-font-size="164"                 Starting font size in px (default 164; may be scaled down to fit).
//
// Public function (attached to window) for pages with a live input:
//   renderWords(text, opts)              Re-layout the animation with new text.
//     text: string with "|" as line break, OR array of strings.
//     opts.autoSize (bool, default true) Scale font down to fit canvas width.
//
// Sizing:
//   If #canvasContainer has an explicit CSS height, the canvas fills the container.
//   Otherwise it falls back to the viewport minus #navBar and optional #detailBar.

let font;
let vehicleLines = [];
let fontSize = 164;
let canvasWidth = 0;
let canvasHeight = 0;

// Default simulation parameters used by Vehicle.arrive()/flee() in vehicle.js.
// Pages with sliders (e.g. /steering/) overwrite these via their own input handlers;
// pages without sliders (e.g. the landing page) rely on these defaults.
let max_desired = 20;
let max_steer = 10;
let flee_force = 50;
let flee_dist = 250;

const MIN_FONT_SIZE = 40;
const MAX_FONT_SIZE = 164;

function readContainerConfig() {
  const container = document.getElementById('canvasContainer');
  const wordsAttr = (container && container.getAttribute('data-words')) || 'Welcome|to my|Website';
  const fontSrc = (container && container.getAttribute('data-font-src')) || 'assets/font2.otf';
  const fs = container && container.getAttribute('data-font-size');
  return {
    words: wordsAttr.split('|'),
    fontSrc,
    fontSize: fs ? parseFloat(fs) : MAX_FONT_SIZE
  };
}

function preload() {
  const { fontSrc } = readContainerConfig();
  font = loadFont(fontSrc);
}

function setup() {
  adjustCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvasContainer');

  const { words, fontSize: fs } = readContainerConfig();
  fontSize = Math.min(fs, computeFittingFontSize(words, fs));
  layoutVehicles(words);
}

// Scale the requested font size down so the widest line fits within ~85% of the canvas width
// and each line fits vertically. Clamped to [MIN_FONT_SIZE, MAX_FONT_SIZE].
function computeFittingFontSize(words, requestedSize) {
  if (!font || !words.length) return requestedSize;
  const targetWidth = canvasWidth * 0.85;
  const targetHeightPerLine = (canvasHeight * 0.7) / words.length;

  let fs = Math.min(MAX_FONT_SIZE, requestedSize);
  for (const word of words) {
    if (!word) continue;
    const bbox = font.textBounds(word, 0, 0, fs);
    if (bbox.w > targetWidth) {
      fs = Math.min(fs, Math.floor(fs * targetWidth / bbox.w));
    }
    if (bbox.h > targetHeightPerLine) {
      fs = Math.min(fs, Math.floor(fs * targetHeightPerLine / bbox.h));
    }
  }
  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, fs));
}

function layoutVehicles(words) {
  const bboxes = words.map(w => font.textBounds(w, 0, 0, fontSize));
  const totalTextHeight = bboxes.reduce((s, b) => s + b.h, 0);
  const n = words.length;

  const paddingTop = Math.max(20, canvasHeight * 0.15);
  const vertSpace = Math.max(0, canvasHeight - paddingTop * 2 - totalTextHeight);
  const gap = n > 1 ? vertSpace / (n - 1) : 0;

  let cursorY = paddingTop;
  vehicleLines = words.map((word, i) => {
    const bbox = bboxes[i];
    const x = (canvasWidth - bbox.w) / 2;
    const baselineY = cursorY + bbox.h;
    cursorY += bbox.h + gap;

    const points = font.textToPoints(word, x, baselineY, fontSize, {
      sampleFactor: 0.1,
      simplifyThreshold: 0
    });
    return points.map(pt => new Vehicle(pt.x, pt.y));
  });
}

function draw() {
  background(0);
  for (const line of vehicleLines) {
    for (const v of line) {
      v.behaviours();
      v.update();
      v.show();
    }
  }
}

function adjustCanvasSize() {
  const container = document.getElementById('canvasContainer');
  if (container && container.clientHeight > 0) {
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    return;
  }
  const totalHeight = document.documentElement.clientHeight;
  const totalWidth = document.documentElement.clientWidth;
  const navBar = document.getElementById('navBar');
  const detailBar = document.getElementById('detailBar');
  const navBarHeight = navBar ? navBar.clientHeight : 0;
  const detailBarHeight = detailBar ? detailBar.clientHeight : 0;
  canvasHeight = totalHeight - navBarHeight - detailBarHeight;
  canvasWidth = totalWidth;
}

// Public entry point for pages that want to change the rendered text at runtime.
window.renderWords = function (text, opts) {
  const options = opts || {};
  const words = Array.isArray(text)
    ? text.filter(Boolean)
    : String(text).split('|').map(w => w.trim()).filter(Boolean);
  if (!words.length) return;
  const autoSize = options.autoSize !== false;
  fontSize = autoSize ? computeFittingFontSize(words, MAX_FONT_SIZE) : (options.fontSize || MAX_FONT_SIZE);
  layoutVehicles(words);
};
