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
      //await sleep(100);
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