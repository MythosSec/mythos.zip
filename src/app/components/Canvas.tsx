"use client";
import { useEffect, useRef, useState } from "react";
import Color from "color";
import { randomBetween } from "../util/math";
import useAnimationFrame from "../hooks/useAnimationFrame";
import { Box } from "@mui/joy";
import ClientOnly from "./ClientOnly";
import useOnWindowSizeChange from "../hooks/useOnWindowSizeChange";
import { documentHeight } from "../util/dom";

// https://codepen.io/rlemon/pen/DdEjw

class Particle {
  oX = 0;
  x = 0;
  y = 0;
  size = 0;
  depth = 0;
  vy = 0;
  vx = 0.1;
  brightness = 1;
  moveable = true;
  drawn = false;

  create(width: number, height: number) {
    this.x = this.oX = Math.random() * width;
    this.y = Math.random() * height;
    this.depth = randomBetween(0.1, 10);
    this.size = (this.depth + 1) / 8;

    const lowBrightness = randomBetween(2, 4) / 10;
    const highBrightness = randomBetween(7, 8) / 10;
    const maxBrightness = randomBetween(9.3, 10) / 10;
    const brightnessP = randomBetween(0, 100);
    // 20% of stats are low brightness, 70% high brightness, 10% max brightness
    if (brightnessP <= 20) {
      this.brightness = lowBrightness;
    } else if (brightnessP > 20 && brightnessP < 90) {
      this.brightness = highBrightness;
    } else {
      this.brightness = maxBrightness;
    }

    const slowVelocity = randomBetween(3, 4) / 10;
    const fastVelocity = randomBetween(7, 8) / 10;
    const ludicrousVelocity = randomBetween(18, 21) / 10;
    // 70% of stars don't move, 10% do move
    this.moveable = randomBetween(0, 100) > 90;
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
      this.x = this.oX;
    }
    this.y += this.vy;
    this.x += this.vx;
  }
}

