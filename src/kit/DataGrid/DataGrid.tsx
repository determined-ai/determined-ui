import DataEditor, {
  CellClickedEventArgs,
  DataEditorProps,
  DataEditorRef,
  getMiddleCenterBias,
  GridCell,
  GridCellKind,
  GridColumn,
  GridMouseEventArgs,
  GridSelection,
  HeaderClickedEventArgs,
  Item,
  Rectangle,
  Theme,
} from '@glideapps/glide-data-grid';
import { DrawHeaderCallback } from '@glideapps/glide-data-grid/dist/dts/internal/data-grid/data-grid-types';
import * as io from 'io-ts';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DropdownEvent, MenuItem } from 'kit/Dropdown';
import { type Theme as HewTheme, useTheme } from 'kit/Theme';
import useMobile from 'kit/useMobile';
import { Loadable } from 'kit/utils/loadable';
import { observable, useObservable, WritableObservable } from 'kit/utils/observable';

import { ColumnDef, getHeaderIcons, MIN_COLUMN_WIDTH } from './columns';
import {
  ContextMenu,
  ContextMenuCompleteHandlerProps,
  ContextMenuComponentProps,
  ContextMenuProps,
} from './contextMenu';
import { customRenderers } from './custom-renderers';
import { LinkCell } from './custom-renderers/cells/linkCell';
import { drawArrow, drawTextWithEllipsis } from './custom-renderers/utils';
import css from './DataGrid.module.scss';
import { TableActionMenu, TableActionMenuProps } from './menu';
import { useTableTooltip } from './tooltip';

const directionType = io.keyof({ asc: null, desc: null });
export type DirectionType = io.TypeOf<typeof directionType>;

export const validSort = io.type({
  column: io.string,
  direction: directionType,
});
export type ValidSort = io.TypeOf<typeof validSort>;

const sort = io.partial(validSort.props);
export type Sort = io.TypeOf<typeof sort>;

/**
 * Glide Table Theme Reference
 * https://github.com/glideapps/glide-data-grid/blob/main/packages/core/API.md#theme
 */
export const getTheme = (appTheme: HewTheme): DataEditorProps['theme'] => {
  return {
    accentLight: appTheme.float,
    bgBubble: appTheme.ixStrong,
    bgCell: appTheme.surface,
    bgHeader: appTheme.surface,
    bgHeaderHovered: appTheme.surfaceStrong,
    borderColor: appTheme.ixBorder,
    fontFamily: appTheme.fontFamily,
    headerBottomBorderColor: appTheme.ixBorder,
    headerFontStyle: 'normal 12px',
    linkColor: appTheme.surfaceOn,
    textBubble: appTheme.surfaceBorderStrong,
    textDark: appTheme.surfaceOnWeak,
    textHeader: appTheme.surfaceOnWeak,
  };
};

export interface GlideTableProps<T, ContextAction extends string, ContextActionData> {
  columns: ColumnDef<T>[];
  renderContextMenuComponent?: (
    props: ContextMenuComponentProps<T, ContextAction, ContextActionData>,
  ) => JSX.Element;
  data: Loadable<T>[];
  numRows: number;
  getRowAccentColor?: (rowData: T) => void;
  getHeaderMenuItems?: (
    columnId: string,
    colIdx: number,
    setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    scrollToTop: () => void,
    selectionRange: number,
  ) => MenuItem[];
  height: number;
  hideUnpinned?: boolean;
  onColumnResize?: (columnId: string, width: number) => void;
  onContextMenuComplete?: ContextMenuCompleteHandlerProps<ContextAction, ContextActionData>;
  onLinkClick?: (href: string) => void;
  onPinnedColumnsCountChange?: (count: number) => void;
  onScroll?: (r: Rectangle) => void;
  onSelectionChange?: HandleSelectionChangeType;
  onSortableColumnChange?: (newColumns: string[]) => void;
  page: number;
  pageSize: number;
  pinnedColumnsCount: number;
  rowHeight?: number;
  scrollPositionSetCount: WritableObservable<number>;
  selection: GridSelection;
  sortableColumnIds: string[];
  sorts: Sort[];
  staticColumns: string[];
}

export type SelectionType = 'add' | 'add-all' | 'remove' | 'remove-all' | 'set';
export type HandleSelectionChangeType = (
  selectionType: SelectionType,
  range: [number, number],
) => void;

