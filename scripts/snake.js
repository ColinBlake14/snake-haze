import { fromStringToArray, getRandomInt } from './utils.js';
import { setListeners } from './interface.js';

function paint() {
  const snakeObj = {
    snakeArr: [],
    direction: 'up',
    speed: 300,
    status: 'game',
    apple: null,
    color: 'white',
    backgroundColor: 'rgb(72, 72, 134)',
  }

  const cellMap = paintBoard();
  const snakeArr = paintInitSnake(cellMap, snakeObj.color);
  snakeObj.snakeArr = snakeArr;
 
  setListeners(snakeObj);
  
  drawGameTick(snakeObj, cellMap);
}

// PAINT

function paintBoard() {
  const cellMap = new Map();
  let snake = document.createElement('div');
  snake.className = "snake";

  document.body.prepend(snake);

  for (let i = 1; i <= 36; ++i) {
    for (let j = 1; j <= 36; ++j) {
      let cell = document.createElement('div');
      cell.className = "cell";
      cell.id = `${i}x${j}`;
      cellMap.set(cell.id, cell);
      snake.append(cell);
    }
  }

  return cellMap;
}

function paintCell(node, color) {
  node.style.backgroundColor = color;
}

function paintInitSnake(cellMap, color) {
  const snakeArr = [];
  
  for (let i = 16; i <= 18; ++i) {
    let cell = cellMap.get(`${i}x18`);
    paintCell(cell, color);
    snakeArr.push(cell);
  }

  return snakeArr;
}


function drawSnakeMove(snakeObj, cellMap) {
  const snakeArr = snakeObj.snakeArr;
  const deleteCell = snakeArr.pop();
  paintCell(deleteCell, snakeObj.backgroundColor);
  const headIdArr = fromStringToArray(snakeArr[0].id);
  let newHeadId = '';

  switch(snakeObj.direction) {
    case 'up':
      headIdArr[0]--;

      if (headIdArr[0] === 0) {
        headIdArr[0] = 36;
      }

      newHeadId = headIdArr.join('x');
      break
    
    case 'down':
      headIdArr[0]++;

      if (headIdArr[0] === 37) {
        headIdArr[0] = 1;
      }

      newHeadId = headIdArr.join('x');
      break

    case 'left':
      headIdArr[1]--;

      if (headIdArr[1] === 0) {
        headIdArr[1] = 36;
      }

      newHeadId = headIdArr.join('x');
      break

    case 'right':
      headIdArr[1]++;

      if (headIdArr[1] === 37) {
        headIdArr[1] = 1;
      }

      newHeadId = headIdArr.join('x');
      break
  }

  const newHeadCell = cellMap.get(newHeadId);

  if (newHeadCell.style.backgroundColor === 'green') {
    paintCell(deleteCell, snakeObj.color);
    snakeArr.push(deleteCell);
    snakeObj.apple = null;
  }

  paintCell(newHeadCell, snakeObj.color);
  snakeArr.unshift(newHeadCell);
}

function drawApple(snakeObj, cellMap) {
  while (!snakeObj.apple) {
    const x = getRandomInt(36);
    const y = getRandomInt(36);
    const appleCoordinates = `${x}x${y}`;
    const appleCell = cellMap.get(appleCoordinates);

    if (appleCell.style.backgroundColor !== snakeObj.color) {
      paintCell(appleCell, 'green');
      snakeObj.apple = appleCell;        
    }
  }  
}

function drawGameTick(snakeObj, cellMap) {
  if (snakeObj.status === 'game') {
    setInterval(() => {
      // drawSnakeMove(snakeObj, cellMap);
      // drawApple(snakeObj, cellMap);
    }, snakeObj.speed)
  }
}

// GAME

paint();
