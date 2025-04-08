import axios from "axios"

const axiosSucure = axios.create({
    baseURL: 'https://shoes-web-server.vercel.app'
})
const useAxioSecure = () => {
return axiosSucure
}

export default useAxioSecure
