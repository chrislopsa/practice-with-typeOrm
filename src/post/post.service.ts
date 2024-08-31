import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';


@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async createPost(userId: number, post: CreatePostDto){

        const userFound = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
        if(!userFound){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        
        post.authorId = userFound.id;
        const newPost= this.postRepository.create(post)
         return this.postRepository.save(newPost)
    }

    getPosts(){
        return this.postRepository.find()
    }

}
