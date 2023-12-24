const environment = {
    font: null,
    canvas: null,
    points: [],
    vehicles: [[], [], []],
    sliders: [],
    xoff: 0,
    preload() {
      this.font = loadFont('assets/font2.otf');
    },
    setup() {
        var canvas = createCanvas(canvasWidth, canvasHeight);
        canvas.parent("canvas_div");

        bbox_1 = font.textBounds('Welcome', 0, 0, 164);
        bbox_2 = font.textBounds('to my', 0, 0, 164);
        bbox_3 = font.textBounds('Website', 0, 0, 164);

        
        
        this.createVehicles();
    },
    draw() {
      // previous draw logic here...
      this.updateVehicles();
    },
    createVehicles() {
      // loop through this.points array and push new Vehicles to this.vehicles
    },
    updateVehicles() {
      // loop through this.vehicles and call .behaviours(), .update(), and .show()
    },
    // Sets the canvas size based on the window size
    adjustCanvasSize() {
        const totalHeight = window.innerHeight;
        const totalWidth = window.innerWidth;
    
        const navBarHeight = document.getElementById('navBar').clientHeight;
        const detailBarHeight = document.getElementById('detailBar').clientHeight;
    
        canvasHeight = totalHeight - navBarHeight - detailBarHeight;
        canvasWidth = totalWidth;
  }
  };
  