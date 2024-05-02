import { BaseEntity } from "./base-entity";

export interface Product extends BaseEntity
{
    name:string;
    description:string;
    category:string;
    quantity:number;
}