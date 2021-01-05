import React from 'react';
import  './Post.css'; 
import Avatar from '@material-ui/core/Avatar';

function Post() {
    return (
        <div className ="post">
            <Avatar
            className ="post__avatar"
            
            src="/static/images/avatar/1.jpg"
              alt="Jeyprakash"/>
              <h2>Jeyprakash</h2>
         
         <img  className = "post__image"  src= "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg" alt="" />
         <h4 className = "post__text"><strong>Jeyprakash</strong> : amazing....</h4>
        </div>
    )
}

export default Post 

