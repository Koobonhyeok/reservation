import React, {useState} from 'react';
import axios from 'axios';

function Login(){
    let [id, setId] = useState('');
    let [pw, setPw] = useState('');

    const loginClick=()=>{
        let url = 'http://52.79.235.2:8080/studio/loginCheck';
        // 데이터 전송 추후에 더 확인
        let body = "userid="+id+"&userpw="+pw;
    
        console.log(body)
        axios.post(url, body,{
            headers: {
              "content-Type": `application/x-www-form-urlencoded`,
            },
          }).then( (res)=>{ 
              if( res.data.retCd === '0000' ){
                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('userNm', res.data.userNm)
                document.location.href='/';
              }else{
                  alert(res.data.retMsg)
              }
           } )
        

        
    }

    return (
        <div className='login-header'>
            <div>
                ID : <input value={id} onChange={ (e)=>{ setId(e.target.value) } } placeholder='ID' /> 
                &nbsp;&nbsp;&nbsp;
                PW : <input value={pw} onChange={ (e)=>{ setPw(e.target.value) } } placeholder='PW' />
                &nbsp;&nbsp;&nbsp;
                <button onClick={loginClick}>로그인</button>
            </div>
        </div>
    )
}

export default Login;