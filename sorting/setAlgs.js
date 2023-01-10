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