export default function auth () {
    let token = sessionStorage.getItem('jwt')
    if (token) {
        return { 'Authorization': `Bearer ${token}` }
    } else {
        return undefined
    }
}