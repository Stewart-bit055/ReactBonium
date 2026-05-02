import React, { useState } from "react";


// Login solo con documento y contraseña, validando contra localStorage


const Login = ({ onLogin }) => {
	const [documento, setDocumento] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		const usuarios = JSON.parse(localStorage.getItem("usuariosBonium") || "[]");
		const user = usuarios.find(u => u.documento === documento && u.password === password);
		if (!user) {
			setError("Documento o contraseña incorrectos");
			return;
		}
		// Guardar usuario en sessionStorage
		sessionStorage.setItem("authUser", user.documento);
		sessionStorage.setItem("authRole", user.rol || "usuario");
		if (onLogin) onLogin({ ...user, role: user.rol || "usuario" });
	};

	return (
		<div style={{
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: "linear-gradient(135deg, #0066c3 0%, #1ec9a3 100%)"
		}}>
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}>
				<div style={{
					background: "#fff",
					borderRadius: "1.5rem",
					padding: "2.5rem 2.5rem 2rem 2.5rem",
					boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
					minWidth: 350,
					maxWidth: "90vw"
				}}>
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
						<div style={{
							width: 70,
							height: 70,
							borderRadius: "50%",
							background: "#e6f3fa",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 36,
							fontWeight: "bold",
							color: "#0096c7",
							marginBottom: 8
						}}>
							B
						</div>
						<div style={{ fontWeight: 700, fontSize: 24, color: "#fff" }}>Bonium</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div style={{ textAlign: "center", color: "#888", fontSize: 18, marginBottom: 24 }}>
							Inicia sesión en tu cuenta
						</div>
						<button type="button" onClick={() => onLogin({ username: "admin", role: "admin" })} style={{ marginBottom: 16, width: "100%", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Entrar como admin (demo)</button>
						{error && (
							<div style={{ color: "#e74c3c", marginBottom: 12, textAlign: "center" }}>{error}</div>
						)}
								<div style={{ marginBottom: 16 }}>
									<div style={{
										display: "flex",
										alignItems: "center",
										background: "#f5f7fa",
										borderRadius: 8,
										padding: "0.5rem 1rem"
									}}>
										<span style={{ marginRight: 8, color: "#888" }}>
											<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
										</span>
										<input
											type="text"
											placeholder="Número de documento"
											value={documento}
											onChange={e => setDocumento(e.target.value)}
											style={{
												border: "none",
												outline: "none",
												background: "#f3f4f6",
												fontSize: 16,
												width: "100%",
												color: "black",
												padding: "8px 0"
											}}
											required
										/>
									</div>
								</div>
						<div style={{ marginBottom: 24 }}>
							<div style={{
								display: "flex",
								alignItems: "center",
								background: "#f5f7fa",
								borderRadius: 8,
								padding: "0.5rem 1rem"
							}}>
								<span style={{ marginRight: 8, color: "#888" }}>
									<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
								</span>
								<div style={{ display: "flex", alignItems: "center", width: "100%" }}>
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Escribe aquí tu contraseña"
										value={password}
										onChange={e => setPassword(e.target.value)}
										style={{
											border: "none",
											outline: "none",
											background: "#f3f4f6",
											fontSize: 16,
											width: "100%",
											color: "black",
											padding: "8px 0"
										}}
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword((v) => !v)}
										style={{
											background: "none",
											border: "none",
											cursor: "pointer",
											marginLeft: 4,
											padding: 0
										}}
										tabIndex={-1}
										aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
									>
										{showPassword ? (
											<svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
										) : (
											<svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-5.97"/></svg>
										)}
									</button>
								</div>
							</div>
						</div>
						<button
							type="submit"
							style={{
								width: "100%",
								padding: "0.75rem 0",
								background: "linear-gradient(90deg, #0066c3 0%, #1ec9a3 100%)",
								color: "#fff",
								fontWeight: 700,
								fontSize: 18,
								border: "none",
								borderRadius: 8,
								cursor: "pointer",
								transition: "background 0.2s"
							}}
						>
							Ingresar
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
