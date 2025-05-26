"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useReviseContext } from '@/context/ReviseContext'
import { useSearchParams } from 'next/navigation'

const page = () => {
  const { fetchRevisionData, reviseCard} = useReviseContext()
  const { id } = useParams()
  const searchParams = useSearchParams()

  const type = searchParams.get("type")

  useEffect(() => {

  }, [])
  return (
    <div>
        All Revision here
    </div>
  )
}

export default page