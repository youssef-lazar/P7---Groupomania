import api from "./api";
import auth from './auth';

class UserService {
    signup(data) {
        return api.post('/user/signup', data);
    }
    login(data) {
        return api.post('/user/login', data);
    }
    getAllUsers() {
        return api.get('/user', { headers: auth() });
    }
    getOneUser(id) {
        return api.get( '/user/' + id, { headers: auth() })
    }
    modifyUser(id, data) {
        return api.put( '/user/' + id , data, { headers: auth() })
    }
    deleteUser(id) {
        return api.delete('/user/' + id, { headers: auth() });
    }
}
export default new UserService();