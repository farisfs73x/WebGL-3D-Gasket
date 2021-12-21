///////////////////////////////// Variables Name ///////////////////////////////
var gl;
var points = [];
var colors = [];
var buttonDisable = false;
var NumTimesToSubdivide = 3;
var count = 0;
var ctr = 0;

// Axis
var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

// Rotation
var rotate = [0, 0, 0];
var rotates;
var rotateGasket;

// Translate
var translate = [0, 0, 0];
var translation;

// Scale
var scale = 1;
var scales = 0;
var scaleLocate;
var scaleLocates;

// Animation
var speed = 50;
var speeds = 50;
var direction = true;

//COLOURS
var red1 = 0.6;
var red2 = 0.1;
var red3 = 1.0;
var red4 = 0.1;
var green1 = 0.6;
var green2 = 0.1;
var green3 = 1.0;
var green4 = 0.1;
var blue1 = 0.6;
var blue2 = 0.1;
var blue3 = 1.0;
var blue4 = 0.1;

var program;

// Rotation type axis
var axis_choice = 2;

// Shared point
var vPosition, vColor;

// Point to the vertex shaders of 3D Gasket
var cBuffer, // Colour values
  vBuffer; // Vertex points

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //
  //  Initialize our data for the Sierpinski Gasket
  //

  // First, initialize the vertices of our 3D gasket
  // Four vertices on unit circle
  // Intial tetrahedron with equal length sides

  var vertices = [
    vec3(0.0000, 0.0000, -0.6000),
    vec3(0.0000, 0.5714, 0.2667),
    vec3(-0.5083, -0.3357, 0.2667),
    vec3(0.5083, -0.3357, 0.2667)
  ];

  divideTetra(vertices[0], vertices[1], vertices[2], vertices[3],
    NumTimesToSubdivide);

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // Enable hidden-surface removal

  gl.enable(gl.DEPTH_TEST);

  //  Load shaders and initialize attribute buffers

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Create a buffer object, initialize it, and associate it with the
  //  associated attribute variable in our vertex shader

  cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);

  vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

  vColor = gl.getAttribLocation(program, "vColor");
  gl.enableVertexAttribArray(vColor);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.enableVertexAttribArray(vPosition);

  // Declare uniform variables

  // Assign the uniform variable "rotate" to the program
  rotates = gl.getUniformLocation(program, "rotate");

  // Assign the uniform variable "translate" to the program
  translation = gl.getUniformLocation(program, "translate");

  // Assign a uniform variable "scale" to the program
  scaleLocate = gl.getUniformLocation(program, "scale");

  // Assign a uniform variable "scales" to the program
  scaleLocates = gl.getUniformLocation(program, "scales");


  /////////////////////////// Selection bar start //////////////////////////////
  // Scale and selection bar
  document.getElementById("scale").onchange = function() {

    scale = event.srcElement.value;
  };

  // Speed and slider bar
  document.getElementById("speed").onchange = function() {

    speed = 100 - event.srcElement.value;
    speeds = event.srcElement.value;
  };

  // Subdivision and slider bar
  document.getElementById("subdivision").onchange = function() {

    NumTimesToSubdivide = event.srcElement.value;
    points = [];
    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3],
      NumTimesToSubdivide);
  };


  document.getElementById("axis-x").onclick = function() {
    axis_choice = 0;
  }
  document.getElementById("axis-y").onclick = function() {
    axis_choice = 1;
  }
  document.getElementById("axis-z").onclick = function() {
    axis_choice = 2;
  }

  document.getElementById("convertaqua").onclick = function() {

    red1 = 0.0;
    red2 = 0.0;
    red3 = 0.0;
    red4 = 0.0;
    green1 = 0.6;
    green2 = 0.1;
    green3 = 1.0;
    green4 = 0.1;
    blue1 = 0.6;
    blue2 = 0.1;
    blue3 = 1.0;
    blue4 = 0.1;
    colour_reset();
    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
  }

  document.getElementById("convertpurple").onclick = function() {

    red1 = 0.6;
    red2 = 0.1;
    red3 = 1.0;
    red4 = 0.1;
    green1 = 0.0;
    green2 = 0.0;
    green3 = 0.0;
    green4 = 0.0;
    blue1 = 0.6;
    blue2 = 0.1;
    blue3 = 1.0;
    blue4 = 0.1;
    colour_reset();
    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
  }

  document.getElementById("convertyellow").onclick = function() {

    red1 = 0.6;
    red2 = 0.1;
    red3 = 1.0;
    red4 = 0.1;
    green1 = 0.6;
    green2 = 0.1;
    green3 = 1.0;
    green4 = 0.1;
    blue1 = 0.0;
    blue2 = 0.0;
    blue3 = 0.0;
    blue4 = 0.0;
    colour_reset();
    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
  }

  document.getElementById("convertred").onclick = function() {

    red1 = 0.6;
    red2 = 0.1;
    red3 = 1.0;
    red4 = 0.1;
    green1 = 0.0;
    green2 = 0.0;
    green3 = 0.0;
    green4 = 0.0;
    blue1 = 0.0;
    blue2 = 0.0;
    blue3 = 0.0;
    blue4 = 0.0;
    colour_reset();
    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
  }

  document.getElementById("convertgreen").onclick = function() {

    red1 = 0.0;
    red2 = 0.0;
    red3 = 0.0;
    red4 = 0.0;
    green1 = 0.6;
    green2 = 0.1;
    green3 = 1.0;
    green4 = 0.1;
    blue1 = 0.0;
    blue2 = 0.0;
    blue3 = 0.0;
    blue4 = 0.0;
    colour_reset();
    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
  }


  document.getElementById("convertblue").onclick = function() {

    red1 = 0.0;
    red2 = 0.0;
    red3 = 0.0;
    red4 = 0.0;
    green1 = 0.0;
    green2 = 0.0;
    green3 = 0.0;
    green4 = 0.0;
    blue1 = 0.6;
    blue2 = 0.1;
    blue3 = 1.0;
    blue4 = 0.1;
    colour_reset();
    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
  }

  // Play button
  document.getElementById("start").onclick = function() {

    rotateGasket = true;

    buttonDisable = true;
    document.getElementById("subdivision").disabled = buttonDisable;
    document.getElementById("scale").disabled = buttonDisable;
    document.getElementById("speed").disabled = buttonDisable;
    document.getElementById("convertaqua").disabled = buttonDisable;
    document.getElementById("convertpurple").disabled = buttonDisable;
    document.getElementById("convertyellow").disabled = buttonDisable;
    document.getElementById("convertblue").disabled = buttonDisable;
    document.getElementById("convertgreen").disabled = buttonDisable;
    document.getElementById("convertred").disabled = buttonDisable;
    document.getElementById("axis-x").disabled = buttonDisable;
    document.getElementById("axis-y").disabled = buttonDisable;
    document.getElementById("axis-z").disabled = buttonDisable;
  };

  // Stop button
  document.getElementById("stop").onclick = function() {

    rotateGasket = false;
  }

  // Refresh browser page
  document.getElementById("reset").onclick = function() {
    window.location.reload();
  }

  render();
};

