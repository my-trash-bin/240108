// HEIGHT * WIDTH 크기의 보드 한 쪽 끝에서, 그 반대방향으로 도달하기까지 걸리는 이동 횟수의 중간값.
// 가로/세로로 1칸씩 이동할 수 있으며, 각 방향으로의 이동 확률은 uniform함

// 보드의 크기
const HEIGHT = 3;
const WIDTH = 3;

const iterations: number[][][] = [init(HEIGHT, WIDTH)];
let sum = 0;

// 중간값 구하려면 0.5, 상위 1%를 구하려면 0.01, 하위 1%를 구하려면 0.99
while (sum < 0.5) {
  const last = iterations[iterations.length - 1];
  const current = Array.from(new Array(HEIGHT)).map((_, i) => Array.from(new Array(WIDTH)).map((_, j) => opportunityToHere(last, HEIGHT, WIDTH, i, j)));
  iterations.push(current);
  console.log(current);
  sum += current[HEIGHT - 1][WIDTH - 1];
}

console.log({ sum, result: iterations.length - 1 });

// =============================================================================

function init(height: number, width: number): number[][] {
  return Array.from(new Array(height)).map((_, i) => Array.from(new Array(width)).map((_, j) => i === 0 && j === 0 ? 1 : 0));
}

function opportunityToHere(last: number[][], height: number, width: number, y: number, x: number): number {
  return (
    opportunityFromThere(last, height, width, y + 1, x) +
    opportunityFromThere(last, height, width, y - 1, x) +
    opportunityFromThere(last, height, width, y, x + 1) +
    opportunityFromThere(last, height, width, y, x - 1)
  );
}

function opportunityFromThere(last: number[][], height: number, width: number, y: number, x: number): number {
  if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
    return 0;
  }
  if (y === HEIGHT - 1 && x === WIDTH - 1) {
    return 0;
  }
  const unavailableDirections = +(x === 0) + +(x === width - 1) + +(y === 0) + +(y === height - 1);
  return last[y][x] / (4 - unavailableDirections);
}
