export default function auth () {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
        return { 'Authorization': `Bearer ${currentUser.token}` }
    } else {
        return undefined
    }
}