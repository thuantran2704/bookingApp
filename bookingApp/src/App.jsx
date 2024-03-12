import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import axios from 'axios';




function App() {

  return (
    <Routes>
      <Route path = "/" element = {<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path ="/register" element = {<RegisterPage/>}/>
        <Route path ="/login" element = {<LoginPage/>}/>
      </Route>
    </Routes>
  )
}

//axios base setup
axios.defaults.baseURL = 'http://localhost:4000';


export default App
