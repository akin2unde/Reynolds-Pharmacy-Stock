import { BaseEntity } from "./base-entity";
import { Status } from "./status";

export interface User extends BaseEntity
{
    name:string;
    email:string;
    phoneNo:number;
    password:string;
    token:string;
    status:Status;
}