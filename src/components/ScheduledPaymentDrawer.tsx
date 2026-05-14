import React from "react";
import { X, Check, Clock, CalendarDays, ChevronDown } from "lucide-react";
import styles from "./ScheduledPaymentDrawer.module.css";

interface ScheduledPaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ScheduledPaymentDrawer: React.FC<ScheduledPaymentDrawerProps> = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = React.useState<"details" | "schedule">("details");
  const [schedulePayment, setSchedulePayment] = React.useState(true);
  const [reimbursedType, setReimbursedType] = React.useState("Card");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Reset state on open
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab("details");
      setSchedulePayment(true);
      setReimbursedType("Card");
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>
            <h2 className={styles.title}>View Claim</h2>
          </div>
          <span className={styles.statusBadge}>Approved</span>
        </header>

        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tab} ${activeTab === "details" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "schedule" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule Payment
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === "details" ? (
            <div className={styles.detailsView}>
              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Claim Name</label>
                  <input type="text" className={styles.input} defaultValue="Cab" readOnly />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Schedule Payment</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} defaultValue="01/07/2023" readOnly />
                    <CalendarDays size={20} className={styles.inputIcon} />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Claim Type</label>
                  <div className={styles.inputWrapper}>
                    <div className={styles.input} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Advance Payment</span>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Claim Date</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} defaultValue="01/07/2023" readOnly />
                    <CalendarDays size={20} className={styles.inputIcon} />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Category</label>
                  <div className={styles.inputWrapper}>
                    <div className={styles.input} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Travel</span>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Currency</label>
                  <div className={styles.inputWrapper}>
                    <div className={styles.input} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>AED</span>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Total Bill Amount</label>
                  <input type="text" className={styles.input} defaultValue="256.00" readOnly />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Claim Amount</label>
                  <input type="text" className={styles.input} defaultValue="240.00" readOnly />
                </div>
              </div>

              <div className={styles.receiptSection}>
                <div className={styles.receiptHeader}>
                  <label className={styles.label}>Receipt</label>
                  <button className={styles.requestBtn}>Request Receipt</button>
                </div>
                <div className={styles.receiptInfo}>*Not Available</div>
              </div>

              <div className={styles.noteSection}>
                <label className={styles.label}>Note from Requestor</label>
                <div className={styles.noteBox}>
                  Travel Fair with cab for 21.24 KM
                </div>
              </div>

              <div className={styles.historySection}>
                <label className={styles.label}>Approval History</label>
                <div className={styles.timelineContainer}>
                  <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        <div className={styles.markerApplied}><Check size={14} color="#fff" /></div>
                        <div className={styles.markerSolidLine}></div>
                      </div>
                      <div className={styles.timelineText}>Applied on Monday, 12 July</div>
                    </div>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        <div className={styles.markerApplied}><Check size={14} color="#fff" /></div>
                        <div className={styles.markerSolidLine}></div>
                      </div>
                      <div className={styles.timelineText}>Approved by Checker</div>
                    </div>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        <div className={styles.markerPending}><Clock size={14} color="#fff" /></div>
                      </div>
                      <div className={styles.timelineText}>Pending for review from Head of Finance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.scheduleView}>
              <div className={styles.scheduleRow}>
                <span className={styles.label}>Schedule Payment</span>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <div className={`${styles.radio} ${schedulePayment ? styles.radioSelected : ''}`}>
                      {schedulePayment && <div className={styles.radioDot} />}
                    </div>
                    <input type="radio" checked={schedulePayment} onChange={() => setSchedulePayment(true)} className={styles.hiddenRadio} />
                    <span className={styles.radioText}>Yes</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <div className={`${styles.radio} ${!schedulePayment ? styles.radioSelected : ''}`}>
                      {!schedulePayment && <div className={styles.radioDot} />}
                    </div>
                    <input type="radio" checked={!schedulePayment} onChange={() => setSchedulePayment(false)} className={styles.hiddenRadio} />
                    <span className={styles.radioText}>No</span>
                  </label>
                </div>
              </div>

              <div className={styles.formGrid} style={{ marginTop: '20px' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Payment Date <span className={styles.asterisk}>*</span></label>
                  <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} defaultValue="25/01/2023" />
                    <CalendarDays size={20} className={styles.inputIcon} />
                  </div>
                </div>
                <div></div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Reimbursed Type <span className={styles.asterisk}>*</span></label>
                  <div className={styles.inputWrapper}>
                    <div 
                      className={styles.input} 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>{reimbursedType}</span>
                      <ChevronDown size={18} />
                    </div>
                    {isDropdownOpen && (
                      <div className={styles.dropdown}>
                        {["Card", "Wallet", "Account"].map(t => (
                          <div key={t} className={styles.dropdownItem} onClick={() => { setReimbursedType(t); setIsDropdownOpen(false); }}>{t}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Reimbursed Amount <span className={styles.asterisk}>*</span></label>
                  <input type="text" className={styles.input} defaultValue="AED 24.00" />
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <button className={styles.payNowBtn}>Pay Now</button>
        </footer>
      </div>
    </div>
  );
};

export default ScheduledPaymentDrawer;
