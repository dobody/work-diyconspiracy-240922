let ypos = 0;
let sqPerLine = 200;
let t = 0;
let img;

function pixelValue(img, x,y) {
    let i = 4 * (x + (y * img.width));
    let pix = img.pixels;
    let r = pix[i];
    let g = pix[i + 1];
    let b = pix[i + 2];
    let a = pix[i + 3];
    let avg = (r + g + b + a) / 4;
    return avg;
}

function isBlack(img, x, y){
  
  let i = 4 * (x + (y * img.width));
  let pix = img.pixels;
  let r = pix[i];
  let g = pix[i + 1];
  let b = pix[i + 2];
  let a = pix[i + 3];
  let avg = (r + g + b + a) / 4;
  return (avg < 125);
}

function preload() {
    img = loadImage('banner.png');
}

function setup(){
  createCanvas(img.width,img.height);
  pixelDensity(1);
  background(200);
  strokeWeight(0.3);
  //noStroke();
  noFill();
  colorMode(HSB, 100);
}

function draw(){
  background(200);
  ypos = 0;
  img.loadPixels();
  sqPerLine = 65;
  //sqPerLine = 60+int(sin(t/10)*30);
  for(ypos; ypos<height; ypos+=width/(sqPerLine-1)){
    for(let xpos = 0; xpos<width; xpos+=width/sqPerLine){
      if(isBlack(img,int(xpos),int(ypos))){
        fill(0);
      }else{
        fill(map(ypos,0,height,30,70),50,100); //play with hue
      }
        square(xpos, ypos, width/sqPerLine);
      
      
    }
    sqPerLine += 1;
  }
  t++;
  noLoop();
}