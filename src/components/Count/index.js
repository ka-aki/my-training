import styles from './count.module.css';
import React from 'react';

const setNum = {
  0: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  1: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  2: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
  3: [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  4: [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  5: [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  6: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  7: [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  8: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
};

const Count = ({ count }) => {
  return (
    <div>
      <div className={styles.grid}>
        {count >= 0 &&
          setNum[count].map((v, i) => (
            <div key={i} className={v && styles.orange} />
          ))}
      </div>
    </div>
  );
};

export default Count;
