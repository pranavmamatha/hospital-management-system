import { useState, useEffect } from "react";

const API_BASE = "https://pranav-hospital-management.zeroreality.in/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #f5f2ec;
    --surface: #ffffff;
    --ink: #1a1612;
    --ink-muted: #7a7068;
    --accent: #c8502a;
    --accent-light: #f5e8e3;
    --border: #e4dfd6;
    --success: #2a6644;
    --warn: #8a6200;
  }

  body { background: var(--bg); color: var(--ink); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  .app { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: 240px; min-height: 100vh; background: var(--ink);
    display: flex; flex-direction: column; padding: 0; flex-shrink: 0;
    position: sticky; top: 0; height: 100vh;
  }
  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .sidebar-logo h1 {
    font-family: 'DM Serif Display', serif; font-size: 20px;
    color: #fff; line-height: 1.2;
  }
  .sidebar-logo span { color: var(--accent); font-style: italic; }
  .sidebar-logo p { color: rgba(255,255,255,0.35); font-size: 11px; margin-top: 4px; letter-spacing: 1.5px; text-transform: uppercase; }

  .sidebar-nav { padding: 16px 12px; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 8px; cursor: pointer; color: rgba(255,255,255,0.5);
    font-size: 14px; font-weight: 500; transition: all 0.15s; margin-bottom: 2px;
    border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
  .nav-item.active { background: var(--accent); color: #fff; }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .sidebar-footer {
    padding: 16px 12px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .user-badge {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.06);
  }
  .user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: var(--accent); display: flex; align-items: center;
    justify-content: center; font-size: 12px; font-weight: 600; color: #fff;
    flex-shrink: 0;
  }
  .user-info { flex: 1; min-width: 0; }
  .user-name { color: #fff; font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-role { color: rgba(255,255,255,0.35); font-size: 11px; text-transform: capitalize; }
  .logout-btn {
    background: none; border: none; color: rgba(255,255,255,0.35);
    cursor: pointer; font-size: 14px; padding: 4px;
  }
  .logout-btn:hover { color: var(--accent); }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .topbar {
    background: var(--surface); border-bottom: 1px solid var(--border);
    padding: 16px 32px; display: flex; align-items: center; justify-content: space-between;
  }
  .topbar h2 { font-family: 'DM Serif Display', serif; font-size: 22px; }
  .topbar-actions { display: flex; gap: 10px; }

  .content { flex: 1; padding: 32px; overflow-y: auto; }

  /* AUTH */
  .auth-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--bg);
  }
  .auth-card {
    background: var(--surface); border-radius: 16px; padding: 48px 40px;
    width: 380px; border: 1px solid var(--border);
    box-shadow: 0 4px 40px rgba(0,0,0,0.06);
  }
  .auth-logo { font-family: 'DM Serif Display', serif; font-size: 28px; margin-bottom: 4px; }
  .auth-logo span { color: var(--accent); font-style: italic; }
  .auth-sub { color: var(--ink-muted); font-size: 13px; margin-bottom: 32px; }
  .auth-tabs { display: flex; gap: 0; margin-bottom: 28px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .auth-tab {
    flex: 1; padding: 9px; text-align: center; cursor: pointer;
    font-size: 13px; font-weight: 500; color: var(--ink-muted); background: none; border: none;
    transition: all 0.15s;
  }
  .auth-tab.active { background: var(--ink); color: #fff; }

  /* FORM */
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; font-size: 12px; font-weight: 500; color: var(--ink-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.8px; }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%; padding: 10px 12px; border: 1px solid var(--border);
    border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif;
    color: var(--ink); background: var(--surface); transition: border-color 0.15s;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    outline: none; border-color: var(--accent);
  }
  .form-group textarea { resize: vertical; min-height: 80px; }

  /* BUTTONS */
  .btn {
    padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer; border: none; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #a83f1f; }
  .btn-secondary { background: var(--surface); border: 1px solid var(--border); color: var(--ink); }
  .btn-secondary:hover { background: var(--bg); }
  .btn-ghost { background: none; color: var(--ink-muted); border: 1px solid var(--border); }
  .btn-ghost:hover { color: var(--ink); border-color: var(--ink); }
  .btn-full { width: 100%; justify-content: center; padding: 12px; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-danger { background: #fee2e2; color: #991b1b; }
  .btn-danger:hover { background: #fecaca; }

  /* CARDS */
  .card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px;
  }
  .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }

  /* STAT CARDS */
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px 24px;
  }
  .stat-label { font-size: 11px; font-weight: 600; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 1px; }
  .stat-value { font-family: 'DM Serif Display', serif; font-size: 36px; margin-top: 6px; color: var(--ink); }
  .stat-sub { font-size: 12px; color: var(--ink-muted); margin-top: 4px; }

  /* TABLE */
  .table-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  table { width: 100%; border-collapse: collapse; }
  th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 1px; background: var(--bg); border-bottom: 1px solid var(--border); }
  td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid var(--border); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--bg); }

  /* BADGES */
  .badge {
    display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 20px;
    font-size: 11px; font-weight: 600; text-transform: capitalize;
  }
  .badge-scheduled { background: #dbeafe; color: #1e40af; }
  .badge-completed { background: #dcfce7; color: #166534; }
  .badge-cancelled { background: #fee2e2; color: #991b1b; }
  .badge-pending { background: #fef3c7; color: #92400e; }
  .badge-paid { background: #dcfce7; color: #166534; }
  .badge-available { background: #dcfce7; color: #166534; }
  .badge-unavailable { background: var(--bg); color: var(--ink-muted); }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    display: flex; align-items: center; justify-content: center; z-index: 100;
    backdrop-filter: blur(4px);
  }
  .modal {
    background: var(--surface); border-radius: 16px; padding: 32px;
    width: 480px; max-height: 90vh; overflow-y: auto;
    border: 1px solid var(--border); box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .modal-title { font-family: 'DM Serif Display', serif; font-size: 20px; }
  .modal-close { background: none; border: none; font-size: 20px; cursor: pointer; color: var(--ink-muted); }

  /* EMPTY */
  .empty { text-align: center; padding: 60px 20px; color: var(--ink-muted); }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty p { font-size: 14px; }

  /* ALERT */
  .alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
  .alert-error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
  .alert-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }

  /* LOADING */
  .loading { display: flex; align-items: center; justify-content: center; padding: 60px; }
  .spinner {
    width: 24px; height: 24px; border: 2px solid var(--border);
    border-top-color: var(--accent); border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* SECTION HEADER */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-family: 'DM Serif Display', serif; font-size: 20px; }

  /* DOCTOR CARD */
  .doctor-card { display: flex; gap: 16px; }
  .doctor-avatar {
    width: 48px; height: 48px; border-radius: 50%; background: var(--accent-light);
    display: flex; align-items: center; justify-content: center; font-size: 18px;
    flex-shrink: 0;
  }
  .doctor-name { font-weight: 600; font-size: 15px; }
  .doctor-spec { font-size: 12px; color: var(--ink-muted); text-transform: capitalize; margin-top: 2px; }
  .doctor-fee { font-size: 13px; margin-top: 6px; color: var(--ink-muted); }
  .doctor-fee strong { color: var(--ink); }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .content { padding: 20px; }
  }
`;

// ---- API HELPERS ----
function getToken() { return localStorage.getItem("access_token"); }
function getRefresh() { return localStorage.getItem("refresh_token"); }

async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (res.status === 401) {
    // Try refresh
    const refresh = getRefresh();
    if (refresh) {
      const r = await fetch(`${API_BASE}/users/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (r.ok) {
        const d = await r.json();
        localStorage.setItem("access_token", d.access);
        return apiFetch(path, options);
      }
    }
    localStorage.clear();
    window.location.reload();
  }
  return res;
}

// ---- COMPONENTS ----

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>;
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---- AUTH ----

function AuthScreen({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", email: "", role: "patient" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    setError(""); setLoading(true);
    try {
      if (tab === "login") {
        const r = await fetch(`${API_BASE}/users/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: form.username, password: form.password }),
        });
        if (!r.ok) { setError("Invalid credentials"); setLoading(false); return; }
        const d = await r.json();
        localStorage.setItem("access_token", d.access);
        localStorage.setItem("refresh_token", d.refresh);
        // fetch user info
        const me = await fetch(`${API_BASE}/users/me/`, {
          headers: { Authorization: `Bearer ${d.access}` },
        });
        const user = me.ok ? await me.json() : {};
        onLogin({ ...user, username: form.username });
      } else {
        const r = await fetch(`${API_BASE}/users/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: form.username, password: form.password, email: form.email, role: form.role }),
        });
        if (!r.ok) { const d = await r.json(); setError(Object.values(d).flat().join(" ")); setLoading(false); return; }
        setTab("login");
        setError("");
        alert("Account created! Please log in.");
      }
    } catch { setError("Network error"); }
    setLoading(false);
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">Med<span>Base</span></div>
        <div className="auth-sub">Hospital Management System</div>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Sign In</button>
          <button className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>Register</button>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input value={form.username} onChange={set("username")} placeholder="username" />
        </div>
        {tab === "register" && (
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
          </div>
        )}
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••" />
        </div>
        {tab === "register" && (
          <div className="form-group">
            <label>Role</label>
            <select value={form.role} onChange={set("role")}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
        <button className="btn btn-primary btn-full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : tab === "login" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}

// ---- DASHBOARD ----

function Dashboard({ appointments, billing, prescriptions, doctors }) {
  const scheduled = appointments.filter((a) => a.status === "scheduled").length;
  const paid = billing.filter((b) => b.status === "paid").length;
  const pending = billing.filter((b) => b.status === "pending").length;
  const total = billing.reduce((s, b) => s + parseFloat(b.amount || 0), 0);

  const recent = [...appointments].slice(-5).reverse();

  return (
    <div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Appointments</div>
          <div className="stat-value">{appointments.length}</div>
          <div className="stat-sub">{scheduled} scheduled</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Doctors</div>
          <div className="stat-value">{doctors.length}</div>
          <div className="stat-sub">{doctors.filter((d) => d.is_available).length} available</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Invoices</div>
          <div className="stat-value">{billing.length}</div>
          <div className="stat-sub">{pending} pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Revenue</div>
          <div className="stat-value">${total.toFixed(0)}</div>
          <div className="stat-sub">{paid} invoices paid</div>
        </div>
      </div>

      <div className="section-header">
        <span className="section-title">Recent Appointments</span>
      </div>
      {recent.length === 0 ? (
        <div className="empty"><div className="empty-icon">📅</div><p>No appointments yet</p></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id}>
                  <td>{a.patient_name || "—"}</td>
                  <td>{a.doctor_name || "—"}</td>
                  <td>{new Date(a.appointment_date).toLocaleString()}</td>
                  <td><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ---- APPOINTMENTS ----

function Appointments({ data, doctors, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ doctor: "", appointment_date: "", status: "scheduled", notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function create() {
    setError(""); setLoading(true);
    const r = await apiFetch("/appointments/", {
      method: "POST",
      body: JSON.stringify({ ...form, doctor: parseInt(form.doctor) }),
    });
    if (r.ok) { setShowModal(false); reload(); }
    else { const d = await r.json(); setError(Object.values(d).flat().join(" ")); }
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await apiFetch(`/appointments/${id}/`, { method: "PATCH", body: JSON.stringify({ status }) });
    reload();
  }

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Appointments</span>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ New Appointment</button>
      </div>

      {data.length === 0 ? (
        <div className="empty"><div className="empty-icon">📅</div><p>No appointments found</p></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Date & Time</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {data.map((a) => (
                <tr key={a.id}>
                  <td style={{ color: "var(--ink-muted)", fontSize: 12 }}>#{a.id}</td>
                  <td>{a.patient_name || "—"}</td>
                  <td>{a.doctor_name || "—"}</td>
                  <td>{new Date(a.appointment_date).toLocaleString()}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>
                    {a.status === "scheduled" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => updateStatus(a.id, "completed")}>Complete</button>
                        <button className="btn btn-sm btn-danger" onClick={() => updateStatus(a.id, "cancelled")}>Cancel</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title="New Appointment" onClose={() => setShowModal(false)}>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label>Doctor</label>
            <select value={form.doctor} onChange={set("doctor")}>
              <option value="">Select a doctor</option>
              {doctors.map((d) => <option key={d.id} value={d.id}>{d.full_name} — {d.specialization}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Date & Time</label>
            <input type="datetime-local" value={form.appointment_date} onChange={set("appointment_date")} />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea value={form.notes} onChange={set("notes")} placeholder="Any notes…" />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={create} disabled={loading}>{loading ? "Saving…" : "Book Appointment"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---- DOCTORS ----

function Doctors({ data }) {
  const specs = { cardiologist: "❤️", neurologist: "🧠", orthopedic: "🦴", general: "🩺" };
  return (
    <div>
      <div className="section-header">
        <span className="section-title">Doctors</span>
      </div>
      {data.length === 0 ? (
        <div className="empty"><div className="empty-icon">👨‍⚕️</div><p>No doctors found</p></div>
      ) : (
        <div className="card-grid">
          {data.map((d) => (
            <div key={d.id} className="card">
              <div className="doctor-card">
                <div className="doctor-avatar">{specs[d.specialization] || "👤"}</div>
                <div style={{ flex: 1 }}>
                  <div className="doctor-name">{d.full_name || d.username}</div>
                  <div className="doctor-spec">{d.specialization}</div>
                  <div className="doctor-fee">Fee: <strong>${d.consultation_fee}</strong></div>
                </div>
                <StatusBadge status={d.is_available ? "available" : "unavailable"} />
              </div>
              {d.experience_years > 0 && (
                <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-muted)", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                  {d.experience_years} years experience · @{d.username}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- BILLING ----

function Billing({ data, appointments, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ appointment: "", amount: "", status: "pending" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function create() {
    setError(""); setLoading(true);
    const r = await apiFetch("/billing/", {
      method: "POST",
      body: JSON.stringify({ ...form, appointment: parseInt(form.appointment) }),
    });
    if (r.ok) { setShowModal(false); reload(); }
    else { const d = await r.json(); setError(Object.values(d).flat().join(" ")); }
    setLoading(false);
  }

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Billing</span>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ New Invoice</button>
      </div>

      {data.length === 0 ? (
        <div className="empty"><div className="empty-icon">🧾</div><p>No invoices yet</p></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Appointment</th><th>Amount</th><th>Status</th><th>Issued</th></tr></thead>
            <tbody>
              {data.map((b) => (
                <tr key={b.id}>
                  <td style={{ color: "var(--ink-muted)", fontSize: 12 }}>#{b.id}</td>
                  <td>{b.patient_name || "—"}</td>
                  <td>{b.doctor_name || "—"}</td>
                  <td style={{ color: "var(--ink-muted)", fontSize: 12 }}>Appt #{b.appointment}</td>
                  <td><strong>${parseFloat(b.amount).toFixed(2)}</strong></td>
                  <td><StatusBadge status={b.status} /></td>
                  <td style={{ fontSize: 12, color: "var(--ink-muted)" }}>{b.issued_at ? new Date(b.issued_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title="New Invoice" onClose={() => setShowModal(false)}>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label>Appointment</label>
            <select value={form.appointment} onChange={set("appointment")}>
              <option value="">Select appointment</option>
              {appointments.filter((a) => a.status === "completed").map((a) => (
                <option key={a.id} value={a.id}>#{a.id} — {a.patient_name} with {a.doctor_name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount ($)</label>
            <input type="number" step="0.01" value={form.amount} onChange={set("amount")} placeholder="0.00" />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={set("status")}>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={create} disabled={loading}>{loading ? "Saving…" : "Create Invoice"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---- PRESCRIPTIONS ----

function Prescriptions({ data, appointments, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ appointment: "", diagnosis: "", medicines: "", instructions: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function create() {
    setError(""); setLoading(true);
    const r = await apiFetch("/prescriptions/", {
      method: "POST",
      body: JSON.stringify({ ...form, appointment: parseInt(form.appointment) }),
    });
    if (r.ok) { setShowModal(false); reload(); }
    else { const d = await r.json(); setError(Object.values(d).flat().join(" ")); }
    setLoading(false);
  }

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Prescriptions</span>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ New Prescription</button>
      </div>

      {data.length === 0 ? (
        <div className="empty"><div className="empty-icon">💊</div><p>No prescriptions found</p></div>
      ) : (
        <div className="card-grid">
          {data.map((p) => (
            <div key={p.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{p.patient_name || "—"}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>Dr. {p.doctor_name} · {p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}</div>
                </div>
                <span style={{ fontSize: 11, color: "var(--ink-muted)" }}>#{p.id}</span>
              </div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>
                <strong>Diagnosis:</strong> {p.diagnosis}
              </div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>
                <strong>Medicines:</strong> {p.medicines}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                <strong>Instructions:</strong> {p.instructions}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title="New Prescription" onClose={() => setShowModal(false)}>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label>Appointment</label>
            <select value={form.appointment} onChange={set("appointment")}>
              <option value="">Select appointment</option>
              {appointments.map((a) => (
                <option key={a.id} value={a.id}>#{a.id} — {a.patient_name} with {a.doctor_name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Diagnosis</label>
            <textarea value={form.diagnosis} onChange={set("diagnosis")} placeholder="Diagnosis description…" />
          </div>
          <div className="form-group">
            <label>Medicines</label>
            <textarea value={form.medicines} onChange={set("medicines")} placeholder="List medicines…" />
          </div>
          <div className="form-group">
            <label>Instructions</label>
            <textarea value={form.instructions} onChange={set("instructions")} placeholder="Patient instructions…" />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={create} disabled={loading}>{loading ? "Saving…" : "Save Prescription"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---- PATIENTS ----

function Patients({ data }) {
  return (
    <div>
      <div className="section-header">
        <span className="section-title">Patients</span>
      </div>
      {data.length === 0 ? (
        <div className="empty"><div className="empty-icon">👥</div><p>No patients found</p></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Username</th><th>Email</th><th>Date of Birth</th><th>Blood Group</th><th>Phone</th></tr></thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id}>
                  <td>@{p.username}</td>
                  <td>{p.email || "—"}</td>
                  <td>{p.date_of_birth || "—"}</td>
                  <td><span className="badge badge-scheduled">{p.blood_group}</span></td>
                  <td>{p.phone || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ---- APP ----

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "appointments", label: "Appointments", icon: "📅" },
  { id: "doctors", label: "Doctors", icon: "👨‍⚕️" },
  { id: "patients", label: "Patients", icon: "👥" },
  { id: "prescriptions", label: "Prescriptions", icon: "💊" },
  { id: "billing", label: "Billing", icon: "🧾" },
];

export default function App() {
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("access_token");
    return t ? { username: "User" } : null;
  });
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [billing, setBilling] = useState([]);

  async function loadAll() {
    setLoading(true);
    const [a, d, p, rx, b] = await Promise.all([
      apiFetch("/appointments/").then((r) => (r.ok ? r.json() : [])).catch(() => []),
      apiFetch("/users/doctors/").then((r) => (r.ok ? r.json() : [])).catch(() => []),
      apiFetch("/users/patients/").then((r) => (r.ok ? r.json() : [])).catch(() => []),
      apiFetch("/prescriptions/").then((r) => (r.ok ? r.json() : [])).catch(() => []),
      apiFetch("/billing/").then((r) => (r.ok ? r.json() : [])).catch(() => []),
    ]);
    setAppointments(a); setDoctors(d); setPatients(p); setPrescriptions(rx); setBilling(b);
    setLoading(false);
  }

  useEffect(() => { if (user) loadAll(); }, [user]);

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  if (!user) return (
    <>
      <style>{styles}</style>
      <AuthScreen onLogin={(u) => setUser(u)} />
    </>
  );

  const pageTitles = { dashboard: "Dashboard", appointments: "Appointments", doctors: "Doctors", patients: "Patients", prescriptions: "Prescriptions", billing: "Billing" };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h1>Med<span>Base</span></h1>
            <p>Hospital System</p>
          </div>
          <nav className="sidebar-nav">
            {NAV.map((n) => (
              <button key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                <span className="nav-icon">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="user-badge">
              <div className="user-avatar">{(user.username || "U")[0].toUpperCase()}</div>
              <div className="user-info">
                <div className="user-name">{user.username}</div>
                <div className="user-role">{user.role || "user"}</div>
              </div>
              <button className="logout-btn" onClick={logout} title="Sign out">⎋</button>
            </div>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <h2>{pageTitles[page]}</h2>
            <div className="topbar-actions">
              <button className="btn btn-ghost btn-sm" onClick={loadAll}>↻ Refresh</button>
            </div>
          </div>
          <div className="content">
            {loading ? (
              <div className="loading"><div className="spinner" /></div>
            ) : (
              <>
                {page === "dashboard" && <Dashboard appointments={appointments} billing={billing} prescriptions={prescriptions} doctors={doctors} />}
                {page === "appointments" && <Appointments data={appointments} doctors={doctors} reload={loadAll} />}
                {page === "doctors" && <Doctors data={doctors} />}
                {page === "patients" && <Patients data={patients} />}
                {page === "prescriptions" && <Prescriptions data={prescriptions} appointments={appointments} reload={loadAll} />}
                {page === "billing" && <Billing data={billing} appointments={appointments} reload={loadAll} />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
