import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { formatResponseDTO } from "src/constants/common";
import { systemCode } from "src/constants/messageConstants";
import { User } from "src/models/users.entity";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/login.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async findUserByEmail(email: string) {
        const user = await this.userRepo.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async createUser(userData: createUserDto) {
        let userNew = await this.userRepo.create(userData);
        return this.userRepo.save(userNew);
    }
    async getUserById(id: string): Promise<User | undefined> {
        return this.userRepo.findOneBy({ id });
    }

    async markEmailAsConfirmed(email: string): Promise<formatResponseDTO> {
        let user = this.userRepo.update({ email }, {
            isEmailConfirmed: true
        });
        return {
            data: user,
            systemCode: systemCode.SUCCESS,
            message: "Confirm email successfully"
        }
    }
}