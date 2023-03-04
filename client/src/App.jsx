import './App.css';
import Login from './components/tests/Login/Login';
import  Home  from './pages/Home';
import NavBar from './components/navBar/NavBar'
import UiStack100Vh from './components/ui/uiKit/layouts/UiStack100Vh';
import Modal from './components/Modal/Modal';


function App() {

  return (
    <UiStack100Vh  sx={{justifyContent:'space-between'}}>
      <NavBar/>
      <Modal/>
      <Home/>
    </UiStack100Vh>
  );
}

export default App;
