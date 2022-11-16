import { ArgumentMetadata, BadRequestException, ValidationPipe } from "@nestjs/common";

export class ValidationPipe422 extends ValidationPipe {

    public async transform(value, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata)
      } catch (e: any) { 
        throw new BadRequestException({ 
          systemCode: "",
          message: e.response.message 
        });
      }
    }
  } 