import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService ){}
    
    @Post()
    createUser(@Body() newUser: CreateUserDto):  any {
        return this.usersService.createUser(newUser);
    }

    @Get()
    getAllUsers(): Promise<User[]>{
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number): any {
        return this.usersService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): any {
        return this.usersService.deleteUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() newUserData: UpdateUserDto ): any {
        this.usersService.updateUser(id, newUserData);
    }

    @Post(':id/profile')
    createProfile(@Param('id', ParseIntPipe) id: number, @Body() userProfile: CreateProfileDto): any{
        return this.usersService.createUserProfile(id, userProfile)
    }

}
