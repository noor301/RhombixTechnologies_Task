.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--paper);
  border-bottom: 1.5px dashed var(--line);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 72px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin-right: auto;
}

.nav-brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--chili);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 22px;
  font-weight: 600;
  font-size: 15px;
}
.nav-links a:hover { color: var(--chili); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-cart {
  position: relative;
  font-weight: 700;
  font-size: 15px;
  padding: 8px 4px;
}
.nav-cart-badge {
  position: absolute;
  top: -4px;
  right: -14px;
  background: var(--chili);
  color: var(--white);
  font-size: 11px;
  font-weight: 800;
  border-radius: 999px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.nav-user {
  font-size: 14px;
  font-weight: 600;
  color: #5b4c3c;
}

@media (max-width: 720px) {
  .nav-links { display: none; }
  .nav-user { display: none; }
}
