import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table = ({ children, className = "" }: TableProps) => {
  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table className={styles.table}>
        {children}
      </table>
    </div>
  );
};

/* Sub-Components */

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

const HeaderCell = ({ children }: { children: React.ReactNode }) => (
  <th className={styles.headerCell}>{children}</th>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

const TableRow = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <tr 
    className={`${styles.row} ${onClick ? styles.clickable : ""}`} 
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    {children}
  </tr>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className={styles.cell}>{children}</td>
);

const TableFooter = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.footer}>{children}</div>
);

/* Attaching sub-components */
Table.Header = TableHeader;
Table.HeaderCell = HeaderCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Footer = TableFooter;

export default Table;
