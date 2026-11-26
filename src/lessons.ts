import type { ViewStyle } from 'react-native';

// Everything from the "Layout with Flexbox" slides, one lesson per property.
export type Demo = { container: ViewStyle; items: ViewStyle[] };

export type Lesson = {
  key: string;
  title: string;
  th: string; // Thai subtitle, as on the slides
  icon: { ios: string; android: string; web: string };
  where: 'container' | 'item';
  about: string;
  values: string[];
  demo: (value: string) => Demo;
  tip?: string;
};

export const COLORS = ['powderblue', 'skyblue', 'steelblue', '#50E3C2', '#4A90E2', '#9013FE', '#F5A623', '#FE706E'];

const square = (i: number): ViewStyle => ({ width: 50, height: 50, backgroundColor: COLORS[i % COLORS.length] });
const three = [square(0), square(1), square(2)];

export const LESSONS: Lesson[] = [
  {
    key: 'flex',
    title: 'flex',
    th: 'ขนาดของ item',
    icon: { ios: 'rectangle.split.3x1', android: 'view_column', web: 'view_column' },
    where: 'item',
    about:
      'flex sets how items fill the free space along the main axis. Space is shared in proportion to each item’s flex value, so flex: 2 gets twice the space of flex: 1.',
    values: ['1 · 2 · 3', '1 · 1 · 1', '0 · 1 · 0', '3 · 1 · 1'],
    demo: (v) => ({
      container: { flex: 1, flexDirection: 'column' },
      items: v.split(' · ').map((n, i) => ({
        flex: Number(n),
        ...(n === '0' ? { height: 40 } : {}),
        backgroundColor: ['red', 'orange', 'green'][i],
      })),
    }),
    tip: 'Ex10–Ex12 must use flex only, without width or height.',
  },
  {
    key: 'flexDirection',
    title: 'flexDirection',
    th: 'ทิศทางของ item ใน Container',
    icon: { ios: 'arrow.left.arrow.right', android: 'swap_horiz', web: 'swap_horiz' },
    where: 'container',
    about:
      'flexDirection sets the main axis: the direction children are laid out in. The cross axis runs perpendicular to it. In React Native the default is column.',
    values: ['column', 'row', 'column-reverse', 'row-reverse'],
    demo: (v) => ({ container: { flex: 1, flexDirection: v as ViewStyle['flexDirection'] }, items: three }),
  },
  {
    key: 'justifyContent',
    title: 'justifyContent',
    th: 'การจัดวางตาม Direction',
    icon: { ios: 'align.vertical.center', android: 'vertical_distribute', web: 'vertical_distribute' },
    where: 'container',
    about:
      'justifyContent aligns children along the main axis. space-between puts all leftover space between children. space-around also puts half a gap before the first child and after the last.',
    values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    demo: (v) => ({
      container: { flex: 1, flexDirection: 'column', justifyContent: v as ViewStyle['justifyContent'] },
      items: three,
    }),
  },
  {
    key: 'alignItems',
    title: 'alignItems',
    th: 'การจัดวาง Cross Direction',
    icon: { ios: 'align.horizontal.center', android: 'align_horizontal_center', web: 'align_horizontal_center' },
    where: 'container',
    about:
      'alignItems aligns children along the cross axis. With stretch (the default), a child with no fixed width fills the cross axis. When justifyContent runs vertically, alignItems runs horizontally, and the other way round.',
    values: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    demo: (v) => ({
      container: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: v as ViewStyle['alignItems'] },
      items: [square(0), { height: 50, backgroundColor: 'skyblue' }, { height: 50, backgroundColor: 'steelblue' }],
    }),
    tip: 'Only the first box has a width, so only boxes 2 and 3 stretch.',
  },
  {
    key: 'alignSelf',
    title: 'alignSelf',
    th: 'คล้าย alignItems แต่เขียนที่ Item',
    icon: { ios: 'arrow.right.to.line', android: 'align_horizontal_right', web: 'align_horizontal_right' },
    where: 'item',
    about:
      'alignSelf takes the same values as alignItems but is set on one child. It overrides the parent’s alignItems for that child only.',
    values: ['auto', 'flex-start', 'center', 'flex-end', 'stretch'],
    demo: (v) => ({
      container: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' },
      items: [
        { ...square(0), alignSelf: v as ViewStyle['alignSelf'], ...(v === 'stretch' ? { width: undefined } : {}) },
        { height: 50, backgroundColor: 'skyblue' },
        { height: 50, backgroundColor: 'steelblue' },
      ],
    }),
  },
  {
    key: 'flexWrap',
    title: 'flexWrap',
    th: 'ตัดบรรทัด',
    icon: { ios: 'text.word.spacing', android: 'wrap_text', web: 'wrap_text' },
    where: 'container',
    about:
      'flexWrap controls what happens when children overflow the main axis. nowrap (the default) keeps them on one line. wrap moves the extra children to new lines.',
    values: ['nowrap', 'wrap', 'wrap-reverse'],
    demo: (v) => ({
      container: { flex: 1, flexDirection: 'row', flexWrap: v as ViewStyle['flexWrap'] },
      items: Array.from({ length: 9 }, (_, i) => ({ ...square(i), width: 70 })),
    }),
  },
  {
    key: 'alignContent',
    title: 'alignContent',
    th: 'จัดวางการตัดบรรทัด',
    icon: { ios: 'square.grid.3x3', android: 'grid_view', web: 'grid_view' },
    where: 'container',
    about:
      'alignContent spreads the wrapped lines along the cross axis. It only works together with flexWrap: wrap.',
    values: ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'],
    demo: (v) => ({
      container: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignContent: v as ViewStyle['alignContent'] },
      items: Array.from({ length: 9 }, (_, i) => ({ width: 70, minHeight: 40, backgroundColor: COLORS[i % COLORS.length] })),
    }),
    tip: 'With stretch, the boxes only grow because they have minHeight and no fixed height.',
  },
  {
    key: 'size',
    title: 'width & height',
    th: 'ขนาด',
    icon: { ios: 'arrow.up.left.and.arrow.down.right', android: 'open_in_full', web: 'open_in_full' },
    where: 'item',
    about:
      'width and height can be auto (the default, sized by content), a number of points, or a percentage of the parent.',
    values: ['auto', '100', '50%', '100%'],
    demo: (v) => ({
      container: { flex: 1, alignItems: 'flex-start', gap: 8 },
      items: [
        { width: (v === 'auto' ? 'auto' : v.endsWith('%') ? v : Number(v)) as ViewStyle['width'], height: 50, minWidth: 8, backgroundColor: 'steelblue' },
        { width: 50, height: 50, backgroundColor: 'powderblue' },
      ],
    }),
    tip: 'auto with no content shrinks to almost nothing (minWidth keeps it visible).',
  },
  {
    key: 'position',
    title: 'position',
    th: 'ตำแหน่ง',
    icon: { ios: 'square.on.square', android: 'layers', web: 'layers' },
    where: 'item',
    about:
      'relative (the default) lays an item out in the normal flow, then moves it by top, left, right and bottom without moving its siblings. absolute takes it out of the flow and places it from the parent’s edges.',
    values: ['relative', 'absolute'],
    demo: (v) => ({
      container: { flex: 1, padding: 16, gap: 8 },
      items: [square(0), { ...square(1), position: v as ViewStyle['position'], top: 20, left: 20 }, square(2)],
    }),
  },
];

const fmt = (style: ViewStyle) =>
  Object.entries(style)
    .filter(([, val]) => val !== undefined)
    .map(([k, val]) => `${k}: ${typeof val === 'string' ? `'${val}'` : val}`)
    .join(', ');

// JSX the student can paste into a screen. Long item lists are shortened to keep it readable.
export function codeFor({ container, items }: Demo) {
  const shown = items.slice(0, 3).map((s) => `  <View style={{ ${fmt(s)} }} />`);
  if (items.length > 3) shown.push(`  {/* …${items.length - 3} more */}`);
  return `<View style={{ ${fmt(container)} }}>\n${shown.join('\n')}\n</View>`;
}
