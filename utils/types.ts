export interface IUser {
    id: number
    name: string
    password: string
    username: string
    email: string
    role: string
}

export interface INote {
    id: number
    user_id: number
    title: string
    content: string
}