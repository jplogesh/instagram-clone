import Post from './Post.js';
import './App.css';
import React,{useEffect,useState} from 'react';
import { db } from './firebase.js';

function App() {
  const [posts, setPosts] =useState([
   
  ] );
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>
      {
        setPosts(snapshot.docs.map(doc=>doc.data()))
      })

    },[]);
  return (
      
    
    
    <div className="app__header">
      <img  className="app__headerImage" src="insta logo.png" alt=""></img>
     
       <h2> instagram clone gonna be a fun! </h2>
       {posts.map(post => 
         <Post username={post.username} caption={post.captions} imageUrl={post.imageUrl}
       />)} 
       <Post username="karthi" caption="that's cool..." imageUrl="basic.png" /> 
       
     <Post username="dinesh" caption="awesome mannn" imageUrl="basic.png" />
     <Post  username="jey" caption="good to see its working" imageUrl="basic.png" />

     </div>
      
    );
}

export default App;
