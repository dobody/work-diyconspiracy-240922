let sqPerLine = 200;
let img;

let avgRed = 0;
let avgGreen = 0;
let avgBlue = 0;

function preload() {
    img = loadImage('DIYCONSPIRACY.png');
}

function setup(){
  createCanvas(img.width, img.height);
  // pixelDensity(1);
  background(50);
  strokeWeight(0.2);
  
  // Resize the image to fit the canvas
  // img.resize(width, height);
  
  img.loadPixels();
}


function draw(){
  
  // sqPerLine = int(map(mouseX,0,width,100,1));
  sqPerLine = 200;
  //sqPerLine = 60+int(sin(t/10)*30);
  
  for( let ypos = 0; ypos<height; ypos+=width/(sqPerLine+1) ){ //ypos += previous line's height
    
    let cellsize = width/sqPerLine;
    
    for(let xpos = 0; xpos<width; xpos+=cellsize){
         
      avgRed = 0;
      avgGreen = 0; 
      avgBlue = 0;
      
      // Loop through the pixels X and Y of the cell 
      for (let y = ypos; y < ypos+(cellsize); y++) {
        for (let x = xpos; x < xpos+(cellsize); x++) {
          
          

          // Calculate the pixel index
          let index = ( int(y) * img.width + int(x) ) * 4; // <-- index has to be an int, see below
          
        //
        //  =========   DEBUG PART TO SEE IF IT FUNCTIONS =========
        //  Comment out to remove
        //  
        // 3 NEXT LINES: FILL DEPENDING ON X AND Y IN EACH CELL TO SEE IF CODE PARSES EVERY CELL
          // fill(map(x, xpos, xpos+cellsize, 0, 255), map(y, ypos, ypos+cellsize, 0, 255), 255, 100);
          // noStroke();
          // square(x,y,1);
          
        // THIS LINE SHOWS BEGINNING PIXEL'S INDEX FOR EACH CELL - FOR DEBUG
        // if the number isn't rounded to an integer, it gets messed up because an index is a round nbr
          // if (x == xpos && y == ypos){fill(255);text(index,x,y,20);}
          
        //
        // ==========  END OF DEBUG  =========
        //
          
          
          if(index < img.pixels.length){ //If the analyzed pixel exists in the image, ie is somewhere in the array
            // Sum the red, green, and blue values
            avgRed += img.pixels[index + 0];
            avgGreen += img.pixels[index + 1];
            avgBlue += img.pixels[index + 2];
          }
        }
      }
      
      // console.log("avgColor:",int(avgRed), int(avgGreen), int(avgBlue));
      
      let numPixels = int(cellsize ** 2); //number of pixels inside the cell
      // console.log("Nr of pixels in cell:",numPixels);
      
      // divide the totals by the number of pixels to find the average.
      avgRed /= numPixels;
      avgGreen /= numPixels;
      avgBlue /= numPixels;
      
      if ((avgRed+avgGreen+avgBlue)/3 <=124){ //IF AVERAGE COLOR IS DARKER MAKE BLACK
        fill(0);
      } else {
        fill(255);
      }
      
      
      // Set the fill color to the average color of the pixels
      // fill(avgRed, avgGreen, avgBlue);
      // Draw the square
      square(xpos, ypos, cellsize);
    }
    sqPerLine -= 1; //eliminates squares for the next line
  }
  noLoop();
}
