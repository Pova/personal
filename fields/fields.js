// Gradient Field

function vf_gradient(x, y){
    field_name_elt.innerHTML = "Gradient Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(x, y);
}

// Hyperbolic Field

function vf_hyperbolic(x,y){
    field_name_elt.innerHTML = "Hyperbolic Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(y,x)
}

// Circular Field

function vf_circular(x, y){
    field_name_elt.innerHTML = "Circular Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(-y, x);
}


// Uniform Field

function vf_uniform(x, y){
    field_name_elt.innerHTML = "Uniform Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(1, 1);
}

// Skew Hyperbolic Field

function vf_skew_hyperbolic(x, y){
    field_name_elt.innerHTML = "Skew Hyperbolic Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(y - x, y + x);
}


// Sine Cosine Field

function vf_sine_cosine(x, y){
    field_name_elt.innerHTML = "Sine Cosine Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(Math.sin(4*TWO_PI*x/width), Math.cos(3*TWO_PI*y/height));
}

// Rotating Sine Field

function vf_rotating_sine(x, y){
    field_name_elt.innerHTML = "Rotating Sine Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(Math.sin(12*y/height), Math.cos(16*x/width));
}

// Parabolic Spiral Field

function vf_parabolic_spiral(x, y){
    field_name_elt.innerHTML = "Parabolic Spiral Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(y*y - x*x, 2*x*y);
}

// Quadratic Field A

function vf_quadratic_A(x, y){
    field_name_elt.innerHTML = "Quadratic Field A";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(x**2, y**2);
}

// Quadratic Field B

function vf_quadratic_B(x, y){
    field_name_elt.innerHTML = "Quadratic Field B";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(y**2,x**2);
}

// Cubic Field A

function vf_cubic_A(x, y){
    field_name_elt.innerHTML = "Cubic Field A";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(x**3, y**3);
}

// Cubic Field B

function vf_cubic_B(x, y){
    field_name_elt.innerHTML = "Cubic Field B";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(y**3,x**3);
}

// Improper Nodal Source

function vf_improper_nodal_source(x, y){
    field_name_elt.innerHTML = "Improper Nodal Source";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(15*x-1*y,16*x+7*y);
}

// Improper Nodal Sink

function vf_improper_nodal_sink(x, y){
    field_name_elt.innerHTML = "Improper Nodal Sink";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(-2*x+y,-4*x-6*y);
}

// Spiral Source

function vf_spiral_source(x, y){
    field_name_elt.innerHTML = "Spiral Source";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(-1*x-4*y,2*x+3*y);
}

// Stable Center

function vf_stable_center(x, y){
    field_name_elt.innerHTML = "Stable Center";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(x-2*y,x-y);
}

// Spiral Sink

function vf_spiral_sink(x, y){
    field_name_elt.innerHTML = "Spiral Sink";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(-1*x-4*y,2*x-3*y);
}

// THESE NEED REWORKING

// Whirlpool Field -- Needs reworking

function vf_whirlpool(x, y){
    field_name_elt.innerHTML = "Whirlpool Field";
    field_name_elt.style.color = '#65C6FF';
    let denominator = x*x + y*y + 0.001;
    return new p5.Vector(-y, x).mult(1/denominator);
}

// Tangent Field

function vf_tangent(x, y){
    field_name_elt.innerHTML = "Tangent Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(Math.tan(TWO_PI*x/width), Math.tan(2*TWO_PI*y/width));
}


// Exponential Field

function vf_exp(x, y){
    field_name_elt.innerHTML = "Exponential Field";
    field_name_elt.style.color = '#65C6FF';
    return new p5.Vector(Math.exp(x - y)/width, Math.exp(y - x)/height);
}


// Logarithmic Spiral Field

function vf_log_spiral(x, y){
    field_name_elt.innerHTML = "Logarithmic Spiral Field";
    field_name_elt.style.color = '#65C6FF';
    const rho = Math.sqrt(x * x + y * y);
    const theta = Math.atan2(y, x);
    const multiplier = rho === 0 ? 0 : Math.log(rho) / (rho * rho);
    return new p5.Vector(-y * multiplier, x * multiplier);
}
