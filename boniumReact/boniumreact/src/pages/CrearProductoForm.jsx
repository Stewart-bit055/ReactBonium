import React, { useState } from "react";

const API_BASE = "http://localhost:8080";

const CrearProductoForm = () => {
  // Para crear usuario: nombre, tipoDocumento, documento, edad, contraseña
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [edad, setEdad] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editar, setEditar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);
    // Guardar usuario en localStorage (simulación)
    try {
      if (!documento || !password) throw new Error("Documento y contraseña son obligatorios");
      const usuarios = JSON.parse(localStorage.getItem("usuariosBonium") || "[]");
      const idx = usuarios.findIndex(u => u.documento === documento);
      if (idx !== -1) {
        // Actualizar datos si editar
        if (editar) {
          usuarios[idx] = { ...usuarios[idx], nombre, tipoDocumento, edad, password };
          setMensaje("Usuario actualizado correctamente");
        } else {
          throw new Error("El usuario ya existe");
        }
      } else {
        usuarios.push({ nombre, tipoDocumento, documento, edad, password });
        setMensaje("Usuario creado correctamente");
      }
      localStorage.setItem("usuariosBonium", JSON.stringify(usuarios));
      setNombre(""); setTipoDocumento(""); setDocumento(""); setEdad(""); setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 32 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24, color: "#222" }}>Crear/Editar Usuario</h2>
      <div style={{ color: "#e67e22", marginBottom: 12, textAlign: "center" }}>
        Los campos nombre, tipo de documento y edad son opcionales. Solo documento y contraseña son obligatorios.
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Documento*:</label>
          <input type="text" value={documento} onChange={e => setDocumento(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, background: "#f3f4f6" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Contraseña*:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, background: "#f3f4f6" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, background: "#f3f4f6" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Tipo de documento:</label>
          <input type="text" value={tipoDocumento} onChange={e => setTipoDocumento(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, background: "#f3f4f6" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Edad:</label>
          <input type="number" value={edad} onChange={e => setEdad(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, background: "#f3f4f6" }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 12, background: "#1976ed", color: "#fff", fontWeight: 700, fontSize: 17, border: "none", borderRadius: 6, cursor: "pointer" }}>
          {loading ? "Guardando..." : editar ? "Actualizar usuario" : "Crear usuario"}
        </button>
        {mensaje && <div style={{ color: "#27ae60", marginTop: 16, textAlign: "center" }}>{mensaje}</div>}
        {error && <div style={{ color: "#e74c3c", marginTop: 16, textAlign: "center" }}>{error}</div>}
      </form>
    </div>
  );
};

export default CrearProductoForm;