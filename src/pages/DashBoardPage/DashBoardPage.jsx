import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecordRow from '../../components/RecordRow/RecordRow';
import PieChart from '../../components/PieChart/PieChart';
import BarChart from '../../components/BarChart/BarChart';
import HorizontalBarChart from '../../components/HorizontalBarChart/HorizontalBarChart';
import './DashBoardPage.css';

class DashBoard extends Component {

    render() {
        return (
            <div className="dashboard_container">
                <header><span className="dashboard_header-title">DashBoard</span><Link className="dashboard_header-btn" to="/new_reservation">New Reservation</Link></header>
                <div className="dashboard_content_container">
                    <div className="flex-h">
                        <BarChart dataURL="api/ml_model/get_all_cxls_by_month" title="Cancellations By Month"/>
                        <PieChart dataURL="api/ml_model/get_all_cxls" title="Cancellations"/>
                        <HorizontalBarChart dataURL="api/ml_model/get_all_cxls_by_feature" title="Cancellations By Feature"/>
                    </div>
                    <RecordRow dataHeader="Test Data" dataURL="/reservations/processed" processed={true}/>
                    <RecordRow dataHeader="New Reservations" dataURL="/reservations/unprocessed" processed={false}/>
                </div>
            </div>
        );
    }
}

export default DashBoard;
