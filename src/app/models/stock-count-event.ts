import { BaseEntity } from "./base-entity";
import { ProductCount } from "./product-count";
import { StoreCountStatus } from "./store-count-status";

export interface StockCountEvent extends BaseEntity
{
    description:string;
    itemObjects:ProductCount[];
    items?:string;
    countedBy:string;
    status:StoreCountStatus;
}