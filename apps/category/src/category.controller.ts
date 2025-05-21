import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'get-products-by-category' })
  async getByCategory(category: string) {
    return this.categoryService.getByCategory(category);
  }
}
