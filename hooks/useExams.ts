import {
    CreateExamRequest,
    UpdateExamRequest,
    ExamIdParams,
    StackLinkParams,
  } from "@/types/RequestTypes";
  import {
    ExamResponse,
    ExamsResponse,
    CreateExamResponse,
    UpdateExamResponse,
    DeleteExamResponse,
    StackLinkResponse,
  } from "@/types/ResponseTypes";
  import axios, { AxiosResponse } from "axios";
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api/exams";
  
  export async function getExamsRequest() {
    const response: AxiosResponse<ExamsResponse> = await axios.get(`${baseUrl}`);
    return response.data;
  }
  
  export async function getExamByIdRequest(id: ExamIdParams["id"]) {
    const response: AxiosResponse<ExamResponse> = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  }
  
  export async function createExamRequest(data: CreateExamRequest) {
    const response: AxiosResponse<CreateExamResponse> = await axios.post(baseUrl, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
  
  export async function updateExamRequest(id: ExamIdParams["id"], data: UpdateExamRequest) {
    const response: AxiosResponse<UpdateExamResponse> = await axios.put(`${baseUrl}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
  
  export async function deleteExamRequest(id: ExamIdParams["id"]) {
    const response: AxiosResponse<DeleteExamResponse> = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  }
  
  export async function linkExamRequest({ id, stackId }: StackLinkParams) {
    const response: AxiosResponse<StackLinkResponse> = await axios.put(`${baseUrl}/${id}/${stackId}`, {}, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
  
  export async function removeLinkExamRequest({ id, stackId }: StackLinkParams) {
    const response: AxiosResponse<StackLinkResponse> = await axios.delete(`${baseUrl}/${id}/${stackId}`);
    return response.data;
  }
  