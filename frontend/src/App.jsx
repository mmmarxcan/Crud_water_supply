import { useEffect, useState } from "react";
import {
  getSuministros,
  createSuministro,
  updateSuministro,
  deleteSuministro,
} from "./api/suministros";
import "./App.css";

function App() {
  const [suministros, setSuministros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [formData, setFormData] = useState({
    id: null,
    cliente: "",
    cantidad: "" ,
    estado: "pendiente",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    fetchSuministros();
  }, []);

  const fetchSuministros = async () => {
    setLoading(true);
    try {
      // Mostrar los datos de suministros
      const res = await getSuministros();
      setSuministros(res.data);
    } catch (err) {
      showToast("Error de conexión al cargar suministros", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, isRemoving: false }]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isRemoving: true } : t))
      );
    }, 2700);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      cliente: formData.cliente,
      cantidad: parseInt(formData.cantidad, 10),
      estado: formData.estado,
    };

    try {
      if (formData.id) {
        // Editar los suministros
        await updateSuministro(formData.id, dataToSend);
        showToast("Suministro actualizado correctamente", "success");
      } else {
        // Crear los suministros
        await createSuministro(dataToSend);
        showToast("Suministro registrado correctamente", "success");
      }

      setFormData({ id: null, cliente: "", cantidad: "", estado: "pendiente" });
      setIsModalOpen(false);
      fetchSuministros();
    } catch (err) {
      const msg = err?.response?.data?.message || "Error al guardar Suministro. Intente de nuevo";
      showToast(msg , "error");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este suministro?")) {
      try {
        // eliminar suministros 
        await deleteSuministro(id);
        showToast("Suministro eliminado correctamente", "warning");
        fetchSuministros();
      } catch (err) {
        showToast("Error al eliminar el suministro", "error");
        console.error(err);
      }
    }
  };

  const handleEdit = (s) => {
    setFormData({
      id: s.id,
      cliente: s.cliente,
      cantidad: s.cantidad,
      estado: s.estado || "pendiente",
    });
    setIsModalOpen(true);
  };

  const handleComplete = async (s) => {
    try {
      await updateSuministro(s.id , { ...s, estado : "completado"});
      showToast(`Suministro de ${s.cliente} completado`, "success");
      fetchSuministros();
    } catch (err) {
      showToast("Error al actualizar el suministro", "error");
      console.error(err);
    }
  };

  const totalCount = suministros.length;
  const pendingCount = suministros.filter((s) => s.estado === "pendiente").length;
  const completedCount = suministros.filter((s) => s.estado === "completado").length;
  const totalVolume = suministros.reduce((acc, curr) => acc + Number(curr.cantidad || 0), 0);

  const filteredSuministros = suministros
    .filter((s) => {
      const matchesSearch = s.cliente.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = statusFilter === "all" ? true : s.estado === statusFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "client-asc") {
        return a.cliente.localeCompare(b.cliente);
      }
      if (sortBy === "client-desc") {
        return b.cliente.localeCompare(a.cliente);
      }
      if (sortBy === "qty-desc") {
        return b.cantidad - a.cantidad;
      }
      if (sortBy === "qty-asc") {
        return a.cantidad - b.cantidad;
      }
      return b.id - a.id;
    });

  return (
    <div className="container">
      {/* App Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-icon">S</div>
          <div className="brand-text">
            <h1>Gestión de Suministros</h1>
            <p>Control y administración del flujo de suministro de agua</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-theme-toggle" onClick={toggleTheme} title="Cambiar tema">
            {theme === "light" ? (
              <svg viewBox="0 0 24 24">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4 5.4 5.4 0 0 1 2.2-4.4C12.92 3.04 12.46 3 12 3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM5.636 5.636a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414L5.636 7.05a1 1 0 0 1 0-1.414zm11.314 11.314a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414zM2 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1zM7.05 18.364a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zm11.314-11.314a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0z" />
              </svg>
            )}
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              setFormData({ id: null, cliente: "", cantidad: "", estado: "pendiente" });
              setIsModalOpen(true);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nuevo Suministro
          </button>
        </div>
      </header>

      {/* KPI Stats Cards */}
      <section className="kpis-grid">
        <div className="kpi-card">
          <div className="kpi-info">
            <h3>Suministros Totales</h3>
            <p className="kpi-value">{totalCount}</p>
            <p className="kpi-subtext">Órdenes registradas</p>
          </div>
          <div className="kpi-icon-wrapper primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <h3>Pendientes</h3>
            <p className="kpi-value">{pendingCount}</p>
            <p className="kpi-subtext">Esperando entrega</p>
          </div>
          <div className="kpi-icon-wrapper warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <h3>Completados</h3>
            <p className="kpi-value">{completedCount}</p>
            <p className="kpi-subtext">Entrega exitosa</p>
          </div>
          <div className="kpi-icon-wrapper success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <h3>Volumen Total</h3>
            <p className="kpi-value">{totalVolume.toLocaleString()}</p>
            <p className="kpi-subtext">Litros / Cantidad total</p>
          </div>
          <div className="kpi-icon-wrapper info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="controls-card">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <div className="filters-wrapper">
          <div className="status-tabs">
            <button className={`tab-btn ${statusFilter === "all" ? "active" : ""}`} onClick={() => setStatusFilter("all")}>Todos</button>
            <button className={`tab-btn ${statusFilter === "pendiente" ? "active" : ""}`} onClick={() => setStatusFilter("pendiente")}>Pendientes</button>
            <button className={`tab-btn ${statusFilter === "completado" ? "active" : ""}`} onClick={() => setStatusFilter("completado")}>Completados</button>
            <button className={`tab-btn ${statusFilter === "cancelado" ? "active" : ""}`} onClick={() => setStatusFilter("cancelado")}>Cancelados</button>
          </div>

          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">Más recientes</option>
            <option value="client-asc">Cliente (A-Z)</option>
            <option value="client-desc">Cliente (Z-A)</option>
            <option value="qty-desc">Cantidad (Mayor a Menor)</option>
            <option value="qty-asc">Cantidad (Menor a Mayor)</option>
          </select>
        </div>
      </section>

      {/* Main Table Card */}
      <section className="table-card">
        {loading ? (
          <div className="loading-wrapper">
            <div className="spinner"></div>
            <p>Cargando información...</p>
          </div>
        ) : filteredSuministros.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h3>No se encontraron suministros</h3>
            <p>Intenta ajustar la búsqueda o los filtros de estado para obtener resultados.</p>
            {searchQuery || statusFilter !== "all" ? (
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
              >
                Limpiar Filtros
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => {
                  setFormData({ id: null, cliente: "", cantidad: "", estado: "pendiente" });
                  setIsModalOpen(true);
                }}
              >
                Crear Suministro
              </button>
            )}
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuministros.map((s) => (
                <tr key={s.id}>
                  <td data-label="Cliente">
                    <div className="client-info">
                      <div className="client-avatar">
                        {s.cliente ? s.cliente.charAt(0).toUpperCase() : "?"}
                      </div>
                      <span className="client-name">{s.cliente}</span>
                    </div>
                  </td>
                  <td data-label="Cantidad">
                    <span className="quantity-badge">{Number(s.cantidad).toLocaleString()} L</span>
                  </td>
                  <td data-label="Estado">
                    <span className={`badge ${s.estado || "pendiente"}`}>
                      {s.estado || "pendiente"}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {s.estado !== "completado" && s.estado !== "cancelado" && (
                      <button
                        onClick={() => handleComplete(s)}
                        className="btn-action btn-complete"
                        title="Marcar como Completado"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(s)}
                      className="btn-action btn-edit"
                      title="Editar suministro"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="btn-action btn-delete"
                      title="Eliminar suministro"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Glassmorphic Form Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{formData.id ? "Editar Suministro" : "Registrar Suministro"}</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="cliente">Cliente</label>
                  <input
                    id="cliente"
                    className="form-input"
                    placeholder="Nombre del cliente"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cantidad">Cantidad (Litros)</label>
                  <input
                    id="cantidad"
                    className="form-input"
                    placeholder="Cantidad en litros"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({ ...formData, cantidad: e.target.value.replace(/[^0-9]/g, "") })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Estado de Entrega</label>
                  <div className="segmented-control">
                    <div className="segmented-option pendiente">
                      <input
                        type="radio"
                        id="state-pendiente"
                        name="estado"
                        value="pendiente"
                        checked={formData.estado === "pendiente"}
                        onChange={() => setFormData({ ...formData, estado: "pendiente" })}
                      />
                      <label htmlFor="state-pendiente">Pendiente</label>
                    </div>
                    <div className="segmented-option completado">
                      <input
                        type="radio"
                        id="state-completado"
                        name="estado"
                        value="completado"
                        checked={formData.estado === "completado"}
                        onChange={() => setFormData({ ...formData, estado: "completado" })}
                      />
                      <label htmlFor="state-completado">Completado</label>
                    </div>
                    <div className="segmented-option cancelado">
                      <input
                        type="radio"
                        id="state-cancelado"
                        name="estado"
                        value="cancelado"
                        checked={formData.estado === "cancelado"}
                        onChange={() => setFormData({ ...formData, estado: "cancelado" })}
                      />
                      <label htmlFor="state-cancelado">Cancelado</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type} ${t.isRemoving ? "removing" : ""}`}>
            <div className="toast-icon">
              {t.type === "success" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {t.type === "warning" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              )}
              {t.type === "error" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
            </div>
            <div className="toast-content">
              <p>{t.message}</p>
            </div>
            <button className="btn-toast-close" onClick={() => removeToast(t.id)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;