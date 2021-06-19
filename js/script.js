function initCanvas(){
    var ctx = document.getElementById('canvas').getContext('2d');
    var imagenFondo = new Image();
    var imagenNaves   = new Image(); 
    var enemigoEsp1  = new Image(); 
    var enemigoEsp2 = new Image(); 


    imagenFondo.src = "imagenes/fondo1.jpg"; 
    imagenNaves.src       = "imagenes/nav.png"; 
 
    enemigoEsp1.src     = "imagenes/esp3.png";
    enemigoEsp2.src     = "imagenes/esp1.png"; 
    
    
    var cW = ctx.canvas.width; 
    var cH = ctx.canvas.height;

 // plantilla para las naves

    var enemigoTemplate = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemigoEsp1
        }
    }

// forma de crear enemigos.
    var enemies = [
                   new enemigoTemplate({id: "Enemigo 1", x: 100, y: -20, w: 50, h: 30 }),
                   new enemigoTemplate({id: "Enemigo 2", x: 225, y: -20, w: 50, h: 30 }),
                   new enemigoTemplate({id: "Enemigo 3", x: 350, y: -20, w: 80, h: 30 }),
                   new enemigoTemplate({id: "Enemigo 4", x:100,  y:-70,  w:80,  h: 30}),
                   new enemigoTemplate({id: "Enemigo 5", x:225,  y:-70,  w:50,  h: 30}),
                   new enemigoTemplate({id: "Enemigo 6", x:350,  y:-70,  w:50,  h: 30}),
                   new enemigoTemplate({id: "Enemigo 7", x:475,  y:-70,  w:50,  h: 30}),
                   new enemigoTemplate({id: "Enemigo 8", x:600,  y:-70,  w:80,  h: 30}),
                   new enemigoTemplate({id: "Enemigo 9", x:475,  y:-20,  w:50,  h: 30}),
                   new enemigoTemplate({id: "Enemigo 10",x: 600, y: -20, w: 50, h: 30}),

                 
                   new enemigoTemplate({ id: "Enemigo 11", x: 100, y: -220, w: 50, h: 30, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 12", x: 225, y: -220, w: 50, h: 30, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 13", x: 350, y: -220, w: 80, h: 50, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 14", x: 100, y: -270, w: 80, h: 50, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 15", x: 225, y: -270, w: 50, h: 30, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 16", x: 350, y: -270, w: 50, h: 30, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 17", x: 475, y: -270, w: 50, h: 30, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 18", x: 600, y: -270, w: 80, h: 50, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 19", x: 475, y: -200, w: 50, h: 30, image: enemigoEsp2 }),
                   new enemigoTemplate({ id: "Enemigo 20", x: 600, y: -200, w: 50, h: 30, image: enemigoEsp2 })
                  ];

