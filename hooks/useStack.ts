import axios, { AxiosResponse } from "axios";
import {
  GetStackResponse,
  CreateStackResponse,
  EditStackResponse,
  DeleteStackResponse,
} from "@/types/ResponseTypes";
import { CreateStack, EditStack } from "@/types/RequestTypes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api";

export async function getStackRequest(subjectId: string) {
  const response: AxiosResponse<GetStackResponse> = await axios.get(
    `${baseUrl}/stack/${subjectId}`
  );
  return response.data;
}

export async function createStackRequest(subjectId: string, data: CreateStack) {
  const response: AxiosResponse<CreateStackResponse> = await axios.post(
    `${baseUrl}/stack/${subjectId}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function editStackRequest(stackId: string, data: EditStack) {
  const response: AxiosResponse<EditStackResponse> = await axios.put(
    `${baseUrl}/stack/${stackId}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteStackRequest(stackId: string) {
  const response: AxiosResponse<DeleteStackResponse> = await axios.delete(
    `${baseUrl}/stack/${stackId}`
  );
  return response.data;
}
