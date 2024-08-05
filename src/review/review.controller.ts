import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { MongoIDValid } from 'src/decorators/mongoID.decorator';
import { Authenticated } from 'src/decorators/auth.decorator';
import { roles } from 'src/constants/enums';

@Controller('review')
@MongoIDValid()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Authenticated(roles.USER)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll().populate(['userId','bookId']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id).populate(['userId','bookId']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
