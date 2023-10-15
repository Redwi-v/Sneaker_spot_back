import { Transform, Type } from 'class-transformer';
import {
  MaxLength,
  Min,
  MinLength,
  Max,
  ValidateNested,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class ProductColors {
  @IsNotEmpty()
  colorName: string;
  colorCode: string;
  sizes: number[];
  smallImages: string[];
  normalImages: string[];
}

export class ProductDto {
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @MinLength(3)
  @MaxLength(30)
  brandName: string;

  logo: string;

  @Min(0)
  @Max(5)
  rating: number;

  description: string;
  price: number;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ProductColors)
  colors: ProductColors[];
}

export enum Sorting {
  LOW_PRICE = 'LOW_PRICE',
  HIGHT_PRICE = 'HIGHT_PRICE',
  RATING = 'RATING',
  MOST_POPULAR = 'MOST_POPULAR',
}

export class ProductParamsDto {
  take: string;
  page: string;
  filtrationParams: FiltrationParams;

  @IsOptional()
  @Transform(({ value }) => '' + value)
  @IsEnum(Sorting)
  sorting: Sorting;
}

export class FiltrationParams {
  term: string;
  sizes: number[];
  colors: string[];
  brands: string[];
  price: number[];
}
