.admin-tabs {
  display: flex;
  gap: 6px;
  border-bottom: 1.5px dashed var(--line);
  margin-bottom: 26px;
}
.admin-tab {
  padding: 10px 18px;
  font-weight: 700;
  font-size: 14.5px;
  color: #8a7a68;
  border-bottom: 2px solid transparent;
  transform: translateY(1.5px);
}
.admin-tab-active { color: var(--chili); border-color: var(--chili); }

.admin-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 24px;
  align-items: start;
  padding-bottom: 70px;
}

.admin-form, .admin-list {
  background: var(--white);
  border-radius: 12px;
  padding: 22px;
  box-shadow: var(--shadow-card);
}
.admin-form h3, .admin-list h3 { font-size: 18px; margin-bottom: 16px; }

.admin-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 18px;
}
.checkbox-row input { width: 16px; height: 16px; }

.admin-form-actions { display: flex; gap: 10px; }

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.admin-table th {
  text-align: left;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #a1917e;
  padding: 8px 10px;
  border-bottom: 1.5px solid var(--line);
}
.admin-table td {
  padding: 12px 10px;
  border-bottom: 1px dashed var(--line);
  vertical-align: middle;
}

.badge-btn {
  border: none;
  cursor: pointer;
}

.admin-row-actions { display: flex; gap: 8px; white-space: nowrap; }
.admin-row-actions .btn { padding: 6px 12px; font-size: 12.5px; }
.admin-delete:hover { border-color: var(--chili); color: var(--chili); }

.admin-filter-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}
.admin-filter-row select {
  padding: 9px 12px;
  border-radius: 8px;
  border: 1.5px solid var(--line);
  font-size: 13.5px;
  font-weight: 600;
}
.admin-count { font-size: 13px; color: #8a7a68; }

@media (max-width: 860px) {
  .admin-grid { grid-template-columns: 1fr; }
  .admin-form-row { grid-template-columns: 1fr; }
  .admin-table { display: block; overflow-x: auto; }
}
