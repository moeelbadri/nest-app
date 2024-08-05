import { Expose, Exclude } from "class-transformer";
import { User } from "../entities/user.entity";


export class UserDto extends User {

    @Exclude()
    password: string;

}