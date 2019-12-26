import React from 'react';
import './App.css';
import api from './api'
import PostView from './Components/PostView'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { //파일구조
        title:'', //input
        content: '', //textarea
        results: [],
    }
  }

componentDidMount(){
  this.getPosts()
}

async getPosts(){
  const _results = await api.getAllPosts()
  //_results.data 에 아무것도 없어서 오류남 -> 비동기여서!
  this.setState({results:_results.data}) //앞의 _는 input을 의미
  console.log(_results)
}


  handlingChange = (event) => {
    this.setState(({[event.target.name]: event.target.value}))
  }

  handlingSubmit = async (event) => {
    //api를 통해 실제 api로 보내기
    event.preventDefault() // event의 기본 기능들을 막음
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("success", result.data)
    this.setState({title:'', content:''}) //input 초기화
    this.getPosts()
  }

handlingDelete = async (event) => {
  await api.deletePost(event.target.value)
  this.getPosts()
}

  //form : 보내는 데이터 정보의단위
  render(){
    return (
      <div className="App">
        <div className="PostingSection">
          <h2>대나무숲 글 작성하기</h2>
          <form onSubmit={this.handlingSubmit}>
          <input 
            name="title"
            value={this.state.title}
            onChange={this.handlingChange}
          />
          <textarea 
            name="content"
            value={this.state.content}
            onChange={this.handlingChange}
          />
          <button type="submit">제출하기</button>
          </form>
        </div>
        <div className="ViewSection">
          {
            this.state.results.map((post) => 
            <div>
            <PostView key = {post.id} title={post.title} content = {post.content} />
            <button value={post.id} onClick={this.handlingDelete}>삭제하기</button>
            </div>
            )
          }
  
        </div>
      </div>
    );
  }
}

export default App;
