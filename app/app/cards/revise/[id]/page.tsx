"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useReviseContext } from '@/context/ReviseContext'
import { useSearchParams } from 'next/navigation'
import { string } from 'zod'

const page = () => {
  const { fetchRevisionData, reviseCard} = useReviseContext()
  const { id } = useParams()
  const searchParams = useSearchParams()

  const type = searchParams.get("type")
  console.log("Params", type)

  useEffect(() => {
    const fetchAll = async () => {
      if(!id  || typeof id !== "string"|| !type || typeof type !== "string") return

      const response = await fetchRevisionData(id, type)
      console.log("fetch Revision Data Response", response)
    }
    fetchAll()
  }, [])
  return (
    <div>
        All Revision here
    </div>
  )
}

export default page