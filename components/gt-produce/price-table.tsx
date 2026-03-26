"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";
import type { ProduceItem } from "@/lib/types";

interface PriceTableProps {
  type: "fruit" | "veg";
}

export function PriceTable({ type }: PriceTableProps) {
  const {
    fruitData,
    vegData,
    cart,
    isAdmin,
    addToCart,
    removeFromCart,
    updatePrice,
    updateItemName,
    addNewItem,
    deleteItem,
  } = useGTProduce();

  const data = type === "fruit" ? fruitData : vegData;
  const title = type === "fruit" ? "Fruits" : "Vegetables";
  const tableClass = type === "fruit" ? "fruit-table" : "veg-table";

  const handleQuantityChange = (item: ProduceItem, delta: number) => {
    const currentQty = cart[item.id]?.qty || 0;
    const newQty = currentQty + delta;

    if (newQty > 0) {
      addToCart(item, delta);
    } else if (newQty === 0 && currentQty > 0) {
      removeFromCart(item.id);
    }
  };

  const handlePriceEdit = (item: ProduceItem) => {
    if (!isAdmin) return;
    const newPrice = prompt(`New price for ${item.name}:`, item.price.toString());
    if (newPrice !== null) {
      const parsed = parseFloat(newPrice);
      if (!isNaN(parsed) && parsed >= 0) {
        updatePrice(type, item.id, parsed);
      }
    }
  };

  const handleNameEdit = (item: ProduceItem) => {
    if (!isAdmin) return;
    const newName = prompt(`New name for ${item.name}:`, item.name);
    if (newName !== null && newName.trim() !== "") {
      updateItemName(type, item.id, newName.trim());
    }
  };

  const handleAddItem = (category: string) => {
    if (!isAdmin) return;
    const name = prompt(`Enter name for new ${category} item:`);
    if (name && name.trim()) {
      const priceStr = prompt(`Enter price for ${name}:`);
      if (priceStr !== null) {
        const price = parseFloat(priceStr);
        if (!isNaN(price) && price >= 0) {
          addNewItem(type, category, name.trim(), price);
        }
      }
    }
  };

  const handleDeleteItem = (item: ProduceItem) => {
    if (!isAdmin) return;
    if (confirm(`Delete "${item.name}"?`)) {
      deleteItem(type, item.id);
    }
  };

  // Group items by category
  const categories = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ProduceItem[]>);

  return (
    <div className={`price-sheet ${tableClass}`}>
      <div className="sheet-header">
        <h2>{title}</h2>
      </div>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="category-section">
          <div className="category-header">
            <span>{category}</span>
            {isAdmin && (
              <button
                className="add-item-btn"
                onClick={() => handleAddItem(category)}
                title={`Add new ${category} item`}
              >
                +
              </button>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const cartItem = cart[item.id];
                const qty = cartItem?.qty || 0;

                return (
                  <tr key={item.id} className={qty > 0 ? "in-cart" : ""}>
                    <td
                      className={`item-name ${isAdmin ? "editable" : ""}`}
                      onClick={() => handleNameEdit(item)}
                    >
                      {item.name}
                      {isAdmin && (
                        <button
                          className="delete-item-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item);
                          }}
                          title="Delete item"
                        >
                          x
                        </button>
                      )}
                    </td>
                    <td
                      className={`item-price ${isAdmin ? "editable" : ""}`}
                      onClick={() => handlePriceEdit(item)}
                    >
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="qty-cell">
                      <div className="qty-controls">
                        <button
                          className="qty-btn minus"
                          onClick={() => handleQuantityChange(item, -1)}
                          disabled={qty === 0}
                        >
                          -
                        </button>
                        <span className="qty-display">{qty}</span>
                        <button
                          className="qty-btn plus"
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
