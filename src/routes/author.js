import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

export default function Author(){
    const [data, setData] = useState([])

  const getdata = async () => {
    let res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/users`);
    setData(res.data)
    console.log(res.data)
  }
  
  useEffect(
    () => {
      getdata()
      
    }, []
  )
    return (
    <div className="App">
      <header className="App-header" style={{display: "flex", flexDirection: "row"}}>
            |<Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/">Home</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/posts">Posts</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/categories">Categories</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/author">Authors</Link>|
        </header>
        <div className="App-body" style={{height: '87vh'}}>
      {data.map((author, index) => <Card className='Card' key={index} style={{margin: 10,display: 'flex', flexDirection: 'row'}}>
      <Card.Img style={{width: 200}} src={author.avatar_urls[96]}></Card.Img>
        <Card.Body>
        {/* <Card.Text></Card.Text> */}
           
                Name: {author.name} <span style={{ color: '#CFCFCF' }}>({author.slug})</span><br/>
                Description: {author.description}<br/>
                URL: {author.url}<br/>
                <Link to={'/posts'} state={{author: author.id }}>View posts</Link>
            
        </Card.Body>
        </Card>)}</div>
    </div>
  );
}