function colour_reset() {

  points = [];
  colors = [];
  cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
  var colorLocation = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLocation);
};

function triangle(a, b, c, color) {

  // Add colors and vertices for one triangle
  var baseColors = [
    vec3(red1, green1, blue1),
    vec3(red2, green2, blue2),
    vec3(red3, green3, blue3),
    vec3(red4, green4, blue4)
  ];

  colors.push(baseColors[color]);
  points.push(a);
  colors.push(baseColors[color]);
  points.push(b);
  colors.push(baseColors[color]);
  points.push(c);
}

function tetra(a, b, c, d) {

  // Tetrahedron with each side using
  // A different color
  triangle(a, c, b, 0);
  triangle(a, c, d, 1);
  triangle(a, b, d, 2);
  triangle(b, c, d, 3);
}

function divideTetra(a, b, c, d, count) {

  // Check for end of recursion
  if (count === 0) {
    tetra(a, b, c, d);
  }

  // Find midpoints of sides
  // Divide four smaller tetrahedra
  else {
    var ab = mix(a, b, 0.5);
    var ac = mix(a, c, 0.5);
    var ad = mix(a, d, 0.5);
    var bc = mix(b, c, 0.5);
    var bd = mix(b, d, 0.5);
    var cd = mix(c, d, 0.5);

    --count;

    divideTetra(a, ab, ac, ad, count);
    divideTetra(ab, b, bc, bd, count);
    divideTetra(ac, bc, c, cd, count);
    divideTetra(ad, bd, cd, d, count);
  }
}

