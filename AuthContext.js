import React, { useEffect, useMemo, useState } from 'react';
import { fetchMenu, fetchRestaurants } from '../api/api';
import MenuItemCard from '../components/MenuItemCard';
import './Home.css';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [activeRestaurant, setActiveRestaurant] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  // Initial load
  useEffect(() => {
    Promise.all([fetchRestaurants(), fetchMenu()])
      .then(([r, m]) => {
        setRestaurants(r);
        setMenuItems(m);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Debounced live search against the API (falls back to local filter for category/restaurant)
  useEffect(() => {
    const handle = setTimeout(() => {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (activeRestaurant !== 'all') params.restaurantId = activeRestaurant;
      if (activeCategory !== 'all') params.category = activeCategory;

      fetchMenu(params)
        .then(setMenuItems)
        .catch((e) => setError(e.message));
    }, 300);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeRestaurant, activeCategory]);

  const categories = useMemo(
    () => ['all', ...new Set(menuItems.map((i) => i.category))],
    [menuItems]
  );

  return (
    <div className="container">
      <div className="page-header">
        <h1>What are you craving today?</h1>
        <p>Search across every restaurant on FoodHub, or browse by kitchen.</p>
      </div>

      <div className="search-row">
        <input
          type="search"
          className="search-input"
          placeholder="Search dishes, e.g. biryani, pizza, salad…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search menu items"
        />
      </div>

      <div className="restaurant-strip" role="tablist" aria-label="Filter by restaurant">
        <button
          className={`chip ${activeRestaurant === 'all' ? 'chip-active' : ''}`}
          onClick={() => setActiveRestaurant('all')}
        >
          All restaurants
        </button>
        {restaurants.map((r) => (
          <button
            key={r.id}
            className={`chip ${activeRestaurant === r.id ? 'chip-active' : ''}`}
            onClick={() => setActiveRestaurant(r.id)}
          >
            {r.name} <span className="chip-meta">★ {r.rating}</span>
          </button>
        ))}
      </div>

      <div className="category-strip">
        {categories.map((c) => (
          <button
            key={c}
            className={`tag ${activeCategory === c ? 'tag-active' : ''}`}
            onClick={() => setActiveCategory(c)}
          >
            {c === 'all' ? 'All categories' : c}
          </button>
        ))}
      </div>

      {error && <div className="banner banner-error">{error}</div>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div className="spinner" />
        </div>
      ) : menuItems.length === 0 ? (
        <div className="empty-state">
          <h3>No dishes match that search.</h3>
          <p>Try a different keyword or clear your filters.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
