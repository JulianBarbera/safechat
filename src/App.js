// import logo from './logo.png';
import './App.css';
import './javascript.js';
import {Form} from './javascript.js';



function App() {

  return (

    <div className="App">
      <header>
        <h2>SafeChat</h2>
        <h3>Realtime, Built With Firebase</h3>
      </header>

      <div id="chat">
        {/* <!-- messages will display here --> */}
        <ul id="messages"></ul>

        {/* <!-- form to send message --> */}
        <div id="message-form">
          {Form()}
        </div>
      </div>

    </div >
  );

}

export default App;
