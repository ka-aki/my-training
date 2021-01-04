import React, { useRef, useEffect, useState } from 'react';
import Count from '../Count/index';
import styles from './timer.module.css';

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [count, setcount] = useState(99);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(250, 250, 200, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.rotate((50 * Math.PI) / 180);
  }, []);

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
      <canvas
        ref={canvasRef}
        {...props}
        width="600"
        height="600"
        className={styles.canvas}
      />
      <div className={styles.count}>
        <Count count={Number(count.toString().slice(-2, -1))} />
        <Count count={Number(count.toString().slice(-1))} />
      </div>
    </div>
  );
};

export default Canvas;
