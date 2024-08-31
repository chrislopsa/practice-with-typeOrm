import { Controller, Body ,Get, Post, Delete, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';



@Controller('post')
export class PostController {

    constructor(private postService: PostService){}

    @Post(':id')
    createPost(@Param('id', ParseIntPipe) userId: number, @Body() newPost: CreatePostDto){
        return this.postService.createPost(userId, newPost)
    }

    @Get()
    getPosts(){
        return this.postService.getPosts()
    }
}

