"use client"

import { useCallback, memo } from 'react'
import { useGTProduce } from '@/contexts/gt-produce-context'
import { Trash2 } from 'lucide-react'
import type { Category, ProduceItem } from '@/lib/types'

interface PriceTableProps {
  category: Category
  categoryIndex: number
  searchQuery: string
}

// Version 4 - No cart, no MainContent - clean implementation

export const PriceTable = memo(function PriceTable({ category, categoryIndex, searchQuery }: PriceTableProps) {
  const {
    editorUnlocked,
    currentSection,
    updateItem,
    deleteItem,
    addItem,
    showConfirmDialog
  } = useGTProduce()

  const section = currentSection as 'fruit' | 'veg'
  const items = category.items || []
  const allItems = category.subSections 
    ? category.subSections.flatMap(s => s.items)
    : items

  const filteredItems = searchQuery 
    ? allItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allItems

  const handleNameChange = useCallback((itemIdx: number, value: string, subIdx?: number) => {
    updateItem(categoryIndex, itemIdx, 'name', value, subIdx)
  }, [categoryIndex, updateItem])

  const handlePriceChange = useCallback((itemIdx: number, value: string, subIdx?: number) => {
    const numValue = parseFloat(value) || 0
    updateItem(categoryIndex, itemIdx, 'price', numValue, subIdx)
  }, [categoryIndex, updateItem])

  const handleAvailabilityChange = useCallback((itemIdx: number, value: boolean, subIdx?: number) => {
    updateItem(categoryIndex, itemIdx, 'available', value, subIdx)
  }, [categoryIndex, updateItem])

  const handleDelete = useCallback((itemIdx: number, subIdx?: number) => {
    showConfirmDialog('Remove this item?', () => {
      deleteItem(categoryIndex, itemIdx, subIdx)
    })
  }, [categoryIndex, deleteItem, showConfirmDialog])

  const renderItem = (item: ProduceItem, itemIdx: number, subIdx?: number) => {
    const isHidden = searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return (
      <tr 
        key={`${categoryIndex}-${subIdx ?? 'main'}-${itemIdx}`}
        className={`${!item.available ? 'unavailable' : ''} ${isHidden ? 'search-hidden' : ''}`}
      >
        <td className="col-name">
          {editorUnlocked ? (
            <input
              type="text"
              className="editable-name"
              value={item.name}
              onChange={(e) => handleNameChange(itemIdx, e.target.value, subIdx)}
            />
          ) : (
            <span className={!item.available ? 'text-[var(--unavailable-text)]' : ''}>
              {item.name}
            </span>
          )}
        </td>
        <td className="col-price">
          {editorUnlocked ? (
            <input
              type="number"
              step="0.01"
              className="editable-price"
              value={item.price.toFixed(2)}
              onChange={(e) => handlePriceChange(itemIdx, e.target.value, subIdx)}
            />
          ) : (
            <span className={!item.available ? 'text-[var(--unavailable-text)]' : ''}>
              £{item.price.toFixed(2)}
            </span>
          )}
        </td>
        {editorUnlocked && (
          <td className="col-actions">
            <label className="avail-toggle">
              <input
                type="checkbox"
                checked={item.available}
                onChange={(e) => handleAvailabilityChange(itemIdx, e.target.checked, subIdx)}
              />
              <span className="avail-slider" />
            </label>
            <button 
              className="btn-delete-item"
              onClick={() => handleDelete(itemIdx, subIdx)}
              aria-label="Delete item"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </td>
        )}
      </tr>
    )
  }

  if (filteredItems.length === 0 && searchQuery) {
    return null
  }

  return (
    <div 
      className={`category is-visible ${filteredItems.length === 0 && searchQuery ? 'search-hidden' : ''}`}
      data-cat-id={category.id}
    >
      <div 
        className="cat-header" 
        style={{ background: category.color }}
        data-print-color={category.color}
      >
        <span className="cat-icon">{category.icon}</span>
        <span className="cat-name">{category.name}</span>
        <span className="cat-count">{allItems.length} items</span>
        {editorUnlocked && (
          <button 
            className="btn-add-item"
            onClick={() => addItem(categoryIndex)}
          >
            + Add
          </button>
        )}
      </div>

      <table className="price-table">
        <thead>
          <tr>
            <th className="col-name">Product</th>
            <th className="col-price">Price</th>
            {editorUnlocked && <th className="col-actions">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {category.subSections ? (
            category.subSections.map((sub, subIdx) => (
              sub.items.map((item, itemIdx) => renderItem(item, itemIdx, subIdx))
            ))
          ) : (
            items.map((item, itemIdx) => renderItem(item, itemIdx))
          )}
        </tbody>
      </table>
    </div>
  )
})

PriceTable.displayName = 'PriceTable'
