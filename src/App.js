import { useState, useEffect, useRef } from "react";
import "./App.css";

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

const xNum = 6;
const yNum = 6;
const colors = [
  { name: "red", number: "#F00" },
  { name: "blue", number: "#00F" },
  { name: "green", number: "#0F0" },
  { name: "yellow", number: "#FF0" },
];

const App = () => {
  const squares = [...Array(xNum * yNum).keys()].map((v) => ({
    id: v + 1,
    on: false,
    color: "",
  }));
  const initialState = () => ({
    squares: squares,
    clickedSquares: [],
    isRecording: false,
    isPlaying: false,
    clickedSquaresIndex: 0,
    color: "#F00",
  });

  const [state, setState] = useState(initialState());

  const handleClick = (id, color) => {
    if (state.isRecording) {
      const filtered = state.clickedSquares.filter((v) => v.id === id);
      const last = filtered[filtered.length - 1];

      if (last === undefined) {
        setState({
          ...state,
          squares: state.squares.map((v) => {
            if (v.id === id) {
              return { id: id, on: true, color };
            }
            return v;
          }),
          clickedSquares: state.clickedSquares.concat({
            id: id,
            on: true,
            color,
          }),
        });
      } else {
        setState({
          ...state,
          color,
          squares: state.squares.map((v) => {
            if (v.id === id) {
              return { id: id, on: true, color };
            }
            return v;
          }),
          clickedSquares: state.clickedSquares.concat({
            id: id,
            on: true,
            color,
          }),
        });
      }
    }
    console.log(state);
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

  const onPlay = (value) => {
    setState({
      ...state,
      isPlaying: value,
      squares: squares,
    });
  };

  const selectedColor = (color) => {
    setState({
      ...state,
      color,
    });
  };

  return (
    <div className="root">
      <button onClick={onStart}>記録開始</button>
      <button onClick={onFinish}>記録終了</button>
      <button onClick={() => onPlay(true)}>再生</button>
      <button onClick={() => onPlay(false)}>再生停止</button>
      <div
        className="grid-container"
        style={{ "--cols": xNum, "--rows": yNum }}
      >
        {state.squares.map((v) => (
          <div
            key={v.id}
            className={v.on ? "grid-item color" : "grid-item"}
            style={{ "--number": v.color }}
            onClick={() => handleClick(v.id, state.color)}
          />
        ))}
      </div>
      <div>
        <div>カラーパレット</div>
        <div className="palette-container">
          {colors.map((color, i) => (
            <div
              className="item color"
              key={i}
              style={{ "--number": color.number }}
              onClick={() => selectedColor(color.number)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
