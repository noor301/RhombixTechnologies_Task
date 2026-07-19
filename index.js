:root {
  /* Palette — "order ticket" theme */
  --ink: #241c15;
  --paper: #fff8ef;
  --paper-dim: #f4ead9;
  --saffron: #f2a93b;
  --saffron-dark: #d4890f;
  --chili: #c1391f;
  --basil: #3f6c51;
  --line: #e7dac5;
  --white: #ffffff;

  /* Type */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --radius: 10px;
  --shadow-card: 0 2px 10px rgba(36, 28, 21, 0.08);
  --shadow-pop: 0 12px 32px rgba(36, 28, 21, 0.18);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

#root { min-height: 100vh; display: flex; flex-direction: column; }

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 600;
  margin: 0 0 0.4em;
  line-height: 1.15;
}

a { color: inherit; text-decoration: none; }

button {
  font-family: var(--font-body);
  cursor: pointer;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid var(--saffron-dark);
  outline-offset: 2px;
}

input, select, textarea {
  font-family: var(--font-body);
  font-size: 15px;
}

.mono { font-family: var(--font-mono); }

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  font-size: 15px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.btn:active { transform: scale(0.97); }

.btn-primary {
  background: var(--chili);
  color: var(--white);
}
.btn-primary:hover { background: #a92e18; }
.btn-primary:disabled { background: #d6b8ae; cursor: not-allowed; }

.btn-secondary {
  background: var(--ink);
  color: var(--paper);
}
.btn-secondary:hover { background: #38291c; }

.btn-outline {
  background: transparent;
  color: var(--ink);
  border: 1.5px solid var(--line);
}
.btn-outline:hover { border-color: var(--ink); }

.btn-block { width: 100%; }

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
  text-align: left;
}
.field label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #5b4c3c;
}
.field input, .field select, .field textarea {
  padding: 11px 14px;
  border-radius: 8px;
  border: 1.5px solid var(--line);
  background: var(--white);
  color: var(--ink);
}
.field input:focus, .field select:focus, .field textarea:focus {
  border-color: var(--saffron-dark);
}
.field-error {
  color: var(--chili);
  font-size: 13px;
  font-weight: 600;
}
.field input.invalid, .field select.invalid, .field textarea.invalid {
  border-color: var(--chili);
}

.banner {
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}
.banner-error { background: #fbe6e1; color: var(--chili); }
.banner-success { background: #e7f0e9; color: var(--basil); }

.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
}
.badge-placed { background: #fde8cf; color: var(--saffron-dark); }
.badge-preparing { background: #fde3d8; color: var(--chili); }
.badge-out_for_delivery { background: #dce9f5; color: #2b5f8a; }
.badge-delivered { background: #e2efe3; color: var(--basil); }
.badge-cancelled { background: #eee; color: #777; }

.spinner {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 3px solid rgba(0,0,0,0.15);
  border-top-color: var(--chili);
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #8a7a68;
}
.empty-state h3 { color: var(--ink); }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
