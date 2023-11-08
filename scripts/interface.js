import { fromStringToArray } from "./utils.js";

export function setListeners(snakeObj) {
  const keyCodeSet = new Set(['Escape', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']);

  document.addEventListener('keydown', function(event) {
    if (keyCodeSet.has(event.code)) {
      buttonPressPaint('down', event.code);
      buttonPressEvent(event.code, snakeObj);
    }
  });

  document.addEventListener('keyup', function(event) {
    if (keyCodeSet.has(event.code)) {
      buttonPressPaint('up', event.code);
    }
  });
}

function buttonPressPaint(press, button) {
  let keyOpacity = '100%';

  if (press === 'up') {
    keyOpacity = '50%';
  }

  let btn = document.getElementById(button);
  btn.style.opacity = keyOpacity;
}

function buttonPressEvent(button, snakeObj) {
  const headPosArr = fromStringToArray(snakeObj.snakeArr[0].id);
  const afterHeadPosArr = fromStringToArray(snakeObj.snakeArr[1].id);
  const verticalDelta = headPosArr[0] - afterHeadPosArr[0];
  const horizontalDelta = headPosArr[1] - afterHeadPosArr[1];

  switch(button) {
    case 'ArrowUp':
      if (verticalDelta !== 1) {
        snakeObj.direction = 'up';
      }

      break
    
    case 'ArrowDown':
      if (verticalDelta !== -1) {
        snakeObj.direction = 'down';
      }

      break

    case 'ArrowRight':
      if (horizontalDelta !== -1) {
        snakeObj.direction = 'right';
      }

      break

    case 'ArrowLeft':
      if (horizontalDelta !== 1) {
        snakeObj.direction = 'left';
      }

      break
  }
}