function Canvas({ pxPerStar = 5000 }: { pxPerStar?: number }) {
  const [{ particles, loading, backgroundImageData }, setState] = useState<{
    particles: Particle[];
    loading: boolean;
    backgroundImageData: ImageData | undefined;
  }>({
    particles: [],
    loading: true,
    backgroundImageData: undefined,
  });
  const starsRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const { width, height, didChange } = useOnWindowSizeChange();

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

  // update stars
  useAnimationFrame(() => {
    const currentWidth = width || 0;
    const currentHeight = height || 0;
    if (
      starsRef.current &&
      backgroundRef.current &&
      width &&
      height &&
      backgroundImageData
    ) {
      const stars = starsRef.current.getContext("2d");
      const starsImageData = stars!.getImageData(
        0,
        0,
        currentWidth,
        currentHeight
      );

      for (let i = 0, l = particles.length; i < l; i++) {
        const particle = particles[i];
        let px = particle.x,
          py = particle.y;
        particle.update(currentWidth, currentHeight);

        // paint trail
        if (particle.moveable) {
          for (let w = 0; w < particle.size; w++) {
            for (let h = 0; h < particle.size; h++) {
              const pixelIndex = (~~(px + w) + ~~(py + h) * currentWidth) * 4;
              const currentPixel = Color([
                backgroundImageData.data[pixelIndex],
                backgroundImageData.data[pixelIndex + 1],
                backgroundImageData.data[pixelIndex + 2],
              ]);
              if (h < 1 && w < 1) {
                const nextPixel = currentPixel.lighten(0.02);
                starsImageData.data[pixelIndex] = nextPixel.red();
                starsImageData.data[pixelIndex + 1] = nextPixel.green();
                starsImageData.data[pixelIndex + 2] = nextPixel.blue();
              } else {
                starsImageData.data[pixelIndex] = currentPixel.red();
                starsImageData.data[pixelIndex + 1] = currentPixel.green();
                starsImageData.data[pixelIndex + 2] = currentPixel.blue();
              }

              starsImageData.data[pixelIndex + 3] =
                backgroundImageData.data[pixelIndex + 3];
            }
          }
        }

        // determine pixel color
        let isPink = false;
        for (let w = 0; w < particle.size; w++) {
          for (let h = 0; h < particle.size; h++) {
            const pixelIndex =
              (~~(particle.x + w) + ~~(particle.y + h) * currentWidth) * 4;
            const currentPixel = Color([
              backgroundImageData.data[pixelIndex],
              backgroundImageData.data[pixelIndex + 1],
              backgroundImageData.data[pixelIndex + 2],
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

        // paint current star
        // if it's pink, leave it colored, otherwise desaturate it
        for (let w = 0; w < particle.size; w++) {
          for (let h = 0; h < particle.size; h++) {
            const pixelIndex =
              (~~(particle.x + w) + ~~(particle.y + h) * currentWidth) * 4;
            const currentPixel = Color([
              backgroundImageData.data[pixelIndex],
              backgroundImageData.data[pixelIndex + 1],
              backgroundImageData.data[pixelIndex + 2],
            ]);
            const nextPixel = isPink
              ? currentPixel.lighten(1.3)
              : currentPixel.lighten(10);
            starsImageData.data[pixelIndex] = nextPixel.red();
            starsImageData.data[pixelIndex + 1] = nextPixel.green();
            starsImageData.data[pixelIndex + 2] = nextPixel.blue();
            starsImageData.data[pixelIndex + 3] =
              255 - 255 * particle.brightness;
          }
        }
      }

      stars!.putImageData(starsImageData, 0, 0);
      if (loading) {
        setState((state) => ({ ...state, loading: false }));
      }
    }
  });

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (backgroundRef.current && width && height) {
        const background = backgroundRef.current.getContext("2d", {
          alpha: false,
        });

        // draw base gradient
        let gradient = background!.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "rgb(4,0,25)");
        gradient.addColorStop(1, "rgb(1,42,123)");
        background!.fillStyle = gradient;
        background!.fillRect(0, 0, width, height);

        // draw vertical slide gradient
        background!.globalAlpha = 0.8;
        gradient = background!.createLinearGradient(
          Math.floor(width * 0.5 + 500),
          -200,
          Math.floor(width * 0.5 - 700),
          0
        );
        gradient.addColorStop(0.5, "rgb(160,7,198)");
        gradient.addColorStop(0.53, "rgb(160,7,198)");
        gradient.addColorStop(0.47, "rgb(160,7,198)");
        gradient.addColorStop(0.1, "rgba(155,1,157,0");
        gradient.addColorStop(0.9, "rgba(155,1,157,0");
        background!.fillStyle = gradient;
        background!.fillRect(0, 0, width, height);

        // draw radial bottom gradient
        gradient = background!.createRadialGradient(
          Math.floor(width / 2 + 30),
          Math.floor(height * 0.8),
          1,
          Math.floor(width / 2 + 30),
          height + 50,
          Math.floor(height * 1.3)
        );
        gradient.addColorStop(0, "rgba(10,128,121,50)");
        gradient.addColorStop(1, "rgba(10,128,121,0)");
        background!.fillStyle = gradient;
        background!.globalAlpha = 0.4;
        background!.fillRect(0, 0, width, height);

        setState((state) => ({
          ...state,
          backgroundImageData: background!.getImageData(0, 0, width, height),
        }));
      }
    });
  }, [didChange, backgroundRef, width, height]);

  return (
    <ClientOnly>
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
          id="background-canvas"
          ref={backgroundRef}
          width={String(width)}
          height={String(height)}
          style={{
            zIndex: 1,
          }}
        />
        <canvas
          id="stars-canvas"
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
        {/* <Image
          ref={outlineRef}
          src={outline}
          alt=""
          style={{ visibility: "hidden" }}
        /> */}
      </Box>
    </ClientOnly>
  );
}

export default Canvas;
