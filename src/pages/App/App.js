import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import DashBoardPage from '../DashBoardPage/DashBoardPage';
import NewReservationPage from '../NewReservationPage/NewReservationPage'

const App = (props) => {

    const navigate = useNavigate();

    return (
      <Routes>
        <Route path="/" element={<DashBoardPage/>}/>
        <Route path="/new_reservation" element={<NewReservationPage navigate={navigate}/>}/>
      </Routes>
    )
 
}

export default App;
