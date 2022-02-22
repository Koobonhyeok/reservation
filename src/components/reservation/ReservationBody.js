/* eslint-disable */
import React, {useState} from "react";

function ReservationBody(props){
    let [radio, setRadio] = useState([{value: '기간제'},{value: '횟수제'}])
    let [membership, setMembership] = useState({group : '기간제, 그룹형, 4:1, 주6회', detail:'1개월', stDate:'2021.12.28', enDate:'2022.1.26'})
    let [membershipList, setMembershipList] = useState([{member:'기간제', group : '기간제, 그룹형, 4:1, 주6회', detail:'1개월', stDate:'2021.12.28', enDate:'2022.1.26'}
                                                    ,{member:'횟수제', group : '횟수제. 그룹형', detail:'41일', stDate:'2022.02.01', enDate:'2022.3.13'}])
    let [tab, setTab] = useState(true)
                                                    
    function radioFn(){
        let check = '1';
        return radio.map((radio,i)=>{
            return (
                <div className="map-div" key={i} >
                    <label className="user-radio" >
                        <input className="user-radio " onClick={ ()=>{memderDetailFn(radio.value)} }  name="membership-radio" type="radio" />
                        {radio.value}
                    </label>
                </div>
            )
        })
    }

    let [className, setClassName] = useState('member');

    function memderDetailFn(value){
        let data = membershipList.find(function(res){
            if( res.member === value ){
                return res
            }
        })
        setMembership(data);
        
        setTab(true);
        setClassName('member')

    }

    function changeTab(param, e){
        setClassName(param);
        if( className !== param ){
            setTab(!tab)
        }
        
    }

    return (
        <div className="reservation-body">
            <div className="body-nav-left">
                {/* { radio.map((radio,i)=>{ radio.val }) } */}
                <div className="radio-main">
                    {radioFn()}
                </div>
                <div className="radio-main-detail">
                    <p>{membership.group}</p>
                    <p>{membership.detail}</p>
                    <p>{membership.stDate} ~ {membership.enDate}</p>
                </div>
            </div>
            <div className="body-nav-right">
                <div className="tab-main">
                    <div className={"body-tab-left "+(className == 'member' ? 'targetTab' : '')} onClick={ (e)=>{ changeTab("member", e) } } >
                        수강권 정보
                    </div>
                    <div className={"body-tab-right "+(className== 'use' ? 'targetTab' : '')} onClick={ (e)=>{ changeTab("use", e) } }>
                        이용 내역
                    </div>
                </div>
                {
                    tab === true ?
                    <MembershipInfo membership={membership} /> : <UseHistory classInfo={props.classInfo} />
                }
            </div>
        </div>
    )
}

function MembershipInfo(props){
    
    return (
        <div>
            <div className="membership-info">
                <p>
                    <b>잔여일</b>
                </p>
                <h2>
                    {props.membership.stDate} ~ {props.membership.enDate} (12일)
                </h2>
            </div>
            <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.membership.stDate} ~ {props.membership.enDate}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;주간 최대 이용 횟수 6회 제한</p>
            </div>
        </div>
    )
}

function UseHistory(props){
    let [classTime, setClassTime] = useState(props.classInfo);
    // console.log("        "+props.classInfo);
    function sortFn(param){
        let date = [];
        
        classTime.sort( function(a,b){
            // b가 1번 a가 2번
            
            if( param === 'down' ){
                if( a.seq > b.seq ){
                    return -1;
                }
                if( a.seq < b.seq ){
                    return 1;
                }
            }
            if( param === 'up' ){
                if( a.seq > b.seq ){
                    return 1;
                }
                if( a.seq < b.seq ){
                    return -1;
                }
            }
            return 0;
        } ).map((data)=>{
            date.push(data);
        })

        setClassTime(date)
    }

    function reservationFn(){
        let num = classTime.length;
        let data = [];
        for( let i=0; i < num; i++){
            if( classTime[i].reservation === 1 ){
                data.push(classTime[i])
            }
            
        }
        console.log(data)
        setClassTime(data)
        
    }

    function classTimeDrawFn(){
        return classTime.map((classTime,i)=>{
            return (
                <div className="classTime" key={i} >                
                    <h3>&nbsp;* {classTime.class_time}</h3>
                    <p>&nbsp;* {classTime.class_name}</p>
                    <p>&nbsp;* {classTime.teacher}</p>
                    <p>&nbsp;* 예약인원/최대수강인원 : {classTime.reservation_user} / {classTime.total_user}</p>
                </div>
            )
        })
    }

    return (
        <div>
            <div className="useHistory-sort">
                <label className="sort-up"><input type="radio" className="sort-up" name="sort" onClick={ ()=>{sortFn('up')} } />수업일 오름차순</label>
                <label className="sort-down"><input type="radio" className="sort-down" name="sort" onClick={ ()=>{sortFn('down')} } />수업일 내림차순</label>
            </div>
            <div className="useHistory-classTime">
                {classTimeDrawFn(reservationFn())}

            </div>
        </div>
    )
}

export default ReservationBody;