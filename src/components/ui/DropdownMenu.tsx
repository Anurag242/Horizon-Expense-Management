import styles from "./DropdownMenu.module.css";

interface DropdownMenuProps {
  options: string[];
  onSelect?: (option: string) => void;
  className?: string;
  isOpen?: boolean;
}

const DropdownMenu = ({
  options,
  onSelect,
  className = "",
  isOpen = false
}: DropdownMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.menu} ${className}`}>
      {options.map((option, index) => (
        <div 
          key={index} 
          className={styles.option}
          onClick={() => onSelect?.(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