/**
 * Number of renders with gridRef.current !== null
 * needed for the table to be properly initialized.
 * We set the scroll position to the persisted page
 * this many times, and then consider the scroll position to be
 * 'set' for purposes of the `onScroll` in the parent component.
 * Otherwise `onScroll` would erroneously set the page to 0
 * when the table is first initialized.
 */
export const SCROLL_SET_COUNT_NEEDED = 1;

const isLinkCell = (cell: GridCell): cell is LinkCell => {
  return !!(cell as LinkCell).data?.link?.href;
};

export function GlideTable<T, ContextAction extends string, ContextActionData>({
  columns,
  data,
  numRows,
  getHeaderMenuItems,
  getRowAccentColor,
  hideUnpinned = false,
  height,
  onColumnResize,
  onContextMenuComplete,
  onLinkClick,
  onPinnedColumnsCountChange,
  onScroll,
  onSelectionChange,
  onSortableColumnChange,
  page,
  pageSize,
  pinnedColumnsCount,
  renderContextMenuComponent,
  rowHeight,
  scrollPositionSetCount,
  selection,
  sortableColumnIds,
  sorts,
  staticColumns,
}: GlideTableProps<T, ContextAction, ContextActionData>): JSX.Element {
  const gridRef = useRef<DataEditorRef>(null);
  const clickedCellRef = useRef<{ col: number; row: number } | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number>();

  useEffect(() => {
    if (scrollPositionSetCount.get() >= SCROLL_SET_COUNT_NEEDED) return;
    if (gridRef.current !== null) {
      const rowOffset = Math.max(page * pageSize, 0);
      const bounds = gridRef.current.getBounds(0, rowOffset);
      if (bounds && !Number.isNaN(bounds.x)) {
        gridRef.current.scrollTo(0, rowOffset);
        scrollPositionSetCount.update((x) => x + 1);
      }
    }
  });

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuProps, setMenuProps] = useState<Omit<TableActionMenuProps, 'open'>>({
    bounds: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    handleClose: () => setMenuIsOpen(false),
  });

  const [contextMenuOpen] = useState(observable(false));
  const contextMenuIsOpen = useObservable(contextMenuOpen);

  const [contextMenuProps, setContextMenuProps] = useState<null | Omit<
    ContextMenuProps<T, ContextAction, ContextActionData>,
    'open'
  >>(null);

  const {
    getThemeVar,
    themeSettings: { theme: appTheme },
  } = useTheme();
  const theme = getTheme(appTheme);

  const isMobile = useMobile();

  const headerIcons = useMemo(() => getHeaderIcons(appTheme), [appTheme]);

  const { tooltip, onItemHovered, closeTooltip } = useTableTooltip<T>({
    columns,
    data,
  });

  const scrollToTop = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.scrollTo(0, 0);
    }
  }, [gridRef]);

  const getRowThemeOverride: DataEditorProps['getRowThemeOverride'] = React.useCallback(
    (row: number): Partial<Theme> | undefined => {
      // to put a border on the bottom row (actually the top of the row below it)
      if (row === data.length) return;

      // avoid showing 'empty rows' below data
      if (!data[row]) {
        return { borderColor: getThemeVar('surface') };
      }

      const hoverStyle: { accentLight?: string; bgCell?: string } = {};
      if (row === hoveredRow) {
        hoverStyle.bgCell = getThemeVar('surfaceStrong');
        if (selection.rows.toArray().includes(hoveredRow)) {
          hoverStyle.accentLight = getThemeVar('floatStrong');
        }
      }

      const rowColorTheme = Loadable.match(data[row], {
        _: () => ({}),
        Loaded: (record) => {
          const accentColor = getRowAccentColor?.(record);
          return accentColor ? { accentColor } : {};
        },
      });

      return { ...rowColorTheme, ...hoverStyle };
    },
    [getRowAccentColor, data, getThemeVar, hoveredRow, selection.rows],
  );

  const handleColumnResize: DataEditorProps['onColumnResize'] = useCallback(
    (column: GridColumn, width: number) => {
      const columnId = column.id;
      if (columnId === undefined) return;
      onColumnResize?.(columnId, width);
    },
    [onColumnResize],
  );

  const onHeaderClicked: DataEditorProps['onHeaderClicked'] = React.useCallback(
    (col: number, { bounds, preventDefault }: HeaderClickedEventArgs) => {
      preventDefault();
      const columnId = columns[col].id;
      const items = getHeaderMenuItems?.(columnId, col, setMenuIsOpen, scrollToTop, data.length);
      if (items?.length) {
        setMenuProps((prev) => ({ ...prev, bounds, items, title: `${columnId} menu` }));
        setMenuIsOpen(true);
      }
    },
    [columns, data.length, scrollToTop, getHeaderMenuItems],
  );

  const getCellContent: DataEditorProps['getCellContent'] = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;

      const loadingCell: GridCell = {
        allowOverlay: true,
        copyData: '',
        data: { appTheme, kind: 'loading-cell' },
        kind: GridCellKind.Custom,
        readonly: true,
      };

      if (!data[row]) {
        // When data length is changed, data[row] can be undefined
        return loadingCell;
      }

      return Loadable.match(data[row], {
        _: () => loadingCell,
        Loaded: (rowData) => {
          let cell: GridCell | undefined = columns[col]?.renderer?.(rowData, row);
          if (cell) {
            switch (cell.kind) {
              case GridCellKind.Text:
              case GridCellKind.Number:
                if (!cell.displayData || cell.displayData === '') {
                  cell = {
                    ...cell,
                    displayData: '-',
                    themeOverride: {
                      ...cell.themeOverride,
                      textDark: getThemeVar('surfaceOnWeak'),
                    },
                  };
                }
                break;
              default:
                break;
            }
          }
          return cell || loadingCell;
        }, // TODO correctly handle error state
      });
    },
    [appTheme, data, columns, getThemeVar],
  );

  const onCellClicked: DataEditorProps['onCellClicked'] = useCallback(
    (cell: Item, event: CellClickedEventArgs) => {
      const [col, row] = cell;

      Loadable.forEach(data[row], (rowData) => {
        const cell = columns[col].renderer(rowData, row);

        if (isLinkCell(cell)) {
          onLinkClick?.(cell.data.link.href);
        } else {
          if (event.shiftKey) {
            if (clickedCellRef.current !== null) {
              const previousRow = clickedCellRef.current.row;
              const selectionType = selection.rows.toArray().includes(row) ? 'remove' : 'add';
              const range: [number, number] =
                previousRow < row ? [previousRow, row + 1] : [row, previousRow + 1];
              onSelectionChange?.(selectionType, range);
            }
          } else {
            if (selection.rows.hasIndex(row)) {
              onSelectionChange?.('remove', [row, row + 1]);
            } else {
              onSelectionChange?.('add', [row, row + 1]);
            }
          }
          clickedCellRef.current = { col, row };
        }
      });
    },
    [data, columns, onLinkClick, onSelectionChange, selection],
  );

  const onCellContextMenu: DataEditorProps['onCellContextMenu'] = useCallback(
    (cell: Item, event: CellClickedEventArgs) => {
      const [col, row] = cell;

      // Close existing context menu.
      contextMenuOpen.set(false);

      Loadable.forEach(data[row], (rowData) => {
        // Prevent the browser native context menu from showing up.
        event.preventDefault();

        // Delay needed due to the call to close previously existing context menu.
        setTimeout(() => {
          const cell = columns[col].renderer(rowData, row);

          // Update the context menu based on the cell context.
          setContextMenuProps({
            cell,
            link: isLinkCell(cell) ? cell.data.link.href : undefined,
            onClose: (e?: DropdownEvent | Event) => {
              // Prevent the context menu closing click from triggering something else.
              if (contextMenuOpen.get()) e?.stopPropagation();
              contextMenuOpen.set(false);
            },
            renderContextMenuComponent,
            rowData,
            x: Math.max(0, event.bounds.x + event.localEventX - 4),
            y: Math.max(0, event.bounds.y + event.localEventY - 4),
          });

          contextMenuOpen.set(true);
        }, 50);
      });
    },
    [columns, data, renderContextMenuComponent, setContextMenuProps, contextMenuOpen],
  );

  const onColumnMoved: DataEditorProps['onColumnMoved'] = useCallback(
    (columnIdsStartIdx: number, columnIdsEndIdx: number): void => {
      // Prevent the static columns from moving.
      if (columnIdsStartIdx < staticColumns.length) return;

      // Update the pinned column count based on where the column is sourced from and where it lands.
      const pinnedColumnEnd = staticColumns.length + pinnedColumnsCount;
      const isIntoPinned =
        columnIdsStartIdx >= pinnedColumnEnd && columnIdsEndIdx < pinnedColumnEnd;
      const isOutOfPinned =
        columnIdsStartIdx < pinnedColumnEnd && columnIdsEndIdx >= pinnedColumnEnd;
      if (isIntoPinned) onPinnedColumnsCountChange?.(pinnedColumnsCount + 1);
      if (isOutOfPinned) onPinnedColumnsCountChange?.(pinnedColumnsCount - 1);

      // Update the column list with the updated column.
      const sortableColumnIdsStartIdx = columnIdsStartIdx - staticColumns.length;
      const sortableColumnIdsEndIdx = Math.max(columnIdsEndIdx - staticColumns.length, 0);
      const newCols = [...sortableColumnIds];
      const [toMove] = newCols.splice(sortableColumnIdsStartIdx, 1);
      newCols.splice(sortableColumnIdsEndIdx, 0, toMove);
      onSortableColumnChange?.(newCols);
    },
    [
      onPinnedColumnsCountChange,
      onSortableColumnChange,
      pinnedColumnsCount,
      sortableColumnIds,
      staticColumns.length,
    ],
  );

  const onColumnHovered = useCallback(
    (args: GridMouseEventArgs) => {
      const [, row] = args.location;
      setHoveredRow(args.kind !== 'cell' ? undefined : row);
      onItemHovered?.(args);
    },
    [onItemHovered],
  );

  const verticalBorder: DataEditorProps['verticalBorder'] = useCallback(
    (col: number) => hideUnpinned && col === staticColumns.length + pinnedColumnsCount,
    [hideUnpinned, pinnedColumnsCount, staticColumns.length],
  );

  const sortMap = useMemo(() => {
    return sorts.reduce(
      (acc, sort) => {
        if (sort.column && sort.direction) acc[sort.column] = sort.direction;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [sorts]);

  const drawHeader: DrawHeaderCallback = useCallback(
    ({ ctx, column, rect, theme }) => {
      if (!column.id) return false;

      const sortDirection = column.id && sortMap[column.id];
      if (sortDirection) {
        const arrowDirection = sortDirection === 'asc' ? 'up' : 'down';
        ctx.strokeStyle = theme.textLight;
        drawArrow(ctx, arrowDirection, rect.x + rect.width - 16, 12);
      }

      const xPad = theme.cellHorizontalPadding;
      const font = `${theme.baseFontStyle} ${theme.fontFamily}`;
      const middleCenterBias = getMiddleCenterBias(ctx, font);
      const x = rect.x + xPad;
      const y = rect.y + rect.height / 2 + middleCenterBias;
      const maxWidth = rect.width - (sortDirection ? 12 : 0) - 2 * theme.cellHorizontalPadding;

      ctx.fillStyle = theme.textHeader;
      drawTextWithEllipsis(ctx, column.title, x, y, maxWidth);

      return true;
    },
    [sortMap],
  );

  return (
    <div
      onWheel={() => {
        contextMenuOpen.set(false);
        closeTooltip();
      }}>
      {tooltip}
      <div className={css.base}>
        <DataEditor
          className={hideUnpinned ? css.horizontalScrollDisabled : undefined}
          columns={columns}
          customRenderers={customRenderers}
          drawHeader={drawHeader}
          freezeColumns={isMobile ? 0 : staticColumns.length + pinnedColumnsCount}
          getCellContent={getCellContent}
          getCellsForSelection // `getCellsForSelection` is required for double click column resize to content.
          getRowThemeOverride={getRowThemeOverride}
          gridSelection={selection}
          headerHeight={36}
          headerIcons={headerIcons}
          height={height}
          minColumnWidth={MIN_COLUMN_WIDTH}
          ref={gridRef}
          rowHeight={rowHeight}
          rows={numRows}
          smoothScrollX
          smoothScrollY
          theme={theme}
          verticalBorder={verticalBorder}
          width="100%"
          onCellClicked={onCellClicked}
          onCellContextMenu={onCellContextMenu}
          onColumnMoved={onColumnMoved}
          onColumnResize={handleColumnResize}
          onHeaderClicked={onHeaderClicked}
          onHeaderContextMenu={onHeaderClicked} // right-click
          onItemHovered={onColumnHovered}
          onVisibleRegionChanged={onScroll}
        />
      </div>
      <TableActionMenu {...menuProps} open={menuIsOpen} />
      {contextMenuProps && (
        <ContextMenu<T, ContextAction, ContextActionData>
          {...contextMenuProps}
          open={contextMenuIsOpen}
          onComplete={onContextMenuComplete}
        />
      )}
    </div>
  );
}

export default GlideTable;
