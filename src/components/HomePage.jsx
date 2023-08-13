import "./HomePage.css"
import React, { useEffect } from "react";
import nerfImage from "../assets/nerfgun.png";
import dartImage from "../assets/dart.png";
import bellImage from "../assets/bell.png"; // Import your bell image

export default function HomePage(props){
  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");

      //fixes blurry canvas. 1) makes canvas larger and have more pixels. 2) scale everything down w css
      let rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      
      
      const bell = new Image();
      bell.src = bellImage;
      const dart = new Image();
      dart.src = dartImage;
      const nerfgun = new Image();
      nerfgun.src = nerfImage;
      nerfgun.onload = function(){
        ctx.rotate(0*Math.PI/180);
        ctx.drawImage(nerfgun, nerfgunX - 20, nerfgunY - 20, scaledWidth, scaledHeight);
      };
      const nerfgunX = canvas.width / 5;
      const nerfgunY = canvas.height / 5;
      const scaleFactor = 0.05;
      const scaledWidth = nerfgun.width * scaleFactor;
      const scaledHeight = nerfgun.height * scaleFactor;

      let dartX = null;
      let dartY = null;
      let dartSpeed = 5;
      let isDartFlying = false;
      let angle = 0;
      let dart_angle = 0;

      let bellX = 0;
      let bellY = 0;

      canvas.addEventListener("mousemove", (event) => {
        const canvasRect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - canvasRect.left;
        const mouseY = event.clientY - canvasRect.top;

        // Calculate the angle based on mouse position
        const deltaX = mouseX - nerfgunX;
        const deltaY = mouseY - nerfgunY;
        angle = Math.atan2(deltaY, deltaX); // Update the angle variable

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bell, bellX, bellY, 30, 30);

        // Draw the image with rotation and scaled dimensions
        ctx.save();
        ctx.translate(nerfgunX, nerfgunY);
        ctx.rotate(angle);

        // Draw nerfgun
        ctx.drawImage(nerfgun, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
        ctx.restore();
        ctx.save();
      });

      canvas.addEventListener("click", () => {
        if (!isDartFlying) {
          dartX = nerfgunX;
          dartY = nerfgunY;
          isDartFlying = true;
          dart_angle = angle;
          requestAnimationFrame(drawDart);
        }
      });

      function drawDart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bell, bellX, bellY, 30, 30);
        if (isDartFlying) {
          ctx.drawImage(dart, dartX, dartY, 20, 20);
          dartX += Math.cos(dart_angle) * dartSpeed;
          dartY += Math.sin(dart_angle) * dartSpeed;
          if (Math.abs(bellX - dartX) < 30 && Math.abs(bellY - dartY) < 30) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isDartFlying = false;
            dartX = 1000000;
            dartY = 1000000;
            resetBell();
          }
          else if (dartX < canvas.width / 2 && dartX > 0 && dartY < canvas.height / 2 && dartY > 0) {
            requestAnimationFrame(drawDart);
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bell, bellX, bellY, 30, 30);
            isDartFlying = false;
          }
        }
        ctx.save();
        ctx.translate(nerfgunX, nerfgunY);
        ctx.rotate(angle);
        ctx.drawImage(nerfgun, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
        ctx.restore();
      }

      function resetBell() {
        bellX = Math.random() * canvas.width / 3;
        bellY = Math.random() * canvas.height / 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bell, bellX, bellY, 30, 30);
      }
    }
  }, []);

  return(
    <div>
    <div className='headerText'>
      <h1 className="display-1">Senior Assassins</h1>
      <h2>Prizes:</h2>
      <h3>Last Man Alive: $250</h3>
      <h3>Most Kills: $250</h3>
    </div>
      <canvas id="myCanvas" className="gameCanvas"></canvas>
    </div>
  )
}