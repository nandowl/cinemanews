import axios from 'axios'

//http://localhost:3003/

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/nandowl/fakeapirest/'    
})

export default api