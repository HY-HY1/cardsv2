"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { Card } from "@/types/ResponseTypes"
import { CreateCard } from "@/types/RequestTypes"
import {
  getCardsRequest,
  createCardRequest,
  editCardsRequest,
  deleteCardRequest,
} from "@/hooks/useCards"

export interface CardsContextType {
  cards: Card[]
  loading: boolean
  getCards: (stackId: string) => Promise<void>
  createCard: (stackId: string, data: CreateCard) => Promise<void>
  editCard: (cardId: string, data: CreateCard) => Promise<void>
  deleteCard: (cardId: string) => Promise<void>
}

const CardsContext = createContext<CardsContextType | undefined>(undefined)

export function CardsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function getCards(stackId: string) {
    setLoading(true)
    try {
      const response = await getCardsRequest(stackId)
      console.log("GetCardsRequest Response", response)
      setCards(response.cards)
    } catch (error) {
      console.error("Error fetching cards:", error)
    } finally {
      setLoading(false)
    }
  }

  async function createCard(stackId: string, data: CreateCard): Promise<void> {
    try {
      const response = await createCardRequest(stackId, data)
      setCards((prev) => [...prev, response.card])
    } catch (error) {
      console.error("Error creating card:", error)
    }
  }

  async function editCard(cardId: string, data: CreateCard): Promise<void> {
    try {
      const response = await editCardsRequest(cardId, data)
      setCards((prev) =>
        prev.map((card) => (card._id === cardId ? response.card : card))
      )
    } catch (error) {
      console.error("Error editing card:", error)
    }
  }

  async function deleteCard(cardId: string): Promise<void> {
    try {
      await deleteCardRequest(cardId);
      setCards((prev) => prev.filter((card) => card.uuid !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  }
  

  return (
    <CardsContext.Provider
      value={{
        cards,
        loading,
        getCards,
        createCard,
        editCard,
        deleteCard,
      }}
    >
      {children}
    </CardsContext.Provider>
  )
}

export function useCardsContext() {
  const context = useContext(CardsContext)
  if (!context) {
    throw new Error("useCardsContext must be used within a CardsProvider")
  }
  return context
}
