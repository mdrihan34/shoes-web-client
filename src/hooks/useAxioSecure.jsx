import axios from "axios"

const axiosSucure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxioSecure = () => {
return axiosSucure
}

export default useAxioSecure
