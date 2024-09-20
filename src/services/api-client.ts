import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "3d8eece90b814f74bb27028e5bc27492",
    }
})

export { CanceledError }