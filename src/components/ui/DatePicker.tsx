import styles from "./DatePicker.module.css";
import { Pencil, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  onClose?: () => void;
  onSelect?: (date: number) => void;
  selectedDate?: number;
}

const DatePicker = ({ 
  onClose, 
  onSelect, 
  selectedDate = 1 
}: DatePickerProps) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  
  const dates = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.overline}>Select Date</span>
        <div className={styles.titleRow}>
          <h2 className={styles.monthTitle}>July</h2>
          <Pencil size={20} className={styles.editIcon} />
        </div>
      </div>

      <div className={styles.navRow}>
        <div className={styles.monthYearSelector}>
          July 2023 <ChevronDown size={18} />
        </div>
        <div className={styles.navArrows}>
          <ChevronLeft size={20} className={styles.arrow} />
          <ChevronRight size={20} className={styles.arrow} />
        </div>
      </div>

      <div className={styles.calendarGrid}>
        {days.map(day => (
          <div key={day} className={styles.dayLabel}>{day}</div>
        ))}
        {dates.map((date, index) => (
          <div 
            key={index} 
            className={`
              ${styles.dateCell} 
              ${date === null ? styles.emptyCell : ""} 
              ${date === selectedDate ? styles.selectedDate : ""}
            `}
            onClick={() => date && onSelect?.(date)}
          >
            {date}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.textBtn} onClick={onClose}>Cancel</button>
        <button className={styles.textBtn} onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default DatePicker;
