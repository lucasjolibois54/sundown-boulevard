'use client';
import React from 'react';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default function DatePicker({ date, setDate }) {
    return (
        <div className="container">
            <div className="row">
                Date formats: yyyy-mm-dd, yyyymmdd, dd-mm-yyyy, dd/mm/yyyy, ddmmyyyyy
            </div>
            <br />
            <div className="row">
                <div className='col-sm-3'>
                    <div className="form-group">
                        <DateTime
                            value={date}
                            onChange={date => setDate(date)}
                            dateFormat="YYYY-MM-DD"
                            timeFormat="hh:mm A"
                            inputProps={{ className: "form-control" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
