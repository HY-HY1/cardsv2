// context/SubjectsProvider.tsx
"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { Subject } from "@/types/ResponseTypes"
import { CreateSubject, EditSubject } from "@/types/RequestTypes"
import {
  getSubjectsRequest,
  getSubjectByIdRequest,
  createSubjectRequest,
  editSubjectRequest,
  deleteSubjectRequest,
} from "@/hooks/useSubject"

import { useRouter } from "next/navigation"

export interface SubjectsContextType {
  subjects: Subject[]
  loading: boolean
  getSubjects: () => Promise<void>
  getSubjectById: (id: string) => Promise<Subject | null>
  createSubject: (subject: CreateSubject) => Promise<void>
  editSubject: (subject: EditSubject) => Promise<void>
  deleteSubject: (id: string) => Promise<void>
}


const SubjectsContext = createContext<SubjectsContextType | undefined>(
  undefined
)

export function SubjectsProvider({ children }: { children: ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()

  async function getSubjects() {
    setLoading(true)
    try {
      const data = await getSubjectsRequest()
      setSubjects(data.results)
    } catch (error) {
      console.error("Error fetching subjects:", error)
    } finally {
      setLoading(false)
    }
  }

  async function getSubjectById(id: string): Promise<Subject | null> {
    try {
      const response = await getSubjectByIdRequest(id)
      if (!response.subject) return null
      const subject = response.subject as unknown as Subject
      return subject
    } catch (error) {
      console.error("Error fetching subject:", error)
      return null
    }
  }

  async function createSubject(data: CreateSubject): Promise<void> {
    try {
      const response = await createSubjectRequest(data)
      console.log(response)
      await getSubjects() // refresh after creating
      router.push(`/app/${response.data.uuid}`)
    } catch (error) {
      console.error("Error creating subject:", error)
    }
  }

  async function editSubject(data: EditSubject): Promise<void> {
    try {
      await editSubjectRequest(data)
      await getSubjects() // refresh after editing
    } catch (error) {
      console.error("Error editing subject:", error)
    }
  }

  async function deleteSubject(id: string): Promise<void> {
    try {
      await deleteSubjectRequest(id)
      await getSubjects() // refresh after deleting
    } catch (error) {
      console.error("Error deleting subject:", error)
    }
  }

  useEffect(() => {
    getSubjects()
  }, [])

  return (
    <SubjectsContext.Provider
      value={{
        subjects,
        loading,
        getSubjects,
        getSubjectById,
        createSubject,
        editSubject,
        deleteSubject,
      }}
    >
      {children}
    </SubjectsContext.Provider>
  )
}

export function useSubjectsContext() {
  const context = useContext(SubjectsContext)
  if (!context) {
    throw new Error("useSubjectsContext must be used within a SubjectsProvider")
  }
  return context
}
