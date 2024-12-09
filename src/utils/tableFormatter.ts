interface Column {
  width: number;
  align: 'left' | 'right' | 'center';
}

interface TableOptions {
  columns: Record<string, Column>;
  borders?: boolean;
}

export class TableFormatter {
  private static readonly HORIZONTAL = '─';
  private static readonly VERTICAL = '│';
  private static readonly TOP_LEFT = '┌';
  private static readonly TOP_RIGHT = '┐';
  private static readonly BOTTOM_LEFT = '└';
  private static readonly BOTTOM_RIGHT = '┘';
  private static readonly TEE_LEFT = '├';
  private static readonly TEE_RIGHT = '┤';
  private static readonly CROSS = '┼';
  private static readonly HORIZONTAL_DOWN = '┬';
  private static readonly HORIZONTAL_UP = '┴';

  static formatTable(data: Record<string, any>[], options: TableOptions): string {
    const { columns, borders = true } = options;
    const columnNames = Object.keys(columns);
    
    // Create header
    const header = this.createRow(
      columnNames.map(name => ({ value: name, ...columns[name] })),
      borders
    );
    
    // Create separator
    const separator = this.createSeparator(columns, borders);
    
    // Create rows
    const rows = data.map(item =>
      this.createRow(
        columnNames.map(name => ({
          value: item[name],
          ...columns[name]
        })),
        borders
      )
    );

    // Combine all parts
    return [
      borders ? this.createTopBorder(columns) : '',
      header,
      separator,
      ...rows,
      borders ? this.createBottomBorder(columns) : ''
    ].filter(Boolean).join('\n');
  }

  private static createRow(
    cells: Array<{ value: any; width: number; align: string }>,
    borders: boolean
  ): string {
    const formattedCells = cells.map(({ value, width, align }) => {
      const str = String(value).slice(0, width);
      const padding = width - str.length;
      
      if (align === 'right') {
        return ' '.repeat(padding) + str;
      } else if (align === 'center') {
        const leftPad = Math.floor(padding / 2);
        const rightPad = padding - leftPad;
        return ' '.repeat(leftPad) + str + ' '.repeat(rightPad);
      }
      return str + ' '.repeat(padding);
    });

    return borders
      ? `${this.VERTICAL} ${formattedCells.join(` ${this.VERTICAL} `)} ${this.VERTICAL}`
      : formattedCells.join(' ');
  }

  private static createSeparator(
    columns: Record<string, Column>,
    borders: boolean
  ): string {
    const parts = Object.values(columns).map(({ width }) =>
      this.HORIZONTAL.repeat(width + 2)
    );

    return borders
      ? `${this.TEE_LEFT}${parts.join(this.CROSS)}${this.TEE_RIGHT}`
      : this.HORIZONTAL.repeat(
          parts.reduce((sum, part) => sum + part.length, parts.length - 1)
        );
  }

  private static createTopBorder(columns: Record<string, Column>): string {
    const parts = Object.values(columns).map(({ width }) =>
      this.HORIZONTAL.repeat(width + 2)
    );
    return `${this.TOP_LEFT}${parts.join(this.HORIZONTAL_DOWN)}${this.TOP_RIGHT}`;
  }

  private static createBottomBorder(columns: Record<string, Column>): string {
    const parts = Object.values(columns).map(({ width }) =>
      this.HORIZONTAL.repeat(width + 2)
    );
    return `${this.BOTTOM_LEFT}${parts.join(this.HORIZONTAL_UP)}${this.BOTTOM_RIGHT}`;
  }
}