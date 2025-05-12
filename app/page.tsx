"use client"
import { useSubjects } from '@/hooks/useSubject'
import React from 'react'

const page = () => {
  const id = "b2ccf3d4-c718-4404-bc1b-27521bded4d5"
  const { getSubjects, createSubject, getSubjectById, editSubject, deleteSubject } = useSubjects()
  return (
    <>
    <button onClick={() => getSubjects()}>
      Get Subject
    </button> <br />
    <button onClick={() => createSubject({ name: "Business", description: "Cool business stuff"})}>
      Make Subject
    </button><br />
    <button onClick={() => getSubjectById(id)}>
      Get Subject By ID
    </button><br />
    <button onClick={() => editSubject({ name: "CS", description: "", id: id})}>
      Edit Subject
    </button><br />
    <button onClick={() => deleteSubject(id)}>
      Delete Subject
    </button>
    </>
  )
}

export default page
