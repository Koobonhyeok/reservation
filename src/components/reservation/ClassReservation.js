/* eslint-disable */
import React, {useState, useEffect} from "react";
import moment from 'moment'
import '../../css/ClassReservation.css'

function ClassReservation(){
    let [month, setMonth] = useState(moment())
    let [moveWeek, setMoveWeek] = useState(0);

    let [classInfo, setClassInfo] = useState([{}]);
    let [reservationInfo, setReservationInfo] = useState([{seq:3}, {seq:8}]);
    let [clickDay, setClickDay] = useState(moment().format("YYYYMMDD"))


    useEffect( async ()=>{
        await getClassSchedule()
        // await getResercationInfo();
    }, [])

    const getClassSchedule=async()=>{
        let userId = sessionStorage.getItem("userId")
        let url = 'http://52.79.235.2:8080/studio/getClassSchedule?userId='+userId;
        await axios.get(url).then( (res)=>{ setClassInfo(res.data) } )

    }

    function moveWeekFn(num){
        let cnt = moveWeek;
        if( num === 0 ){
            cnt = num;
        }

        setMoveWeek(cnt + num);
    }
    
    function ClickDayFn( data ){
        setClickDay(data)
        console.log(clickDay)
    }

    return (
        <div className="classReservation" >
            <div className="classCalendar">
                <div>
                    <div className="arrow-div div">
                        <img className="classCalendar-header btn" src="./images/left.png" onClick={ ()=>{ moveWeekFn(-1) } } />
                    </div>
                    <div className="day-div div">
                        <span className="classCalendar-header header-span">{month.format("YYYY년 MM월")}</span>
                        <img className="classCalendar-header btn header-date" src="./images/week.png" />
                        <img className="classCalendar-header btn header-date" src="./images/today.png" onClick={ ()=>{ moveWeekFn(0) } } />
                    </div>
                    <div className="arrow-div div right">
                        <img className="classCalendar-header btn" src="./images/right.png" onClick={ ()=>{ moveWeekFn(1) } } />
                    </div>
                </div>
                <Draw moveWeek={moveWeek} ClickDayFn={ClickDayFn}/>
            </div>
            <div className="class-info">
                <ClassDraw classInfo={classInfo} clickDay={clickDay} classSeq={reservationInfo}/>
            </div>
        </div>
    )
}

function Draw( props ){
    let [ofWeek, setOfWeek] = useState(['일', '월', '화', '수', '목', '금', '토'])

    function WeekFn(num){
        
        let _weekDay = [];
        const firstDayOfMonth = moment(moment().format("YYYYMM")).startOf('month');
        const firstDateOfMonth = firstDayOfMonth.get('d');
        const firstDayOfWeek = firstDayOfMonth.clone().add('days', -firstDateOfMonth);        

        let week = Number(moment().format('W'))+Number(num);

        const day = firstDayOfWeek.clone().add('d', Number(week) *7).format("YYYYMMDD");

        for(let i = 0; i < 7; i++){
            let data = moment(day).add('d',i).format("DD");
            let click = moment(day).add('d',i).format("YYYYMMDD");
            let today = moment().format("DD");
            let before = 0;
            
            // 오늘보다 날짜가 작은것 표시
            if( Number(data) < Number(today) ){
                before = -1;
            }
            _weekDay.push({ 
                clickDay : click,
                day : data, 
                week: ofWeek[i],
                before: before
            });
        }
        
        return _weekDay; 

    }

    function DrawFn(week){
        
        return (
            week.map(( data, i )=>{
                let className = "after-day";
                
                if( data.before < 0 ){
                    className = "before-day";
                }
        
                return (
                    <div className={"week-day"} key={i}>
                        <p className="ofWeek">
                            {data.week}
                        </p>
                        <p className={"ofWeek "+className} onClick={ ()=>{ props.ClickDayFn(data.clickDay) } }>
                            <b>{data.day}</b>
                        </p>
                    </div>
                )
            })
        )
    }
    
    return (
        <div>
            { DrawFn( WeekFn( props.moveWeek ) )}
        </div>
    )
}

function ClassDraw( props ){

    function ClassDrawFn( data, clickDay ){
        let classList = [];        

        data.find(function(res){
            if(res.YYMMDD === clickDay){
                classList.push(res);
            }
            
        })
        return classList;        
    }

    function DrawFn( data ){
        // return (
           return ( data.sort( function(a,b) {
                
                if( a.class_time.split("~")[0] < b.class_time.split("~")[0] ){
                    return -1;
                }

                if( a.class_time.split("~")[0] > b.class_time.split("~")[0] ){
                    return 1;
                }
                return 0;
            }).map((res, i)=>{
                let className = 'none';
                if( res.reservation === 1){
                    className = 'on';
                }
                console.log(res.reservation)
                return (
                    <div>
                        <div className="class-info-div" key={i} onClick={ ()=>{ ReservationFn(res.seq, res.reservation) } }>
                            <div class={"class_info-reservation "+className}>예약완료</div>
                            <h3 class="class-info-h3">{res.class_time}</h3>
                            <p>{res.class_name}</p>
                            <p>{res.teacher}</p>
                            <p><span className="user-span">예약인원/최대수강인원</span> {res.reservation_user}/{res.total_user}  </p>
                        </div>
                    </div>
                )
            })
           )
    }

    function ReservationFn( seq, reservation ){
        let userID = sessionStorage.getItem("userId");
        let url = 'http://52.79.235.2:8080/studio/reservationReg&seq='+seq+"&id="+userID;

        if( reservation === 1 ){
            url = url+"&num=1";
        }else if( reservation === 0 ){
            url = url+"&num=-1";
        }

        // axios.get(url).then( (res)=>{res.data} )
    }

    return (
        <div>
            { DrawFn(ClassDrawFn(props.classInfo, props.clickDay)) }
        </div>
    )
}

export default ClassReservation;