import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User} from "./user.entity";

@Injectable()

export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOne({ where: { id } });
    }


    async createUser(email: string, hashedPassword: string): Promise<User> {
        const user = this.repository.create({ email, password: hashedPassword});
        return this.repository.save(user);
    }
}