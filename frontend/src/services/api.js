import axios from "axios";
const url = window.location.protocol + '//' + window.location.hostname + ':3000/api';

export default axios.create({
    baseURL: url,
})