function render() {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  document.getElementById('countscale').value = scale;
  document.getElementById('countsubdivision').value = NumTimesToSubdivide;
  document.getElementById('countspeed').value = speeds;
  gl.uniform1f(scaleLocate, scale);

  // Load all data into GPU

  // Colours gasket
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  // Position gasket
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  // Animation gasket
  if (rotateGasket) {
    count += 1;
    buttonDisable = true; 
    
    if (axis_choice == 0) {
      // Rotate to right 180 degree
      if (count <= 90) {
        rotate[xAxis] += (true ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }

      // Rotate to orginal orientation
      if (count >= 100 && count <= 189) {
        rotate[xAxis] += (false ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
      
      // Rotate to left 180 degree
      if (count >= 209 && count <= 298) {
        rotate[xAxis] += (false ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
      // Rotate to original orientation
      if (count > 308 && count <= 398 ) {
        rotate[xAxis] += (true ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
    }
    else if (axis_choice == 1) {
      // Rotate to right 180 degree
      if (count <= 90) {
        rotate[yAxis] += (true ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }

      // Rotate to orginal orientation
      if (count >= 100 && count <= 189) {
        rotate[yAxis] += (false ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
      
      // Rotate to left 180 degree
      if (count >= 209 && count <= 298) {
        rotate[yAxis] += (false ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
      // Rotate to original orientation
      if (count > 308 && count <= 398 ) {
        rotate[yAxis] += (true ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
    }
    else {
      // Rotate to right 180 degree
      if (count <= 90) {
        rotate[zAxis] += (true ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }

      // Rotate to orginal orientation
      if (count >= 100 && count <= 189) {
        rotate[zAxis] += (false ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
      
      // Rotate to left 180 degree
      if (count >= 209 && count <= 298) {
        rotate[zAxis] += (false ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
      // Rotate to original orientation
      if (count > 308 && count <= 398 ) {
        rotate[zAxis] += (true ? 2.0 : -2.0);
        gl.uniform3fv(rotates, rotate);
        document.getElementById('ctr').value = count;
      }
    }
    

    // Enlarge 3D gasket
    if (count >= 408 && count <= 458) {
      scales += 0.003;
      gl.uniform1f(scaleLocates, scales);
      document.getElementById('ctr').value = count;
    }
    
    // For the smallest scale
    if (scale == 1) {

      // Move to right
      if(count>458 && count < 522){
      translate[xAxis] += (direction ? 0.010 : -0.1);
      // translate[yAxis] += (direction ? 0.010 : -0.1);
      gl.uniform3fv(translation, translate);
      document.getElementById('ctr').value = count;
      }
      
      // Move to left
      if(count>522 && count < 648){
      translate[xAxis] -= (direction ? 0.010 : -0.1);
      // translate[yAxis] += (direction ? 0.010 : -0.1);
      gl.uniform3fv(translation, translate);
      document.getElementById('ctr').value = count;
      }

      // Move to right
      if(count>648 && count < 712){
        translate[xAxis] += (direction ? 0.010 : -0.1);
        // translate[yAxis] += (direction ? 0.010 : -0.1);
        gl.uniform3fv(translation, translate);
        document.getElementById('ctr').value = count;
      }

      // Enlarge 3D gasket
      if (count >= 712 && count <= 762) {
        scales -= 0.003;
        gl.uniform1f(scaleLocates, scales);
        document.getElementById('ctr').value = count;
      }

    }
    // For the largest scale
    else {

      // Move to right
      if(count>458 && count < 500){
        translate[xAxis] += (direction ? 0.010 : -0.1);
      //translate[yAxis] += (direction ? 0.010 : -0.1);
      gl.uniform3fv(translation, translate);
      document.getElementById('ctr').value = count; 
      }

      // Move to left
      if(count>500 && count < 582){
        translate[xAxis] -= (direction ? 0.010 : -0.1);
      //translate[yAxis] += (direction ? 0.010 : -0.1);
      gl.uniform3fv(translation, translate);
      document.getElementById('ctr').value = count; 
      }

      // Move to right
      if(count>582 && count < 624){
        translate[xAxis] += (direction ? 0.010 : -0.1);
      //translate[yAxis] += (direction ? 0.010 : -0.1);
      gl.uniform3fv(translation, translate);
      document.getElementById('ctr').value = count; 
      }

      // Enlarge 3D gasket
      if (count >= 624 && count <= 674) {
        scales -= 0.003;
        gl.uniform1f(scaleLocates, scales);
        document.getElementById('ctr').value = count;
      }
    }

    


/*
    if(count>458){
    do{
      count=1;
      count=+1;
      if(count<50)
      {
        translate[xAxis] += (direction ? 0.010 : -0.1);
      //translate[yAxis] += (direction ? 0.010 : -0.1);
      gl.uniform3fv(translation, translate);
      document.getElementById('ctr').value = count; 
      }
      if(count>=50&&count<=150)
      {
        translate[xAxis] += (direction ? 0.010 : -0.1);
        //translate[yAxis] += (direction ? 0.010 : -0.1);
        gl.uniform3fv(translation, translate);
        document.getElementById('ctr').value = count; 
      }
      if(count>150)
      {
        count=0;
      }
    }
     
    while(count>458){}
  }
   /* if (count>= 458) {
      
        if (count>=458 && count<=508) {
          translate[xAxis] += (direction ? 0.010 : -0.1);
          //translate[yAxis] += (direction ? 0.010 : -0.1);
        gl.uniform3fv(translation, translate);
          //document.getElementById('ctr').value = count; 
        }
          

        if (count>=508 && count<=608) {
            translate[xAxis] -= (direction ? 0.010 : -0.1);
            //translate[yAxis] -= (direction ? 0.010 : -0.1);
            gl.uniform3fv(translation, translate);
            document.getElementById('ctr').value = count; }
             
        } 

        /*if (count>=570 && count<=630) {
            translate[xAxis] -= (direction ? 0.010 : -0.1);
            translate[yAxis] -= (direction ? 0.010 : -0.1);
            gl.uniform3fv(translation, translate);
            document.getElementById('ctr').value = count; }
            //move from center to downwards 
        }  */
        
        /*  
        if (count>=450&&count<=500) {
          translate[xAxis] -= (direction ? 0.010 : -0.1);
          translate[yAxis] -= (direction ? 0.010 : -0.1);
          gl.uniform3fv(translation, translate);
          document.getElementById('ctr').value = count; }
          //move from center to downwards 
          
        if (count>=520&&count<=580) {
          translate[xAxis] += (direction ? 0.008 : -0.1);
          translate[yAxis] += (direction ? 0.008 : -0.1);
          gl.uniform3fv(translation, translate);
          document.getElementById('ctr').value = count; }
          
        if (count>=580&&count<=640) {
          translate[xAxis] -= (direction ? 0.008 : -0.1);
          translate[yAxis] -= (direction ? 0.008 : -0.1);
          gl.uniform3fv(translation, translate);
          document.getElementById('ctr').value = count; }
          */
         
     /*translate[xAxis] -= (direction ? 0.080 : -0.1);
     // translate[yAxis] -= (direction ? 0.080 : -0.1);

      translate[xAxis] += (direction ? 0.080 : +0.1);
      translate[yAxis] += (direction ? 0.080 : 0.1);
      gl.uniform3fv(translation, translate);
      document.getElementById('ctr').value = count; }
      
    }*/
  }
   else {

    // Enable button
    buttonDisable = false;
    document.getElementById("subdivision").disabled = buttonDisable;
    document.getElementById("scale").disabled = buttonDisable;
    document.getElementById("speed").disabled = buttonDisable;
    document.getElementById("convertaqua").disabled = buttonDisable;
    document.getElementById("convertpurple").disabled = buttonDisable;
    document.getElementById("convertyellow").disabled = buttonDisable;
    document.getElementById("convertblue").disabled = buttonDisable;
    document.getElementById("convertgreen").disabled = buttonDisable;
    document.getElementById("convertred").disabled = buttonDisable;
    document.getElementById("axis-x").disabled = buttonDisable;
    document.getElementById("axis-y").disabled = buttonDisable;
    document.getElementById("axis-z").disabled = buttonDisable;
  }

  // Draw 3D gasket
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);

  // Speed
  setTimeout(
    function() {
      requestAnimFrame(render);
    },
    speed
  );
}
