/* eslint-disable */
import React, {useState, useEffect} from 'react';
import ReservationHeader from './reservation/ReservationHeader';
import ReservationBody from './reservation/ReservationBody';
import ClassReservation from './reservation/ClassReservation';
import ReservationFooter from './reservation/ReservationFooter';
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'

function Reservation(){
    let [classInfo, setClassInfo] = useState([{}]);

    useEffect( async ()=>{
        await getClassSchedule()
    }, [])

    const getClassSchedule=async()=>{
        let userId = sessionStorage.getItem("userId")
        let url = 'http://52.79.235.2:8080/studio/getClassSchedule?userId='+userId;
        await axios.get(url).then( (res)=>{ setClassInfo(res.data) } )

    }
    // console.log(classInfo)
    return (
        <div className='reservation'>
            <ReservationHeader />
            <Route exact path="/">
                <ReservationBody classInfo={classInfo} />
            </Route>
            {/* <Route path="/classReservation">
                <ClassReservation />
            </Route> */}
            <ReservationFooter />
        </div>
    )
}

export default Reservation;