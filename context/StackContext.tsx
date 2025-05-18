"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
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
  getStackById: (stackId: string) => Stack | undefined
}

const StacksContext = createContext<StacksContextType | undefined>(undefined)

export function StacksProvider({ children }: { children: ReactNode }) {
  const [stacks, setStacks] = useState<Stack[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [cache, setCache] = useState<Record<string, { data: Stack[], timestamp: number }>>({})

  // Cache duration in milliseconds (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000

  const getStacks = useCallback(async (subjectId: string) => {
    // Check cache first
    const cachedData = cache[subjectId]
    const now = Date.now()

    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
      setStacks(cachedData.data)
      return
    }

    setLoading(true)
    try {
      const data = await getStackRequest(subjectId)
      setStacks(data.stacks)
      // Update cache
      setCache(prev => ({
        ...prev,
        [subjectId]: {
          data: data.stacks,
          timestamp: now
        }
      }))
    } catch (error) {
      console.error("Error fetching stacks:", error)
    } finally {
      setLoading(false)
    }
  }, [cache])

  const createStack = useCallback(async (subjectId: string, data: CreateStack) => {
    try {
      await createStackRequest(subjectId, data)
      // Invalidate cache for this subject
      setCache(prev => {
        const newCache = { ...prev }
        delete newCache[subjectId]
        return newCache
      })
      await getStacks(subjectId)
    } catch (error) {
      console.error("Error creating stack:", error)
    }
  }, [getStacks])

  const editStack = useCallback(async (stackId: string, data: EditStack) => {
    try {
      await editStackRequest(stackId, data)
      const currentStack = stacks.find(s => s.uuid === stackId)
      if (currentStack?.subjectId) {
        // Invalidate cache for this subject
        setCache(prev => {
          const newCache = { ...prev }
          delete newCache[currentStack.subjectId]
          return newCache
        })
        await getStacks(currentStack.subjectId)
      }
    } catch (error) {
      console.error("Error editing stack:", error)
    }
  }, [stacks, getStacks])

  const deleteStack = useCallback(async (stackId: string) => {
    try {
      const currentStack = stacks.find(s => s.uuid === stackId)
      if (currentStack?.subjectId) {
        await deleteStackRequest(stackId)
        // Invalidate cache for this subject
        setCache(prev => {
          const newCache = { ...prev }
          delete newCache[currentStack.subjectId]
          return newCache
        })
        await getStacks(currentStack.subjectId)
      }
    } catch (error) {
      console.error("Error deleting stack:", error)
    }
  }, [stacks, getStacks])

  const getStackById = useCallback((stackId: string) => {
    return stacks.find(s => s.uuid === stackId)
  }, [stacks])

  const value = useMemo(() => ({
    stacks,
    loading,
    getStacks,
    createStack,
    editStack,
    deleteStack,
    getStackById,
  }), [stacks, loading, getStacks, createStack, editStack, deleteStack, getStackById])

  return (
    <StacksContext.Provider value={value}>
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
