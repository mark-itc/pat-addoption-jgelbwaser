import './App.css';
//import Login from './components/tests/Login/Login';
import  Home  from './pages/Home';
import NavBar from './components/NavBar'
import UiStack100Vh from './components/ui/uiKit/layouts/UiStack100Vh';

function App() {

  return (
    <UiStack100Vh  sx={{justifyContent:'space-between'}}>
      {/* <Login/> */}
    
      <NavBar/>
      <Home  sx={{backgroundColor:'blue'}}/>
      
    </UiStack100Vh>
  );
}

export default App;
