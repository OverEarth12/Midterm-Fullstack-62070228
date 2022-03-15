import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button , Container, Form} from 'react-bootstrap';
import { Link, useLocation, useParams , Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

export default function Detail(){
    const [data, setData] = useState([])
    const [comment, setComment] = useState([]);
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(<div></div>);
    const [name, setName] = useState("Anonymous");
    const [newComment, setPostComment] = useState("");

  const getdata = async () => {
    let res;
    if(location.state != null){
        res =  await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${location.state.post}`);
        setData(res.data)
        console.log(res.data)
        setTitle(res.data.title.rendered)
        setContent(res.data.content.rendered)
    }
    let res2 = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${location.state.post}`);
        let sortcomment = res2.data
        sortcomment.sort((a,b) => (a.date > b.date) ? -1 : 1)
        console.log(sortcomment)
        setComment(sortcomment)
  }

  function handleChangeComment(e){
    setPostComment(e.target.value)
    
  }
  function handleChangeName(e){
    if(e.target.value === ""){
      setName("Anonymous")
    }else{
      setName(e.target.value)
    }
    
  }

  const handleSubmit = async () => {
    await axios.post(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/comments`
      ,
      {
        "content": newComment,
        "post": location.state.post,
        "author_name": name
      },
      {headers: {
        Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        'Content-Type': 'application/json'
      }})
    getdata()
  }
  
  useEffect(
    () => {
      getdata()
      console.log(newComment)
    }, []
  )
  if(location.state == null){
    return <Navigate to="/posts"/>;
  }
  return(
    <div className="App">
        <header className="App-header" style={{display: "flex", flexDirection: "row"}}>
            |<Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/">Home</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/posts">Posts</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/categories">Categories</Link>|
            <Link className='link' style={{paddingRight:10, paddingLeft:10}} to="/author">Authors</Link>|
        </header>
        <div className="App-body">
        <Container style={{backgroundColor: "#414855", padding: 30}}>
            <h2>
                {title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <Card style={{paddingTop:20, paddingLeft:20, backgroundColor: "#282c34"}} variant="outlined" width="100%">
                <Card.Title>Comment</Card.Title>
                <Card.Body>
                <Form>
                  <Form.Control type="text" placeholder="Display Name (Optional)" onChange={handleChangeName}/>
                  <Form.Control type="text" placeholder="Enter your comment here..." onChange={handleChangeComment}/>
                  <Button disabled={newComment === ""} style={{marginTop: 10}} variant="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
                {comment.map((comment, index) => <Card className='Card' key={index} style={{margin: 10}}>
                                    <Card.Body>
                                      <Card.Title><img src={comment.author_avatar_urls[48]}/> {comment.author_name} {" "} <span style={{ color: '#CFCFCF' }}>{comment.date}</span></Card.Title>
                                      {/* <Card.Text></Card.Text> */}
                                      <Card.Text dangerouslySetInnerHTML={{ __html: comment.content.rendered }}></Card.Text>
                                    </Card.Body>
                                    </Card>)}
                </Card.Body>
            </Card>
        </Container>
        </div>
    </div>
  );
}