import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { v7 as uuidv7 } from 'uuid';
import { join } from 'path';
import {
  CounterTypes,
  HistoryEntry,
  ResetCounterResponse,
  UpdateCounterInput,
  UpdateCounterResponse,
} from './counter.types';
import {
  initialDbValues,
  MAX_COUNTER_VALUE,
  MIN_COUNTER_VALUE,
} from '../constants';

@Injectable()
export class CounterService {
  private readonly dbPath: string = join(__dirname, '..', '..', 'db.json');
  constructor() {
    if (!existsSync(this.dbPath)) {
      writeFileSync(this.dbPath, JSON.stringify(initialDbValues, null, 2));
    }
  }

  getCounter(): CounterTypes {
    const data = readFileSync(this.dbPath, 'utf-8');
    return JSON.parse(data) as CounterTypes;
  }

  updateCounter(
    type: UpdateCounterInput['type'],
    step: UpdateCounterInput['step'],
  ): UpdateCounterResponse {
    const data = readFileSync(this.dbPath, 'utf-8');
    const counter = JSON.parse(data) as CounterTypes;

    let { count } = counter;
    const { history } = counter;

    if (type === 'increment' && typeof step === 'number') {
      count += step;
      if (count > MAX_COUNTER_VALUE) {
        count = MAX_COUNTER_VALUE;
      }
    } else if (type === 'decrement' && typeof step === 'number') {
      count -= step;
      if (count < MIN_COUNTER_VALUE) {
        count = MIN_COUNTER_VALUE;
      }
    }

    const newHistoryEntry: HistoryEntry = { _id: uuidv7(), type, step };
    const updatedCounter: CounterTypes = {
      count,
      history: [newHistoryEntry, ...history],
    };

    writeFileSync(this.dbPath, JSON.stringify(updatedCounter, null, 2));

    return {
      count,
      newHistoryEntry,
    };
  }

  resetCounter(): ResetCounterResponse {
    const data = readFileSync(this.dbPath, 'utf-8');
    const counter = JSON.parse(data) as CounterTypes;

    const resetHistoryEntry: HistoryEntry = {
      _id: uuidv7(),
      type: 'reset',
    };

    const newCounterStateWithResetHistory: CounterTypes = {
      count: 0,
      history: [resetHistoryEntry, ...counter.history],
    };

    writeFileSync(
      this.dbPath,
      JSON.stringify(newCounterStateWithResetHistory, null, 2),
    );

    return {
      count: 0,
      resetHistoryEntry,
    };
  }
}
