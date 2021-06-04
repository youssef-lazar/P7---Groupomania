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
}
export default new PostService();