import './App.css';
//IF YOU ERASE THE FOLLOWING LINE THERE'S AN ERROR
// not available
// PetSearch.jsx:13 Uncaught ReferenceError: Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization
// at Module.default (PetSearch.jsx:13:1)
// eslint-disable-next-line no-unused-vars
import UseApi from "./services/useApi";
import  Home  from './pages/Home';
import  PetSearch  from './pages/PetSearch';
import NavBar from './components/navBar/NavBar'
import UiStack100Vh from './components/ui/uiKit/layouts/UiStack100Vh';
import Modal from './components/Modal/Modal';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PERMISSION_LEVEL, ROUTES_PATH } from './config/config';
import MyPets from './pages/MyPets';
import Init from './components/Init';
import { useSelector } from 'react-redux';

function App() {

const permissions = useSelector(state => state.auth.permissionLevel)
const isAuthenticated = permissions > PERMISSION_LEVEL.guest

  return (
    <>
    <UiStack100Vh >
      <NavBar/>
      <Routes>
        <Route path={ROUTES_PATH.home} element={
        !isAuthenticated ?  <Home/> : <Navigate to={ROUTES_PATH.search} /> 
        }></Route>
        <Route path={ROUTES_PATH.search} element={<PetSearch/>}></Route>
        <Route path={ROUTES_PATH.myPets} element={
        isAuthenticated ?  <MyPets/> : <Navigate to={ROUTES_PATH.search} /> 
        }></Route>
      </Routes>
    </UiStack100Vh>
     <Modal/>
     <Init/>
    </>
  );
}

export default App;
