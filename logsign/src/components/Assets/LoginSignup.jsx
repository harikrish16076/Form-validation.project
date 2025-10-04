import React, { useEffect, useRef, useState } from 'react'
import './LoginSignup.css'


const LoginSignup = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [error,setError] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    useEffect(()=>{
        validateForm();
    },[name,email,pass])
    const validateForm = ()=>{
        const newError = {};
        if(!name.trim()){
            newError.name = "Name is required";
        }
        if(!email.trim()){
            newError.email = "Email is required";
        }else if(!/\S+@\S+\.\S+/.test(email)){
            newError.email = "Email is invalid";    
        }
        if(!pass.trim()){    
            newError.pass = "Password is required";
        }else if(pass.length < 6){
            newError.pass = "Password must be at least 6 characters";
        }
        setError(newError);
        return newError;
    
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formErrors = validateForm();
        if(Object.keys(formErrors).length > 0){
            if(formErrors.name){
                nameRef.current.focus();
            }else if(formErrors.email){
                emailRef.current.focus();
            }else if(formErrors.pass){
                passRef.current.focus();
            }
            return;
        }
            setIsSubmit(true);
            console.log("Form has submitted:",{name,email,pass});
            setName("");
            setEmail("");
            setPass("");
            setTimeout(()=>
                setIsSubmit(false), 2000);
            
    }; 
            
  return (
    <div>
        <h1>Signup</h1>
        <form className='form'>
            <label>Name</label>
            <input  placeholder='Enter Your Name'
            ref={nameRef}
            type="text" id='name' value={name} onChange={(e)=>setName(e.target.value)}
            
            />

            <label>Email</label>
            <input type="email" id='email' placeholder='Enter Your Email' 
            ref={emailRef}
            value={email} onChange={(e)=>setEmail(e.target.value)}

            />
            <label>Password</label>
            <input type="password" id="pass" placeholder='Enter Your Password' 
            ref={passRef}
            value={pass} onChange={(e)=>setPass(e.target.value)}

            />
            <button type='submit'>Submit</button>
            {Object.keys(error).length > 0 && (
                <div className='error'>
                    <ul>
                        {Object.values(error).map((err,index)=>(
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
            {isSubmit && (
                <div className='success'></div>
            )}
            {isSubmit && <p className='success'></p>
            }
            

            


            
        </form>
      
    </div>
  )
}

export default LoginSignup
