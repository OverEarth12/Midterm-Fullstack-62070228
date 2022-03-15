import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import background from "./photo-1553095066-5014bc7b7f2d.jpg"

function App() {
  
  
  return(
    <div>
        <header className="App-header" style={{display: "flex", flexDirection: "row"}}>
            |<Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/">Home</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/posts">Posts</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/categories">Categories</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/author">Authors</Link>|
        </header>
        <div className='App-body' style={{textAlign: "center", height: '87vh' ,backgroundSize: 'cover',backgroundImage: `url(${background})`}}>
            <h1>WELCOME TO BLOG!</h1>
            
        </div>
        
    </div>
);
}

export default App;
