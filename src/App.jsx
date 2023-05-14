
import './App.css';
import logo from "./components/ASSETS/images/logo.png"
import Body from './components/Body';
import Main from './Main/Main';
function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">

      {/*  <Body></Body>  */}
      
     {/* <Main></Main>   */}

      {/* Eğer token var ise Body - yok ise Main */}
  {token === null ? <Main  /> : <Body />} 
  
    </div>
  );
}

export default App;
