import React from "react";
import style from './InfosDisplay.module.css'

export default function InfoDisplay({ data }) {

    return (
    <>
        <div className={style.infos}>
            <p><strong>Zone:</strong> {data.zoneName}</p>
            <p><strong>Country:</strong> {data.countryName}</p>
            <p><strong>Timestap:</strong> {data.formatted}</p>
        </div>
    </>
    );
}