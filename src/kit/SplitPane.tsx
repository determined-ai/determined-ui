import React, { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'throttle-debounce';

import useResize from 'kit/internal/useResize';

import css from './SplitPane.module.scss';
import { useTheme } from './Theme';
import { ValueOf } from './utils/types';

export const Pane = {
  Left: 'left',
  Right: 'right',
} as const;

export type Pane = ValueOf<typeof Pane>;

interface PaneWidths {
  [Pane.Left]: number,
  [Pane.Right]: number
}


interface Props {
  leftPane: React.ReactElement;
  rightPane: React.ReactElement;
  initialWidth?: number;
  minimumWidths?: PaneWidths;
  onChange?: (width: number) => void;
  hidePane?: Pane;
}

const SplitPane: React.FC<Props> = ({
  leftPane,
  rightPane,
  initialWidth = 400,
  minimumWidths = { left: 200, right: 200 },
  onChange,
  hidePane
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const handle = useRef<HTMLDivElement>(null);
  const { refCallback, size } = useResize();
  const { themeSettings: { className: themeClass } } = useTheme();

  const throttledOnChange = useMemo(
    () => onChange && throttle(8, onChange, { noTrailing: true }),
    [onChange],
  );

  useEffect(() => setWidth(initialWidth), [initialWidth]);

  useEffect(() => {
    const handleDragStart = (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      setIsDragging(true);
    };
    const handleRef = handle.current;
    handleRef?.addEventListener('mousedown', handleDragStart);

    return () => handleRef?.removeEventListener('mousedown', handleDragStart);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleDrag = (e: MouseEvent) => {
      e.preventDefault();

      // Get x-coordinate of pointer relative to container
      const pointerRelativeXpos = e.clientX - size.x;

      // * 8px is the left/right spacing between .handle and its inner pseudo-element
      const newWidth = Math.round(
        Math.min(
          Math.max(minimumWidths.left, pointerRelativeXpos - 8),
          size.width - minimumWidths.right,
        ),
      );

      // Resize box A
      setWidth(newWidth);
      throttledOnChange?.(newWidth);
    };
    document.addEventListener('mousemove', handleDrag);

    return () => document.removeEventListener('mousemove', handleDrag);
  }, [
    size.width,
    size.x,
    throttledOnChange,
    isDragging,
    minimumWidths,
  ]);

  useEffect(() => {
    if (!isDragging) return;
    const handleDragStop = (e: MouseEvent) => {
      if (e.button !== 0) return;
      // Turn off dragging flag when user mouse is up
      setIsDragging(false);
      throttledOnChange?.cancel();
      onChange?.(width);
    };
    document.addEventListener('mouseup', handleDragStop);

    return () => document.removeEventListener('mouseup', handleDragStop);
  }, [width, isDragging, onChange, throttledOnChange]);

  const hideHandle = (hidePane === Pane.Left || hidePane === Pane.Right);

  const classnames = [css.base, themeClass];

  if (hidePane !== Pane.Right) {
    classnames.push(css.showRightPane)
  };

  const leftPaneWidth = hidePane !== Pane.Right ? width : '100%';
  const leftPaneDisplay = hidePane === Pane.Left ? 'none' : 'initial'
  return (
    <div className={classnames.join(' ')} ref={refCallback}>
      <div style={{ display: leftPaneDisplay, width: leftPaneWidth }}>
        {leftPane}
      </div>
      {
        <div
          className={css.handle}
          ref={handle}
          style={{ display: hideHandle ? 'none' : 'initial' }}
        />
      }
      <div className={css.rightBox}>{rightPane}</div>
    </div>
  );
};

export default SplitPane;
