import { useState } from 'react';
import { useFilterStore } from '../../store/filters.store';
import { MdChevronDown, MdClose } from 'react-icons/md';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function Sidebar({ isOpen, onClose }) {
  const { filters, setFilter, resetFilters } = useFilterStore();
  const [expanded, setExpanded] = useState({
    category: true,
    sort: true,
  });

  const categories = ['Temple', 'Beach', 'Mountain', 'Fort', 'Museum'];
  const sorts = ['Popular', 'Newest', 'Most Rated', 'A-Z'];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen md:h-auto bg-white border-r border-gray-200 w-80 md:w-64 transform transition-transform md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between md:hidden">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={onClose} aria-label="Close sidebar">
              <MdClose size={24} />
            </button>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search places..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="input w-full text-sm"
            />
          </div>

          {/* Category Filter */}
          <div>
            <button
              onClick={() =>
                setExpanded({
                  ...expanded,
                  category: !expanded.category,
                })
              }
              className="flex items-center justify-between w-full font-semibold text-sm mb-3"
            >
              Categories
              <MdChevronDown
                className={`transition-transform ${
                  expanded.category ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expanded.category && (
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.category === cat}
                      onChange={(e) =>
                        setFilter('category', e.target.checked ? cat : '')
                      }
                      className="rounded"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort Filter */}
          <div>
            <button
              onClick={() =>
                setExpanded({
                  ...expanded,
                  sort: !expanded.sort,
                })
              }
              className="flex items-center justify-between w-full font-semibold text-sm mb-3"
            >
              Sort By
              <MdChevronDown
                className={`transition-transform ${expanded.sort ? 'rotate-180' : ''}`}
              />
            </button>
            {expanded.sort && (
              <div className="space-y-2">
                {sorts.map((sort) => (
                  <label key={sort} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sort === sort}
                      onChange={() => setFilter('sort', sort)}
                      className="rounded-full"
                    />
                    <span className="text-sm">{sort}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Featured Filter */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => setFilter('featured', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Featured Only</span>
          </label>

          {/* Active Filters */}
          {(filters.search || filters.category || filters.featured) && (
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {filters.search && (
                  <Badge>Search: {filters.search}</Badge>
                )}
                {filters.category && (
                  <Badge variant="accent">{filters.category}</Badge>
                )}
                {filters.featured && (
                  <Badge variant="danger">Featured</Badge>
                )}
              </div>
            </div>
          )}

          {/* Clear Button */}
          <Button
            onClick={resetFilters}
            variant="ghost"
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      </aside>
    </>
  );
}
