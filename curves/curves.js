//Path 0

function path_0(t){

  return new p5.Vector(0,0,0)
}

//Path 1 - Helix (around z)

function path_1(t){

  curve_name_elt.innerHTML = "Helix";
  curve_name_elt.style.color = '#65C6FF';

  x = sin(t);
  y = -.1 * t; //constant will change the tightness of helix
  z = cos(t);

  return new p5.Vector(x,y,z)
}

//Path 2 - Slinky Curve

function path_2(t){

  //R = 1, a = .4, w = 40, h = .3

  curve_name_elt.innerHTML = "Slinky Curve";
  curve_name_elt.style.color = '#65C6FF';

  x = (slinky_R + slinky_a * cos(slinky_w * t)) * sin(t);
  y = -(slinky_h * t + slinky_a * sin(slinky_w * t))
  z = (slinky_R + slinky_a * cos(slinky_w * t)) * cos(t);

  return new p5.Vector(x,y,z)
}

//Path 3 - Conical Spiral

function path_3(t){

  curve_name_elt.innerHTML = "Conical spiral";
  curve_name_elt.style.color = '#65C6FF';

  x = .2 * t * sin(t);
  y = -.1 * t;
  z = .2 * t * cos(t);

  return new p5.Vector(x,y,z)
}

//Path 4 - Spherical Spiral

function path_4(t){

  curve_name_elt.innerHTML = "Spherical spiral";
  curve_name_elt.style.color = '#65C6FF';

  x = (sin(t))/Math.sqrt(1 + pow(a_1,2)*pow(t,2));
  y = (a_1*t)/Math.sqrt(1 + pow(a_1,2)*pow(t,2));
  z = (cos(t))/Math.sqrt(1 + pow(a_1,2)*pow(t,2));

  return new p5.Vector(x,y,z)
}

//Path 5 - Viviani's Curve

function path_5(t){

  curve_name_elt.innerHTML = "Viviani's curve";
  curve_name_elt.style.color = '#65C6FF';

  x = cos(t) * sin(t);
  y = -sin(t);
  z = cos(t) * cos(t);

  return new p5.Vector(x,y,z)
}

//Path 6 - Twisted Cubic

function path_6(t){

  curve_name_elt.innerHTML = "Twisted Cubic";
  curve_name_elt.style.color = '#65C6FF';

  x = pow(t, 2);
  y = -pow(t, 3);
  z = pow(t, 1);

  return new p5.Vector(x,y,z)
}

//Path 7 - Spherical Epitrochoid

function path_7(t){

  curve_name_elt.innerHTML = "Spherical Epitrochoid";
  curve_name_elt.style.color = '#65C6FF';

  x = sin(t) * (epi_a - cos(epi_w) * (epi_b - epi_c * sin((epi_a / epi_b) * t))) + epi_c * cos(t) * cos((epi_a / epi_b) * t);
  y = -(sin(epi_w) * (epi_b - epi_c * sin((epi_a / epi_b) * t)));
  z = cos(t) * (epi_a - cos(epi_w) * (epi_b - epi_c * sin((epi_a / epi_b) * t))) - epi_c * sin(t) * cos((epi_a / epi_b) * t);

  return new p5.Vector(x,y,z)
}
