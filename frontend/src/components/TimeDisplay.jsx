import React, { useEffect, useState } from "react";
import style from './TimeDisplay.module.css'
import api from '../services/api.js';
import InfosDisplay from './InfosDisplay.jsx';

export default function TimeDisplay({ timezoneName }) {
    const [timezone, setTimezone] = useState();
    const [currentTime, setCurrentTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchTimezone = async () => {
            try {
                if (!timezoneName) return;
                const response = await api.get(`/timezone?format=json&by=zone&zone=${timezoneName}`);
                setTimezone(response.data);
                const timeString = response.data.formatted.split(" ")[1];
                const [hours, minutes, seconds] = timeString.split(":");
                setCurrentTime({
                    hours: parseInt(hours),
                    minutes: parseInt(minutes),
                    seconds: parseInt(seconds)
                });
            } catch (err) {
                console.error("Error detected:", err);
            }
        };
        fetchTimezone();
    }, [timezoneName]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(prevTime => {
                let newSeconds = prevTime.seconds + 1;
                let newMinutes = prevTime.minutes;
                let newHours = prevTime.hours;
                if (newSeconds >= 60) {
                    newSeconds = 0;
                    newMinutes += 1;
                }
                if (newMinutes >= 60) {
                    newMinutes = 0;
                    newHours += 1;
                }
                if (newHours >= 24) {
                    newHours = 0;
                }
                return {
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds
                };
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (!timezone || !timezone.formatted) {
        return <p>Wait...</p>;
    }

    return(
        <>
            <div className={style.Main}>
                <div className={style.fields}>
                    <div className={style.field}><p>{String(currentTime.hours).padStart(2, '0')}</p></div>
                    <div className={style.field}><p>{String(currentTime.minutes).padStart(2, '0')}</p></div>
                    <div className={style.field}><p>{String(currentTime.seconds).padStart(2, '0')}</p></div>
                </div>
                {timezone && <InfosDisplay data={timezone}/>}
            </div>
        </>
    )
}
