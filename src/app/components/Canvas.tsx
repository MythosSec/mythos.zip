"use client";
import { useEffect, useRef, useState } from "react";
import Color from "color";
import { randomBetween } from "../util/math";
import useAnimationFrame from "../hooks/useAnimationFrame";
import { Box } from "@mui/joy";
import ClientOnly from "./ClientOnly";
import { documentHeight } from "../util/dom";
import useScrollPercentage from "../hooks/useScrollPercentage";
import { useWindowSize } from "@uidotdev/usehooks";

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
  trail = 10;
  moveable = true;
  drawn = false;

  create(width: number, height: number) {
    this.x = this.oX = Math.random() * width;
    this.y = this.oY = Math.random() * height;
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

    const slowVelocity = randomBetween(3, 4) / 10;
    const fastVelocity = randomBetween(7, 8) / 10;
    const ludicrousVelocity = randomBetween(18, 21) / 10;
    // 90% of stars don't move, 10% do move
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
    if (this.x > width) {
      this.x = 1 - this.size;
      this.y = this.oY;
    }
    this.y += this.vy;
    this.x += this.vx;
  }
}

function Canvas({ pxPerStar = 6000 }: { pxPerStar?: number }) {
  const [
    {
      particles,
      loading,
      lastProgress,
      lastWidth,
      lastHeight,
      lastDocHeight,
      renderedHeight,
      renderedWidth,
    },
    setState,
  ] = useState<{
    particles: Particle[];
    loading: boolean;
    lastProgress: number;
    renderedHeight: number;
    renderedWidth: number;
    lastWidth: number;
    lastHeight: number;
    lastDocHeight: number;
  }>({
    particles: [],
    loading: true,
    lastProgress: 0,
    renderedHeight: 0,
    renderedWidth: 0,
    lastWidth: 0,
    lastHeight: 0,
    lastDocHeight: 0,
  });
  const starsRef = useRef<HTMLCanvasElement>(null);
  const offscreenStarsRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const offscreenBackgroundRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();
  const [progress] = useScrollPercentage();
  const docHeight = documentHeight();

  useEffect(
    () => setState((state) => ({ ...state, lastProgress: progress })),
    [progress]
  );
  useEffect(
    () => setState((state) => ({ ...state, lastDocHeight: docHeight })),
    [docHeight]
  );
  useEffect(
    () =>
      setState((state) => ({
        ...state,
        lastWidth: width || 0,
        lastHeight: height || 0,
      })),
    [width, height]
  );

  // spawn particles
  useEffect(() => {
    if (width && docHeight && particles.length === 0) {
      const nextParticles: Particle[] = [];
      const count = Math.floor((width * docHeight) / pxPerStar);
      let didSpawnShootingStar = false;
      const shootingStar = randomBetween(1, 100) >= 90;

      for (let i = 0; i < count; i++) {
        const particle = new Particle();
        particle.create(width, docHeight);
        nextParticles.push(particle);

        if (shootingStar && !didSpawnShootingStar) {
          console.log("spawned shooting star");
          particle.trail = 5;
          particle.moveable = true;
          didSpawnShootingStar = true;
        }
      }
      setState((state) => ({ ...state, particles: nextParticles }));
    }
  }, [width, docHeight, particles.length, pxPerStar]);

  // render frame
  useAnimationFrame(() => {
    if (
      !offscreenBackgroundRef.current ||
      !backgroundRef.current ||
      !offscreenStarsRef.current ||
      !offscreenBackgroundRef.current
    ) {
      return;
    }

    const { data, changed } = renderOffScreenBackground();
    if (changed || progress !== lastProgress) {
      renderOnScreenBackground();
    }
    renderStars(data);

    if (loading) {
      setState((state) => ({ ...state, loading: false }));
    }
  });

  const renderStars = (data: ImageData) => {
    console.time("stars");
    const currentWidth = width || 0;
    const currentHeight = height || 0;
    const offscreenStars = offscreenStarsRef.current!.getContext("2d");
    const stars = starsRef.current!.getContext("2d");
    const didRenderedSizeChange =
      renderedHeight < docHeight || renderedWidth < (width || 0);
    const didWindowSizeChange =
      width !== lastWidth ||
      height !== lastHeight ||
      docHeight !== lastDocHeight;

    if (didRenderedSizeChange || didWindowSizeChange) {
      offscreenStars?.clearRect(0, 0, currentWidth, docHeight);
    }

    const starsImageData = offscreenStars!.getImageData(
      0,
      0,
      currentWidth,
      docHeight
    );

    for (let i = 0, l = particles.length; i < l; i++) {
      const particle = particles[i];
      let px = particle.x,
        py = particle.y;
      particle.update(currentWidth, docHeight);

      // paint trail
      if (particle.moveable) {
        for (let w = 0; w < particle.size; w++) {
          for (let h = 0; h < particle.size; h++) {
            const pixelIndex = (~~(px + w) + ~~(py + h) * currentWidth) * 4;
            const currentPixel = Color([
              data.data[pixelIndex],
              data.data[pixelIndex + 1],
              data.data[pixelIndex + 2],
            ]);
            let nextPixel = currentPixel;
            if (h < 1 && w < 1) {
              nextPixel = currentPixel.lighten(particle.trail * 0.004);
            }

            starsImageData.data[pixelIndex] = nextPixel.red();
            starsImageData.data[pixelIndex + 1] = nextPixel.green();
            starsImageData.data[pixelIndex + 2] = nextPixel.blue();
            starsImageData.data[pixelIndex + 3] = data.data[pixelIndex + 3];
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
            data.data[pixelIndex],
            data.data[pixelIndex + 1],
            data.data[pixelIndex + 2],
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
            data.data[pixelIndex],
            data.data[pixelIndex + 1],
            data.data[pixelIndex + 2],
          ]);
          const nextPixel = isPink
            ? currentPixel.lighten(1.3)
            : currentPixel.lighten(10);
          starsImageData.data[pixelIndex] = nextPixel.red();
          starsImageData.data[pixelIndex + 1] = nextPixel.green();
          starsImageData.data[pixelIndex + 2] = nextPixel.blue();
          starsImageData.data[pixelIndex + 3] = 255 - 255 * particle.brightness;
        }
      }
    }

    const top = (docHeight - currentHeight) * (progress / 100);
    offscreenStars!.putImageData(starsImageData, 0, 0);
    stars?.clearRect(0, 0, currentWidth, currentHeight);
    stars?.drawImage(
      offscreenStarsRef.current!,
      0,
      top,
      currentWidth,
      currentHeight,
      0,
      0,
      currentWidth,
      currentHeight
    );
  };

  const renderOnScreenBackground = () => {
    console.log("render onscreen background");
    const currentHeight = height || 0;
    const currentWidth = width || 0;
    const top = (docHeight - currentHeight) * (progress / 100);
    const background = backgroundRef.current!.getContext("2d", {
      alpha: false,
    });
    background?.drawImage(
      offscreenBackgroundRef.current!,
      0,
      top,
      currentWidth,
      currentHeight,
      0,
      0,
      currentWidth,
      currentHeight
    );
  };

  const renderOffScreenBackground = () => {
    const currentHeight = height || 0;
    const currentWidth = width || 0;
    const background = offscreenBackgroundRef.current!.getContext("2d", {
      alpha: false,
    });

    const didRenderedSizeChange =
      renderedHeight <= docHeight || renderedWidth <= (width || 0);
    const didWindowSizeChange =
      width !== lastWidth ||
      height !== lastHeight ||
      docHeight !== lastDocHeight;

    if (!didRenderedSizeChange || !didWindowSizeChange) {
      return {
        changed: false,
        data: background!.getImageData(0, 0, currentWidth, docHeight),
      };
    }
    console.log("render offscreen background");

    // draw base gradient
    let gradient = background!.createLinearGradient(0, 0, 0, docHeight);
    gradient.addColorStop(0, "rgb(4,0,25)");
    gradient.addColorStop(1, "rgb(1,42,123)");
    background!.fillStyle = gradient;
    background!.fillRect(0, 0, currentWidth, docHeight);

    // draw vertical slide gradient
    background!.globalAlpha = 0.8;
    gradient = background!.createLinearGradient(
      Math.floor(currentWidth * 0.5 + 500),
      -200,
      Math.floor(currentWidth * 0.5 - 700),
      0
    );
    gradient.addColorStop(0.5, "rgb(160,7,198)");
    gradient.addColorStop(0.53, "rgb(160,7,198)");
    gradient.addColorStop(0.47, "rgb(160,7,198)");
    gradient.addColorStop(0.1, "rgba(155,1,157,0");
    gradient.addColorStop(0.9, "rgba(155,1,157,0");
    background!.fillStyle = gradient;
    background!.fillRect(0, 0, currentWidth, docHeight);

    // draw radial bottom gradient
    gradient = background!.createRadialGradient(
      Math.floor(currentWidth / 2 + 30),
      Math.floor(docHeight * 0.8),
      0.1,
      Math.floor(currentWidth / 2 + 30),
      currentHeight + currentHeight * 0.9,
      Math.floor(docHeight * 0.9)
    );
    gradient.addColorStop(0, "rgba(10,128,121,50)");
    gradient.addColorStop(1, "rgba(10,128,121,0)");
    background!.fillStyle = gradient;
    background!.globalAlpha = 0.4;
    background!.fillRect(0, 0, currentWidth, docHeight);

    setState((state) => ({
      ...state,
      renderedHeight: docHeight,
      renderedWidth: currentWidth,
    }));

    return {
      changed: true,
      data: background!.getImageData(0, 0, currentWidth, docHeight),
    };
  };

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
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <canvas
          id="stars-canvas"
          ref={starsRef}
          width={String(width)}
          height={String(height)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />

        <canvas
          style={{
            position: "absolute",
            left: 100000,
            top: -100000,
          }}
          id="offscreen-background-canvas"
          ref={offscreenBackgroundRef}
          width={String(width)}
          height={String(docHeight)}
        />
        <canvas
          style={{
            position: "absolute",
            left: 100000,
            top: -100000,
          }}
          id="offscreen-stars-canvas"
          ref={offscreenStarsRef}
          width={String(width)}
          height={String(docHeight)}
        />
      </Box>
    </ClientOnly>
  );
}

export default Canvas;
