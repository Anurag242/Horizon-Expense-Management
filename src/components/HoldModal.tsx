import React from "react";
import styles from "./HoldModal.module.css";

interface HoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, detail: string) => void;
}

const HOLD_REASONS = [
  "Incomplete Information",
  "Missing Documents",
  "Amount Discrepancy",
  "Requires Additional Approval",
  "Other (Mention the reason below)",
];

const OTHER_OPTION = "Other (Mention the reason below)";

const HoldModal: React.FC<HoldModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = React.useState<string>("");
  const [detail, setDetail] = React.useState<string>("");

  React.useEffect(() => {
    if (isOpen) {
      setSelectedReason("");
      setDetail("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isOtherSelected = selectedReason === OTHER_OPTION;
  const canSubmit = selectedReason !== "" && (!isOtherSelected || detail.trim() !== "");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.heading}>Reasons for putting on hold:</p>

        <div className={styles.optionList}>
          {HOLD_REASONS.map((reason) => (
            <div
              key={reason}
              className={styles.optionRow}
              onClick={() => {
                setSelectedReason(reason);
                if (reason !== OTHER_OPTION) setDetail("");
              }}
            >
              <div className={styles.radioOuter}>
                {selectedReason === reason && <div className={styles.radioDot} />}
              </div>
              <span className={styles.optionLabel}>{reason}</span>
            </div>
          ))}
        </div>

        {isOtherSelected && (
          <div className={styles.textareaSection}>
            <span className={styles.textareaLabel}>Mention Reason <span style={{ color: '#ef4444' }}>*</span></span>
            <textarea
              className={styles.textarea}
              placeholder="Enter Reason Here"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
        )}

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={`${styles.submitBtn} ${canSubmit ? styles.submitBtnActive : ""}`}
            onClick={() => {
              if (!canSubmit) return;
              onSubmit(selectedReason, detail);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoldModal;
