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
  alpha;
  speed;
  constructor(x,y,speed = 0.1,size, atmosphere='red',radius=50){
    this.pX=x;
    this.pY=y;
    this.size=size;
    this.atmosphere=atmosphere;
    this.radius=radius;
    this.alpha=0;
    this.speed=speed;
  }
  

  move(){
    this.x=this.radius*Math.sin(this.alpha) + this.pX;
    this.y=this.radius*Math.cos(this.alpha) + this.pY;
    this.alpha+=(this.speed*Math.PI)/180;
  }

  render(ctx){
    ctx.beginPath();
    ctx.fillStyle=this.atmosphere;
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }
}


class Position{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}

const planets=[
  new Planet(200,200,0.1,30,'red', 50),
  new Planet(200,200,0.2,10,'blue', 100),
  new Planet(200,200,0.4,20,'green', 150),
  new Planet(200,200,0.5,50,'yellow', 200),
]


let planet;

const render = () => {
  ctx.clearRect(0,0,canvas.width, canvas.height); 

  for (const planetIndex in planets) {    
    planet=planets[planetIndex];
    planet.move();
    planet.render(ctx);
  }  
  window.requestAnimationFrame(render);  
};

window.requestAnimationFrame(render);