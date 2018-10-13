let repeatslider;
let repeatval;
let tintslider;
let tintval;
let noiseslider;
let noiseval;
let blurslider;
let blurval;
let filterslider;
let filterval;
let f1;
let f2;
let white;
let bm;
let bm_index=0;
let ft;
let ft_index=0;

function preload(){
	f1 = loadImage("./f1.JPG")
  f2 = loadImage("./f2.JPG")
}

function setup() {
  bm = [BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN, ADD, NORMAL];
  ft = [THRESHOLD, GRAY, OPAQUE, INVERT, POSTERIZE, BLUR, ERODE, DILATE, BLUR];
  white = color(255);
  createCanvas(600, 800);
  
  frameRate(0);

  repeatslider = createSlider(1,20,2);
  repeatslider.style("width",`${width}px`);
  repeatslider.position(0,810);

  tintslider = createSlider(1,255,255);
  tintslider.style("width",`${width}px`);
  tintslider.position(0,830);

  noiseslider = createSlider(0,10,0);
  noiseslider.style("width",`${width}px`);
  noiseslider.position(0,850);

  blurslider = createSlider(1,10,0);
  blurslider.style("width",`${width}px`);
  blurslider.position(0,870);

  filterslider = createSlider(0,255,128);
  filterslider.style("width",`${width}px`);
  filterslider.position(0,890);

  repeatslider.changed(function(){
    drawflowers();
  });

  tintslider.changed(function(){
    drawflowers();
  });

  noiseslider.changed(function(){
    drawflowers();
  });

  blurslider.changed(function(){
    drawflowers();
  });

  filterslider.changed(function(){
    drawflowers();
  });

  for(let i=0;i<bm.length;i++){
    let btn = createButton(bm[i])
    btn.mousePressed(function(){
      bm_index = i;
      drawflowers();
    });
    btn.position(650, 50+20*i);    
  }

  for(let i=0;i<ft.length;i++){
    let btn = createButton(ft[i])
    btn.mousePressed(function(){
      ft_index = i;
      drawflowers();
    });
    btn.position(750, 50+20*i);    
  }



  drawflowers();
}

function drawflowers(){
  repeatval = repeatslider.value();
  tintval = tintslider.value();
  noiseval = noiseslider.value()/10.0;
  blurval = blurslider.value();
  filterval = filterslider.value();
  
  background(f2);
  for(let i=0;i<repeatval;i++){
    tint(tintval);
    blend(f1,0,0,width,height, width*i/repeatval,0,width,height, bm[bm_index]);
  }

  loadPixels();
  for(let i=0;i<pixels.length;i+=4){
    if(Math.random()<noiseval){
      pixels[i] = red(white);
      pixels[i + 1] = green(white);
      pixels[i + 2] = blue(white);
      pixels[i + 3] = alpha(white);
    }
  }
  updatePixels();

  for(let x=0;x<width;x+=blurval){
    for(let y=0;y<height;y+=blurval){
      for(let i=0;i<blurval;i++){
        for(let j=0;j<blurval;j++){
          set(x+i,y+j,get(x,y));  
        }  
      }
    }
  }
  updatePixels();

  if(ft[ft_index]=="threshold"){
    filter(ft[ft_index],filterval/255.0);  
  }else if(ft[ft_index]=="posterize"){
    let val = Math.floor(filterval/50)+2;
    filter(ft[ft_index],val);
  }else if(ft[ft_index]=="blur"){
    filter(ft[ft_index],filterval/10);    
  }else{
    filter(ft[ft_index]);    
  }
  
}
