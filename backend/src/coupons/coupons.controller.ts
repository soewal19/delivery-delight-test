import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CouponsService } from './coupons.service';

@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active coupons' })
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':code/validate')
  @ApiOperation({ summary: 'Validate coupon by code' })
  validate(@Param('code') code: string) {
    return this.couponsService.validate(code);
  }
}
