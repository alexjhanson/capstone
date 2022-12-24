import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NewReservationPage.css'

const POST_URL = "reservations/new"

class NewReservationPage extends Component{
    
    constructor() {
        super();

        this.state = {
            newRes: {
                name: "",
                adults: 2,
                children: 0,
                checkIn: this.getMinCheckInDate(),
                checkOut: this.addDay(this.getMinCheckInDate())
            },
            formValid: false
        };
    }

    getMinCheckInDate() {
        let minDate = new Date().toLocaleDateString().split('/');

        // Return ISO date string format for min prop on input[type='date']
        return `${minDate[2]}-${this.normalizeDayMonth(minDate[0])}-${this.normalizeDayMonth(minDate[1])}`;
    }

    addDay(dateString) {

        dateString = dateString.split('-')

        let nextDay = new Date(dateString[0], dateString[1] - 1, dateString[2]);

        // Checkout day must at least be the next day from the current date
        nextDay.setDate(nextDay.getDate() + 1);

        nextDay = nextDay.toLocaleDateString().split('/');

        // Return ISO date string format for min prop on input[type='date']
        return `${nextDay[2]}-${this.normalizeDayMonth(nextDay[0])}-${this.normalizeDayMonth(nextDay[1])}`;
    }

    normalizeDayMonth(s) {
        if(s.length < 2)
            s = "0" + s;
        return s;
    }

    handelSubmit = (e) => {
        e.preventDefault();
        if(this.state.formValid) {
            fetch(POST_URL, {
                method: "POST",
                headers: new Headers({'Content-type': 'application/json'}),
                body: JSON.stringify(this.state.newRes)
            })
            .then(response => {
                if(response.ok) {
                    this.props.navigate("/")
                }else {
                    // handle submission Error
                }
            })
        }
    }

    handleChange = (e) => {
        const newRes = { ...this.state.newRes };
        newRes[e.target.name] = e.target.value;

        if(e.target.name === "checkIn") {
            newRes['checkOut'] = this.addDay(newRes['checkIn']);
        }

        this.setState({newRes}, () => {
            this.setState({formValid: this.validateForm()})
        });
    }

    validateForm() {
        if(this.formRef.current.checkValidity()) {
            return this.validateDate()
        }
        return false;
    }

    validateDate() {
        
        if(this.state.newRes.checkIn && this.state.newRes.checkOut) {

            let checkIn = this.state.newRes.checkIn.split('-');
            let checkOut = this.state.newRes.checkOut.split('-');

            checkIn = new Date(parseInt(checkIn[0]), parseInt(checkIn[1]) - 1, parseInt(checkIn[2]));
            checkOut = new Date(parseInt(checkOut[0]), parseInt(checkOut[1]) - 1, parseInt(checkOut[2]));

            return !(checkOut <= checkIn);
        }

        return false;
    }


    formRef = React.createRef();

    render() {
        return (
            <>
                <Link className="cancel_btn" to="/">Cancel</Link>
                <div className="form_container">
                    <h1>New&nbsp;&nbsp;Reservation</h1>
                    <form ref={this.formRef} onSubmit={this.handleSubmit}>
                        <div className="form_field_container">
                            <label>
                                <span>Name:</span>
                                <input name="name" placeholder='Enter Your First and Last Name' onChange={this.handleChange} value={this.state.newRes.name} required/>
                            </label>
                            <label>
                                <span>Adults:</span>
                                <select name='adults' onChange={this.handleChange} value={this.state.newRes.adults}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                            <label>
                                <span>Children:</span>
                                <select name='children' onChange={this.handleChange} value={this.state.newRes.children}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                            <label>
                                <span>Check In:</span>
                                <input name="checkIn" type="date" min={this.getMinCheckInDate()} onChange={this.handleChange} value={this.state.newRes.checkIn} required/>
                            </label>
                            <label>
                                <span>Check Out:</span>
                                <input name="checkOut" type="date" min={this.addDay(this.state.newRes.checkIn)} onChange={this.handleChange} value={this.state.newRes.checkOut} required/>
                            </label>
                            <button className="form_btn" onClick={this.handelSubmit}>Make Reservation</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
    
}

export default NewReservationPage;