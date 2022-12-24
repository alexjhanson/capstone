import React from 'react';
import './RecordColumn.css';

const months = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
};

const RecordColumn = (props) => {

    let label = null;
    let value = null;
    let res_id = null;
    let detail = null;

    if(props?.result.res_id) {
        label = Object.keys(props.result)[1];
        value = props.result[label];
        res_id = props.result.res_id;
        detail = props.result.detail;
    }


    return (
        <div className='data_column flex-v'>
            {props.data.map((d, indx) => 
                <div className="data_column-row flex-h" key={indx}>
                    <input 
                        type="checkbox" 
                        checked={(indx + 1) === props.selIndx}
                        disabled={props.checkboxesDisabled}
                        onChange={(e) => {
                            if(props.selIndx === (indx+1)) {
                                props.handleSelIndx(null);
                            }
                            else {
                                props.handleSelIndx(indx + 1);
                            }
                        }}
                    />
                    <p className="data_column-detail">
                        <span className="data_column-row-id bold">RES ID: {d.res_id} </span>
                        Arrival: {months[d.arrival_date_month]}/{d.day_of_month}/{d.year}&nbsp;
                        Adults: {d.adults}&nbsp;
                        Children: {d.children}&nbsp;  
                        Lead Time: {d.lead_time}&nbsp; 
                        Stay Length: {d.stays_in_week_nights + d.stays_in_weekend_nights}&nbsp; 
                        Distribution Channel: {d.distribution_channel}&nbsp; 
                        Customer Type: {d.customer_type}&nbsp; 
                        {props.processed ? (d.is_canceled ? 
                            <span className="bold">{'CANCELED'}</span> : 
                            <span className="bold">{'NOT CANCELED'}</span> ) 
                            : null}
                    </p>
                    {res_id && (res_id === d.res_id) ? 
                        <p className="data_column-result bold" style={{fontSize: 20}}>{detail} {label === 'score' ? label + ' ' + value: null}</p> 
                        : null}
                </div>
            )}
        </div>
    )
};

export default RecordColumn;
