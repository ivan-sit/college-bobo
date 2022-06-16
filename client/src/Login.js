import {useRef, useState, useEffect, useContext} from 'react';
// import AuthContext from "./AuthProvider";
import Button from '@mui/material/Button';

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () =>{

    // const {setAuth} = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[user, pwd])

     const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response= await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // setAuth({user,pwd,roles,accessToken}) //for??
            setUser('');
            setPwd('');
            setSuccess(true);
        }catch(err){
            if(!err?.response)//no error but no response
            {
                setErrMsg('No Server Response')
            }
            else if(err.response?.status===400)
            {
                setErrMsg('Missing Username or Password');

            }
            else if(err.response?.status===401)
            {
                setErrMsg('Unauthorized');
            }
            else 
            {
                setErrMsg('Login Failed');
            }
        }   
        errRef.current.focus();

        
     }
    return (
       
        <>
        {success?(
            <section>
                <h1>
                    You are logged in!</h1>
                <br />
                <p>
                    <a href='#'>Go to Home</a>
                </p>
                </section>
        ):(
                
        
        <section>
            <p ref={errRef} className={errMsg ?"errmsg": "offcreen"}aria-live="assertive">{errMsg}</p>
            <h1>sign in </h1>
            <form onSubmit ={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=>setUser(e.target.value)}
                    value={user}
                    required

                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    
                    autoComplete="off"
                    onChange={(e)=>setPwd(e.target.value)}
                    value={pwd}
                    required

                />
                <button>Sign In</button>
                
                {/* <Button variant="contained">Contained</Button> */}

            </form >
            <p>
                Need and Account?<br />
                <span className='line'>
                    {/* {router link} */}
                    <a href="#">Sign Up</a>
                </span>
                {/* <img>
        src=""
        </img> */}
            </p>

           
             {/* <div className="w-100 text-center mt-2">
      Sign Up? <Link to ="/Register">register</Link>
      
    </div> */}
   
        </section>
        )}
        </>
    )
}

export default Login