import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, ProductParamsDto } from './product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @Auth()
  async createProduct(@Body() product: ProductDto) {
    return await this.productService.create(product);
  }

  @Get('products')
  async getProducts(@Query() params: ProductParamsDto) {
    return await this.productService.getProducts(
      +params.page,
      +params.take,
      params,
    );
  }

  @Get('colors')
  async getAllColors() {
    return await this.productService.getAllColors();
  }

  @Get('brands')
  async getAllBrands() {
    return await this.productService.getAllBrands();
  }

  @Get('product')
  async getProductById(@Query('id') id: string) {
    return await this.productService.getProductById(+id);
  }
}
