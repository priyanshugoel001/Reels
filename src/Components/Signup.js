import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';
import { storage,database } from '../Components/firebase';
function Signup() {
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const [file,setFile] = useState(null)
    const {signup} =useContext(AuthContext);
    const handleSignup =async (e)=>{
        e.preventDefault();
        setLoading(true);
        let res = await signup(email,password);
        let uid = res.user.uid;
        console.log(uid); 
        setLoading(false)
        const uploadTaskListener=storage.ref(`/users/${uid}/profileImg`).put(file);
        // fn1  this is for progress
        // fn2 this is for error
        // fn3 is for success
        uploadTaskListener.on('state_changed',fn1,fn2,fn3)
        }
    const handlefileSubmit=(e)=>{
        const file=e.target.files[0];
        if(file!=null)
        {
            setFile(file);
        }
       
    }  
    return (
        <div>
            <form onSubmit={handleSignup} >
                <div>
                    <label htmlFor=''>UserName</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='profile'>Profile image</label>
                    <input type='file' accept='image/*' onChange={handlefileSubmit}></input>
                </div>
                <button type='submit' disabled={loading}>SignUp</button>
            </form>
        </div>
    )
}
export default Signup