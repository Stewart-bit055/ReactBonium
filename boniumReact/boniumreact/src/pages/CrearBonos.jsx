import React, { useState } from "react";

const CrearBonos = () => {
  const [concepto, setConcepto] = useState("");
  const [valor, setValor] = useState("");
  const [detalle, setDetalle] = useState("");
  const [bonos, setBonos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBonos([
      ...bonos,
      { concepto, valor, detalle }
    ]);
    setConcepto("");
    setValor("");
    setDetalle("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 32 }}>
      <div style={{ textAlign: "center", color: "#444", fontSize: 18, marginBottom: 18 }}>
        Hola admin. Tu rol es admin.
      </div>
      <div style={{
        background: "linear-gradient(120deg, #fff 80%, #f8f0f0 100%)",
        border: "2px solid #f3cfd2",
        borderRadius: 16,
        padding: 24,
        maxWidth: 500,
        margin: "0 auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <span style={{ color: "#e74c3c", marginRight: 8 }}>
            <svg width="28" height="28" fill="none" stroke="#e74c3c" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          </span>
          <span style={{ fontWeight: 700, fontSize: 22, color: "#222" }}>Administrador</span>
        </div>
        <div style={{ color: "#888", marginBottom: 18 }}>Crear y registrar bonos.</div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: 500, marginBottom: 4 }}>Concepto</label>
            <input type="text" value={concepto} onChange={e => setConcepto(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, background: "#f3f4f6" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: 500, marginBottom: 4 }}>Valor</label>
            <input type="number" value={valor} onChange={e => setValor(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, background: "#f3f4f6" }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontWeight: 500, marginBottom: 4 }}>Detalle</label>
            <textarea value={detalle} onChange={e => setDetalle(e.target.value)} rows={2} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, resize: "vertical", background: "#f3f4f6" }} />
          </div>
          <button type="submit" style={{ width: "100%", padding: 12, background: "#ffc107", color: "#222", fontWeight: 700, fontSize: 17, border: "none", borderRadius: 6, cursor: "pointer" }}>
            Crear bono
          </button>
        </form>
        <div style={{ marginTop: 18, color: "#888" }}>
          {bonos.length === 0 ? "No hay bonos creados." : (
            <ul style={{ paddingLeft: 18 }}>
              {bonos.map((b, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <b>{b.concepto}</b> - ${b.valor} <br />
                  <span style={{ fontSize: 14 }}>{b.detalle}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearBonos;
