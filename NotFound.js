import React, { useEffect, useState } from 'react';
import {
  createMenuItem,
  deleteMenuItem,
  fetchMenu,
  fetchRestaurants,
  updateMenuItem
} from '../../api/api';

const EMPTY_FORM = {
  id: null,
  restaurantId: '',
  name: '',
  description: '',
  price: '',
  category: '',
  image: '',
  available: true
};

export default function MenuManager() {
  const [items, setItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function loadData() {
    setLoading(true);
    Promise.all([fetchMenu(), fetchRestaurants()])
      .then(([m, r]) => {
        setItems(m);
        setRestaurants(r);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadData, []);

  function validate() {
    const next = {};
    if (!form.restaurantId) next.restaurantId = 'Choose a restaurant.';
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.category.trim()) next.category = 'Category is required.';
    if (!form.price || Number(form.price) <= 0) next.price = 'Enter a price greater than 0.';
    setFormErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;

    setSaving(true);
    const payload = {
      restaurantId: form.restaurantId,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      image: form.image.trim(),
      available: form.available
    };

    try {
      if (form.id) {
        await updateMenuItem(form.id, payload);
        setSuccess('Menu item updated.');
      } else {
        await createMenuItem(payload);
        setSuccess('Menu item added.');
      }
      setForm(EMPTY_FORM);
      loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    setForm({ ...item, price: String(item.price) });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!window.confirm('Remove this item from the menu?')) return;
    try {
      await deleteMenuItem(id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleAvailability(item) {
    try {
      await updateMenuItem(item.id, { available: !item.available });
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-grid">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{form.id ? 'Edit menu item' : 'Add a new menu item'}</h3>
        {error && <div className="banner banner-error">{error}</div>}
        {success && <div className="banner banner-success">{success}</div>}

        <div className="field">
          <label>Restaurant</label>
          <select
            className={formErrors.restaurantId ? 'invalid' : ''}
            value={form.restaurantId}
            onChange={(e) => setForm({ ...form, restaurantId: e.target.value })}
          >
            <option value="">Select restaurant…</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          {formErrors.restaurantId && <span className="field-error">{formErrors.restaurantId}</span>}
        </div>

        <div className="field">
          <label>Item name</label>
          <input
            className={formErrors.name ? 'invalid' : ''}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {formErrors.name && <span className="field-error">{formErrors.name}</span>}
        </div>

        <div className="field">
          <label>Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="admin-form-row">
          <div className="field">
            <label>Price (Rs)</label>
            <input
              type="number"
              min="1"
              className={formErrors.price ? 'invalid' : ''}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {formErrors.price && <span className="field-error">{formErrors.price}</span>}
          </div>
          <div className="field">
            <label>Category</label>
            <input
              className={formErrors.category ? 'invalid' : ''}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {formErrors.category && <span className="field-error">{formErrors.category}</span>}
          </div>
        </div>

        <div className="field">
          <label>Image URL</label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="https://…"
          />
        </div>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
          />
          Available for order
        </label>

        <div className="admin-form-actions">
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : form.id ? 'Save changes' : 'Add item'}
          </button>
          {form.id && (
            <button type="button" className="btn btn-outline" onClick={() => setForm(EMPTY_FORM)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        <h3>Current menu ({items.length})</h3>
        {loading ? (
          <div className="spinner" />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td className="mono">Rs {item.price.toLocaleString()}</td>
                  <td>
                    <button
                      className={`badge badge-${item.available ? 'delivered' : 'cancelled'} badge-btn`}
                      onClick={() => toggleAvailability(item)}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td className="admin-row-actions">
                    <button className="btn btn-outline" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn btn-outline admin-delete" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
