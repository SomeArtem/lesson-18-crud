class planetRender{
    render(ctx, planet){
      ctx.beginPath();
      ctx.fillStyle=planet.atmosphere;
      ctx.arc(planet.position.x,planet.position.y,planet.size,0,Math.PI*2);
      ctx.fill();
      ctx.closePath();
    }
  }

  export {planetRender};