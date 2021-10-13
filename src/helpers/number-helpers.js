import {clamp} from 'lodash';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

const FORMAT_FLOOR_CEILING_MULTIPLIER = 100;

const RUBLES_SUFFIX_DATA = {
  hundredDivisor: 100,
  hundredRange: {min: 11, max: 14},
  tenDivisor: 10,
  singularTenRange: {min: 1, max: 1},
  exceptionalTenRange: {min: 2, max: 4},
};

const formatInteger = (value) => {
  return integerFormat.format(Math.ceil(value));
};

const formatFloat = (value) => {
  return floatFormat.format(Math.ceil(value * FORMAT_FLOOR_CEILING_MULTIPLIER) / FORMAT_FLOOR_CEILING_MULTIPLIER);
};

const coerceArrayIndex = (index, items) => {
  return clamp(index, 0, items.length - 1);
};

const coerceByConstraint = (value, {min, max}) => {
  return clamp(value, min, max);
};

const isValidByConstraint = (value, {min, max}) => {
  return min <= value && value <= max;
};

const integerFormat = new Intl.NumberFormat(`ru`, {maximumFractionDigits: 0});
const floatFormat = new Intl.NumberFormat(`ru`, {minimumFractionDigits: 2, maximumFractionDigits: 2});

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(`ru`);

export {
  formatInteger,
  formatFloat,
  coerceArrayIndex,
  coerceByConstraint,
  isValidByConstraint,
};
