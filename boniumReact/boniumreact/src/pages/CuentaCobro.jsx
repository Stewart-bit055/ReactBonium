
import React, { useRef, useState, useEffect } from "react";

// Utilidad para convertir número a letras (simple, español)
function numeroALetras(num) {
  const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  if (num < 10) return unidades[num];
  if (num < 100) return decenas[Math.floor(num/10)] + (num%10!==0?" y "+unidades[num%10]:"");
  if (num < 1000) return unidades[Math.floor(num/100)] + "cientos" + (num%100!==0?" " + numeroALetras(num%100):"");
  if (num < 1000000) return numeroALetras(Math.floor(num/1000)) + " mil" + (num%1000!==0?" " + numeroALetras(num%1000):"");
  return num;
}

const getPedidosFiltrados = (fechaInicio, fechaFin) => {
  const pedidos = JSON.parse(localStorage.getItem("pedidosBonium")) || [];
  if (!fechaInicio && !fechaFin) return pedidos;
  return pedidos.filter(p => {
    if (fechaInicio && p.fecha < fechaInicio) return false;
    if (fechaFin && p.fecha > fechaFin) return false;
    return true;
  });
};

const getConsecutivo = () => {
  // Cuenta cuántas cuentas de cobro han sido impresas
  return parseInt(localStorage.getItem("cuentasCobroImpresas") || "0", 10) + 1;
};

const CuentaCobro = () => {
  const printRef = useRef();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [pedidos, setPedidos] = useState([]);
  // Obtener nombre del restaurante desde usuario logueado o hardcodeado
  const nombreRestaurante = "Restaurante Bonium";
  const [firma, setFirma] = useState(null);
  const [fotoURL, setFotoURL] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [consecutivo, setConsecutivo] = useState(getConsecutivo());

  useEffect(() => {
    setPedidos(getPedidosFiltrados(fechaInicio, fechaFin));
  }, [fechaInicio, fechaFin]);

  const totalBonos = pedidos.length;
  // Si los pedidos tienen campo precio, usarlo, si no, usar precio fijo
  let precioBono = 1000;
  if (pedidos.length > 0 && pedidos[0].precio) {
    precioBono = pedidos[0].precio;
  }
  const total = pedidos.reduce((acc, p) => acc + (p.precio ? Number(p.precio) : precioBono), 0);
  const fecha = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  // Foto para firma
  const handleFoto = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFotoURL(url);
      setFirma(url);
      setShowCamera(false);
    }
  };

  const handlePrint = () => {
    // Guardar consecutivo
    localStorage.setItem("cuentasCobroImpresas", consecutivo);
    const printContents = printRef.current.innerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Cuenta de Cobro</title>');
    win.document.write('<style>body{font-family:sans-serif;} table{border-collapse:collapse;width:100%;} th,td{border:1px solid #ccc;padding:8px;text-align:left;} th{background:#f0f0f0;} .total{font-weight:bold; font-size:18px;} .print-btn{display:none;}</style>');
    win.document.write('</head><body >');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
    setConsecutivo(getConsecutivo());
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 32 }}>
      <h2 style={{ textAlign: "center", color: "#1ec9a3", marginBottom: 18 }}>Cuenta de Cobro</h2>
      <div style={{ marginBottom: 18, display: "flex", gap: 16, justifyContent: "center" }}>
        <div>
          <label>Desde: </label>
          <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
        </div>
        <div>
          <label>Hasta: </label>
          <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
        </div>
      </div>
      <div style={{ marginBottom: 18, display: "flex", gap: 32, justifyContent: "center", fontSize: 18 }}>
        <div><b>Proveedor:</b> {nombreRestaurante}</div>
        <div><b>Cantidad de bonos:</b> {totalBonos}</div>
      </div>
      <div style={{ marginBottom: 18, display: "flex", gap: 32, justifyContent: "center", fontSize: 18 }}>
        <div><b>Precio por bono:</b> ${precioBono}</div>
        <div><b>Total:</b> ${total}</div>
      </div>
      <div style={{ marginBottom: 18, textAlign: "center" }}>
        <button onClick={() => setShowCamera(true)} style={{ background: "#1ec9a3", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontWeight: 600, cursor: "pointer" }}>
          {firma ? "Cambiar foto de firma" : "Tomar foto para firma"}
        </button>
        {fotoURL && (
          <div style={{ marginTop: 10 }}>
            <img src={fotoURL} alt="Firma" style={{ maxWidth: 180, border: "2px solid #1ec9a3", borderRadius: 8 }} />
          </div>
        )}
        {showCamera && (
          <div style={{ marginTop: 10 }}>
            <input type="file" accept="image/*" capture="environment" onChange={handleFoto} />
            <button onClick={() => setShowCamera(false)} style={{ marginLeft: 10 }}>Cancelar</button>
          </div>
        )}
      </div>
      <div ref={printRef} style={{ background: "#eafff6", border: "2px solid #7be2c2", borderRadius: 16, padding: 24, maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, marginBottom: 8 }}>
          <span>Bonium</span>
          <span style={{ fontSize: 15 }}>{fecha}</span>
        </div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>N° {consecutivo}</div>
        <div style={{ marginBottom: 8 }}>Proveedor: <b>{nombreRestaurante}</b></div>
        <div style={{ marginBottom: 8 }}>Cantidad de bonos: <b>{totalBonos}</b></div>
        <div style={{ marginBottom: 8 }}>Precio por bono: <b>${precioBono}</b></div>
        <div style={{ marginBottom: 8 }}>Total: <b>${total}</b></div>
        <div style={{ marginBottom: 8 }}>Total en letras: <b>{numeroALetras(total)} pesos</b></div>
        <div style={{ marginBottom: 8, fontStyle: "italic" }}>
          Solicito formalmente el pago de la cuenta de cobro por el valor arriba indicado.
        </div>
        {firma && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Firma:</div>
            <img src={firma} alt="Firma" style={{ maxWidth: 180, border: "2px solid #1ec9a3", borderRadius: 8 }} />
          </div>
        )}
      </div>
      <button onClick={handlePrint} style={{ width: "100%", marginTop: 18, background: "#fff", color: "#1ec9a3", border: "2px solid #1ec9a3", borderRadius: 6, padding: 12, fontWeight: 700, fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <svg width="20" height="20" fill="none" stroke="#1ec9a3" strokeWidth="2.2" viewBox="0 0 24 24"><rect x="6" y="9" width="12" height="7" rx="2"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>
        Imprimir cuenta
      </button>
    </div>
  );
};

export default CuentaCobro;
