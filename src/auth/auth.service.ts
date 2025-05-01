/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/user/dtos/responses/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(userDetail: any): Promise<UserResponseDto> {
    const { email, firstName, lastName, profileImage, googleId } = userDetail;
    let user = await this.userService.findOneByEmail(email);
    if (!user) {
      user = await this.userService.create({
        email: email,
        firstName,
        lastName,
        profileImage,
        googleId,
      });
    }
    return user;
  }

  login(user: User) {
    const payload = { id: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload), user };
  }
}
