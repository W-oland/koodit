import axios from 'axios'
const baseURL = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseURL, credentials)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login } 