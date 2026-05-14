import React from "react";
import { X, Download, Eye, FileIcon, Check, AlertCircle, Clock, ArrowLeft, CalendarDays, ChevronDown } from "lucide-react";
import styles from "./ClaimDetailsDrawer.module.css";
import RejectModal from "./RejectModal";
import HoldModal from "./HoldModal";

interface ClaimDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  claim: any;
}

interface ExpenseRow {
  label: string;
  limit: string;
  inr: string;
  aed: string;
  rejected?: boolean;
}

const ClaimDetailsDrawer: React.FC<ClaimDetailsDrawerProps> = ({ isOpen, onClose, claim }) => {
  const [selectedExpenses, setSelectedExpenses] = React.useState<Record<string, string[]>>({
    travel: ["Food", "Stay", "Flight", "Road Taxi", "Per Diem"],
    medical: ["OPD", "Medicine"],
    tel: ["Internet Recharge"],
  });

  const [viewerFile, setViewerFile] = React.useState<{ type: "image" | "pdf"; url: string } | null>(null);
  const [showMatches, setShowMatches] = React.useState(false);
  const [view, setView] = React.useState<"details" | "reimbursement">("details");
  const [schedulePayment, setSchedulePayment] = React.useState<boolean>(false);
  const [reimbursedType, setReimbursedType] = React.useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState<boolean>(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      setView("details");
      setSchedulePayment(false);
      setReimbursedType("");
      setIsRejectModalOpen(false);
      setIsHoldModalOpen(false);
      setViewerFile(null);
      setShowMatches(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const openViewer = (type: "image" | "pdf", url: string) => {
    setViewerFile({ type, url });
  };

  const closeViewer = () => {
    setViewerFile(null);
  };

  const toggleItem = (category: string, item: string) => {
    setSelectedExpenses((prev) => {
      const current = prev[category];
      const next = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      return { ...prev, [category]: next };
    });
  };

  return (
    <>
      <HoldModal
        isOpen={isHoldModalOpen}
        onClose={() => setIsHoldModalOpen(false)}
        onSubmit={(reason, detail) => {
          console.log("On Hold:", reason, detail);
          setIsHoldModalOpen(false);
          onClose();
        }}
      />
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={(reason) => {
          console.log("Rejected for reason:", reason);
          setIsRejectModalOpen(false);
          onClose(); // Optional: close drawer after rejecting
        }}
      />
      <div className={styles.overlay} onClick={onClose}>
        <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`} onClick={(e) => e.stopPropagation()}>
          {/* Fixed Header */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              {view === "details" ? (
                <>
                  <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                  </button>
                  <h2 className={styles.title}>View Claim</h2>
                </>
              ) : (
                <>
                  <button className={styles.backBtn} onClick={() => setView("details")}>
                    <ArrowLeft size={20} color="#1b203c" />
                  </button>
                  <h2 className={styles.title}>Reimbursement Details</h2>
                </>
              )}
            </div>
            {view === "details" && (
              <div className={styles.headerRight}>
                <span className={`${styles.statusBadge} ${claim?.status === "Rejected" ? styles.statusRejected :
                    claim?.status === "Partial" ? styles.statusPartial :
                      claim?.status === "On Hold" || claim?.status === "Pending" ? styles.statusOnHold :
                        (claim?.status === "Approved" || claim?.status === "Approved" || claim?.id === "USR0432" || claim?.id === "USR0453") ? styles.statusPaid : ""
                  }`}>
                  {claim?.status === "Approved" || claim?.id === "USR0432" || claim?.id === "USR0453" ? "Approved" : (claim?.status || "Pending")}
                </span>
                <button className={styles.downloadBtn}>
                  <Download size={20} />
                </button>
              </div>
            )}
          </header>

          {/* Scrollable Content */}
          <div className={styles.scrollContent}>
            {view === "details" ? (
              <div className={styles.formSection}>
                <div className={styles.fieldGroup}>
                  <label>Employee Name</label>
                  <div className={styles.inputBox}>
                    <span>{claim?.name || "Anurag Shrivastava"}</span>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Employee Level</label>
                    <div className={styles.inputBox}>
                      {claim?.id === "USR0321" ? "Level 1" : claim?.id === "USR0432" ? "Level 3" : "Level 2"}
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Location</label>
                    <div className={styles.inputBox}>
                      {claim?.id === "USR0321" ? "Bengaluru" : claim?.id === "USR0432" ? "Dubai" : claim?.id === "USR0865" ? "Sharjah" : "Ajman"}
                    </div>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Role</label>
                    <div className={styles.inputBox}>
                      {claim?.id === "USR0321" ? "Graphic Designer" :
                        claim?.id === "USR0432" ? "Accountant" :
                          claim?.id === "USR0865" ? "Sales Executive" :
                            claim?.id === "USR0234" ? "Multimedia Designer" : "UI/UX Designer"}
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Department</label>
                    <div className={styles.inputBox}>{claim?.id === "USR0321" || claim?.id === "USR0432" ? (claim?.id === "USR0432" ? "Finance" : "Design") : "Design"}</div>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Claim Name</label>
                    <div className={styles.inputBox}>
                      {claim?.id === "USR0321" ? "Cab Fare" :
                        claim?.id === "USR0432" ? "Trip to India" :
                          claim?.id === "USR0865" ? "Lunch Meeting" : "Client Meeting"}
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Claim Type</label>
                    <div className={styles.inputBox}>{claim?.type || "Single Day Claim"}</div>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label>Claim Date</label>
                  <div className={styles.dateRow}>
                    <div className={styles.inputBox} style={{ flex: 1 }}>
                      {claim?.date ? claim.date.split(" - ")[0] : "01/10/2023"}
                    </div>
                    <span className={styles.toText}>to</span>
                    <div className={claim?.type === "Multiple Day Claim" || (claim?.date && claim.date.includes("-")) ? styles.inputBox : styles.inputBoxPlaceholder} style={{ flex: 1 }}>
                      {claim?.type === "Multiple Day Claim" || (claim?.date && claim.date.includes("-")) ? (claim.date.split(" - ")[1] || "10/10/2023") : "DD/MM/YYYY"}
                    </div>
                  </div>
                </div>

                {/* Expenses Section */}
                <div className={styles.expensesSection}>
                  <label className={styles.sectionLabel}>Expenses</label>

                  {/* Travel */}
                  <div className={styles.expenseTable}>
                    <div className={styles.tableHeader}>
                      <div className={styles.colMain}>Travel</div>
                      <div className={styles.col}>Policy Limit</div>
                      <div className={styles.col}>Spend in INR</div>
                      <div className={styles.col}>Spend in AED</div>
                      <div className={styles.colAction}>
                        <div className={`${styles.customCheckbox} ${claim?.status === "Partial" ? styles.partialBlue : styles.checked}`}></div>
                      </div>
                    </div>
                    {[
                      { label: "Food", limit: "AED 400.00", inr: "INR 6,450.00", aed: "AED 284.04" },
                      { label: "Stay", limit: "AED 600.00", inr: "INR 10,000.00", aed: "AED 440.34", rejected: true },
                      { label: "Flight", limit: "AED 1,000.00", inr: "INR 19,000.00", aed: "AED 836.64" },
                      { label: "Road Taxi", limit: "AED 200.00", inr: "INR 2,840.00", aed: "AED 125.06" },
                      { label: "Per Diem", limit: "AED 100.00", inr: "INR 1,400.00", aed: "AED 61.85" },
                    ].map((row: ExpenseRow, i) => (
                      <div key={i} className={styles.tableRow}>
                        <div className={styles.colMain}>{row.label}</div>
                        <div className={styles.col}>{row.limit}</div>
                        <div className={styles.col}>{row.inr}</div>
                        <div className={styles.col}>{row.aed}</div>
                        <div className={styles.colAction}>
                          {claim?.status === "Partial" ? (
                            row.rejected ? (
                              <div className={styles.rowActions}>
                                <div className={styles.rowInfo} title="Claim is bigger than the policy limits">
                                  <AlertCircle size={18} color="#4b5563" />
                                  <span className={styles.tooltip}>Claim is bigger than the policy limits</span>
                                </div>
                                <div className={`${styles.customCheckbox} ${styles.rejected}`}></div>
                              </div>
                            ) : (
                              <div className={`${styles.customCheckbox} ${styles.checked}`}></div>
                            )
                          ) : (
                            <div className={`${styles.customCheckbox} ${selectedExpenses.travel.includes(row.label) || claim?.status === "On Hold" ? styles.checked : ""}`}
                              onClick={() => toggleItem("travel", row.label)}></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Medical */}
                  <div className={styles.expenseTable}>
                    <div className={styles.tableHeader}>
                      <div className={styles.colMain}>Medical</div>
                      <div className={styles.col}>Policy Limit</div>
                      <div className={styles.col}>Spend in INR</div>
                      <div className={styles.col}>Spend in AED</div>
                      <div className={styles.colAction}>
                        <div className={`${styles.customCheckbox} ${claim?.status === "Partial" ? styles.partialBlue : styles.checked}`}></div>
                      </div>
                    </div>
                    {[
                      { label: "OPD", limit: "AED 500.00", inr: "INR 4,500.00", aed: "AED 198.15" },
                      { label: "Medicine", limit: "AED 200.00", inr: "INR 2,800.00", aed: "AED 123.29", rejected: true },
                    ].map((row: ExpenseRow, i) => (
                      <div key={i} className={styles.tableRow}>
                        <div className={styles.colMain}>{row.label}</div>
                        <div className={styles.col}>{row.limit}</div>
                        <div className={styles.col}>{row.inr}</div>
                        <div className={styles.col}>{row.aed}</div>
                        <div className={styles.colAction}>
                          {claim?.status === "Partial" ? (
                            row.rejected ? (
                              <div className={styles.rowActions}>
                                <div className={styles.rowInfo} title="Claim is bigger than the policy limits">
                                  <AlertCircle size={18} color="#4b5563" />
                                  <span className={styles.tooltip}>Claim is bigger than the policy limits</span>
                                </div>
                                <div className={`${styles.customCheckbox} ${styles.rejected}`}></div>
                              </div>
                            ) : (
                              <div className={`${styles.customCheckbox} ${styles.checked}`}></div>
                            )
                          ) : (
                            <div className={`${styles.customCheckbox} ${selectedExpenses.medical.includes(row.label) || claim?.status === "On Hold" ? styles.checked : ""}`}
                              onClick={() => toggleItem("medical", row.label)}></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tel. Expense */}
                  <div className={styles.expenseTable}>
                    <div className={styles.tableHeader}>
                      <div className={styles.colMain}>Tel. Expense</div>
                      <div className={styles.col}>Policy Limit</div>
                      <div className={styles.col}>Spend in INR</div>
                      <div className={styles.col}>Spend in AED</div>
                      <div className={styles.colAction}>
                        <div className={`${styles.customCheckbox} ${styles.checked}`}></div>
                      </div>
                    </div>
                    {[
                      { label: "Internet Recharge", limit: "AED 100.00", inr: "INR 1,200.00", aed: "AED 52.84" },
                    ].map((row: ExpenseRow, i) => (
                      <div key={i} className={styles.tableRow}>
                        <div className={styles.colMain}>{row.label}</div>
                        <div className={styles.col}>{row.limit}</div>
                        <div className={styles.col}>{row.inr}</div>
                        <div className={styles.col}>{row.aed}</div>
                        <div className={styles.colAction}>
                          {claim?.status === "Partial" ? (
                            <div className={`${styles.customCheckbox} ${styles.checked}`}></div>
                          ) : (
                            <div className={`${styles.customCheckbox} ${selectedExpenses.tel.includes(row.label) || claim?.status === "On Hold" ? styles.checked : ""}`}
                              onClick={() => toggleItem("tel", row.label)}></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Base Currency</label>
                    <div className={styles.inputBox}>AED</div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Base Spend Amount</label>
                    <div className={styles.inputBox}>2,122.01</div>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Invoice Currency</label>
                    <div className={styles.inputBox}>INR</div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Invoice Spend Amount</label>
                    <div className={styles.inputBox}>48,190.00</div>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Conversion Rate</label>
                    <div className={styles.inputBox}>1 AED = 22.50 INR</div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>VAT %</label>
                    <div className={styles.inputBox}>5%</div>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Total Amount without VAT</label>
                    <div className={styles.inputBox}>2,122.01</div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>VAT Amount</label>
                    <div className={styles.inputBox}>106.10</div>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label>Total payable amount</label>
                  <div className={styles.inputBox}>2,228.11</div>
                </div>

                {/* Receipts */}
                <div className={styles.receiptsSection}>
                  <label className={styles.sectionLabel} style={{ marginBottom: '4px' }}>Receipt</label>
                  {(claim?.audit === "Error" || claim?.id === "USR0234") && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#4b5563' }}>
                      <span style={{ color: '#f59e0b', fontSize: '14px' }}>⚠️</span>
                      The claim amount does not match with the receipt
                    </div>
                  )}
                  <div className={styles.receiptGrid}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                      <div key={item} className={styles.receiptWrapper}>
                        <div className={styles.receiptCard}>
                          <div className={styles.receiptThumb}>
                            {claim?.id === "USR0432" ? (
                              item === 3 || item === 5 || item === 6 ? (
                                <div className={styles.pdfCard} onClick={() => openViewer("pdf", "/Sample.pdf")}>
                                  <FileIcon size={32} color="#ffffff" />
                                  <span className={styles.pdfLabel}>PDF</span>
                                </div>
                              ) : (
                                <div className={styles.imgThumb} onClick={() => openViewer("image", "/receipt-sample.png")}>
                                  <img src={`/receipt-thumb-${item}.png`} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                </div>
                              )
                            ) : claim?.id === "USR0321" ? (
                              <div className={styles.imgThumb} onClick={() => openViewer("image", "/receipt-sample.png")}>
                                <div className={styles.pdfCard} style={{ backgroundColor: "#ef4444" }} onClick={() => openViewer("pdf", "/Sample.pdf")}>
                                  <FileIcon size={32} color="#ffffff" />
                                  <span className={styles.pdfLabel}>PDF</span>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.pdfCard} onClick={() => openViewer("pdf", "/Sample.pdf")}>
                                <FileIcon size={32} color="#ffffff" />
                                <span className={styles.pdfLabel}>PDF</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.receiptActions}>
                          <button className={styles.actionIcon} onClick={() => openViewer("image", "/receipt-sample.png")}><Eye size={18} /></button>
                          <button className={styles.actionIcon}><Download size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label>Note from Requestor</label>
                  <div className={styles.inputBox}>
                    {claim?.id === "USR0234" ? "Travel Fair with cab for 21.24 KM" :
                      claim?.id === "USR0321" ? "Travel Fair with cab for 21.24 KM" : "Trip to India for official Conference of 10 Days"}
                  </div>
                </div>

                {/* Approval History */}
                <div className={styles.historySection}>
                  <label className={styles.sectionLabel}>Approval History</label>
                  <div className={styles.timelineContainer}>
                    <div className={styles.timeline}>
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                          <div className={styles.markerApplied}><Check size={14} color="#ffffff" /></div>
                          <div className={styles.markerSolidLine}></div>
                        </div>
                        <div className={styles.timelineContent}>Applied on Monday, 12 July</div>
                      </div>

                      <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                          {claim?.status === "On Hold" || claim?.status === "Pending" ? (
                            <div className={styles.markerHold}>{claim?.status === "Pending" ? <Clock size={14} color="#ffffff" /> : <AlertCircle size={14} color="#ffffff" />}</div>
                          ) : claim?.status === "Rejected" ? (
                            <div className={styles.markerRejected}><X size={14} color="#ffffff" /></div>
                          ) : (
                            <div className={styles.markerApplied}><Check size={14} color="#ffffff" /></div>
                          )}
                          <div className={styles.markerSolidLine}></div>
                        </div>
                        <div className={styles.timelineContent}>
                          <div className={styles.timelineText}>
                            {claim?.status === "On Hold" ? "Hold for approval by Checker" :
                              claim?.status === "Pending" ? "Reviewed by Checker" :
                                claim?.status === "Rejected" ? "Rejected by Checker" : "Approved by Checker"}
                          </div>
                          {claim?.status === "On Hold" && (
                            <div className={styles.holdNote}>
                              <div className={styles.holdNoteTitle}>Note for claim on hold</div>
                              <div className={styles.holdNoteText}>
                                Incorrect documents uploaded, please re-submit claim with proper documents.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                          {claim?.id === "USR0432" || claim?.id === "USR0453" || claim?.status === "Partial" || claim?.status === "Approved" ? (
                            <div className={styles.markerApplied}><Check size={14} color="#ffffff" /></div>
                          ) : (
                            <div className={styles.markerEmpty}></div>
                          )}
                          <div className={claim?.id === "USR0432" || claim?.id === "USR0453" || claim?.status === "Approved" ? styles.markerSolidLine : styles.markerDottedLine}></div>
                        </div>
                        <div className={styles.timelineContent}>
                          {claim?.id === "USR0432" || claim?.id === "USR0453" || claim?.status === "Partial" || claim?.status === "Approved" ? "Approved from Head of Finance" : "Pending for approval from Head of Finance"}
                        </div>
                      </div>

                      <div className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                          {claim?.id === "USR0432" || claim?.id === "USR0453" || claim?.status === "Approved" ? (
                            <div className={styles.markerApplied}><Check size={14} color="#ffffff" /></div>
                          ) : claim?.status === "Partial" ? (
                            <div className={styles.markerApplied}><Check size={14} color="#ffffff" /></div>
                          ) : (
                            <div className={styles.markerEmpty}></div>
                          )}
                        </div>
                        <div className={styles.timelineContent}>
                          {claim?.id === "USR0432" || claim?.id === "USR0453" || claim?.status === "Approved" ? "Approved & Disbursed" :
                            claim?.status === "Partial" ? "Approved" : "Approved"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.content}>
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

                {schedulePayment && (
                  <div className={styles.gridRow}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} style={{ fontSize: '15px', color: '#475569' }}>
                        Payment Date <span className={styles.asterisk}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <input type="text" placeholder="DD/MM/YYYY" className={styles.inputBoxFilled} style={{ fontSize: '16px', paddingRight: '40px' }} />
                        <CalendarDays size={20} color="#9ca3af" className={styles.inputIcon} />
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Reimbursed Type <span className={styles.asterisk}>*</span></label>
                    <div className={styles.customDropdownWrapper}>
                      <div
                        className={styles.inputBoxFilled}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', color: reimbursedType ? '#020617' : '#9ca3af' }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>{reimbursedType || "Select"}</span>
                        <ChevronDown size={18} color="#9ca3af" />
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
                    <label className={styles.label}>Reimbursed Amount <span className={styles.asterisk}>*</span></label>
                    <input type="text" defaultValue="AED 00.00" className={styles.inputBoxFilled} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <footer className={styles.footer}>
            {view === "details" ? (
              claim?.id === "USR0432" ? null : (
                claim?.status === "On Hold" ? (
                  <>
                    <button className={styles.holdBtn} style={{ backgroundColor: "#ffffff", color: "#1b203c", border: "1px solid #e5e7eb" }}>Reject</button>
                    <button className={styles.approveBtnDisabled}>Approve</button>
                  </>
                ) : claim?.status === "Rejected" ? (
                  <button className={styles.approveBtnDisabled}>Approve</button>
                ) : (
                  <>
                    <button className={styles.holdBtn} onClick={() => setIsHoldModalOpen(true)}>Hold</button>
                    <button className={styles.rejectBtn} onClick={() => setIsRejectModalOpen(true)}>Reject</button>
                    <button className={styles.approveBtn} onClick={() => setView("reimbursement")}>Approve</button>
                  </>
                )
              )
            ) : (
              <button className={styles.submitBtn} onClick={() => {
                setView("details");
                onClose();
              }}>Submit</button>
            )}
          </footer>
        </div>
      </div>

      {/* Google Drive-style File Viewer */}
      {viewerFile && (
        <div className={styles.viewerOverlay} onClick={closeViewer}>
          <div className={styles.viewerHeader} onClick={(e) => e.stopPropagation()}>
            <div className={styles.viewerHeaderLeft}>
              <button className={styles.viewerCloseBtn} onClick={closeViewer}>
                <X size={24} color="#ffffff" />
              </button>
              <span className={styles.viewerFileName}>
                {viewerFile.type === "pdf" ? "receipt_invoice.pdf" : "receipt_image.png"}
              </span>
            </div>
            <div className={styles.viewerHeaderRight}>
              <button className={styles.viewerActionBtn}><Download size={20} color="#ffffff" /></button>
              <button className={styles.viewerActionBtn} onClick={closeViewer}><X size={20} color="#ffffff" /></button>
            </div>
          </div>
          <div className={styles.viewerContent} onClick={(e) => e.stopPropagation()}>
            {viewerFile.type === "pdf" ? (
              <div className={styles.pdfViewerContainer}>
                <iframe
                  src="/Sample.pdf"
                  className={styles.pdfIframe}
                  title="PDF Viewer"
                />
              </div>
            ) : (
              <div className={styles.imageViewerContainer}>
                <img src={viewerFile.url} alt="Receipt" className={styles.viewerImage} />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Duplicate Matches Modal */}
      {showMatches && (
        <div className={styles.matchesOverlay} onClick={() => setShowMatches(false)}>
          <div className={styles.matchesModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.matchesHeader}>
              <h3 className={styles.matchesTitle}>Bill attachment matches</h3>
              <button className={styles.matchesCloseX} onClick={() => setShowMatches(false)}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.matchesContent}>
              <div className={styles.matchColumn}>
                <div className={styles.matchLabel}>Actual Receipt Attached</div>
                <div className={styles.matchId}>Claim id : 1780129</div>
                <div className={styles.matchReceiptContainer}>
                  <img src="/receipt-sample.png" alt="Actual Receipt" className={styles.matchImage} />
                </div>
              </div>

              <div className={styles.matchColumn}>
                <div className={styles.matchLabel}>Current Receipt Attached</div>
                <div className={styles.matchId}>Claim id : 276890</div>
                <div className={styles.matchReceiptContainer}>
                  <img src="/receipt-sample.png" alt="Current Receipt" className={styles.matchImage} />
                </div>
              </div>
            </div>

            <div className={styles.matchesFooter}>
              <button className={styles.matchesCloseBtn} onClick={() => setShowMatches(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimDetailsDrawer;
