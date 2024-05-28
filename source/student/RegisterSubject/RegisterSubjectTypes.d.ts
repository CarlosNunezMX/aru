import type { DirtyType } from "../../utils/generics/ResponseOK.js";

export type RegisterSubjectErrorType = {
    error: string
}

// TODO: type the response if it's not an error (replace "any")
export type RegisterSubjectType = RegisterSubjectErrorType[] | any;

export type DirtyRegisterSubject = DirtyType<RegisterSubjectType>