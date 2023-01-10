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

function setup() {

  colorMode(HSB, 255);

  canvas = createCanvas(windowWidth - 200, windowHeight - 180);
  canvas.parent("canvas_div");

  animate_array();

}

async function sort_array() {
  // console.log('sort array button!')
  if (alg != undefined) {
    if (animate === false) {
      await resume_animation();
      if (alg === 'quick') {
        await quicksort(values, 0, values.length - 1);
      } else if (alg === 'bubble') {
        await bubblesort(values);
      } else if (alg === 'insert') {
        await insertsort(values);
      } else if (alg === 'select') {
        await selectsort(values);
      } else if (alg === 'merge') {
        await mergesort(values);
      } else if (alg === 'heap') {
        await heapsort(values);
      }
      animate_array();
      console.log('DONE');
      pause_animation();
    }
  } else {
    console.log('pick an algorithm!')
  }
}


function draw() {
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

// BUBBLE SORT

//============================================================

async function bubblesort(values) {
  console.log('bubble!')
  counter = 0;
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i; j++) {
      states[j] = 0;
    }
    for (let j = 0; j < values.length - i - 1; j++) {
      states[j] = 1;
      if (values[j] > values[j + 1]) {
        await bubble_swap(values, j, j + 1,counter++);
      }
      states[j] = 3;
    }
    states[values.length - i - 1] = -2;
  }
  return;
}

//0 --> dark grey : current pivot position
//1 --> green : left to look at
//-1 --> blue : will be smaller than pivot-elt
//-2 --> multi-coloured : will be larger than pivot-elt
//2 --> red : will be larger than pivot-elt
//3 --> white :

//============================================================

// INSERT SORT

async function insertsort(values) {
  console.log('insert!');
  states[0] = -2;
  for (let i = 1; i < values.length; i++) {
    states[i] = 0;
  }
  for (let i = 1; i < values.length; i++) {
    states[i] = 3;
    await sleep(100);
    let final_position = i;
    for (let j = i; j > 0; j--) {
      if (values[j - 1] > values[j]) {
        await insert_swap(values, j - 1, j, states);
        final_position -= 1;
      }
    }
    states[final_position] = -2;
  }
  return;
}

//============================================================

// SELECT SORT

async function selectsort(values) {
  for (let i = 0; i < values.length; i++) {
    states[i] = 2; //make current elt looking at grey
    min_so_far = values[i];
    index_to_swap = i;
    for (let j = i + 1; j < values.length; j++) {
      if (values[j] < min_so_far) { //check if its smaller than smallest found so far
        if (index_to_swap != i){
          states[index_to_swap] = 0
        }
        min_so_far = values[j]; //update min_so_far
        index_to_swap = j;
        states[j] = -1; //make new swap element blue
      } else {
        states[j] = 0
      }
    }

    if (i != index_to_swap) {
      await select_swap(values, i, index_to_swap);
      states[i] = -2 //in sorted relative order
    } else { //was already in correct position - no swap
      states[i] = -2
    }
  }
  return;
}


//============================================================

// QUICK SORT

async function quicksort(arr, start, end) {
  if (start >= end) {
    states[start] = -2;
    return;
  }


  let index = await partition(arr, start, end);
  states[index] = -2;



  await Promise.all([
    quicksort(arr, start, index - 1),
    quicksort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 0;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 1;
  for (let i = start; i < end; i++) {
    states[i] = 2;
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}


//============================================================

// MERGE SORT

async function mergesort(array){
  if (array.length <= 1){
    return array;
  }
  const arr = array.slice();
  const arr_copy = array.slice();
  await mergeSortHelper(arr,arr_copy,0,arr.length-1,states);
  return;
}

async function mergeSortHelper(arr,arr_copy,start,end,states){
  if (start===end){
    return;
  }
  const mid = Math.floor((start+end)/2);

  await mergeSortHelper(arr_copy,arr,start,mid,states);
  await mergeSortHelper(arr_copy,arr,(mid+1),end,states);
  await mergeStep(arr,arr_copy,start,mid,end,states);
}

//0 --> dark grey : current pivot position
//1 --> green : left to look at
//-1 --> blue : will be smaller than pivot-elt
//-2 --> multi-coloured : will be larger than pivot-elt
//2 --> red : will be larger than pivot-elt
//3 --> white :
//4 --> purple :

async function mergeStep(arr,arr_copy,start,mid,end,states){
  let k = start;
  let i = start;
  let j = mid + 1;
  for (let idx = start;idx<=end;idx++){
    states[idx] = 3; //cells we're looking at in white
  }
  //await sleep(0);
  while (i <= mid && j <= end) {
    if (arr_copy[i] <= arr_copy[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      arr[k] = arr_copy[i];
      values[k] = arr_copy[i];
      states[k] = -2;
      await sleep(0);
      //states[i] = 0;
      //states[j] = 0;
      i++;
      k++;
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      arr[k] = arr_copy[j];
      values[k] = arr_copy[j];
      states[k] = -2;
      await sleep(0);
      //states[i] = 0;
      //states[j] = 0;
      j++;
      k++;
    }
    await sleep(0);
    animate_array();
  }

  while (i <= mid) {
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    arr[k] = arr_copy[i];
    values[k] = arr_copy[i];
    states[k] = -2;
    await sleep(0);
    i++;
    k++;
    animate_array();
  }
  while (j <= end) {
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    arr[k] = arr_copy[j];
    values[k] = arr_copy[j];
    states[k] = -2;
    await sleep(0);
    j++;
    k++;
    //await sleep(1);
    //animate_merge_array(arr,arr_copy,start,end,depth);
  }
    animate_array();
}



//============================================================

function animate_array() {
  background(0);
  push();
  strokeWeight(2);
  stroke(255);
  line(0, windowHeight - 300, w*values.length, windowHeight - 300);
  pop();

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
