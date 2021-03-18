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
        return api.post('/posts/new', data, { headers: auth() })
    }
    deletePost(postId, data) {
        return api.delete('/posts/' + postId, { headers: auth(), data: data })
    }
}
export default new PostService();