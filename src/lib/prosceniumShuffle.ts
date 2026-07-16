export const prng = (seed: number) => () => {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const shuffleFixedLast = <T,>(opts: T[], rand: () => number): T[] => {
  const head = opts.slice(0, -1);
  const tail = opts[opts.length - 1];
  for (let i = head.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [head[i], head[j]] = [head[j], head[i]];
  }
  return [...head, tail];
};