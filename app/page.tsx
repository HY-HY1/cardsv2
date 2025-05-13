// app/subject/SubjectTestPage.tsx
"use client"

import { useSubjectsContext } from "@/context/SubjectContext"
import { Subject } from "@/types/ResponseTypes"
import React from "react"

const SubjectTestPage = () => {
  const {
    subjects,
    getSubjects,
    createSubject,
    getSubjectById,
    editSubject,
    deleteSubject
  } = useSubjectsContext()

  console.log("Subjects", subjects)

  const id = "ef8355fb-c79a-4476-8c64-9ffb0e019ed9"

  return (
    <>
      <button onClick={() => getSubjects()}>
        Get Subjects
      </button> <br />

      <button onClick={() => createSubject({ name: "Business", description: "Cool business stuff" })}>
        Make Subject
      </button><br />

      <button onClick={() => getSubjectById(id)}>
        Get Subject By ID
      </button><br />

      <button onClick={() => editSubject({ name: "CS", description: "Updated desc", id })}>
        Edit Subject
      </button><br />

      <button onClick={() => deleteSubject(id)}>
        Delete Subject
      </button><br />

      <hr />
      <h2>All Subjects</h2>

      {
        subjects.map((i) => {
          return (
            <>
            {i.name}
            </>
          )
        })
      }
      
     

    </>
  )
}

export default SubjectTestPage
