import './App.css';
import UseApi from "./services/useApi";
import  Home  from './pages/Home';
import  PetSearch  from './pages/PetSearch';
import NavBar from './components/navBar/NavBar'
import UiStack100Vh from './components/ui/uiKit/layouts/UiStack100Vh';
import Modal from './components/Modal/Modal';
import { Route, Routes } from 'react-router-dom';
import { ROUTES_PATH } from './config/config';
import MyPets from './pages/MyPets';



function App() {


  return (
    <>
    <UiStack100Vh >
      <NavBar/>
      <Routes>
        <Route path={ROUTES_PATH.home} element={<Home/>}></Route>
        <Route path={ROUTES_PATH.search} element={<PetSearch/>}></Route>
        <Route path={ROUTES_PATH.myPets} element={<MyPets/>}></Route>
      </Routes>
    </UiStack100Vh>
     <Modal/>
    </>
  );
}

export default App;