// permite renderizar más enemigos 

    var renderEnemies = function (enemigoList) {
        for (var i = 0; i < enemigoList.length; i++) {
            console.log(enemigoList[i]);
            ctx.drawImage(enemigoList[i].image, enemigoList[i].x, enemigoList[i].y += .5, enemigoList[i].w, enemigoList[i].h);
            
// Detecta cuando los barcos alcanzan un nivel inferior
            lanzacoete.hitDetectLowerLevel(enemigoList[i]);
        }
    }

    class Lanzacoetes {
        // ubicación de balas
        constructor() {

            this.y = 500,
                this.x = cW * .5 - 25,
                this.w = 100,
                this.h = 100,
                this.direccion,
                this.bg = "yellow",
                this.misiles = [];

            this.gameStatus = {
                over: false,
                message: "",
                fillStyle: 'white',
                font: 'bold 25px Arial, sans-serif',
            };

            this.render = function () {
                if (this.direccion === 'izquierda') {
                    this.x -= 5;
                } else if (this.direccion === 'derecha') {
                    this.x += 5;
                } else if (this.direccion === "downArrow") {
                    this.y += 5;
                } else if (this.direccion === "upArrow") {
                    this.y -= 5;
                }
                ctx.fillStyle = this.bg;
                ctx.drawImage(imagenFondo, 10, 10);
                ctx.drawImage(imagenNaves, this.x, this.y, 100, 90);

                for (var i = 0; i < this.misiles.length; i++) {
                    var m = this.misiles[i];
                    ctx.fillRect(m.x, m.y -= 5, m.w, m.h);
                    this.hitDetect(this.misiles[i], i);
                    if (m.y <= 0) {
                        this.misiles.splice(i, 1);
                    }
                }
            // cuando el jugador gana
                if (enemies.length === 0) {
                    clearInterval(animarInterval);
                    ctx.fillStyle = 'yellow';
                    ctx.font = this.gameStatus.font;
                    ctx.fillText('Destruiste a los Alienigenas', cW * .5 - 80, 50);
                }
            };
           // Detectar  el impacto de la bala
            this.hitDetect = function (m, mi) {
                console.log('especial');
                for (var i = 0; i < enemies.length; i++) {
                    var e = enemies[i];
                    if (m.x + m.w >= e.x &&
                        m.x <= e.x + e.w &&
                        m.y >= e.y &&
                        m.y <= e.y + e.h) {
                        this.misiles.splice(this.misiles[mi], 1);
                        enemies.splice(i, 1);
                        document.querySelector('.barra').innerHTML = "Destruido " + e.id + " ";
                    }
                }
            };

       // Pregunta a la nave del jugador si un enemigo ha pasado o ha golpeado la nave del jugador
            this.hitDetectLowerLevel = function (enemigo) {

                if (enemigo.y > 550) {
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'El enemigo ha pasado tu defenza!';
                }

                if (enemigo.id === 'enemigo3') {
                  
                    console.log(this.x);
                }

                if ((enemigo.y < this.y + 25 && enemigo.y > this.y - 25) &&
                    (enemigo.x < this.x + 45 && enemigo.x > this.x - 45)) {
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'Te Derrivaron!!';
                }

                if (this.gameStatus.over === true) {
                    clearInterval(animarInterval);
                    ctx.fillStyle = this.gameStatus.fillStyle;
                    ctx.font = this.gameStatus.font;

                    ctx.fillText(this.gameStatus.message, cW * .5 - 80, 50); 
                }
            };
        }
    }
    
    var lanzacoete = new Lanzacoetes();
    function animar(){
        ctx.clearRect(0, 0, cW, cH);
        lanzacoete.render();
        renderEnemies(enemies);
    }
    var animarInterval = setInterval(animar, 6);
    
    var izquierda_btn  = document.getElementById('izquierda_btn');
    var derecha_btn = document.getElementById('derecha_btn');
    var dispara_btn  = document.getElementById('dispara_btn'); 

   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) 
        {
         lanzacoete.direccion = 'izquierda';  
            if(lanzacoete.x < cW*.2-130){
                lanzacoete.x+=0;
                lanzacoete.direccion = '';
            }
       }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         lanzacoete.x+=0;
         lanzacoete.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39) 
        {
         lanzacoete.direccion = 'derecha';
         if(lanzacoete.x > cW-110){
            lanzacoete.x-=0;
            lanzacoete.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39)
        {
         lanzacoete.x-=0;   
         lanzacoete.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 38) 
         {
           lanzacoete.direccion = 'upArrow';  
           if(lanzacoete.y < cH*.2-80){
              lanzacoete.y += 0;
              lanzacoete.direccion = '';
            }
         }
    });

    document.addEventListener('keyup', function(event){
         if(event.keyCode == 38) 
         {
           lanzacoete.y -= 0;
           lanzacoete.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 40) 
         {
           lanzacoete.direccion = 'downArrow';  
          if(lanzacoete.y > cH - 110){
            lanzacoete.y -= 0;
            lanzacoete.direccion = '';
           }
         }
    });
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 40)
         {
           lanzacoete.y += 0;
           lanzacoete.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 80) 
         {
          location.reload();
         }
    });

   // contrl de botones
   
    izquierda_btn.addEventListener('mousedown', function(event) {
        lanzacoete.direccion = 'izquierda';
    });

    izquierda_btn.addEventListener('mouseup', function(event) {
        lanzacoete.direccion = '';
    });

    derecha_btn.addEventListener('mousedown', function(event) {
        lanzacoete.direccion = 'derecha';
    });

    derecha_btn.addEventListener('mouseup', function(event) {
        lanzacoete.direccion = '';
    });
    
    dispara_btn.addEventListener('mousedown', function(event) {
        lanzacoete.misiles.push({x: lanzacoete.x + lanzacoete.w*.5, y: lanzacoete.y, w: 3, h: 10});
    });
    
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           lanzacoete.misiles.push({x: lanzacoete.x + lanzacoete.w*.5, y: lanzacoete.y, w: 3,h: 10});
        }
    });
}

window.addEventListener('load', function(event) {
    initCanvas();
});
