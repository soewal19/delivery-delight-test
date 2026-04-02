import { Controller, Get, Post, Body, Param, Put, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
    }
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload user avatar' })
  async uploadFile(@UploadedFile() file: any, @CurrentUser() user: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    
    // Convert buffer to base64
    const base64 = file.buffer.toString('base64');
    const avatarUrl = `data:${file.mimetype};base64,${base64}`;
    
    await this.usersService.updateAvatar(user.id, avatarUrl);
    return { url: avatarUrl };
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(@CurrentUser() user: any, @Body() data: { name?: string; avatar?: string }) {
    return this.usersService.updateProfile(user.id, data);
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
