import { Controller, Get, Post, Body, Param, Put, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@CurrentUser() user: any) {
    return this.usersService.findByEmail(user.email);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get user profile by email' })
  findOne(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create or update user profile' })
  upsert(@Body() data: { email: string; name?: string; avatar?: string }) {
    return this.usersService.upsert(data);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get user purchase statistics' })
  getStats(@Param('id') id: string) {
    return this.usersService.getStats(id);
  }
}
