"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { Stack } from "@/types/ResponseTypes"
import { CreateStack, EditStack } from "@/types/RequestTypes"
import {
  getStackRequest,
  createStackRequest,
  editStackRequest,
  deleteStackRequest,
} from "@/hooks/useStack"

export interface StacksContextType {
  stacks: Stack[]
  loading: boolean
  getStacks: (subjectId: string) => Promise<void>
  createStack: (subjectId: string, data: CreateStack) => Promise<void>
  editStack: (stackId: string, data: EditStack) => Promise<void>
  deleteStack: (stackId: string) => Promise<void>
}

const StacksContext = createContext<StacksContextType | undefined>(undefined)

export function StacksProvider({ children }: { children: ReactNode }) {
  const [stacks, setStacks] = useState<Stack[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function getStacks(subjectId: string) {
    setLoading(true)
    try {
      const data = await getStackRequest(subjectId)
      setStacks(data.stacks)
    } catch (error) {
      console.error("Error fetching stacks:", error)
    } finally {
      setLoading(false)
    }
  }

  async function createStack(subjectId: string, data: CreateStack) {
    try {
      await createStackRequest(subjectId, data)
      await getStacks(subjectId)
    } catch (error) {
      console.error("Error creating stack:", error)
    }
  }

  async function editStack(stackId: string, data: EditStack) {
    try {
      await editStackRequest(stackId, data)
      const currentSubjectId = stacks.find(s => s.uuid === stackId)?.uuid
      if (currentSubjectId) {
        await getStacks(currentSubjectId)
      }
    } catch (error) {
      console.error("Error editing stack:", error)
    }
  }

  async function deleteStack(stackId: string) {
    try {
      const currentSubjectId = stacks.find(s => s.uuid === stackId)?.uuid
      await deleteStackRequest(stackId)
      if (currentSubjectId) {
        await getStacks(currentSubjectId)
      }
    } catch (error) {
      console.error("Error deleting stack:", error)
    }
  }

  return (
    <StacksContext.Provider
      value={{
        stacks,
        loading,
        getStacks,
        createStack,
        editStack,
        deleteStack,
      }}
    >
      {children}
    </StacksContext.Provider>
  )
}

export function useStacksContext() {
  const context = useContext(StacksContext)
  if (!context) {
    throw new Error("useStacksContext must be used within a StacksProvider")
  }
  return context
}
