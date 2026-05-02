import React from "react";

// Simulación de pedidos/gastos del colaborador
const pedidosColab = [
  { id: 1, fecha: "2026-05-01", descripcion: "Hamburguesa", valor: 18000, categoria: "Comida" },
  { id: 2, fecha: "2026-05-02", descripcion: "Café", valor: 4000, categoria: "Bebida" },
  { id: 3, fecha: "2026-05-03", descripcion: "Ensalada", valor: 12000, categoria: "Comida" }
];

const HistorialGastosColab = ({ documento }) => {
  // En un caso real, filtrarías por documento del usuario logueado
  // Aquí solo mostramos el array de prueba
  import React from "react";

  // Array de prueba para HU08
  const pedidosPrueba = [
    {
      id: 1,
      fecha: "2024-05-01",
      producto: "Hamburguesa",
      cantidad: 2,
      total: 20000,
      documento: "123456789"
    },
    {
      id: 2,
      fecha: "2024-05-02",
      producto: "Pizza",
      cantidad: 1,
      total: 15000,
      documento: "123456789"
    },
    {
      id: 3,
      fecha: "2024-05-02",
      producto: "Ensalada",
      cantidad: 1,
      total: 12000,
      documento: "987654321"
    }
  ];

  const documentoLogueado = localStorage.getItem("documentoLogueado") || "123456789";

  const HistorialGastosColab = () => {
    // Intentar cargar pedidos reales del localStorage
    let pedidos = [];
    try {
      const pedidosLS = JSON.parse(localStorage.getItem("pedidos"));
      if (Array.isArray(pedidosLS)) {
        pedidos = pedidosLS.filter(p => p.documento === documentoLogueado);
      } else {
        pedidos = pedidosPrueba.filter(p => p.documento === documentoLogueado);
      }
    } catch {
      pedidos = pedidosPrueba.filter(p => p.documento === documentoLogueado);
    }
    return (
      <div>
        <h2 style={{ color: "#0096c7", marginBottom: 24 }}>Mi historial de pedidos/gastos</h2>
        <table style={{ width: "100%", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "#e6f3fa" }}>
              <th style={{ padding: 12 }}>Fecha</th>
              <th style={{ padding: 12 }}>Producto</th>
              <th style={{ padding: 12 }}>Cantidad</th>
              <th style={{ padding: 12 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p.id}>
                <td style={{ padding: 10 }}>{p.fecha}</td>
                <td style={{ padding: 10 }}>{p.producto}</td>
                <td style={{ padding: 10 }}>{p.cantidad}</td>
                <td style={{ padding: 10 }}>${p.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {pedidos.length === 0 && <div style={{ marginTop: 24, color: "#888" }}>No tienes pedidos registrados.</div>}
      </div>
    );
  };

  export default HistorialGastosColab;
