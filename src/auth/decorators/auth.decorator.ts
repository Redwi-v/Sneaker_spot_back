import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = () => {
  return UseGuards(AuthGuard('jwt'));
};
