
let x,y; 
let err=0;
let err_LHX=err_LHY=2,PosX=0,PosY=0;    //err_LH-X\Y-> 2:entry, 1:loophole_err, 0:no_err  
let count=0;
let drawing_started=false; 
var arrR=[];
let centreX,centreY;
let reducer = (accumulator,currentvalue ) => accumulator + currentvalue;


let Comfortaa,Comfortaa_R;
let col_T,pos_T;

function preload() {
  Comfortaa_R =loadFont('assets/Comfortaa-Regular.ttf');
  Comfortaa =loadFont('assets/Comfortaa-Bold.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
   canvas.mouseMoved(text_animation);
  
   background(0);
  stroke(266)
  strokeWeight(7);
  line(0,0,1450,windowHeight);
 
  rect(centreX=windowWidth/3.3,centreY=windowHeight/8,600,600);
  centreX+=300;
  centreY+=300;
  rectMode(CENTER);
  
  stroke(220,83,0);
  point(centreX,centreY);
  
 
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(end);
  
}

function end()
{if(err!=1 && err_LHX!=1 && err_LHY!=1)
 {
  let mean=0;
  var mean_S=0;
  let SD=0,RSD=0,ACC=0;

  
  mean= (arrR.reduce(reducer,0))/count;
  //console.log(mean);
  for(var i=0;i<count;++i)
   {mean_S+=pow(arrR[i]-mean,2);}
   SD = sqrt ( mean_S/ (count-1) );
 
  // console.log(SD);


   RSD=(100*SD)/mean;

   ACC=100-RSD;
   console.log(ACC);
   
   noFill();
   stroke(122,120,120,80);
   strokeWeight(3);
   circle(centreX,centreY,2*mean);
   noStroke();
   fill(255); 
   textSize(70);
   text('Accuracy:',1120,140);

    textFont(Comfortaa_R);
    noStroke(); 
    textSize(60);
    text(ACC.toPrecision(4)+' %',1122,210);
  
    noLoop();
    return;
  }
  else if(err!=1 && (err_LHX==1||err_LHY==1))
   {let ACC=0
    noStroke();
    fill(255); 
    textSize(70);
    text('Accuracy:',1120,140);
 
    textFont(Comfortaa_R);
    noStroke(); 
    textSize(60);
    text(ACC.toPrecision(4)+' %',1120,210);   
    noLoop();
    return;
 }
 else if(err==1)
 {textFont(Comfortaa);
  stroke(236,92,92);
  strokeWeight(1);
  fill(236,92,92); 
  textSize(64);
  text('OUT OF               BOUNDS!!!',1295,180,400,200);
  noLoop();
  return; 
 }

}

function text_animation()
 {fill(0);
  noStroke();
  rect(200,500,500,300);
  let t=p=mouseX;
  col_T=map(t,0,windowWidth,255,180);
  pos_T=map(p,0,windowWidth,880,900);
  textFont(Comfortaa);
  noStroke(); 
  fill(col_T); 
  textSize(40);
  text('Draw a circle           around the dot to    test your accuracy:',230,pos_T,400, 800);

}

function startDrawing(){
  drawing_started=true; 
  x = mouseX;
  y = mouseY;
  
}

function draw() {
 if(drawing_started){
    
    arrR.push( Math.sqrt ( Math.pow ( x - centreX ,2 ) + Math.pow ( y - centreY ,2) ));
    count++;
    //console.log(arrR[count-1]);
    stroke(0);
    strokeWeight(4);
    
    //to check within the boundary limits
    if ( x < windowWidth/3.3 || x > (centreX+300) || y < windowHeight/8 || y > (centreY+300) )
     {err=1;
       noLoop();
       return;}
    //-----------------------LOOP-HOLES
    if (err_LHX==2)
    {if( x > centreX)
      PosX=1;          //positive relative to centre
     else if (x < centreX)
      PosX=0;
     else
      {err_LHX=err_LHY=1;   //starting at centre
       noLoop();
       return;  
      }
      
      if( y > centreY)
      PosY=0;           //negative relative to centre
     else if (y < centreY)
      PosY=1;           
     else
      {err_LHX=err_LHY=1;   //starting at centre
       noLoop();
       return;  
      }
     err_LHX=err_LHY=1;
    }  

    if(err_LHX==1||err_LHY==1)
    {if(PosX==1)
      {if(x<centreX)
        {err_LHX=0;}}
     else if(PosX==0)
      if(x>centreX)
        {err_LHX=0;}
     
     if (PosY==1)
       {if(y>centreY)
        {err_LHY=0;}}
     else if(PosY==0)
      if(y<centreY)
        {err_LHY=0;}       
    }
    //-------------------------------CANT IGNORE THE LOOP HOLES

    let strokePath = {
    dx:mouseX-pmouseX,
    dy:mouseY-pmouseY,
    }   
    line(x,y,x + strokePath.dx,y + strokePath.dy);
    x += strokePath.dx;
    y += strokePath.dy;

 }
}