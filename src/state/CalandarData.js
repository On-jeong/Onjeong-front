import {getMonth, getYear} from 'date-fns';
import {atom} from 'recoil';

// 현재 선택된 년도
export const CurDateState = atom({
  key: 'curDate',
  default: new Date(),
});

// 현재 선택된 년도
export const CurYearState = atom({
  key: 'curYear',
  default: getYear(new Date()),
});

// 현재 선택된 달
export const CurMonthState = atom({
  key: 'curMonth',
  default: getMonth(new Date()) + 1,
});
