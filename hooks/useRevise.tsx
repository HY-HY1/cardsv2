import { getRevisionCards } from "@/types/ResponseTypes"
import axios, { AxiosResponse } from "axios"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api/revise";

interface getRevisionCardsRequestProps {
    id: string,
    type: string
}

export async function getRevisionCardsRequest({ id, type } : getRevisionCardsRequestProps) {
    try {
        const response: AxiosResponse<getRevisionCards> = await axios.post(`${baseUrl}`,
            { type: type, uuid: id }
        )
        return response.data
    } catch (error: unknown) {
        console.error(error)
    }
}