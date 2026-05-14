import React from "react";
import { X, ChevronDown, CalendarDays, User, Info, LayoutGrid, Search } from "lucide-react";
import styles from "./FilterDrawer.module.css";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  activeTab: string;
}

const USERS = [
  { name: "Anurag Shrivastava", id: "USR0457" },
  { name: "Ahmed Hussain", id: "USR0235" },
  { name: "Shubham Kumar", id: "USR0865" },
  { name: "Amardeep Singh", id: "USR0321" },
  { name: "Adil Khan", id: "USR0453" },
];

const CLAIM_STATUSES = ["Approved", "Pending", "Rejected", "On Hold", "Partial"];
const ADVANCE_STATUSES = ["Approved", "Pending", "On Hold", "Rejected"];
const CLAIM_TYPES = ["Single Day Claim", "Multiple Day Claim"];
const CATEGORIES = ["Medical", "Food", "Travel"];
const DATE_QUICK = ["Custom", "7D", "30D", "3M", "6M"];

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, onApply, activeTab }) => {
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  // Date
  const [dateQuick, setDateQuick] = React.useState<string>("");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");

  // Users
  const [userSearch, setUserSearch] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

  // Status
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);

  // Claim Type / Category
  const [selectedBottomItems, setSelectedBottomItems] = React.useState<string[]>([]);

  const isAdvance = activeTab === "Advance" || activeTab === "Scheduled Payment";
  const statusOptions = isAdvance ? ADVANCE_STATUSES : CLAIM_STATUSES;
  const bottomOptions = isAdvance ? CATEGORIES : CLAIM_TYPES;
  const bottomLabel = isAdvance ? "Category" : "Claim Type";

  // Reset local state when activeTab changes to avoid mixing filters
  React.useEffect(() => {
    handleClear();
  }, [activeTab]);

  const hasFilters =
    dateQuick !== "" || selectedUsers.length > 0 ||
    selectedStatuses.length > 0 || selectedBottomItems.length > 0;

  const handleClear = () => {
    setDateQuick(""); setDateFrom(""); setDateTo("");
    setUserSearch(""); setSelectedUsers([]);
    setSelectedStatuses([]); setSelectedBottomItems([]);
    setOpenSection(null);
  };

  const toggleSection = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const filteredUsers = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  const buildFilters = () => ({
    date: dateQuick === "Custom" ? { from: dateFrom, to: dateTo } : dateQuick,
    users: selectedUsers,
    statuses: selectedStatuses,
    [isAdvance ? "categories" : "claimTypes"]: selectedBottomItems,
  });

  return (
    <>
      {isOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1000 }}
          onClick={onClose}
        />
      )}

      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filter
          </div>
          <div className={styles.headerRight}>
            <button className={styles.clearBtn} onClick={() => { handleClear(); onApply({}); onClose(); }}>Clear Filter</button>
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Items */}
        <div className={styles.filterList}>

          {/* DATE */}
          <div className={styles.filterItem}>
            <div className={styles.filterItemHeader} onClick={() => toggleSection("date")}>
              <div className={styles.filterItemLeft}>
                <CalendarDays size={18} color="#6b7280" />
                <span>{dateQuick && dateQuick !== "Custom" ? `Last ${dateQuick}` : dateQuick === "Custom" && (dateFrom || dateTo) ? `${dateFrom} → ${dateTo}` : "Date"}</span>
              </div>
              <ChevronDown size={16} className={`${styles.chevron} ${openSection === "date" ? styles.chevronOpen : ""}`} />
            </div>

            {openSection === "date" && (
              <div className={styles.filterItemBody}>
                <div className={styles.quickDateRow}>
                  {DATE_QUICK.map((q) => (
                    <button
                      key={q}
                      className={`${styles.quickBtn} ${dateQuick === q ? styles.quickBtnActive : ""}`}
                      onClick={() => setDateQuick(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                {dateQuick === "Custom" && (
                  <div className={styles.dateInputs}>
                    <div className={styles.dateInputRow}>
                      <input
                        type="date"
                        className={styles.dateInput}
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </div>
                    <div className={styles.dateInputRow}>
                      <input
                        type="date"
                        className={styles.dateInput}
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ALL USERS */}
          <div className={styles.filterItem}>
            <div className={styles.filterItemHeader} onClick={() => toggleSection("users")}>
              <div className={styles.filterItemLeft}>
                <User size={18} color="#6b7280" />
                <span>{selectedUsers.length > 0 ? `${selectedUsers.length} user${selectedUsers.length > 1 ? "s" : ""} selected` : "All users"}</span>
              </div>
              <ChevronDown size={16} className={`${styles.chevron} ${openSection === "users" ? styles.chevronOpen : ""}`} />
            </div>

            {openSection === "users" && (
              <div className={styles.filterItemBody}>
                <div className={styles.searchRow}>
                  <Search size={15} color="#9ca3af" />
                  <input
                    className={styles.searchInput}
                    placeholder="Search"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
                <div className={styles.checkList}>
                  {filteredUsers.map((u) => (
                    <div key={u.id} className={styles.checkRow} onClick={() => toggleItem(selectedUsers, setSelectedUsers, u.id)}>
                      <div className={styles.checkRowLeft}>
                        <div className={styles.userName}>{u.name}</div>
                        <div className={styles.userId}>{u.id}</div>
                      </div>
                      <div className={`${styles.checkbox} ${selectedUsers.includes(u.id) ? styles.checkboxChecked : ""}`}>
                        {selectedUsers.includes(u.id) && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#008000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* APPROVAL STATUS */}
          <div className={styles.filterItem}>
            <div className={styles.filterItemHeader} onClick={() => toggleSection("status")}>
              <div className={styles.filterItemLeft}>
                <Info size={18} color="#6b7280" />
                <span>{selectedStatuses.length > 0 ? selectedStatuses.join(", ") : "Approval Status"}</span>
              </div>
              <ChevronDown size={16} className={`${styles.chevron} ${openSection === "status" ? styles.chevronOpen : ""}`} />
            </div>

            {openSection === "status" && (
              <div className={styles.filterItemBody}>
                <div className={styles.checkList}>
                  {statusOptions.map((s) => (
                    <div key={s} className={styles.checkRow} onClick={() => toggleItem(selectedStatuses, setSelectedStatuses, s)}>
                      <div className={styles.checkRowLabel}>{s}</div>
                      <div className={`${styles.checkbox} ${selectedStatuses.includes(s) ? styles.checkboxChecked : ""}`}>
                        {selectedStatuses.includes(s) && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#008000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.filterItem}>
            <div className={styles.filterItemHeader} onClick={() => toggleSection("bottom")}>
              <div className={styles.filterItemLeft}>
                <LayoutGrid size={18} color="#6b7280" />
                <span>{selectedBottomItems.length > 0 ? selectedBottomItems.join(", ") : bottomLabel}</span>
              </div>
              <ChevronDown size={16} className={`${styles.chevron} ${openSection === "bottom" ? styles.chevronOpen : ""}`} />
            </div>

            {openSection === "bottom" && (
              <div className={styles.filterItemBody}>
                <div className={styles.checkList}>
                  {bottomOptions.map((c) => (
                    <div key={c} className={styles.checkRow} onClick={() => toggleItem(selectedBottomItems, setSelectedBottomItems, c)}>
                      <div className={styles.checkRowLabel}>{c}</div>
                      <div className={`${styles.checkbox} ${selectedBottomItems.includes(c) ? styles.checkboxChecked : ""}`}>
                        {selectedBottomItems.includes(c) && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#008000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={`${styles.applyBtn} ${hasFilters ? styles.applyBtnActive : ""}`}
            onClick={() => { if (hasFilters) onApply(buildFilters()); }}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
