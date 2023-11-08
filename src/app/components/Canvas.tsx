"use client";
import { useEffect, useRef, useState } from "react";
import Color from "color";
import { randomBetween } from "../util/math";
import useAnimationFrame from "../hooks/useAnimationFrame";
import { Box, useColorScheme } from "@mui/joy";
import useScrollPercentage from "../hooks/useScrollPercentage";
import { useWindowSize } from "@uidotdev/usehooks";
import useDocumentSize from "../hooks/useDocumentSize";

// https://codepen.io/rlemon/pen/DdEjw

class Particle {
  oX = 0;
  oY = 0;
  x = 0;
  y = 0;
  size = 0;
  depth = 0;
  vy = 0;
  vx = 0.1;
  brightness = 1;
  trail = 1;
  trailSize = 20;
  moveable = true;
  drawn = false;

  maxHeight = 0;
  maxWidth = 0;

  create(
    width = this.maxWidth,
    height = this.maxHeight,
    minY = 0,
    minX = 0,
    moveable?: boolean
  ) {
    this.maxHeight = height;
    this.maxWidth = width;
    this.x = this.oX = Math.random() * (width - minX) + minX;
    this.y = this.oY = Math.random() * (height - minY) + minY;
    this.depth = randomBetween(0.1, 10);
    this.size = (this.depth + 1) / 8;

    const lowBrightness = randomBetween(2, 4) / 10;
    const highBrightness = randomBetween(7, 8) / 10;
    const maxBrightness = randomBetween(9.3, 10) / 10;
    const brightnessP = randomBetween(0, 100);
    // 20% of stars are low brightness, 70% high brightness, 10% max brightness
    if (brightnessP <= 20) {
      this.brightness = lowBrightness;
    } else if (brightnessP > 20 && brightnessP < 90) {
      this.brightness = highBrightness;
    } else {
      this.brightness = maxBrightness;
    }

    const shortTrail = randomBetween(8, 12);
    const longTrail = randomBetween(18, 22);
    const trailP = randomBetween(0, 100);
    // 90% of stars have a short trail, 10% long
    if (trailP < 90) {
      this.trailSize = shortTrail;
    } else {
      this.trailSize = longTrail;
    }

    const slowVelocity = randomBetween(3, 4) / 10;
    const fastVelocity = randomBetween(7, 8) / 10;
    const ludicrousVelocity = randomBetween(18, 21) / 10;
    // 95% of stars don't move, 5% do move
    this.moveable =
      typeof moveable === "boolean" ? moveable : randomBetween(0, 100) > 95;

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
    if (!this.drawn) {
      this.drawn = true;
    }
    if (!this.moveable) {
      return;
    }
    if (this.y > height) {
      this.y = 1 - this.size;
    }
    if (this.x > width) {
      this.x = 1 - this.size;
    }
    this.y += this.vy;
    this.x += this.vx;
  }

  get virtualX() {
    return this.x % this.maxWidth;
  }

  get virtualY() {
    return this.y % this.maxHeight;
  }
}

