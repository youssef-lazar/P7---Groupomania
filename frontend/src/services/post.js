import auth from './auth';
import api from "./api";

class PostService {
   getAllPosts() {
        return api.get('/posts', { headers: auth() });
    }
    getOnePost(id) {
        return api.get('/posts/' + id, { headers: auth() });
    }
    createPost(data) {
        return api.post('/posts/', data, { headers: auth() })
    }
    modifyPost(id, data) {
        return api.put( '/posts/' + id , data, { headers: auth() })
    }
    deletePost(id) {
        return api.delete('/posts/' + id, { headers: auth() })
    }
    likePost(id) {
        return api.post('/posts/' + id + '/like',{}, { headers: auth() })
    }
    commentAPost(id, data) {
        return api.post('/posts/' + id + '/comment', data, { headers: auth() })
    }
    modifyComment(id,comment) {
        return api.put('/comment/' + id, {comment: comment}, { headers: auth() })
    }
    deleteComment(commentId) {
        return api.delete('/comment/' + commentId, { headers: auth() })
    }
}
export default new PostService();