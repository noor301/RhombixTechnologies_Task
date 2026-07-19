.search-row { margin-bottom: 18px; }
.search-input {
  width: 100%;
  padding: 15px 20px;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  background: var(--white);
  font-size: 15.5px;
}
.search-input:focus { border-color: var(--saffron-dark); outline: none; }

.restaurant-strip {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: 14px;
}
.chip {
  flex: 0 0 auto;
  background: var(--white);
  border: 1.5px solid var(--line);
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 700;
  font-size: 13.5px;
  white-space: nowrap;
}
.chip-active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.chip-meta { opacity: 0.65; font-weight: 600; margin-left: 4px; }

.category-strip {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}
.tag {
  background: transparent;
  border: none;
  padding: 6px 4px;
  font-size: 13.5px;
  font-weight: 600;
  color: #6d5d4c;
  border-bottom: 2px solid transparent;
}
.tag-active { color: var(--chili); border-color: var(--chili); }

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding-bottom: 60px;
}
