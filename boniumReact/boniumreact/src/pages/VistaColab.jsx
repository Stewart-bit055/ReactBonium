import React, { useState } from "react";
import HistorialGastosColab from "./HistorialGastosColab";

const platos = [
  {
    nombre: "Hamburguesa Clasica",
    descripcion: "Pan brioche, carne 150g, lechuga, tomate y salsa de la casa.",
    precio: 18.50,
    adicionales: ["Queso extra", "Tocineta", "Huevo frito"]
  },
  {
    nombre: "Pasta Alfredo",
    descripcion: "Fettuccine en salsa cremosa con queso parmesano.",
    precio: 22.00,
    adicionales: ["Pollo", "Camarones", "Tocineta"]
  }
];


const VistaColab = ({ onLogout }) => {
  const [vista, setVista] = useState("pedidos");
  const [pedido, setPedido] = useState({});
  const [adicionalActivo, setAdicionalActivo] = useState({});
  const [adicionalSeleccionado, setAdicionalSeleccionado] = useState({});

  // Obtener documento del usuario logueado
  const documentoLogueado = localStorage.getItem("documentoLogueado") || "123456789";

  const handleCheck = (idx) => {
    setAdicionalActivo({ ...adicionalActivo, [idx]: !adicionalActivo[idx] });
    if (!adicionalActivo[idx]) setAdicionalSeleccionado({ ...adicionalSeleccionado, [idx]: "" });
  };

  const handleSelect = (idx, value) => {
    setAdicionalSeleccionado({ ...adicionalSeleccionado, [idx]: value });
  };

  const handlePedir = (idx) => {
    const plato = platos[idx];
    const adicional = adicionalActivo[idx] ? adicionalSeleccionado[idx] : null;
    // Crear objeto pedido
    const pedidoNuevo = {
      id: Date.now(),
      fecha: new Date().toISOString().slice(0, 10),
      producto: plato.nombre,
      cantidad: 1,
      total: plato.precio,
      adicional: adicional || undefined,
      documento: documentoLogueado
    };
    // Guardar en localStorage
    let pedidos = [];
    try {
      const pedidosLS = JSON.parse(localStorage.getItem("pedidos"));
      if (Array.isArray(pedidosLS)) pedidos = pedidosLS;
    } catch {}
    pedidos.push(pedidoNuevo);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    alert(`Pedido realizado: ${plato.nombre}${adicional ? ` con adicional: ${adicional}` : ""}`);
    setAdicionalActivo({ ...adicionalActivo, [idx]: false });
    setAdicionalSeleccionado({ ...adicionalSeleccionado, [idx]: "" });
  };

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
          {/* Menú de navegación */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 24, paddingBottom: 8 }}>
            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setVista("pedidos") }>
              <span style={{ color: vista==="pedidos" ? "#1ec9a3" : "#fff", fontWeight: 700 }}>Pedidos</span>
            </div>
            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setVista("historial") }>
              <span style={{ color: vista==="historial" ? "#1ec9a3" : "#fff", fontWeight: 700 }}>Mi historial</span>
            </div>
          </div>
        </div>
        {/* Contenido principal */}
        <div style={{ padding: 32, background: "#f8fafc" }}>
          {vista === "pedidos" && (
            <>
              {/* ...contenido de pedidos... */}
              {/* ...aquí va el código original de pedidos... */}
            </>
          )}
          {vista === "historial" && <HistorialGastosColab />}
        </div>
      </div>
    </div>
  );
            <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"/><path d="M16 32h16M20 24h8"/></svg>
            <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 48 48"><path d="M12 40l12-28 12 28"/><path d="M20 32h8"/></svg>
            <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 48 48"><ellipse cx="24" cy="32" rx="12" ry="6"/><path d="M12 32V20a12 6 0 0 1 24 0v12"/></svg>
            <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 48 48"><rect x="10" y="18" width="28" height="16" rx="8"/><path d="M24 18v-4"/></svg>
          </div>
        </div>
        {/* Contenido principal */}
        <div style={{ padding: 32, background: "#f8fafc" }}>
          <div style={{ textAlign: "center", color: "#444", fontSize: 18, marginBottom: 18 }}>
            Hola colab. Tu rol es colab.
          </div>
          <div style={{
            background: "#eaf4ff",
            border: "2px solid #7bb2e2",
            borderRadius: 16,
            padding: 24,
            maxWidth: 600,
            margin: "0 auto"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: "#3498db", marginRight: 8 }}>
                <svg width="28" height="28" fill="none" stroke="#3498db" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              </span>
              <span style={{ fontWeight: 700, fontSize: 22, color: "#222" }}>Colaborador</span>
            </div>
            <div style={{ color: "#888", marginBottom: 18 }}>Aqui puedes ver todos los platos y pedirlos con adicional opcional.</div>
            {platos.map((plato, idx) => (
              <div key={plato.nombre} style={{ background: "#fff", borderRadius: 10, boxShadow: "0 1px 4px #e0e0e0", padding: 18, marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{plato.nombre}</div>
                <div style={{ color: "#555", marginBottom: 4 }}>{plato.descripcion}</div>
                <div style={{ color: "#222", marginBottom: 8 }}>Precio: ${plato.precio.toFixed(2)}</div>
                <div style={{ marginBottom: 8 }}>
                  <input type="checkbox" id={`adicional${idx}`} checked={!!adicionalActivo[idx]} onChange={() => handleCheck(idx)} />
                  <label htmlFor={`adicional${idx}`} style={{ marginLeft: 6 }}>Agregar adicional (opcional)</label>
                </div>
                {adicionalActivo[idx] && (
                  <select
                    value={adicionalSeleccionado[idx] || ""}
                    onChange={e => handleSelect(idx, e.target.value)}
                    style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, marginBottom: 8 }}
                  >
                    <option value="">Selecciona un adicional</option>
                    {plato.adicionales.map((ad, i) => (
                      <option key={i} value={ad}>{ad}</option>
                    ))}
                  </select>
                )}
                <button
                  onClick={() => handlePedir(idx)}
                  style={{ width: "100%", padding: 10, background: "#1976ed", color: "#fff", fontWeight: 700, fontSize: 16, border: "none", borderRadius: 6, cursor: "pointer" }}
                >
                  Pedir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaColab;
