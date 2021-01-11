import { useState, useEffect, useRef } from 'react';
import './App.css';
import Timer from './components/Timer/';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const App = () => {
  const squares = [...Array(100).keys()].map((v) => ({ id: v + 1, on: false }));
  const initialState = () => ({
    squares: squares,
    clickedSquares: [],
    isRecording: false,
    isPlaying: false,
    clickedSquaresIndex: 0,
  });

  const [state, setState] = useState(initialState());

  const handleClick = (id) => {
    if (state.isRecording) {
      const filtered = state.clickedSquares.filter((v) => v.id === id);
      const last = filtered[filtered.length - 1];

      if (last === undefined) {
        setState({
          ...state,
          squares: state.squares.map((v) => {
            if (v.id === id) {
              return { id: id, on: true };
            }
            return v;
          }),
          clickedSquares: state.clickedSquares.concat({ id: id, on: true }),
        });
      } else {
        setState({
          ...state,
          squares: state.squares.map((v) => {
            if (v.id === id) {
              return { id: id, on: !last.on };
            }
            return v;
          }),
          clickedSquares: state.clickedSquares.concat({ id: id, on: !last.on }),
        });
      }
    }
  };

  const onStart = () => {
    setState({ ...state, isRecording: true });
  };

  const onFinish = () => {
    setState({ ...state, isRecording: false });
  };

  useInterval(() => {
    if (state.isPlaying) {
      setState({
        ...state,
        squares: state.squares.map((s) => {
          const currentHistory =
            state.clickedSquares[state.clickedSquaresIndex];
          if (currentHistory != null && s.id === currentHistory.id) {
            return state.clickedSquares[state.clickedSquaresIndex];
          }
          return s;
        }),
        clickedSquaresIndex: state.clickedSquaresIndex + 1,
      });
    }
  }, 1000);

  const onPlay = () => {
    setState({
      ...state,
      isPlaying: true,
      squares: squares,
    });
  };

  return (
    <div>
      <Timer className="timer" />
      <div>
        <button onClick={onStart}>記録開始</button>
        <button onClick={onFinish}>記録終了</button>
        <button onClick={onPlay}>再生</button>
        <div className="grid-container">
          {state.squares.map((v) => (
            <div
              key={v.id}
              className={v.on ? 'grid-item black' : 'grid-item'}
              onClick={() => handleClick(v.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
