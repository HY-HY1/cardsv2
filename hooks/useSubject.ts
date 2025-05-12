"use client"
import { CreateSubject, EditSubject } from "@/types/RequestTypes"
import axios, { AxiosResponse } from "axios"
import { useState } from "react"

export function useSubjects() {
    const [ loading , setLoading ] = useState<boolean>(true)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/api'

    async function getSubjects() : Promise<void> {
        try {
            const response = await axios.get(`${baseUrl}/subject`)
        } catch (error) {
            console.error(error)
        }
    }

    async function createSubject({ name, description}: CreateSubject ) : Promise<void> {
        try {
            const response = await axios.post(`${baseUrl}/subject`,
                { name: name, description: description}, 
                {
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    async function getSubjectById(id: string) : Promise<void> {
        try {
            const response = await axios.get(`${baseUrl}/subject/${id}`,
                {
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    async function editSubject({ name, description, id } : EditSubject) : Promise<void> {
        try {
            const response = await axios.put(`${baseUrl}/subject/${id}`,
                {name: name, description: description},
                {
                    headers: {
                        "Content-Type" : "application/json"
                    }
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteSubject(id: string) : Promise<void> {
        try {
            const response = await axios.delete(`${baseUrl}/subject/${id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return { getSubjectById, getSubjects, createSubject, deleteSubject, editSubject}



}