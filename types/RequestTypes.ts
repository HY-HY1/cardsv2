export interface CreateSubject {
    name: string ,
    description: string | undefined
}

export interface EditSubject extends CreateSubject {
    id: string,

}
export interface CreateStack extends CreateSubject {}
export interface EditStack extends CreateSubject {}