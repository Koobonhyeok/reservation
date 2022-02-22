/* eslint-disable */
import React, {useState} from "react";

function ReservationHeader(){
    let [user, setUSer] = useState(sessionStorage.getItem("userNm"))
    const logout=()=>{
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userNm");
        document.location.href='/';

    }

    return (
        <div className="reservation-header">
            <img className="logo-image" alt="logo" src='images/logo_img.png' onClick={ ()=>{document.location.href='/'} } ></img>
            <div className="header-right">
                <label>{user}님 안녕하세요.</label>
            <button className="logout-btn" onClick={ logout } >로그아웃</button>
            </div>
        </div>
    )
}

export default ReservationHeader;