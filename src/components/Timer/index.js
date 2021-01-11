import React, { useRef, useEffect, useState } from 'react';
import Count from '../Count/index';
import ClockBoard from '../ClockBoard';
import styles from './timer.module.css';

function pieChart(num) {
  // circle
  const angleA = 360 * (1 / 6);
  var context = document.getElementById('canvas1').getContext('2d');
  for (var i = 0; i < 6; i++) {
    const fillEndIndex = 6 - num - 1;

    context.beginPath();
    context.moveTo(100, 100);
    //円
    context.arc(
      100,
      100,
      100,
      ((angleA * i - 90) * Math.PI) / 180,
      ((angleA * (i + 1) - 90) * Math.PI) / 180,
      false
    );
    context.closePath();
    context.lineTo(100, 100);
    if (fillEndIndex === -1) {
      context.fillStyle = 'lightGreen';
    } else {
      context.fillStyle = i <= fillEndIndex ? 'white' : 'lightGreen';
    }
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
  }
}

const Canvas = () => {
  const canvasRef = useRef(null);
  const [count, setcount] = useState(6);

  useEffect(() => {
    pieChart(count);
  }, [count]);

  useEffect(() => {
    let id;
    if (count > 0) {
      id = setInterval(() => {
        setcount((m) => m - 1);
      }, 1000);
    }

    return () => clearInterval(id);
  }, [count]);

  return (
    <div>
      <div className={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width="600"
          height="600"
          className={styles.canvas}
          id="canvas1"
        />
        <ClockBoard className={styles.canvas} />
        <div className={styles.count}>
          <Count count={Number(count.toString().slice(-2, -1))} />
          <Count count={Number(count.toString().slice(-1))} />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
