import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ){}

    async createUser(user: CreateUserDto ){
        const userFound = await this.userRepository.findOne({
            where:{
                username: user.username
            }
        })

        if(userFound){
            return new HttpException('User already exists', HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

    getAllUsers(){
        return this.userRepository.find()
    }

    async getUser(id: number){
        const userFound = await this.userRepository.findOne({
            where:{
                id: id
            }
        })
        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return this.userRepository.findOne({
            where:{id}
        })
    }

    async deleteUser(id: number){
        const result = await this.userRepository.delete({id});

        if(result.affected === 0){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return result;
    }

    updateUser(id: number, user: UpdateUserDto){
        return this.userRepository.update({id}, user);
    }

    async createUserProfile(id: number, profile: CreateProfileDto){
        const userFound = await this.userRepository.findOne({
            where:{
                id:id
            }
        })

        if(!userFound){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const userProfile = this.profileRepository.create(profile)
        const savedProfile = await this.profileRepository.save(userProfile)
        userFound.profile = savedProfile
        return this.userRepository.save(userFound)
    }
}
