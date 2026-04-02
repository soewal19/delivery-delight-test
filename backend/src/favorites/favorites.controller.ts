import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':productId/toggle')
  @ApiOperation({ summary: 'Toggle product in favorites' })
  toggle(@Param('productId') productId: string, @CurrentUser() user: any) {
    return this.favoritesService.toggleFavorite(user.id, productId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorite products' })
  findAll(@CurrentUser() user: any) {
    return this.favoritesService.getFavorites(user.id);
  }

  @Get(':productId/status')
  @ApiOperation({ summary: 'Check if product is in favorites' })
  status(@Param('productId') productId: string, @CurrentUser() user: any) {
    return this.favoritesService.isFavorite(user.id, productId);
  }
}
