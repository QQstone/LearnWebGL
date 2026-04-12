type FrameVal = [number, any];

const getValBetweenFrames = (time: number, frames: FrameVal[], last: number) => {
  for (let i = 0; i < last; i += 1) {
    const currentFrame = frames[i];
    const nextFrame = frames[i + 1];

    if (time >= currentFrame[0] && time <= nextFrame[0]) {
      const deltaX = nextFrame[0] - currentFrame[0];
      const deltaY = nextFrame[1] - currentFrame[1];
      const slope = deltaY / deltaX;
      const intercept = currentFrame[1] - currentFrame[0] * slope;

      return slope * time + intercept;
    }
  }

  return frames[last][1];
};

export class Track {
  target: any;

  start: number;

  timelen: number;

  loop: boolean;

  keyFrameMap: Map<string, FrameVal[]>;

  constructor(target: any) {
    this.target = target;
    this.start = 0;
    this.timelen = 5;
    this.loop = false;
    this.keyFrameMap = new Map();
  }

  update(t: number) {
    const {
      keyFrameMap: keyMap, start, timelen, target, loop,
    } = this;
    let time = t - start;

    if (loop) {
      time %= timelen;
    }

    Array.from(keyMap.entries()).forEach(([key, frames]) => {
      const last = frames.length - 1;

      if (time < frames[0][0]) {
        target[key] = frames[0][1];
      } else if (time > frames[last][0]) {
        target[key] = frames[last][1];
      } else {
        target[key] = getValBetweenFrames(time, frames, last);
      }
    });
  }
}
