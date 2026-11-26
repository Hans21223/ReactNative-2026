import type { ComponentType } from 'react';
import Ex01 from '@/app/flexbox/ex01';
import Ex02 from '@/app/flexbox/ex02';
import Ex03 from '@/app/flexbox/ex03';
import Ex04 from '@/app/flexbox/ex04';
import Ex05 from '@/app/flexbox/ex05';
import Ex06 from '@/app/flexbox/ex06';
import Ex07 from '@/app/flexbox/ex07';
import Ex08 from '@/app/flexbox/ex08';
import Ex09 from '@/app/flexbox/ex09';
import Ex10 from '@/app/flexbox/ex10';
import Ex11 from '@/app/flexbox/ex11';
import Ex12 from '@/app/flexbox/ex12';
import Extra from '@/app/flexbox/extra';
import Extra2 from '@/app/flexbox/extra2';
import Quiz from '@/app/page2/flexbox-quiz';

export type Exercise = { path: string; title: string; hint: string; Preview?: ComponentType };

export const SECTIONS: { title: string; data: Exercise[] }[] = [
  {
    title: 'Stretch & stacking',
    data: [
      { path: '/flexbox/ex01', title: 'Ex01 · Horizontal Stretch', hint: 'column · height 100', Preview: Ex01 },
      { path: '/flexbox/ex02', title: 'Ex02 · Vertical Stretch', hint: 'row · width 100', Preview: Ex02 },
      { path: '/flexbox/ex03', title: 'Ex03 · Horizontal Stacking', hint: 'row · three 100×100 squares', Preview: Ex03 },
      { path: '/flexbox/ex04', title: 'Ex04 · Vertical Stacking', hint: 'column · three squares', Preview: Ex04 },
    ],
  },
  {
    title: 'Positioning & spacing',
    data: [
      { path: '/flexbox/ex05', title: 'Ex05 · Horizontal Center Stack', hint: 'justifyContent + alignItems center', Preview: Ex05 },
      { path: '/flexbox/ex06', title: 'Ex06 · Vertical Center Stack', hint: 'column, centered', Preview: Ex06 },
      { path: '/flexbox/ex07', title: 'Ex07 · Bottom Align Stack', hint: 'alignItems flex-end', Preview: Ex07 },
      { path: '/flexbox/ex08', title: 'Ex08 · Space Between', hint: 'justifyContent space-between', Preview: Ex08 },
      { path: '/flexbox/ex09', title: 'Ex09 · Between & Around', hint: 'space-around of space-between columns', Preview: Ex09 },
    ],
  },
  {
    title: 'Flex (no width or height)',
    data: [
      { path: '/flexbox/ex10', title: 'Ex10 · Fullscreen Flex', hint: 'flex 1', Preview: Ex10 },
      { path: '/flexbox/ex11', title: 'Ex11 · Flex Split', hint: 'two flex 1 views', Preview: Ex11 },
      { path: '/flexbox/ex12', title: 'Ex12 · Flex Portion', hint: 'three flex 1 views in a row', Preview: Ex12 },
    ],
  },
  {
    title: 'Challenges',
    data: [
      { path: '/flexbox/extra', title: 'Extra 1 · Challenge (slide 73)', hint: 'nested flex 1 : 2', Preview: Extra },
      { path: '/flexbox/extra2', title: 'Extra 2 · Challenge (slide 74)', hint: 'nested flex 1 : 2', Preview: Extra2 },
      { path: '/page2/flexbox-quiz', title: 'Quiz · Full layout (slide 75)', hint: 'heights 25 · 100 · 30 · 78 · 13 · 60', Preview: Quiz },
    ],
  },
  {
    title: 'State & navigation',
    data: [
      { path: '/page2/name-form', title: 'Name form (slide 77)', hint: 'TextInput + useState · “Anonymous” until saved' },
      { path: '/page2/char-count', title: 'Character counter (slide 78)', hint: 'count the letters in a saved name' },
      { path: '/travel-app', title: 'Travel App (Week 3 + Paper)', hint: 'merged interactive app' },
    ],
  },
];

export const TITLES: Record<string, string> = {
  'flexbox-quiz': 'Quiz',
  'name-form': 'Name form',
  'char-count': 'Character counter',
};
