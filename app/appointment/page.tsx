"use client";

import React, { useState } from 'react';

const AppointmentPage: React.FC = () => {
    const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
    const [appointmentTime, setAppointmentTime] = useState<string>('');

    const handleDateChange = (date: Date | null) => {
        setAppointmentDate(date);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAppointmentTime(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // TODO: Handle appointment submission logic here

        // Reset form fields
        setAppointmentDate(null);
        setAppointmentTime('');
    };

    return (
        <div>
            <h1>Appointment Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Date: 
                    <input type="date" value={appointmentDate} onChange={handleDateChange} />
                </label>
                <br />
                <label>
                    Time: 
                    <input type="time" value={appointmentTime} onChange={handleTimeChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AppointmentPage;