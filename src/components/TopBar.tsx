import styles from "./TopBar.module.css";
import uaeFlag from "../assets/uae_flag.png";
import { ChevronDown } from "lucide-react";

export default function TopBar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.rightSection}>
        <div className={styles.languageSelector}>
          <div className={styles.flagIcon}>
            <img src={uaeFlag} alt="UAE" className={styles.flagImage} />
          </div>
          <ChevronDown size={18} color="#10b981" strokeWidth={3} />
          <span className={styles.languageText}>العربية</span>
        </div>
      </div>
    </header>
  );
}
