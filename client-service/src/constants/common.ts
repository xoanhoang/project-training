export class formatResponseDTO {

    public data: any;
    public message : string;
    public systemCode : string;

    constructor( data: any, systemCode: string, message: string,) {

        this.data = data;
        this.message = message;
        this.systemCode =systemCode;

    }

}