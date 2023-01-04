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

  // speed_slider = createSlider(250,300,275,10);
  // speed_slider.parent("canvas_div");
  // speed_slider.position(100,600);

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
    // alg = undefined;
    // nav_bar_title = document.getElementById('algName');
    // nav_bar_title.innerHTML = 'None Selected';
    // nav_bar_title.style.color = '#F08080';
    values = [];
    states = [];
    generateArray();
    animate_array();
  }
}

function set_alg_bubble() {
  alg = 'bubble';
  generateArray();
  let title = document.getElementById('alg_title');
  title.innerHTML = 'This is a visualization of the bubble sort algorithm.<br><br>'
  let element = document.getElementById('alg_explain');
  element.innerHTML = '<b>Time Complexity:</b> O(n<sup>2</sup>) - where n is the length of the input array. <br><br> Despite being too inefficient to be used in practice this sorting algorithm is easy to understand conceptually and implement in code. As a result bubble sort is often the first sorting algorithm implemented by new computer science students. <br><br> The algorithm is very simple: Starting from the left side consecutive elements of the array (bars) are compared in pairs and swapped if necessary to maintain increasing order. In this way with each pass the largest element of the remaining unsorted array "bubbles" up through the unsorted part of the right hand side and is added to the increasing sorted part.';
  let nav_bar_title = document.getElementById('algName');
  nav_bar_title.innerHTML = 'Bubble Sort';
  nav_bar_title.style.color = '#65C6FF';
}

function set_alg_insert() {
  alg = 'insert';
  generateArray();
  let title = document.getElementById('alg_title');
  title.innerHTML = 'This is a visualization of the insertion sort algorithm.'
  let element = document.getElementById('alg_explain');
  element.innerHTML = '<b>Time Complexity:</b> O(n<sup>2</sup>) - where n is the length of the input array. <br><br> Though noticably faster than bubble sort (due to the reduced number of comparisons required) this algorithm is still too inefficient to be used in practice except when working with small sets.<br><br> The idea behind the algorithm is to build up the sorted array one element (bar) at a time by repeatedly picking an element from the unsorted part of the array (coloured grey on the right side) and inserting this element into the (already sorted) subarray on the left at its correct position by repeatedly comparing and swapping bars in pairs from the right.<br><br> You might have unknowingly implemented this kind of algorithm in practice when sorting a hand of playing cards during a card game!';
  let nav_bar_title = document.getElementById('algName');
  nav_bar_title.innerHTML = 'Insertion Sort';
  nav_bar_title.style.color = '#65C6FF';
}

function set_alg_select() {
  alg = 'select';
  generateArray();
  let title = document.getElementById('alg_title');
  title.innerHTML = 'This is a visualization of the selection sort algorithm.'
  let element = document.getElementById('alg_explain');
  element.innerHTML = '<b>Time Complexity:</b> O(n<sup>2</sup>) - where n is the length of the input array. <br><br> Another example of a quadratic time sorting algorithm that is too slow to be used in practice but is simple to understand and implement. This algorithm will on average perform worse than insertion sort but much better than bubble sort.<br><br> The idea behind the algorithm is to once again build up the sorted array one element (bar) at a time. The algorithm begins with the entire array as unsorted (coloured grey). At the start of each run the leftmost element in the unsorted part of the array is selected (coloured red) and the rest of the unsorted subarray is scanned through - keeping track of the smallest element encounted so far (coloured blue). Once the entire unsorted subarray has been checked and its smallest element has been found it is added to the sorted subarray on the left by swapping with the element chosen at the start of the run (red and blue bars are swapped). The process is repeated until the entire array is sorted.';
  let nav_bar_title = document.getElementById('algName');
  nav_bar_title.innerHTML = 'Selection Sort';
  nav_bar_title.style.color = '#65C6FF';
}

function set_alg_merge() {
  alg = 'merge';
  generateArray();
  let title = document.getElementById('alg_title');
  title.innerHTML = 'This is a visualization of the merge sort algorithm.'
  let element = document.getElementById('alg_explain');
  element.innerHTML = '<b>Time Complexity:</b> O(nlog(n)) - where n is the length of the input array. <br><br> Merge sort utilizes the power of recursion to beat quadratic time algorithms (especially on larger input arrays), however the algorithm is considered relatively slow compared to more sophisticated recursive algorithms (such as quick sort) due to the large number of comparisons required for the algorithm. <br><br> Merge sort is still considered relatively simple in design and is perhaps the fundamental examples of a <i>divide and conquer</i> strategy common in algorithmic problem solving. <br><br> The algorithm can be broken up into two stages: (1) the <i>splitting stage</i> - involves recursively dividing the array into smaller and smaller subarrays and (2) the <i>merging stage</i> which gives this algorithm its name and of course involves merging two subarrays (assumed to be individually sorted). <br><br> The basic point behind the algorithm is that once you split up an array enough times you end up with arrays containing either nothing or a single element (thus obviously sorted) - this forms a natural base case for the recursion of stage 1. Then when merging arrays the key is to realize that you can build up the combined array by comparing the smallest unchecked elements of each subarray. This is because (if each subarray is already sorted) then the smallest element of the combined array will be the smaller of the two smallest elements of each individual array.';
  let nav_bar_title = document.getElementById('algName');
  nav_bar_title.innerHTML = 'Merge Sort';
  nav_bar_title.style.color = '#65C6FF';
}

function set_alg_quick() {
  alg = 'quick';
  generateArray();
  let title = document.getElementById('alg_title');
  title.innerHTML = 'This is a visualization of the quick sort algorithm.'
  let element = document.getElementById('alg_explain');
  element.innerHTML = '<b>Time Complexity:</b> O(nlog(n)) - where n is the length of the input array. <br><br> This is an example of a genuinely fast sorting algorithm that easily beats quadratic time algorithms and even other simpler recursive algorithms such as merge sort. <br><br> In this implementation the algorithm works in the following way: Initially the entire array is unsorted. At the start of each run the leftmost element (of the unsorted array - coloured in grey) is chosen as a pivot element. The algorithm iterates over the unsorted array splitting it into two subarrays: a smaller half - coloured blue and containing elements <i>smaller</i> than the pivot, and a larger half - coloured red and containing elements <i>larger</i> than the pivot. The pivot element itself is placed in its correct and final position by this process. The algorithm is then recursively called on each (still unsorted) halves until the entire array is correctly sorted.';
  let nav_bar_title = document.getElementById('algName');
  nav_bar_title.innerHTML = 'Quick Sort';
  nav_bar_title.style.color = '#65C6FF';
}

function set_alg_heap() {
  alg = 'heap';
  generateArray();
  let title = document.getElementById('alg_title');
  title.innerHTML = 'This is a visualization of the heap sort algorithm.'
  let element = document.getElementById('alg_explain');
  element.innerHTML = 'Quite a cheeky algorithm';
  let nav_bar_title = document.getElementById('algName');
  nav_bar_title.innerHTML = 'Heap Sort';
  nav_bar_title.style.color = '#65C6FF';
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
  // states[end] = -2;
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
  line(0, windowHeight - 300, width, windowHeight - 300);
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
