import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

export default function Categories(){
    const [data, setData] = useState([])

  const getdata = async () => {
    let res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/categories`);
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
        {/* {data.map((post, index) => <div key={index} dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>)} */}
        {data.map((categories, index) => <Card className='Card' key={index} style={{margin: 10}}>
                                    <Card.Body>
                                      <Card.Title><Link className='postTitle' to={'/posts'} state={{category: categories.id }}>{categories.name}</Link></Card.Title>
                                      {/* <Card.Text></Card.Text> */}
                                      <Card.Text >{categories.description}</Card.Text>
                                    </Card.Body>
                                    </Card>)}</div>
    </div>
  );
}
