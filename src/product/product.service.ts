import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto, ProductParamsDto, Sorting } from './product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // GET PAGE
  async getProducts(page: number, takeItems: number, params: ProductParamsDto) {
    if (page < 1 || !page)
      return new HttpException('min page value = 1', HttpStatus.BAD_REQUEST);

    const take = takeItems || 10;
    const skip = page && page === 1 ? 0 : (page - 1) * take;

    // filtration
    const { term, sizes, colors, brands, price } =
      params.filtrationParams || {};

    const filtration: Prisma.ProductFindManyArgs = {};

    if (term) {
      filtration.where = {
        OR: [
          {
            name: {
              contains: term,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: term,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (price && price.length) {
      filtration.where = {
        ...filtration.where,
        AND: [
          {
            price: {
              gte: +price[0],
            },
          },
          {
            price: {
              lte: +price[1],
            },
          },
        ],
      };
    }

    if (sizes) {
      filtration.where = {
        ...filtration.where,
        colors: {
          some: {
            colorSizes: {
              hasEvery: sizes,
            },
          },
        },
      };
    }

    if (colors) {
      filtration.where = {
        ...filtration.where,
        colors: {
          some: {
            colorName: {
              in: colors,
            },
          },
        },
      };
    }

    if (brands) {
      filtration.where = {
        ...filtration.where,
        brandName: {
          in: brands,
        },
      };
    }

    // sorting
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    if (params.sorting === Sorting.LOW_PRICE) {
      orderBy.price = 'asc';
    }
    if (params.sorting === Sorting.HIGHT_PRICE) {
      orderBy.price = 'desc';
    }
    if (params.sorting === Sorting.RATING) {
      orderBy.rating = 'desc';
    }
    if (params.sorting === Sorting.MOST_POPULAR) {
      orderBy.purchasesCount = 'desc';
    }

    const data = await this.prisma.product.findMany({
      take,
      skip,

      include: {
        brand: true,
        colors: true,
      },
      orderBy,
      ...filtration,
    });
    const dataCount = await this.prisma.product.count({
      where: filtration.where || {},
    });

    return {
      data,
      totalCount: dataCount,
    };
  }

  // get product
  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        colors: true,
        reviews: true,
        brand: true,
      },
    });
  }

  // CREATE
  async create(product: ProductDto) {
    const { description, name, price, rating, brandName, colors, logo } =
      product;
    // const mappedCreateManyProduct: Prisma.colorCreateManyInput[] = [];

    return await this.prisma.product.create({
      data: {
        price,
        description: description,
        name,

        rating,
        brand: {
          connectOrCreate: {
            where: {
              name: brandName,
            },
            create: {
              name: brandName,
              logo,
            },
          },
        },
        colors: {
          createMany: {
            data: colors,
          },
        },
      },
    });
  }
}
