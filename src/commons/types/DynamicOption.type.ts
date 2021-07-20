import { FormField } from '../constants/fields';

import { DefaultProperties } from './Common.type';

export type DynamicOption = {
  field: FormField;
  label: string;
  value: string;
} & DefaultProperties;
