import React, { useRef, useEffect } from 'react';

const ClockBoard = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(100, 100, 80, Math.PI * 2, false);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
  }, []);

  return (
    <canvas id="canvas2" ref={canvasRef} {...props} width="600" height="600" />
  );
};

export default ClockBoard;
