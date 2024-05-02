export class ErrorResponse{
    message:string;
    objectOrError :string;
    statusCode:number
    /**
     *
     */
    constructor(msg:string,moreError:string='',statusCode:number=403) {
        this.message=msg;
        this.objectOrError= moreError;
        this.statusCode=statusCode;
    }
   }