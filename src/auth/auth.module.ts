import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    //initialized the base options for the token creation
    JwtModule.registerAsync({
      useFactory: () => ({
        //265bit base string for the secret
        secret: 'jXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
