import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return await this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.databaseService.product.findMany({});
  }

  async findOne(id: number) {
    return await this.databaseService.product.findUnique({
      where: { id },
      include: {
        description: true,
        reviews: true,
        tags: true,
      },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return await this.databaseService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.product.delete({
      where: {
        id,
      },
    });
  }
}
