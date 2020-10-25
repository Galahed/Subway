import './App.css';
import Example from "./Example";
import {Modal} from "antd";
import {useSubwayEntrance} from "./Subway";

function App() {
  useSubwayEntrance('ws://127.0.0.1:1002')

  return (
    <div className="App">
      <Modal visible={true}>
        <Example/>
      </Modal>

    </div>
  );
}

export default App;
