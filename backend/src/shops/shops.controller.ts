import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { ShopsService } from './shops.service';

@ApiTags('shops')
@Controller('api/shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all shops with optional rating filter' })
  @ApiQuery({ name: 'minRating', required: false, type: Number })
  @ApiQuery({ name: 'maxRating', required: false, type: Number })
  findAll(@Query('minRating') minRating?: string, @Query('maxRating') maxRating?: string) {
    return this.shopsService.findAll(
      minRating ? parseFloat(minRating) : undefined,
      maxRating ? parseFloat(maxRating) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop by ID' })
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(id);
  }
}
