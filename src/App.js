import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import './App.css';
import { db,auth } from './firebase.js';
import Post from './Post.js';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },  
}));
function App() {
  const classes= useStyles();
  const [modalStyle]=useState(getModalStyle);
  const [posts, setPosts] =useState([]);
  const [open, setOpen] =useState(false);
  const[OpenSignIn,setOpenSignIn] =useState(false); 
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [user,setUser]=useState(null);

useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged((authUser) => {
   if (authUser){
     //user logged in
     console.log(authUser);
     setUser(authUser); 
    }

    else
    {
      setUser(null);
    }

  })

     return ()=>
      {
      unsubscribe();
      }
}, [user,username]);



  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>
      {
        setPosts(snapshot.docs.map(doc=>({ id: doc.id,
        post: doc.data()})));
      })

    },[]);
   
    const SignUp = (event)=>
    {
      event.preventDefault();

     auth
     .createUserWithEmailAndPassword(email,password)
     .then(authUser => {
       return authUser.user.updateProfile({
         displayName: username
       })
     })
     .catch((error)=>alert(error.message));
     setOpen(false);
    }
    const SignIn = (event) =>{
       event.preventDefault();
      auth
      
      .signInWithEmailAndPassword(email,password)
      .catch ((error) => alert(error.message))
     
      setOpenSignIn(false);
    } 
   


    return (
      
      <div className="app"> 
       

            
        <Modal
        open={OpenSignIn}
       onClose={()=>setOpenSignIn(false)} >
       
          <div style={modalStyle} className={classes.paper}>
           <form >
             
           <center>
             <div className = "app__header"></div>
           <img  className="app__headerImage" src="new1.png" alt=""></img> 
            
           
             <Input
              placeholder='username'
              type ="text"
              value= {username}
              onChange={(e)=>setUsername(e.target.value)}
              />
             <Input
               placeholder='email'
               type= 'text'
                value={email}
               onChange={(e)=>setEmail(e.target.value)}
               />
              <Input 
                placeholder ='password'
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
               <Button  type='submit' onClick = {SignIn}>SignIn</Button>
                </center>
                  </form>
                
                 </div>
                 
               </Modal> 
      
               <div className="app__header">
      
                 <img  className="app__headerImage" src="new1.png" alt=""></img> 
      
       
                { user ? (
                    <Button onClick={()=>auth.signOut()}>Logout</Button>
                    ):
                   (
            
                    <div className = "app__loginContainer">
                    <Button onClick ={()=> setOpenSignIn(true)}>SignIn</Button>
                    <Button onClick ={()=> setOpen(true) }>SignUp</Button>
                    </div>
                  )
                }
                            
         
                       <div classname = "app__posts">
                         <div classname = "app_postsLeft">
                           {
                           posts.map(({id,post}) => ( 
                             <Post key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
                           ))} 
                            
                           <div/>
                        <div className = "app__postsRight">
                          <InstagramEmbed
                             url='https://www.instagram.com/p/B_uf9dmAGPw/'
                              maxwidth = {320}
                              hideCaption = {false}
                              containerTagName='div'
                              protocol=''
                              injectScript
                              onLoading={() => {}}
                              onSuccess={() => {}}
                              onAfterRender={() => {}}
                              onFailure={() => {}} >
                              </InstagramEmbed>
                         </div>
                        </div>
       


                        
                      
                        {user?.displayName ? 
                    
                       (
                        <ImageUpload username={user.displayName}/>
                          ): 
                          (
                            <center>
                              <h3>Login to Upload</h3>
                            </center>
                          )
     }

     </div>
  </div>  

</div>
    )}
     
export default App;
