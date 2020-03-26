export function createRandom(num: number = 1): number {
  let rand = Math.random();
  for (let i = 0; i < num; i++) {
    rand *= 10;
  }
  return Math.round(rand);
} 