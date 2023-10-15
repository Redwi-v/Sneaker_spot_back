import {
  IsEmail,
  MinLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsJWT,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @MinLength(3)
  name: string;

  @IsOptional()
  avatarPath: string;
}

export class AccessTokenDto {
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
