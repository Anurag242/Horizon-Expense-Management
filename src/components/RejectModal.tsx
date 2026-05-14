import React from "react";
import styles from "./RejectModal.module.css";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
}

const RejectModal: React.FC<RejectModalProps> = ({ isOpen, onClose, onReject }) => {
  const [reason, setReason] = React.useState("");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Reject Request</h2>

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Reason for rejection</label>
          <textarea
            className={styles.textarea}
            placeholder="Type your reason here..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.rejectBtn}
            onClick={() => {
              onReject(reason);
              setReason("");
            }}
          >
            Yes, Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
