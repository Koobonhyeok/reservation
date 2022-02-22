import React from "react";
import { Link } from 'react-router-dom'

function ReservationFooter(){
    return (
        <div className="reservation-footer">
            <Link to="/">
                <div className="footer-nav footer-nav-left">
                    수강권
                </div>
            </Link>
            <Link to="/classReservation">
                <div className="footer-nav">
                    수업예약
                </div>
            </Link>
            <div className="footer-nav">
                이용내역
            </div>
            <div className="footer-nav">
                마이페이지
            </div>
            <div className="footer-nav">
                게시판
            </div>

            {/* <Route exact pa > */}

        </div>
    )
}

export default ReservationFooter;