import React, { useState } from 'react';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';
import styles from './ReimbursementModal.module.css';

interface ReimbursementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ReimbursementModal: React.FC<ReimbursementModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [schedulePayment, setSchedulePayment] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={onClose}>
            <ArrowLeft size={20} color="#1b203c" />
          </button>
          <h2 className={styles.title}>Reimbursement Details</h2>
        </div>

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
                <label className={styles.label}>Payment Date <span className={styles.asterisk}>*</span></label>
                <div className={styles.inputWrapper}>
                  <input type="text" placeholder="DD/MM/YYYY" className={styles.inputBox} />
                  <Calendar size={18} color="#9ca3af" className={styles.inputIcon} />
                </div>
              </div>
            </div>
          )}

          <div className={styles.gridRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Reimbursed Type <span className={styles.asterisk}>*</span></label>
              <div className={styles.inputWrapper}>
                <select className={styles.selectBox} defaultValue="">
                  <option value="" disabled hidden>Select</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
                <ChevronDown size={18} color="#9ca3af" className={styles.inputIcon} />
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Reimbursed Amount <span className={styles.asterisk}>*</span></label>
              <input type="text" defaultValue="AED 00.00" className={styles.inputBoxFilled} />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.submitBtn} onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementModal;
