import { ObjectState } from "./ObjectState";

export interface  BaseEntity
{
    code:string;
    error?:string;
    createdAt:Date;
    updatedAt:Date;
    state:Object;
}