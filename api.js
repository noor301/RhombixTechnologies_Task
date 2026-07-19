.ticket-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  position: relative;
}
.ticket-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-pop);
}
.ticket-card-unavailable { opacity: 0.55; }

.ticket-image {
  position: relative;
  height: 160px;
  background: var(--paper-dim);
}
.ticket-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ticket-category {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(36, 28, 21, 0.78);
  color: var(--white);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 999px;
}

.ticket-body {
  padding: 16px 16px 18px;
  border-top: 1px dashed var(--line);
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.ticket-body h3 { font-size: 18px; margin-bottom: 2px; }
.ticket-desc {
  font-size: 13.5px;
  color: #6d5d4c;
  margin: 0;
  flex: 1;
  line-height: 1.4;
}

.ticket-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.ticket-price {
  font-weight: 700;
  font-size: 16px;
  color: var(--chili);
}
.ticket-add { padding: 9px 16px; font-size: 13.5px; }
.ticket-add-done { background: var(--basil); }
.ticket-soldout {
  font-size: 12.5px;
  font-weight: 700;
  color: #9a8b79;
}