function Canvas({ pxPerStar = 8000 }: { pxPerStar?: number }) {
  const [{ particles, loading, lastDocHeight }, setState] = useState<{
    particles: Particle[];
    loading: boolean;
    lastDocHeight: number;
  }>({
    particles: [],
    loading: true,
    lastDocHeight: 0,
  });
  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();
  const [progress] = useScrollPercentage();
  const { height: docHeight } = useDocumentSize();
  const { mode } = useColorScheme();

  // spawn particles
  useEffect(() => {
    if (width && docHeight) {
      const isLonger = docHeight > lastDocHeight;
      const isShorter = docHeight < lastDocHeight;

      if (!isLonger && !isShorter) {
        return;
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].maxHeight = docHeight;
      }

      const nextParticles: Particle[] = [...particles];
      if (isLonger) {
        const count = Math.floor(
          (width * (docHeight - lastDocHeight)) / pxPerStar
        );

        for (let i = 0; i < count; i++) {
          const particle = new Particle();
          particle.create(width, docHeight, lastDocHeight);
          nextParticles.push(particle);
        }
      } else if (isShorter) {
        for (let i = 0; i < nextParticles.length; i++) {
          const particle = nextParticles[i];
          if (particle.y > docHeight) {
            nextParticles.splice(i, 1);
          }
        }
      }

      setState((state) => ({
        ...state,
        particles: nextParticles,
        lastDocHeight: docHeight,
      }));
    }
  }, [width, docHeight]);

  // render frame
  useAnimationFrame(() => {
    if (!backgroundRef.current || !starsRef.current) {
      return;
    }

    const background = backgroundRef.current!.getContext("2d", {
      willReadFrequently: true,
    });
    const stars = starsRef.current!.getContext("2d", {
      willReadFrequently: true,
    });

    renderBackground(background!);
    renderStars(background!, stars!);

    if (loading) {
      setState((state) => ({ ...state, loading: false }));
    }
  });

  const renderStars = (
    background: CanvasRenderingContext2D,
    stars: CanvasRenderingContext2D
  ) => {
    const currentWidth = width || 0;
    const currentHeight = height || 0;
    const top = (docHeight - currentHeight) * (progress / 100);
    // console.time("copy background data");
    const backgroundData = background!.getImageData(
      0,
      0,
      currentWidth,
      currentHeight
    );
    // console.timeEnd("copy background data");
    stars.clearRect(0, 0, currentWidth, currentHeight);
    const starsData = new ImageData(currentWidth, currentHeight);

    // console.time("draw stars");
    for (let i = 0, l = particles.length; i < l; i++) {
      const particle = particles[i];
      particle.update(currentWidth, docHeight);

      if (
        particle.y > currentHeight + top ||
        particle.y + particle.size < top
      ) {
        continue;
      }

      // paint trail
      if (particle.moveable && mode === "dark") {
        for (let h = 0; h < particle.trailSize; h++) {
          const dX = particle.x - particle.vx * h;
          const dY = particle.y - particle.vy * h - top;
          const pixelIndex = (~~dX + ~~dY * currentWidth) * 4;
          const currentPixel = Color([
            backgroundData.data[pixelIndex],
            backgroundData.data[pixelIndex + 1],
            backgroundData.data[pixelIndex + 2],
          ]);
          const nextPixel = currentPixel.lighten(particle.trail * 0.3);
          starsData.data[pixelIndex] = nextPixel.red();
          starsData.data[pixelIndex + 1] = nextPixel.green();
          starsData.data[pixelIndex + 2] = nextPixel.blue();
          starsData.data[pixelIndex + 3] = backgroundData.data[pixelIndex + 3];
        }
      }

      // determine pixel color
      let isPink = false;
      if (mode === "dark") {
        for (let w = 0; w < particle.size; w++) {
          for (let h = 0; h < particle.size; h++) {
            const pixelIndex =
              (~~(particle.x + w) + ~~(particle.y - top + h) * currentWidth) *
              4;
            const currentPixel = Color([
              backgroundData.data[pixelIndex],
              backgroundData.data[pixelIndex + 1],
              backgroundData.data[pixelIndex + 2],
            ]);
            isPink = currentPixel.hue() > 220 && currentPixel.hue() < 340;
            if (isPink) {
              break;
            }
          }
          if (isPink) {
            break;
          }
        }
      }

      // paint current star
      // if it's pink, leave it colored, otherwise desaturate it
      for (let w = 0; w < particle.size; w++) {
        for (let h = 0; h < particle.size; h++) {
          const pixelIndex =
            (~~(particle.x + w) + ~~(particle.y - top + h) * currentWidth) * 4;

          if (mode === "dark") {
            const currentPixel = Color([
              backgroundData.data[pixelIndex],
              backgroundData.data[pixelIndex + 1],
              backgroundData.data[pixelIndex + 2],
            ]);
            const nextPixel = isPink
              ? currentPixel.lighten(1.2)
              : currentPixel.lighten(7);
            // starsData.data[pixelIndex] = 255;
            // starsData.data[pixelIndex + 1] = 0;
            // starsData.data[pixelIndex + 2] = 0;
            starsData.data[pixelIndex] = nextPixel.red();
            starsData.data[pixelIndex + 1] = nextPixel.green();
            starsData.data[pixelIndex + 2] = nextPixel.blue();
            starsData.data[pixelIndex + 3] = particle.brightness * 255;
          } else {
            starsData.data[pixelIndex] = 0;
            starsData.data[pixelIndex + 1] = 0;
            starsData.data[pixelIndex + 2] = 0;
            starsData.data[pixelIndex + 3] = particle.brightness * 255;
          }
        }
      }
    }
    // console.timeEnd("draw stars");
    // console.time("put star data");
    stars!.putImageData(starsData, 0, 0);
    // console.timeEnd("put star data");
  };

  const renderBackground = (canvas: CanvasRenderingContext2D) => {
    const currentHeight = height || 0;
    const currentWidth = width || 0;
    const top = (docHeight - currentHeight) * (progress / 100);
    canvas!.globalAlpha = 1;
    canvas?.clearRect(0, 0, currentWidth, currentHeight);

    if (mode === "dark") {
      // draw base gradient
      let gradient = canvas!.createLinearGradient(0, -top, 0, docHeight);
      gradient.addColorStop(0, "rgb(4,0,25)");
      gradient.addColorStop(1, "rgb(1,42,123)");
      canvas!.fillStyle = gradient;
      canvas!.fillRect(0, 0, currentWidth, currentHeight);

      // draw vertical slide gradient
      canvas!.globalAlpha = 0.7;
      gradient = canvas!.createLinearGradient(
        Math.floor(currentWidth * 0.55 + 500),
        -200 - top,
        Math.floor(currentWidth * 0.5 - 700),
        -top
      );
      gradient.addColorStop(0.5, "rgb(160,7,198)");
      // gradient.addColorStop(0.53, "rgb(160,7,198)");
      // gradient.addColorStop(0.47, "rgb(160,7,198)");
      gradient.addColorStop(0, "rgba(155,1,157,0");
      gradient.addColorStop(1, "rgba(155,1,157,0");
      canvas!.fillStyle = gradient;
      canvas!.fillRect(0, 0, currentWidth, currentHeight);

      // draw radial bottom gradient
      canvas!.globalAlpha = 0.35;
      gradient = canvas!.createRadialGradient(
        Math.floor(currentWidth / 2 + 30),
        Math.floor(docHeight * 0.9) - top,
        0.1,
        Math.floor(currentWidth / 2 + 30),
        Math.floor(docHeight * 0.3) - top,
        Math.floor(docHeight * 0.8)
      );
      gradient.addColorStop(0, "rgba(10,128,121,50)");
      gradient.addColorStop(1, "rgba(10,128,121,0)");
      canvas!.fillStyle = gradient;
      canvas!.fillRect(0, 0, currentWidth, currentHeight);
    } else {
      const gradient = canvas!.createLinearGradient(0, 0, 0, docHeight);
      gradient.addColorStop(0, "rgb(239, 239, 239)");
      canvas!.fillStyle = gradient;
      canvas!.fillRect(0, 0, currentWidth, currentHeight);
    }

    canvas!.globalAlpha = 1;
  };

  return (
    <Box
      sx={{
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0,
        transition: "opacity 0.2s",
        ...(!loading && { opacity: 1 }),
      }}
    >
      <canvas
        id="background"
        ref={backgroundRef}
        width={String(width)}
        height={String(height)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <canvas
        id="stars"
        ref={starsRef}
        width={String(width)}
        height={String(height)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      />
    </Box>
  );
}

export default Canvas;
