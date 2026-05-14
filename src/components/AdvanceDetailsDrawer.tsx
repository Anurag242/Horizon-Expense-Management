import React from "react";
import { X, Check, Clock, CalendarDays, ChevronDown, ArrowLeft } from "lucide-react";
import styles from "./AdvanceDetailsDrawer.module.css";
import RejectModal from "./RejectModal";
import HoldModal from "./HoldModal";

interface AdvanceDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  advance: any;
}

const AdvanceDetailsDrawer: React.FC<AdvanceDetailsDrawerProps> = ({ isOpen, onClose, advance }) => {
  const [view, setView] = React.useState<"details" | "reimbursement">("details");
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = React.useState(false);
  const [schedulePayment, setSchedulePayment] = React.useState(false);
  const [reimbursedType, setReimbursedType] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Reset state when drawer opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setView("details");
      setSchedulePayment(false);
      setReimbursedType("");
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  if (!isOpen || !advance) return null;

  const isPending = advance.status === "Pending";
  const isOnHold = advance.status === "On Hold";
  const isRejected = advance.status === "Rejected";
  const statusClass = styles[`status${advance.status.replace(" ", "")}`];

  const handleAction = () => {
    setIsRejectModalOpen(false);
    setIsHoldModalOpen(false);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.drawer}`} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {view === "details" ? (
              <>
                <button className={styles.closeBtn} onClick={onClose}>
                  <X size={24} />
                </button>
                <h2 className={styles.title}>View Advance</h2>
              </>
            ) : (
              <>
                <button className={styles.backBtn} onClick={() => setView("details")}>
                  <ArrowLeft size={20} color="#1b203c" />
                </button>
                <h2 className={styles.title}>Advance Details</h2>
              </>
            )}
          </div>
          {view === "details" && (
            <span className={`${styles.statusBadge} ${statusClass}`}>
              {advance.status}
            </span>
          )}
        </header>

        <div className={styles.content}>
          {view === "details" ? (
            <>
              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Advance Name</label>
                  <input type="text" className={styles.input} defaultValue="Cab" />
                </div>
                {!isPending && (
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Schedule payout</label>
                    <div className={styles.inputWrapper}>
                      <input type="text" className={styles.input} defaultValue="01/07/2023" />
                      <CalendarDays size={20} className={styles.inputIcon} />
                    </div>
                  </div>
                )}
                {isPending && <div></div>}

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Advance Type</label>
                  <div className={styles.inputWrapper}>
                    <select className={styles.select}>
                      <option>Single Claim</option>
                      <option>Advance Payment</option>
                      <option>Multiple Claim</option>
                    </select>
                    <ChevronDown size={18} className={styles.inputIcon} />
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Advance Date</label>
                  <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} defaultValue="01/07/2023" />
                    <CalendarDays size={20} className={styles.inputIcon} />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Category*</label>
                  <div className={styles.inputWrapper}>
                    <select className={styles.select} defaultValue={advance.category}>
                      <option>Travel</option>
                      <option>Food</option>
                      <option>Medical</option>
                    </select>
                    <ChevronDown size={18} className={styles.inputIcon} />
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Currency</label>
                  <div className={styles.inputWrapper}>
                    <select className={styles.select}>
                      <option>AED</option>
                      <option>INR</option>
                      <option>USD</option>
                    </select>
                    <ChevronDown size={18} className={styles.inputIcon} />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Total Bill Amount</label>
                  <input type="text" className={styles.input} defaultValue="256.00" />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Advance Amount</label>
                  <input type="text" className={styles.input} defaultValue="240.00" />
                </div>
              </div>

              <div className={styles.receiptSection}>
                <div className={styles.receiptHeader}>
                  <label className={styles.label}>Receipt</label>
                  {!isPending && !isOnHold && !isRejected && <button className={styles.requestBtn}>Request Receipt</button>}
                </div>
                <div className={styles.receiptInfo}>*Not Available</div>
              </div>

              <div className={styles.noteSection}>
                <label className={styles.label}>Note from Requestor</label>
                <input type="text" className={styles.input} defaultValue="Travel Fair with cab for 21.24 KM" />
              </div>

              <div className={styles.approvalHistory}>
                <label className={styles.label} style={{ marginBottom: '16px', display: 'block' }}>Approval History</label>
                <div className={styles.timelineContainer}>
                  <div className={styles.timeline}>
                    {/* Applied */}
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        <div className={`${styles.markerIcon} ${styles.markerApplied}`}>
                          <Check size={14} color="#ffffff" />
                        </div>
                        <div className={styles.markerSolidLine}></div>
                      </div>
                      <div className={styles.timelineContent}>Applied on Monday, 12 July</div>
                    </div>

                    {/* Checker Review / Rejected */}
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        {isRejected ? (
                          <div className={styles.markerRejected}>
                            <X size={14} color="#ffffff" />
                          </div>
                        ) : isOnHold ? (
                          <div className={styles.markerHold}>
                            <span style={{ fontSize: '14px', fontWeight: 900 }}>!</span>
                          </div>
                        ) : (
                          <div className={`${styles.markerIcon} ${styles.markerApplied}`}>
                            <Check size={14} color="#ffffff" />
                          </div>
                        )}
                        <div className={styles.markerSolidLine}></div>
                      </div>
                      <div className={styles.timelineContent}>
                        {isRejected ? "Rejected by Checker" : (isOnHold ? "Hold for approval by Checker" : (isPending ? "Reviewed by Checker" : "Approved by Checker"))}
                        {isOnHold && (
                          <div className={styles.holdNoteBox}>
                            <div className={styles.holdNoteTitle}>Note for advance on hold</div>
                            <div className={styles.holdNoteText}>
                              Incorrect details provided, please re-submit the advance request with the correct information.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Finance Approval */}
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        {isPending ? (
                          <div className={`${styles.markerIcon} ${styles.markerPending}`}>
                            <Clock size={14} color="#ffffff" />
                          </div>
                        ) : (
                          <div className={`${styles.markerIcon} ${styles.markerEmpty}`}></div>
                        )}
                        <div className={styles.markerDottedLine}></div>
                      </div>
                      <div className={styles.timelineContent}>Pending for review from Head of Finance</div>
                    </div>

                    {/* Final Approval */}
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        <div className={`${styles.markerIcon} ${styles.markerEmpty}`}></div>
                      </div>
                      <div className={styles.timelineContent} style={{ paddingBottom: 0 }}>Approved</div>
                    </div>
                  </div>
                </div>
                {isRejected && (
                  <div className={styles.rejectionNoteBox}>
                    <div className={styles.rejectionNoteTitle}>Note for advance rejection</div>
                    <div className={styles.rejectionNoteText}>
                      Incorrect details provided, please re-submit the advance request with the correct information.
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.reimbursementContent}>
              <div className={styles.scheduleRow}>
                <span className={styles.label}>Schedule Payment</span>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <div className={`${styles.radio} ${schedulePayment ? styles.radioSelected : ''}`}>
                      {schedulePayment && <div className={styles.radioDot} />}
                    </div>
                    <input 
                      type="radio" 
                      name="schedule" 
                      checked={schedulePayment} 
                      onChange={() => setSchedulePayment(true)} 
                      className={styles.hiddenRadio} 
                    />
                    <span className={styles.radioText}>Yes</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <div className={`${styles.radio} ${!schedulePayment ? styles.radioSelected : ''}`}>
                      {!schedulePayment && <div className={styles.radioDot} />}
                    </div>
                    <input 
                      type="radio" 
                      name="schedule" 
                      checked={!schedulePayment} 
                      onChange={() => setSchedulePayment(false)} 
                      className={styles.hiddenRadio} 
                    />
                    <span className={styles.radioText}>No</span>
                  </label>
                </div>
              </div>

              <div className={styles.formGrid}>
                {schedulePayment && (
                  <>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Payment Date <span className={styles.asterisk}>*</span></label>
                      <div className={styles.inputWrapper}>
                        <input type="text" placeholder="DD/MM/YYYY" className={styles.input} />
                        <CalendarDays size={20} className={styles.inputIcon} />
                      </div>
                    </div>
                    <div></div> {/* Spacer for 2-col grid */}
                  </>
                )}

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Payment Type <span className={styles.asterisk}>*</span></label>
                  <div className={styles.inputWrapper}>
                    <div 
                      className={styles.input} 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span style={{ color: reimbursedType ? '#111827' : '#9ca3af' }}>{reimbursedType || "Select"}</span>
                      <ChevronDown size={18} />
                    </div>
                    {isDropdownOpen && (
                      <div className={styles.dropdownMenu}>
                        {["Card", "Wallet", "Account"].map((option) => (
                          <div 
                            key={option} 
                            className={styles.dropdownItem}
                            onClick={() => {
                              setReimbursedType(option);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Advance Amount <span className={styles.asterisk}>*</span></label>
                  <input type="text" defaultValue="AED 240.00" className={styles.input} />
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          {view === "details" ? (
            isRejected ? (
              <button className={styles.approveBtnDisabled}>Approve</button>
            ) : isOnHold ? (
              <>
                <button className={styles.holdBtn} style={{ backgroundColor: "#ffffff", color: "#111827", border: "1px solid #e5e7eb" }} onClick={() => setIsRejectModalOpen(true)}>Reject</button>
                <button className={styles.approveBtnDisabled}>Approve</button>
              </>
            ) : (
              <>
                <button className={styles.holdBtn} onClick={() => setIsHoldModalOpen(true)}>Hold</button>
                <button className={styles.rejectBtn} onClick={() => setIsRejectModalOpen(true)}>Reject</button>
                <button className={styles.approveBtn} onClick={() => setView("reimbursement")}>Approve</button>
              </>
            )
          ) : (
            <button className={styles.submitBtn} onClick={() => {
              setView("details");
              onClose();
            }}>Submit</button>
          )}
        </footer>
      </div>

      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={() => handleAction()}
      />
      <HoldModal
        isOpen={isHoldModalOpen}
        onClose={() => setIsHoldModalOpen(false)}
        onSubmit={() => handleAction()}
      />
    </div>
  );
};

export default AdvanceDetailsDrawer;
