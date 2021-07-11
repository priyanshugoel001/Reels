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
        try{
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
            function fn1(snapshot){
             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             console.log('Upload is ' + progress + '% done');         
            }
           function fn2(error){
             setError(error);
             setTimeout(()=>{
                setError('')
              },2000);
             setLoading(false)
            }
            async function fn3(){
              let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
        uploadTaskListener.on('state_changed',fn1,fn2,fn3)
        await database.users.doc(uid).set({
            email:email,
            username:name,
            userId:uid,
            profileUrl:downloadUrl,
            createdAt:database.getCurrentTimeStamp(),
            postId:[]
        })
        setLoading(false);
        console.log("user has signed Up");
        }}
        catch(error)
        {
            console.log(error);
            setError(error);
            setTimeout(()=>{
            },2000);
            setLoading(false);
        }
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