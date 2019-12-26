import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api" 

export default{
    //여러가지 objects를 넣을 예정(함수)

    //모든 글 불러오기
    getAllPosts(){
        return axios.get('/posts/')
    },
    
    //글 작성하기
    createPost(data){
        return axios.post('/posts/',data)
    },

    //글 삭제하기
    deletePost(id){
        return axios.delete('/posts/'+String(id)) //axios.delete는 api명
    },


}