export function createRandom(num: number = 1): number {
  let rand = Math.random();
  for (let i = 0; i < num; i++) {
    rand *= 10;
  }
  return Math.round(rand);
}

export function getColor(key: string = '') {
  let colorList:{[key: string]: object} = {
    red: {
      title: '嫣红',
      color: '#e54d42'
    },
    yellow: {
      title: '明黄',
      color: '#fbbd08'
    },
    olive: {
      title: '橄榄',
      color: '#8dc63f'
    },
    green: {
      title: '森绿',
      color: '#39b54a'
    },
    cyan: {
      title: '天青',
      color: '#1cbbb4'
    },
    blue: {
      title: '海蓝',
      color: '#0081ff'
    },
    purple: {
      title: '姹紫',
      color: '#6739b6'
    },
    brown: {
      title: '棕褐',
      color: '#a5673f'
    },
    gray: {
      title: '草灰',
      color: '#aaaaaa'
    }
  }
  if (key) {
    return colorList[key];
  }
  return colorList;
}