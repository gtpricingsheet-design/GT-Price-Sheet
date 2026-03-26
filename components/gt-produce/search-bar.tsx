"use client"

import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }, [onSearch])

  const handleClear = useCallback(() => {
    setQuery('')
    onSearch('')
  }, [onSearch])

  return (
    <div className="search-wrap">
      <Search className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        id="searchInput"
      />
      <button 
        className={`search-clear ${query ? 'show' : ''}`}
        onClick={handleClear}
        aria-label="Clear search"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
