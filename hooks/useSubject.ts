// hooks/useSubjects.ts
import { CreateSubject, EditSubject } from "@/types/RequestTypes"
import { CreateSubjectResponse, GetSubjectByIDResponse, GetSubjectsRequestTypes, Subject } from "@/types/ResponseTypes"
import axios, { AxiosResponse } from "axios"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api"

export async function getSubjectsRequest() {
  const response : AxiosResponse<GetSubjectsRequestTypes> = await axios.get(`${baseUrl}/subject`)
  return response.data
}

export async function getSubjectByIdRequest(id: string) {
  const response : AxiosResponse<GetSubjectByIDResponse> = await axios.get(`${baseUrl}/subject/${id}`)
  return response.data
}

export async function createSubjectRequest(data: CreateSubject) {
  const response : AxiosResponse<CreateSubjectResponse> = await axios.post(`${baseUrl}/subject`, data, {
    headers: { "Content-Type": "application/json" },
  })
  return response.data
}

export async function editSubjectRequest(data: EditSubject) {
  const { id, name, description } = data
  await axios.put(`${baseUrl}/subject/${id}`, { name, description }, {
    headers: { "Content-Type": "application/json" },
  })
}

export async function deleteSubjectRequest(id: string) {
  await axios.delete(`${baseUrl}/subject/${id}`)
}
