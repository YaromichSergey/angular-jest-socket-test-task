import { GridItem } from '../models/grid-item';

export function generatePseudoData(size: number, additionalIds: string[]) {
  const data = [];
  for (let i = 0; i < size - additionalIds.length; i++) {
    data.push(generateGridItem((String(i + 1))));
  }
  for(let i = 0; i < additionalIds.length; i++) {
    data.push(generateGridItem(additionalIds[i]));
  }
  return data;
}

function generateGridItem(id: string): GridItem {
  return {
    id,
    int: generateRandomIntegerInRange(0, 10000000),
    float: generateRandomFloat(),
    color: generateRandomColor(),
    child: [{
      id: (+id * 10).toString(),
      color: generateRandomColor()
    }],
  }
}

function generateRandomFloat() {
  const maxIntegerPart = 10 ** 17;
  const randomInteger = Math.floor(Math.random() * maxIntegerPart);
  return (randomInteger / (10 ** 18)).toFixed(18);
}

function generateRandomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomColor() {
  return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
}
