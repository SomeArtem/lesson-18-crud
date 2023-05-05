import { planetRender } from "../src/renders";
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
    position;
    center;
    isMoving;
    planetRender;
    constructor(center,speed = 0.1,size, atmosphere='red',radius=50, planetRender){
      this.center=center;
      this.size=size;
      this.atmosphere=atmosphere;
      this.radius=radius;
      this.alpha=0;
      this.speed=speed;
      this.position=new Position(center.x,center.y);
      this.isMoving=speed!==0;
      this.planetRender=planetRender;
    }
    
  
    move(){
        if (this.isMoving) {
            this.position.x=this.radius*Math.sin(this.alpha) + this.center.x;
            this.position.y=this.radius*Math.cos(this.alpha) + this.center.y;
            this.alpha+=(this.speed*Math.PI)/180;            
        }
    }
  
    render(ctx){
      if (this.planetRender){
        this.planetRender.render(ctx, this);
      } else{
      // ctx.beginPath();
      // ctx.fillStyle=this.atmosphere;
      // ctx.arc(this.position.x,this.position.y,this.size,0,Math.PI*2);
      // ctx.fill();
      // ctx.closePath();
      }
    }
}

class Position{
    x;
    y;
    constructor(x,y){
      this.x=x;
      this.y=y;
    }
}

class Earth extends Planet{
  moon;
constructor(center){
  super(center, 0.7,20,'blue', 150,new planetRender());
  this.moon=new Planet(this.position,2.2,10,'blue', 100, new planetRender());
}
move(){
  super.move();
  this.moon.move();
}
render(ctx){
  super.render(ctx);
  ctx.beginPath();
  ctx.fillStyle='green';
  ctx.arc(this.position.x+4,this.position.y,15,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();
  this.moon.render(ctx);
}
}

export {Planet, Position, Earth};