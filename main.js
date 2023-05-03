const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

class Planet{
  x;
  y;
  pX;
  pY;
  size;
  atmosphere;
  radius;
  constructor(x,y,size, atmosphere='red',radius=50){
    this.pX=x;
    this.pY=y;
    this.size=size;
    this.atmosphere=atmosphere;
    this.radius=radius;
  }

  render(ctx){
    ctx.beginPath();
    ctx.fillStyle=this.atmosphere;
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }
}


let SPEED_MULT=0.2;

let alpha=0;

const planets=[
  new Planet(200,200,30,'red', 50),
  new Planet(200,200,10,'blue', 100),
  new Planet(200,200,20,'green', 150),
  new Planet(200,200,50,'yellow', 200),
]


let planet;

const render = () => {
  ctx.clearRect(0,0,canvas.width, canvas.height); 
  // ctx.beginPath();

  for (const planetIndex in planets) {
    // console.log(planetIndex);    
    planet=planets[planetIndex];
    planet.x=planet.radius*Math.sin(alpha) + planet.pX;
    planet.y=planet.radius*Math.cos(alpha) + planet.pY;
    alpha+=(Math.PI*SPEED_MULT)/180;

    planet.render(ctx);





  }

  
  window.requestAnimationFrame(render);
  
};

window.requestAnimationFrame(render);


// ctx.fillStyle='#214';
// ctx.beginPath();
// ctx.arc(50,50,50,0,Math.PI*2,)
// ctx.fill();
// ctx.endPath();