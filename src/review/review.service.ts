import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewRepo: Model<Review>,
) {}
  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepo.create(createReviewDto);
  }

  findAll() {
    return this.reviewRepo.find();
  }

  findOne(id: string) {
    return this.reviewRepo.findById(id);
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepo.findByIdAndUpdate(id, updateReviewDto);
  }

  remove(id: string) {
    return this.reviewRepo.findByIdAndDelete(id);
  }
}
