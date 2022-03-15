import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link, useLocation, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

export default function Posts(){
    const [data, setData] = useState([])
    const location = useLocation();

  const getdata = async () => {
    console.log(location);
    let res;
    if(location.state != null){
        if(location.state.category){
            res =  await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?categories=${location.state.category}`);
        }else if(location.state.author){
            res =  await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?author=${location.state.author}`);
        }
    }else{
        res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts`);
    }
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
        <div className="App-body" >
        {/* {data.map((post, index) => <div key={index} dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>)} */}
        {data.map((post, index) => <Card className='Card' key={index} style={{marginBottom: 10}}>
                                    <Card.Body>
                                      <Card.Title><Link className='postTitle' to="/detail" state={{post: post.id }}>{post.title.rendered}</Link></Card.Title>
                                      {/* <Card.Text></Card.Text> */}
                                      <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></Card.Text>
                                    </Card.Body>
                                    </Card>)}</div>
    </div>
  );
}