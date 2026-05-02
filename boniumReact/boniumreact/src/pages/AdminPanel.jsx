
import React, { useState } from "react";
import HistorialPedidos from "./HistorialPedidos";
import CrearBonos from "./CrearBonos";
import CrearProductoForm from "./CrearProductoForm";

const AdminPanel = ({ onLogout }) => {
  const [vista, setVista] = useState("historial-pedidos");

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0066c3 0%, #1ec9a3 100%)",
      padding: 32,
      boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: 900,
        margin: "32px auto",
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        overflow: "hidden"
      }}>
        {/* Banner superior */}
        <div style={{
          background: "linear-gradient(90deg, #0066c3 0%, #1ec9a3 100%)",
          padding: "24px 32px 0 32px",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: "relative"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#e6f3fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: "bold",
                color: "#0096c7",
                marginRight: 12
              }}>
                B
              </div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}>Bonium</span>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: 20,
                padding: "6px 18px",
                fontWeight: 500,
                fontSize: 16,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              Cerrar sesión
            </button>
          </div>
          {/* Menú de iconos */}
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            marginTop: 24,
            paddingBottom: 8
          }}>
            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setVista("historial-pedidos") }>
              <svg width="56" height="56" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 48 48">
                <rect x="10" y="10" width="28" height="36" rx="5" fill="none"/>
                <path d="M16 18h16M16 26h16M16 34h10" stroke="#fff" strokeWidth="2.5"/>
              </svg>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginTop: 8, borderBottom: vista==="historial-pedidos"?"3px solid #1ec9a3":"none", paddingBottom: 2 }}>HISTORIAL PEDIDOS</div>
            </div>
            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setVista("crear-usuario") }>
              <svg width="56" height="56" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 48 48">
                <rect x="8" y="12" width="32" height="28" rx="6" fill="none"/>
                <path d="M24 20v12M18 26h12" stroke="#1ec9a3" strokeWidth="2.5"/>
              </svg>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginTop: 8, borderBottom: vista==="crear-usuario"?"3px solid #1ec9a3":"none", paddingBottom: 2 }}>CREAR USUARIO</div>
            </div>
            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setVista("crear-bonos") }>
              <svg width="56" height="56" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 48 48">
                <rect x="8" y="12" width="32" height="28" rx="6" fill="none"/>
                <path d="M16 20h16M16 28h16" stroke="#fff" strokeWidth="2.5"/>
              </svg>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginTop: 8, borderBottom: vista==="crear-bonos"?"3px solid #1ec9a3":"none", paddingBottom: 2 }}>CREAR BONOS</div>
            </div>
          </div>
        </div>
        {/* Contenido principal */}
        <div style={{ padding: 32, background: "#f8fafc" }}>
          {vista === "historial-pedidos" && <HistorialPedidos />}
          {vista === "crear-usuario" && <CrearProductoForm />}
          {vista === "crear-bonos" && <CrearBonos />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
