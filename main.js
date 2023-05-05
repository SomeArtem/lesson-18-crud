import { Earth, Planet, Position } from "./src/solar-system";
import { planetRender } from "./src/renders";

const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;






const centerPosition=new Position(canvas.width/2,canvas.height/2);



const sun=new Planet(centerPosition,0,30,'yellow', 50, new planetRender());
const earth=new Earth(sun.position, new planetRender());
// const moon=new Planet(earth.position,2.2,10,'blue', 100);
const planets=[
  sun, 
  earth,
  new Planet(sun.position,0.4,35,'#000010', 150, new planetRender()),
  new Planet(sun.position,0.5,50,'#00ffff', 200, new planetRender()),
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