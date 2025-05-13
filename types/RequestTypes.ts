export interface CreateSubject {
    name: string ,
    description: string | undefined
}

export interface EditSubject extends CreateSubject {
    id: string,

}