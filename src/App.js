import "./App.css";

const App = () => {
  return (
    <div>
      <table>
        <tbody>
          {[...Array(10)].map((v, i) => (
            <Row key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Row = () => {
  return (
    <tr>
      {[...Array(10)].map((v, i) => (
        <td key={i} />
      ))}
    </tr>
  );
};

export default App;
