import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react';

// components
import StudentSignUp from './components/StudentSignUp'
import HomePage from './components/HomePage'
import _Navbar from './components/_Navbar'
import SuccessfulLogin from './components/SuccessfulLogin'
import Leaderboard from './components/Leaderboard'
import SubmitKill from './components/SubmitKill'
import AdminControlls from './admin/AdminControlls'




// routing for the website
export default function App() {
  return (
    <main className="home">
      <BrowserRouter>
        <_Navbar />
        <Routes>
          <Route path="/SeniorAssassinsFullstack/admin" element={<AdminControlls />}></Route>
          <Route path="/SeniorAssassinsFullstack/signup" element={<StudentSignUp />}></Route>
          <Route path="/SeniorAssassinsFullstack" element={<HomePage />}></Route>
          <Route path="/SeniorAssassinsFullstack/success" element={<SuccessfulLogin />}></Route>
          <Route path="/SeniorAssassinsFullstack/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/SeniorAssassinsFullstack/submitkill" element={<SubmitKill />}></Route>
        </Routes>
    </BrowserRouter>
    </main>
  )
}