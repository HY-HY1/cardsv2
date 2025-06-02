import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export async function getImageByName(filename: string) {
    try {
        if(!baseURL) return
        const response = await axios.get(`${baseURL}/api/upload/${filename}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}