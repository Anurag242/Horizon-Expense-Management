import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import styles from "./AddInvoice.module.css";
import { ArrowLeft, Upload, Keyboard, Search, ChevronDown, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddInvoice = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState<"options" | "details" | "review">("options");
  const [subflow, setSubflow] = React.useState<"upload" | "manual">("upload");
  const [isFormFilled, setIsFormFilled] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // Fallback for the generated image path
  const invoicePreview = "/Users/saumil/.gemini/antigravity/brain/59773e14-71a6-4f51-b3a1-e290d1723937/mock_invoice_preview_1778588920238.png";

  const handleBack = () => {
    if (step === "review") {
      setStep("details");
    } else if (step === "details") {
      setStep("options");
      setIsFormFilled(false);
    } else {
      navigate("/vendor");
    }
  };

  const startFlow = (type: "upload" | "manual") => {
    setSubflow(type);
    setStep("details");
    if (type === "manual") {
      setTimeout(() => setIsFormFilled(true), 1500);
    } else {
      setIsFormFilled(true);
    }
  };

  const handleSubmit = () => {
    setShowModal(false);
    navigate("/vendor");
  };

  const renderForm = () => (
    <div className={styles.formSection}>
      <div className={styles.formRow}>
        <div className={styles.fieldGroup}>
          <label>Select Entity <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <input 
              type="text" 
              placeholder={isFormFilled ? "Longboat Ozone Ltd." : "Start searching entity"} 
              readOnly 
            />
            <ChevronDown size={18} className={styles.icon} />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label>Select Vendor <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <input 
              type="text" 
              placeholder={isFormFilled ? "MOXEY TECH LIMITED" : "Start searching vendor"} 
              readOnly 
            />
            <Search size={18} className={styles.icon} />
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.fieldGroup}>
          <label>Invoice Currency <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <span style={{ color: isFormFilled ? "#1b203c" : "#9ca3af" }}>
              {isFormFilled ? "AED" : "Select Currency"}
            </span>
            <ChevronDown size={18} className={styles.icon} />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label>Payment Currency <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <span style={{ color: isFormFilled ? "#1b203c" : "#9ca3af" }}>
              {isFormFilled ? "AED" : "Select Currency"}
            </span>
            <ChevronDown size={18} className={styles.icon} />
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.fieldGroup}>
          <label>Amount without VAT <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <input type="text" placeholder={isFormFilled ? "AED 3,000.00" : "00.00"} readOnly />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label>VAT <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <input type="text" placeholder={isFormFilled ? "5%" : "00%"} readOnly />
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.fieldGroup}>
          <label>Amount with VAT <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <input type="text" placeholder={isFormFilled ? "AED 3,150.00" : "00.00"} readOnly />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label>Payable Amount <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <input type="text" placeholder={isFormFilled ? "AED 3,150.00" : "00.00"} readOnly />
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.fieldGroup}>
          <label>Invoice no. <span className={styles.asterisk}>*</span></label>
          <div className={styles.inputBox}>
            <input type="text" placeholder={isFormFilled ? "INV22K23" : "Enter Invoice Number"} readOnly />
          </div>
        </div>
        <div className={styles.formRow} style={{ gap: '20px' }}>
          <div className={styles.fieldGroup}>
            <label>Invoice Date <span className={styles.asterisk}>*</span></label>
            <div className={styles.inputBox}>
              <span style={{ color: isFormFilled ? "#1b203c" : "#9ca3af" }}>
                {isFormFilled ? "22/08/2023" : "dd/mm/yyyy"}
              </span>
              <Calendar size={18} className={styles.icon} />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Due Date <span className={styles.asterisk}>*</span></label>
            <div className={styles.inputBox}>
              <span style={{ color: isFormFilled ? "#1b203c" : "#9ca3af" }}>
                {isFormFilled ? "25/08/2023" : "dd/mm/yyyy"}
              </span>
              <Calendar size={18} className={styles.icon} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label>Description</label>
        <div className={styles.inputBox}>
          <input type="text" placeholder={isFormFilled ? "Office Payment" : "Enter description here"} readOnly />
        </div>
      </div>

      <div className={styles.footer}>
        <button 
          className={`${styles.nextBtn} ${!isFormFilled ? styles.nextBtnDisabled : ""}`}
          onClick={() => isFormFilled && setStep("review")}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />

        <div className={styles.contentArea}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <button className={styles.backBtn} onClick={handleBack}>
                <ArrowLeft size={24} />
              </button>
              <h1 className={styles.title}>New Invoice</h1>
            </div>
            <p className={styles.subtitle}>Empowering Your Business with Every Invoice Created</p>
          </div>

          {step === "options" ? (
            <div className={styles.cardsRow}>
              <div className={styles.card} onClick={() => startFlow("upload")}>
                <div className={styles.iconCircle}>
                  <Upload size={24} />
                </div>
                <h2 className={styles.cardTitle}>Drag & Drop Receipts</h2>
                <p className={styles.cardText}>Or Click here to upload</p>
              </div>

              <div className={styles.card} onClick={() => startFlow("manual")}>
                <div className={styles.iconCircle}>
                  <Keyboard size={24} />
                </div>
                <h2 className={styles.cardTitle}>Don't have invoice ?</h2>
                <span className={styles.manualLink}>Enter Details Manually</span>
              </div>
            </div>
          ) : step === "details" ? (
            subflow === "upload" ? (
              <div className={styles.detailsGrid}>
                <div className={styles.previewContainer}>
                  <img src={invoicePreview} alt="Invoice Preview" className={styles.invoiceImage} />
                </div>
                {renderForm()}
              </div>
            ) : (
              <div className={styles.fullWidthForm}>
                {renderForm()}
              </div>
            )
          ) : (
            <div className={styles.reviewSection}>
              <div className={styles.reviewBox}>
                <div className={styles.reviewGrid}>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Entity Name :</span>
                    <span className={styles.reviewValue}>Longboat Ozone Ltd.</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Invoice Currency :</span>
                    <span className={styles.reviewValue}>AED</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Vendor Name :</span>
                    <span className={styles.reviewValue}>MOXEY TECH LIMITED</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Payment Currency :</span>
                    <span className={styles.reviewValue}>AED</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Invoice no. :</span>
                    <span className={styles.reviewValue}>INV22K23</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Amount without VAT :</span>
                    <span className={styles.reviewValue}>AED 3,000.00</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Invoice Date :</span>
                    <span className={styles.reviewValue}>22/08/2023</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>VAT (In Percentage) :</span>
                    <span className={styles.reviewValue}>5%</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Due Date :</span>
                    <span className={styles.reviewValue}>25/08/2023</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Amount with VAT :</span>
                    <span className={styles.reviewValue}>AED 3,150.00</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Description :</span>
                    <span className={styles.reviewValue}>Office Payment</span>
                  </div>
                  <div className={styles.reviewItem}>
                    <span className={styles.reviewLabel}>Payable Amount :</span>
                    <span className={styles.reviewValue}>AED 3,150.00</span>
                  </div>
                </div>
              </div>
              <button className={styles.sendBtn} onClick={() => setShowModal(true)}>
                Send for Approval
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Submit Invoice?</h3>
            <p className={styles.modalText}>Are you sure you want to send this invoice for approval?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button className={styles.confirmBtn} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInvoice;
