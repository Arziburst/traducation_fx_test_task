import { Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CounterService } from './counter.service';
import { HistoryEntry } from './counter.types';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  @HttpCode(200)
  getCounter(@Res() res: Response) {
    res.set({
      'Content-Type': 'application/json',
    });

    const data = this.counterService.getCounter();
    res.json(data);
  }

  @Post()
  @HttpCode(201)
  updateCounter(
    @Query('type') type: HistoryEntry['type'],
    @Query('step') step: HistoryEntry['step'],
    @Res() res: Response,
  ) {
    const stepValue = Number(step) || 0;
    const data = this.counterService.updateCounter(type, stepValue);
    res.json(data);
  }

  @Delete()
  @HttpCode(200)
  resetCounter(@Res() res: Response) {
    const data = this.counterService.resetCounter();
    res.json(data);
  }
}
