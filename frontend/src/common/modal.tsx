import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface CommonModalProps {
  message: string;
  redirect?: string;
  onClose: () => void;
}

export const CommonModal: React.FC<CommonModalProps> = ({
  message,
  redirect,
  onClose,
}) => {
  const navigate = useNavigate();
  console.log("Redirect:", redirect);
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleRedirect = () => {
    if (redirect) {
      onClose();
      navigate(redirect);
    } else {
      onClose();
    }
  };

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
        <div style={{ fontSize: "1.1rem", color: "#d32f2f", marginBottom: 18 }}>
          {message}
        </div>
        <div className="flex gap-2 justify-center">
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
            onClick={handleRedirect}
          >
            OK
          </button>
          {redirect && (
            <button
              style={{
                marginLeft: 10,
                background: "#757575",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "8px 24px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
