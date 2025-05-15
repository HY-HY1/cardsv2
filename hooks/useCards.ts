import { CreateCard } from "@/types/RequestTypes";
import { CreateCardResponse, GetCardsResponse } from "@/types/ResponseTypes";
import axios, { AxiosResponse } from "axios";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api/card";

export async function getCardsRequest(stackId: string) {
    const response : AxiosResponse<GetCardsResponse> = await axios.get(
        `${baseUrl}/${stackId}`
    )
    return response.data
}

export async function createCardRequest(stackId: string, data: CreateCard) {
    const response : AxiosResponse<CreateCardResponse> = await axios.post(
        `${baseUrl}/${stackId}`, data,
        {
            headers: { "Content-Type": "application/json" },
        }
    )
    return response.data
}

export async function editCardsRequest(cardId: string, data: CreateCard ) {
    const response : AxiosResponse<CreateCardResponse> = await axios.put(
        `${baseUrl}/${cardId}`, data,
        {
            headers: { "Content-Type": "application/json" },
        }
    )
    return response.data
}

export async function deleteCardRequest(cardId: string) {
    const response : AxiosResponse = await axios.delete(
        `${baseUrl}/${cardId}`
    )
    return response.data
}
