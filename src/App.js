import { useState } from "react";
import "./App.css";

const App = () => {
  const initialState = () => ({
    blackSquareIds: [],
    isRecorded: false,
    savedIds: [],
  });

  const [state, setState] = useState(initialState());

  const setColor = (id) => {
    if (state.isRecorded) {
      if (state.blackSquareIds.find((v) => v === id)) {
        const ids = state.blackSquareIds.filter((v) => v !== id);
        setState({ ...state, blackSquareIds: ids });
      } else {
        const ids = state.blackSquareIds.concat(id);
        setState({ ...state, blackSquareIds: ids });
      }
    }
  };

  const startRec = () => {
    setState({ blackSquareIds: [], isRecorded: true });
  };
  const finishRec = () => {
    setState({
      savedIds: state.blackSquareIds,
      isRecorded: false,
      blackSquareIds: [],
    });
  };

  const startPlay = () => {
    state.savedIds.map((v) => console.log(v));
  };

  console.log(state);

  const squares = [
    { id: 0 },
    { id: 10 },
    { id: 20 },
    { id: 30 },
    { id: 40 },
    { id: 50 },
    { id: 60 },
    { id: 70 },
    { id: 80 },
    { id: 90 },
  ];

  return (
    <div className="container">
      <button onClick={startRec}>記録開始</button>
      <button onClick={finishRec}>記録終了</button>
      <button onClick={() => startPlay()}>再生</button>
      <table>
        <tbody>
          {squares.map((v) => (
            <Row
              key={v.id}
              rowIndex={v.id}
              setColor={setColor}
              blackSquareIds={state.blackSquareIds}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Row = ({ rowIndex, setColor, blackSquareIds }) => {
  const squareIds = [...Array(10).keys()].map((v) => ({
    id: v + 1,
  }));

  return (
    <tr>
      {squareIds.map((v) => (
        <td
          key={v.id}
          onClick={() => setColor(v.id + rowIndex)}
          className={
            blackSquareIds.find((val) => val === v.id + rowIndex)
              ? "black"
              : "white"
          }
        />
      ))}
    </tr>
  );
};

export default App;
