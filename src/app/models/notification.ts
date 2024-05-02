import { NotificationType } from "./notification-type";

export interface Notification {
        statusCode :string;
        message :string;
        moreInfo :string;
        title:string
        notificationType:NotificationType
}