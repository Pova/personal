let canvas;
let values = [];
let w = 10;

let alg_dict;
let alg;

let states = [];

let animate = false;
let i = 0;
let j = 0;
let starting_hue = 100;
let animation_speed = 0;

function windowResized() {
  setup();
}

function setup() {

  const totalHeight = window.innerHeight;
  const totalWidth = window.innerWidth;

  const navBarHeight = document.getElementById('navBar').clientHeight;
  const detailBarHeight = document.getElementById('detailBar').clientHeight;

  canvasHeight = totalHeight-navBarHeight-detailBarHeight;
  canvasWidth = totalWidth;

  colorMode(HSB, 255);

  canvas = createCanvas(canvasWidth*0.9, canvasHeight);
  canvas.parent("canvasDiv");

  barCount = floor(width / w);

  animate_array();
}

async function sort_array() {
  // console.log('sort array button!')
  if (alg != undefined) {
    if (animate === false) {
      await resume_animation();
      //const start = Date.now();
      if (alg === 'quick') {
        var alg_title = 'Quick Sort';
        await quicksort(values, 0, values.length - 1);
      } else if (alg === 'bubble') {
        var alg_title = 'Bubble Sort';
        await bubblesort(values);
      } else if (alg === 'insert') {
        var alg_title = 'Insertion Sort';
        await insertsort(values);
      } else if (alg === 'select') {
        var alg_title = 'Selection Sort';
        await selectsort(values);
      } else if (alg === 'merge') {
        var alg_title = 'Merge Sort';
        await mergesort(values);
      } else if (alg === 'heap') {
        var alg_title = 'Heap Sort';
        await heapsort(values);
      }
      animate_array();
      //console.log('DONE');
      pause_animation();
      // const end = Date.now();
      // push();
      // fill('#6c757d');
      // textSize(16);
      // text('Algorithm:', 100, 100);
      // fill(255);
      // text(alg_title,415,100)
      // fill('#6c757d');
      // text('Time elapsed:',100, 200);
      // fill(255);
      // text(((end-start)/1000) + ' sec', 525, 200);
      // pop();
      // console.log(`Execution time: ${end - start} ms`);
    }
  } else {
    console.log('pick an algorithm!')
  }
}


function draw() {
  //background(0);
  push();
  strokeWeight(2);
  stroke(255);
  line(0, windowHeight - 300, w*barCount, windowHeight - 300);
  pop();
  if (animate === true) {
    if (alg != 'merge'){
      animate_array();
    }

  }
}

function pause_animation() {
  animate = false
  reset_button = document.getElementById('reset_btn');
  reset_button.classList.remove('disabled');

  dropdown_button = document.getElementById('dropdownMenuButton');
  dropdown_button.classList.remove('disabled');

  sort_button = document.getElementById('sort_btn');
  sort_button.innerHTML = 'Sort';
  sort_button.style.background = '#212529'; //btn-dark
}

async function resume_animation() {
  animate = true
  reset_button = document.getElementById('reset_btn');
  reset_button.classList.add('disabled');

  dropdown_button = document.getElementById('dropdownMenuButton');
  dropdown_button.classList.add('disabled');

  sort_button = document.getElementById('sort_btn');
  sort_button.innerHTML = 'Sorting!';
  sort_button.style.background = '#65C6FF'; //light-blue
}

function reset() {
  if (animate === true) {
    console.log('cannot reset during animation')
  } else {
    values = [];
    states = [];
    generateArray();
    animate_array();
  }
}


async function generateArray() {
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = floor(random(10, windowHeight - 380));
    states[i] = 0;
  }
  animate_array();
}


function animate_array() {
  background(0);
  for (let i = 0; i < values.length; i++) {
    // noStroke();
    if (states[i] == 0) {
      fill('#6c757d'); //0 --> dark grey
    } else if (states[i] == 1) {
      fill('#D6FFB7'); //1 --> green
    } else if (states[i] == -1) {
      fill('#50D1FF'); //-1 --> blue
    } else if (states[i] == -2) {
      solved_hue = floor((Math.random(255) + (i / values.length) * 255)) % 255;
      fill(solved_hue, 100, 255); //-2 --> multi-coloured
    } else if (states[i] == 2) {
      fill("#E0777D"); //2 --> red
    } else if (states[i] == 3) {
      fill(255); //3 --> white
    } else if (states[i] == 4) {
      fill("#BA55D3"); //3 --> purple
    }
    rect(w * i, windowHeight - 300 - values[i], w, values[i]);
  }
}


async function swap(arr, a, b) {
  await sleep(20); //to slow down algs
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function bubble_swap(arr, a, b,counter) {
  await sleep(0); //to slow down algs
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function select_swap(arr, a, b) {
  await sleep(25); //to slow down algs
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}


async function insert_swap(arr, a, b, states) {
  await sleep(0); //to slow down algs
  let temp = arr[a];
  let temp_state = states[a];
  arr[a] = arr[b];
  states[a] = states[b];
  arr[b] = temp;
  states[b] = temp_state;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
