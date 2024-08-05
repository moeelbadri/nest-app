import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel (Book.name) private readonly bookRepo: Model<Book>) {}
  create(createBookDto: CreateBookDto) {
    return this.bookRepo.create(createBookDto);
  }

  findAll() {
    return this.bookRepo.find();
  }

  findOne(id: string) {
    return this.bookRepo.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepo.findByIdAndUpdate(id, updateBookDto);
  }

  remove(id: string) {
    return this.bookRepo.findByIdAndDelete(id);
  }
}
