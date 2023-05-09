
import './App.css';
import logo from "./components/ASSETS/images/logo.png"

import Body from './components/Body';

function App() {
  
  return (
    <div className="App">
            <div>
        <img className="imglogo" src={logo} alt=""></img>
      </div>
       <Body></Body> 



  
    </div>
  );
}

export default App;
