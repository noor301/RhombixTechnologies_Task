import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './MenuItemCard.css';

export default function MenuItemCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className={`ticket-card ${!item.available ? 'ticket-card-unavailable' : ''}`}>
      <div className="ticket-image">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="ticket-category">{item.category}</span>
      </div>
      <div className="ticket-body">
        <h3>{item.name}</h3>
        <p className="ticket-desc">{item.description}</p>
        <div className="ticket-footer">
          <span className="ticket-price mono">Rs {item.price.toLocaleString()}</span>
          {item.available ? (
            <button
              className={`btn btn-primary ticket-add ${justAdded ? 'ticket-add-done' : ''}`}
              onClick={handleAdd}
            >
              {justAdded ? 'Added ✓' : 'Add to cart'}
            </button>
          ) : (
            <span className="ticket-soldout">Sold out</span>
          )}
        </div>
      </div>
    </article>
  );
}
