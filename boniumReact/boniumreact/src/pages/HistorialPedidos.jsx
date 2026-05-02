// --- UTILIDAD PARA POBLAR DATOS DE PRUEBA EN LOCALSTORAGE ---
function poblarPedidosEjemplo() {
  const pedidosEjemplo = [
    {
      id: 1,
      fecha: "2026-05-01",
      usuario: "admin",
      total: "$1200"
    },
    {
      id: 2,
      fecha: "2026-05-02",
      usuario: "colab",
      total: "$800"
    },
    {
      id: 3,
      fecha: "2026-04-30",
      usuario: "resto",
      total: "$500"
    }
  ];
  localStorage.setItem("pedidosBonium", JSON.stringify(pedidosEjemplo));
}

import React, { useRef, useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

const HistorialPedidos = () => {
  const printRef = useRef();
  const [pedidos, setPedidos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    // Si no hay datos, poblar con ejemplo
    if (!localStorage.getItem("pedidosBonium")) {
      poblarPedidosEjemplo();
    }
    const pedidosLS = JSON.parse(localStorage.getItem("pedidosBonium")) || [];
    setPedidos(pedidosLS);
    setFiltered(pedidosLS);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!fechaInicio && !fechaFin) {
      setFiltered(pedidos);
      return;
    }
    setFiltered(
      pedidos.filter(p => {
        if (fechaInicio && p.fecha < fechaInicio) return false;
        if (fechaFin && p.fecha > fechaFin) return false;
        return true;
      })
    );
  }, [fechaInicio, fechaFin, pedidos]);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Historial de Pedidos</title>');
    win.document.write('<style>body{font-family:sans-serif;} table{border-collapse:collapse;width:100%;} th,td{border:1px solid #ccc;padding:8px;text-align:left;} th{background:#f0f0f0;}</style>');
    win.document.write('</head><body >');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Historial de Pedidos</h2>
        <button onClick={handlePrint} style={{ background: "#0066c3", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontWeight: 600, cursor: "pointer" }}>
          Imprimir
        </button>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <div>
          <label>Desde: </label>
          <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
        </div>
        <div>
          <label>Hasta: </label>
          <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
        </div>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div style={{ color: "#e74c3c" }}>{error}</div>
      ) : (
        <div ref={printRef}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: "center" }}>No hay pedidos en el rango seleccionado</td></tr>
              ) : (
                filtered.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.fecha}</td>
                    <td>{pedido.usuario}</td>
                    <td>{pedido.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistorialPedidos;
