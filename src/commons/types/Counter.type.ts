import { CounterType } from '../constants/counterTypes';

import { DefaultProperties } from './Common.type';

export type Counter = {
  count: number;
  teamId: string;
  type: CounterType;
  userId: string;
} & DefaultProperties;
