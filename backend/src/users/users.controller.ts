import { Controller, Get, Post, Body, Param, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
