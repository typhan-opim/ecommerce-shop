import React, { useEffect } from "react";

export interface CommonModalProps {
  message: string;
  onClose?: () => void;
}

export const CommonModal: React.FC<CommonModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "32px 24px",
          borderRadius: 12,
          minWidth: 320,
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "1.1rem", color: "#d32f2f", marginBottom: 18 }}>{message}</div>
        <button
          style={{
            background: "#d32f2f",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "8px 24px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};
