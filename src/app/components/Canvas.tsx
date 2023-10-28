"use client";
import { useEffect, useRef, useState } from "react";
import Color from "color";
import { useWindowSize } from "@uidotdev/usehooks";
import { randomBetween } from "../util/math";
import useAnimationFrame from "../hooks/useAnimationFrame";
import Image from "next/image";
import outline from "../../../public/outline1.png";
import { Box } from "@mui/joy";

// https://codepen.io/rlemon/pen/DdEjw

class Particle {
  oX = 0;
  x = 0;
  y = 0;
  size = 0;
  depth = 0;
  vy = 0;
  vx = 0.1;
  moveable = true;
  color = [255, 255, 255];

  create(width: number, height: number) {
    this.x = this.oX = Math.random() * width;
    this.y = Math.random() * height;
    this.depth = randomBetween(0.1, 10);
    this.size = (this.depth + 1) / 8;

    const slowVelocity = 0.35;
    const fastVelocity = 0.7;
    const ludicrousVelocity = 2;
    // 70% of stars don't move, 30% do move
    this.moveable = randomBetween(0, 100) > 70;
    // 80% of stars move slowly, 15% move fast, 5% move ludicrously fast

    const velocityP = randomBetween(0, 100);
    if (velocityP <= 80) {
      this.vy = slowVelocity;
    } else if (velocityP > 80 && velocityP <= 95) {
      this.vy = fastVelocity;
    } else {
      this.vy = ludicrousVelocity;
    }
  }

  update(width: number, height: number) {
    if (!this.moveable) {
      return;
    }
    if (this.y > height) {
      this.y = 1 - this.size;
      this.x = this.oX;
    }
    this.y += this.vy;
    this.x += this.vx;
  }
}

function Canvas({ pxPerStar = 9000 }: { pxPerStar?: number }) {
  const [{ particles }, setState] = useState<{
    particles: Particle[];
  }>({
    particles: [],
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outlineRef = useRef<HTMLImageElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (width && height && particles.length === 0) {
      const nextParticles: Particle[] = [];
      const count = Math.floor((width * height) / pxPerStar);
      for (let i = 0; i < count; i++) {
        const particle = new Particle();
        particle.create(width, height);
        nextParticles.push(particle);
      }
      setState((state) => ({ ...state, particles: nextParticles }));
    }
  }, [width, height, particles.length, pxPerStar]);

  useAnimationFrame(() => {
    const currentWidth = width || 0;
    const currentHeight = height || 0;
    if (canvasRef.current && width && height) {
      const context = canvasRef.current.getContext("2d");

      // draw base gradient
      let gradient = context!.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgb(4,0,25)");
      gradient.addColorStop(1, "rgb(1,42,123)");
      context!.fillStyle = gradient;
      context!.fillRect(0, 0, width, height);

      //draw outline
      if (outlineRef.current) {
        const ratio = outlineRef.current.width / outlineRef.current.height;
        const imageHeight = height * 0.8;
        const imageWidth = imageHeight * ratio;
        context!.globalAlpha = 1;
        context!.drawImage(
          outlineRef.current,
          -100,
          height - imageHeight,
          imageWidth,
          imageHeight
        );
      }

      // draw vertical slide gradient
      context!.globalAlpha = 0.8;
      gradient = context!.createLinearGradient(
        width * 0.5 + 500,
        -200,
        width * 0.5 - 700,
        0
      );
      gradient.addColorStop(0.5, "rgb(160,7,198)");
      gradient.addColorStop(0.53, "rgb(160,7,198)");
      gradient.addColorStop(0.47, "rgb(160,7,198)");
      gradient.addColorStop(0.1, "rgba(155,1,157,0");
      gradient.addColorStop(0.9, "rgba(155,1,157,0");
      context!.fillStyle = gradient;
      context!.fillRect(0, 0, width, height);

      // draw radial bottom gradient
      gradient = context!.createRadialGradient(
        width / 2 + 30,
        height + 250,
        1,
        width / 2 + 30,
        height + 50,
        width * 0.9
      );
      gradient.addColorStop(0, "rgba(10,128,121,50)");
      gradient.addColorStop(1, "rgba(10,128,121,0)");
      context!.fillStyle = gradient;
      context!.globalAlpha = 0.5;
      context!.fillRect(0, 0, width, height);

      // update stars
      const imageData = context!.getImageData(
        0,
        0,
        currentWidth,
        currentHeight
      );
      for (let i = 0, l = particles.length; i < l; i++) {
        const particle = particles[i];
        for (let w = 0; w < particle.size; w++) {
          for (let h = 0; h < particle.size; h++) {
            const pData =
              (~~(particle.x + w) + ~~(particle.y + h) * currentWidth) * 4;
            const currentPixel = Color([
              imageData.data[pData],
              imageData.data[pData + 1],
              imageData.data[pData + 2],
            ]);
            const nextPixel = currentPixel.lighten(0.6);
            imageData.data[pData] = nextPixel.red();
            imageData.data[pData + 1] = nextPixel.green();
            imageData.data[pData + 2] = nextPixel.blue();
          }
        }
        particle.update(currentWidth, currentHeight);
      }

      context!.putImageData(imageData, 0, 0);
    }
  });

  return (
    <Box zIndex={1} position="fixed" top={0} left={0}>
      <canvas ref={canvasRef} width={String(width)} height={String(height)} />
      <Image
        ref={outlineRef}
        src={outline}
        alt=""
        style={{ visibility: "hidden" }}
      />
    </Box>
  );
}

export default Canvas;
