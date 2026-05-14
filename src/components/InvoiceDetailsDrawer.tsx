import React from "react";
import { X, Download, Eye, FileIcon, Calendar, ArrowLeft, ChevronDown } from "lucide-react";
import styles from "./InvoiceDetailsDrawer.module.css";

interface InvoiceDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
  sourceTab?: string;
}

const InvoiceDetailsDrawer: React.FC<InvoiceDetailsDrawerProps> = ({ isOpen, onClose, invoice, sourceTab }) => {
  const [view, setView] = React.useState<"details" | "schedule">("details");
  const [internalTab, setInternalTab] = React.useState<"details" | "payment">("details");
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState("Select");
  const [isScheduled, setIsScheduled] = React.useState(true);

  React.useEffect(() => {
    if (isOpen) {
      setView("details");
      setInternalTab("details");
      setSelectedAccount("Select");
      setIsAccountDropdownOpen(false);
      setIsScheduled(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const accountOptions = ["MoXey Pay", "Corporate Card", "Bank Account", "Offline"];

  // Use provided invoice data or default to Hathway Broadband mockup from screenshot
  const data = invoice || {
    name: "Hathway Broadband",
    invoiceNumber: "7872364913",
    amountWithoutVat: "AED 200.00",
    vat: "5%",
    payableAmount: "AED 210.00",
    invoiceDate: "01/05/2023",
    dueDate: "10/05/2023",
    description: "Wifi Bill",
    status: "Pending"
  };

  const renderScheduleForm = () => (
    <div className={styles.formSection}>
      <div className={styles.gridRow}>
        <div className={styles.fieldGroup}>
          <label>Payment Date <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <span>25/01/2023</span>
            <Calendar size={18} className={styles.icon} />
          </div>
        </div>
      </div>

      <div className={styles.gridRow}>
        <div className={`${styles.fieldGroup} ${styles.relative}`}>
          <label>Preferred Account Type <span className={styles.asterisk}>*</span></label>
          <div 
            className={styles.dropdownBox} 
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
          >
            <span style={{ color: selectedAccount === "Select" ? "#6b7280" : "#1b203c" }}>
              {selectedAccount}
            </span>
            <ChevronDown size={18} className={styles.icon} />
          </div>
          {isAccountDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {accountOptions.map((opt) => (
                <div 
                  key={opt} 
                  className={styles.dropdownItem}
                  onClick={() => {
                    setSelectedAccount(opt);
                    setIsAccountDropdownOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label>Amount <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <span>AED 24.00</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {view === "details" ? (
              <>
                <button className={styles.closeBtn} onClick={onClose}>
                  <X size={24} />
                </button>
                <h2 className={styles.title}>View Invoice</h2>
              </>
            ) : (
              <>
                <button className={styles.backBtn} onClick={() => setView("details")}>
                  <ArrowLeft size={24} />
                </button>
                <h2 className={styles.title}>Schedule Invoice</h2>
              </>
            )}
          </div>
          {view === "details" && (
            <div className={styles.headerRight}>
              <span className={`${styles.statusBadge} ${data.status === "Paid" ? styles.statusPaid : styles.statusPending}`}>
                {data.status}
              </span>
            </div>
          )}
        </header>

        <div className={styles.scrollContent}>
          {sourceTab === "Scheduled Invoices" && data.status === "Pending" && (
            <div className={styles.drawerTabs}>
              <button 
                className={`${styles.drawerTab} ${internalTab === "details" ? styles.drawerTabActive : ""}`}
                onClick={() => setInternalTab("details")}
              >
                Invoice Details
              </button>
              <button 
                className={`${styles.drawerTab} ${internalTab === "payment" ? styles.drawerTabActive : ""}`}
                onClick={() => setInternalTab("payment")}
              >
                Schedule Payment
              </button>
            </div>
          )}

          {view === "details" ? (
            internalTab === "details" ? (
              <div className={styles.formSection}>
                <div className={styles.fieldGroup}>
                  <label>Vendor Name</label>
                  <div className={styles.inputBox}>
                    <span>{data.name}</span>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Invoice Number</label>
                    <div className={styles.inputBox}>
                      <span>{data.invoiceNumber || "7872364913"}</span>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Amount without VAT</label>
                    <div className={styles.inputBox}>
                      <span>{data.amountWithoutVat || "AED 200.00"}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>VAT</label>
                    <div className={styles.inputBox}>
                      <span>{data.vat || "5%"}</span>
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Payable Amount</label>
                    <div className={styles.inputBox}>
                      <span>{data.payableAmount || "AED 210.00"}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.gridRow}>
                  <div className={styles.fieldGroup}>
                    <label>Invoice Date</label>
                    <div className={styles.inputBox}>
                      <span>{data.invoiceDate || "01/05/2023"}</span>
                      <Calendar size={18} color="#1b203c" />
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label>Due Date</label>
                    <div className={styles.inputBox}>
                      <span>{data.dueDate || "10/05/2023"}</span>
                      <Calendar size={18} color="#1b203c" />
                    </div>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label>Description</label>
                  <div className={`${styles.inputBox} ${styles.textArea}`}>
                    <span>{data.description || "Wifi Bill"}</span>
                  </div>
                </div>

                <div className={styles.receiptsSection}>
                  <label className={styles.sectionLabel}>Receipt</label>
                  <div className={styles.receiptCard}>
                    <div className={styles.pdfBox}>
                      <FileIcon size={32} color="#ffffff" />
                      <span className={styles.pdfLabel}>PDF</span>
                    </div>
                  </div>
                  <div className={styles.receiptActions}>
                    <button className={styles.actionIcon}><Eye size={18} /></button>
                    <button className={styles.actionIcon}><Download size={18} /></button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.formSection}>
                <div className={styles.radioRow}>
                  <label className={styles.sectionLabel} style={{ marginBottom: 0 }}>Scheduled Payment</label>
                  <div className={styles.radioGroup}>
                    <div className={styles.radioLabel} onClick={() => setIsScheduled(true)}>
                      <div className={styles.radioCircle}>
                        {isScheduled && <div className={styles.radioInner} />}
                      </div>
                      <span>Yes</span>
                    </div>
                    <div className={styles.radioLabel} onClick={() => setIsScheduled(false)}>
                      <div className={`${styles.radioCircle} ${!isScheduled ? styles.radioEmpty : ""}`}>
                        {!isScheduled && <div className={styles.radioInner} />}
                      </div>
                      <span>No</span>
                    </div>
                  </div>
                </div>
                {renderScheduleForm()}
              </div>
            )
          ) : (
            renderScheduleForm()
          )}
        </div>

        <footer className={styles.footer}>
          {sourceTab === "Scheduled Invoices" && data.status === "Pending" ? (
            <button className={styles.payNowBtn}>
              Pay Now
            </button>
          ) : view === "details" ? (
            data.status === "Pending" && (
              <>
                <button className={styles.scheduleBtn} onClick={() => setView("schedule")}>
                  Schedule Invoice
                </button>
                <button className={styles.payNowBtn}>
                  Pay Now
                </button>
              </>
            )
          ) : (
            <button className={`${styles.submitBtn} ${selectedAccount !== "Select" ? styles.submitBtnActive : ""}`}>
              Schedule
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default InvoiceDetailsDrawer;
