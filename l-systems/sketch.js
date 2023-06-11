let system;
let axiom;
let rules;
let sentence;
let sentenceLength;
let starting_len = 100;
let angle;
let limit;
let len = starting_len;
let scaling_factor;
let trans_scaling; // in terms of (scale**recursion)*length/2

let recursionDepth = 0; 

const system_dict = {
    "Bush-1":LS_Bush1,
    "Big-H":LS_BigH,
    "Weed-1":LS_Weed1,
    "Carpet":LS_Carpet,
    "Koch-Island":LS_Koch_Island
  };

function generate(){
    if (recursionDepth<limit){
        len *= scaling_factor;
        let new_sentence = "";
        for (let i=0; i<sentence.length;i++){
            let currentChar = sentence[i];
            if (rules.hasOwnProperty(currentChar)){
                new_sentence += rules[currentChar];
            } else {
                new_sentence += currentChar;
            }
        }
        sentence = new_sentence;
        recursionDepth++;
        turtle();
        updateText();
    } else{
        const warning_span = document.getElementById("recursion_warning");
        warning_span.innerHTML = 'Reached recusion limit!';
    }
}

function setup(){
    adjustCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvasContainer');

    systemChoice('Bush-1');

    recursionDepth = 0;
    sentenceLength = sentence.length;
    updateText()

}

function turtle(){
    background(0);
    translate(width/2,height);

    // Additional translations

    if (trans_scaling[0] != 0){
        const trans_x = (trans_scaling[0]**recursionDepth)*(len/2);
        translate(trans_x,0);
        console.log(trans_scaling[0],recursionDepth,len,trans_x);
        
    } 
    if (trans_scaling[1] != 0) {
        const trans_y = (trans_scaling[1]**recursionDepth)*(len/2);
        translate(0,trans_y);
    }

    rotate(after_rotation);
    translate(after_translations[0],after_translations[1]); // Ordering might matter here

    stroke(119,163,122,100); //green
    for (let i=0;i<sentence.length;i++){
        let current_char = sentence.charAt(i);
        
        if (current_char == "F"){
            line(0,0,0,-len);
            translate(0,-len);
        } else if (current_char == "+"){
            rotate(angle);
        } else if (current_char == "-"){
            rotate(-angle);
        } else if (current_char == "["){
            push();
        } else if (current_char == "]"){
            pop();
        }
    }
}

function draw(){
    // stroke(255,255,255,1);
    // line(width/2,0,width/2,height);
}

function resetCanvas(){
    sentence = axiom;
    len = starting_len;
    background(0);
    turtle();
    recursionDepth = 0;
    updateText();
    const warning_span = document.getElementById("recursion_warning");
    warning_span.innerHTML = '';
}

// Sets the canvas size based on the window size
function adjustCanvasSize() {
    const totalHeight = window.innerHeight;
    const totalWidth = window.innerWidth;
  
    const navBarHeight = document.getElementById('navBar').clientHeight;
    const detailBarHeight = document.getElementById('detailBar').clientHeight;
  
    canvasHeight = totalHeight - navBarHeight - detailBarHeight;
    canvasWidth = totalWidth;
  }

function systemChoice(system_name){
    // Update variables
    system = system_dict[system_name]
    axiom = system['axiom'];
    rules = system['rules'];
    angle = radians(system['draw_angle']);
    limit = system['limit'];
    sentence = axiom;
    len = starting_len;
    scaling_factor = system['scaling_factor'];
    trans_scaling = system['trans_scaling'];
    after_translations = system['after_translations'];
    after_rotation = system['after_rotation'];

    // Reset text
    recursionDepth = 0;
    updateText();
    const warning_span = document.getElementById("recursion_warning");
    warning_span.innerHTML = '';

    // Draw new shape
    background(0);
    turtle();
}

function updateText(){
    // Update the text in the HTML
    document.getElementById('recursion_depth').innerHTML = recursionDepth;

    sentenceLength = sentence.length;
    document.getElementById('sentence_length').innerHTML = sentenceLength;

    // Change the color of the recursion depth text
    let recursionColor = recursionDepth / limit; // assuming limit is the maximum recursion depth
    if (recursionColor > 1) recursionColor = 1; // clamp the value between 0 and 1
    document.getElementById('recursion_depth').style.color = `rgb(${255 * recursionColor}, ${255 * (1 - recursionColor)}, 0)`;
    }