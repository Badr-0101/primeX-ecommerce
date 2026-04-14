import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronUp, Search } from 'lucide-react'
import { useGetCategories, useGetProductCountsByCategory } from '@/lib/queries'
import type { ProductFilters } from '@/lib/api'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface FilterProductsProps {
  filters: ProductFilters
  onFilterChange: (filters: ProductFilters) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Collapsible section with animated open/close */
const FilterSection = ({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-white font-bold text-sm mb-4 cursor-pointer bg-transparent border-none p-0"
      >
        <span>{title}</span>
        <ChevronUp
          size={16}
          className="transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Dual-range price slider with min/max inputs */
const PriceRangeSlider = ({
  min,
  max,
  valueMin,
  valueMax,
  onMinChange,
  onMaxChange,
}: {
  min: number
  max: number
  valueMin: number
  valueMax: number
  onMinChange: (v: number) => void
  onMaxChange: (v: number) => void
}) => {
  const leftPercent = ((valueMin - min) / (max - min)) * 100
  const rightPercent = ((valueMax - min) / (max - min)) * 100

  return (
    <div>
      {/* Price inputs */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1">
          <label className="block text-[11px] text-[rgba(255,255,255,0.4)] mb-1.5 text-right">من</label>
          <div className="flex items-center bg-[#0d0e14] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden">
            <input
              type="number"
              value={valueMin}
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), valueMax)
                onMinChange(Math.max(min, v))
              }}
              
              className="flex-1 bg-transparent text-white text-sm font-bold px-3 py-2.5 border-none outline-none w-0 text-center"
              min={min}
              max={valueMax}
            />
            <span className="text-[10px] font-bold text-primary bg-[rgba(185,242,13,0.08)] px-2 py-2.5 border-r border-[rgba(255,255,255,0.06)]">
              EGP
            </span>
          </div>
        </div>

        <span className="text-[rgba(255,255,255,0.2)] mt-5 font-bold">-</span>

        <div className="flex-1">
          <label className="block text-[11px] text-[rgba(255,255,255,0.4)] mb-1.5 text-right">إلى</label>
          <div className="flex items-center bg-[#0d0e14] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden">
            <input
              type="number"
              value={valueMax}
              onChange={(e) => {
                const v = Math.max(Number(e.target.value), valueMin)
                onMaxChange(Math.min(max, v))
              }}
              className="flex-1 bg-transparent text-white text-sm font-bold px-3 py-2.5 border-none outline-none w-0 text-center"
              min={valueMin}
              max={max}
            />
            <span className="text-[10px] font-bold text-primary bg-[rgba(185,242,13,0.08)] px-2 py-2.5 border-r border-[rgba(255,255,255,0.06)]">
              EGP
            </span>
          </div>
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative h-[6px] mx-1">
        {/* Track background */}
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.06)] rounded-full" />

        {/* Active track */}
        <div
          className="absolute top-0 h-full bg-primary rounded-full transition-all duration-150"
          style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={valueMin}
          onChange={(e) => onMinChange(Math.min(Number(e.target.value), valueMax - 1))}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-[18px]
            [&::-webkit-slider-thumb]:h-[18px]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:border-[3px]
            [&::-webkit-slider-thumb]:border-[#12131a]
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(185,242,13,0.4)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:relative
            [&::-webkit-slider-thumb]:z-20"
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={valueMax}
          onChange={(e) => onMaxChange(Math.max(Number(e.target.value), valueMin + 1))}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-[18px]
            [&::-webkit-slider-thumb]:h-[18px]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:border-[3px]
            [&::-webkit-slider-thumb]:border-[#12131a]
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(185,242,13,0.4)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:relative
            [&::-webkit-slider-thumb]:z-20"
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main FilterProducts Component
// ─────────────────────────────────────────────────────────────────────────────

const FilterProducts = ({ filters, onFilterChange }: FilterProductsProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')

  // Fetch categories + counts from the DB
  const { data: categories = [] } = useGetCategories()
  const { data: categoryCounts = [] } = useGetProductCountsByCategory()

  // Build a map: category_id -> count
  const countsMap = useMemo(() => {
    const map = new Map<string, number>()
    for (const c of categoryCounts) map.set(c.category_id, c.count)
    return map
  }, [categoryCounts])

  // Filter categories by search term
  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) =>
        (cat.name ?? '').toLowerCase().includes(categorySearch.toLowerCase())
      ),
    [categories, categorySearch]
  )

  // Total product count
  const totalProducts = useMemo(
    () => categoryCounts.reduce((sum, c) => sum + c.count, 0),
    [categoryCounts]
  )

  const handleCategoryChange = useCallback(
    (categoryId: string | undefined) => {
      onFilterChange({ ...filters, categoryId })
    },
    [filters, onFilterChange]
  )

  const handlePriceMinChange = useCallback(
    (priceMin: number) => {
      onFilterChange({ ...filters, priceMin })
    },
    [filters, onFilterChange]
  )

  const handlePriceMaxChange = useCallback(
    (priceMax: number) => {
      onFilterChange({ ...filters, priceMax })
    },
    [filters, onFilterChange]
  )

  // ── Shared filter content (used by both mobile + desktop) ──
  const filterContent = (
    <div className="flex flex-col gap-5" style={{ direction: 'rtl' }}>
      {/* ─── Category Section ─── */}
      <FilterSection title="الأقسام">
        {/* Search input */}
        <div className="relative mb-4">
          <Search
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.25)]"
          />
          <input
            type="text"
            placeholder="بحث في الأقسام..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full bg-[#0d0e14] border border-[rgba(255,255,255,0.08)] rounded-lg
              pr-9 pl-3 py-2.5 text-white text-[13px] placeholder:text-[rgba(255,255,255,0.25)]
              outline-none transition-colors duration-200
              focus:border-primary/40"
          />
        </div>

        {/* Category list */}
        <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto custom-scrollbar">
          {/* "All" option */}
          <label
            className="flex items-center justify-between gap-2.5 cursor-pointer group text-sm py-1.5 px-1 rounded-lg transition-colors duration-150 hover:bg-[rgba(255,255,255,0.03)]"
            onClick={() => handleCategoryChange(undefined)}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`
                  w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center
                  transition-all duration-200
                  ${!filters.categoryId
                    ? 'bg-primary border-primary shadow-[0_0_8px_rgba(185,242,13,0.25)]'
                    : 'border-[rgba(255,255,255,0.15)] bg-transparent group-hover:border-[rgba(255,255,255,0.35)]'}
                `}
              >
                {!filters.categoryId && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className={`transition-colors duration-200 ${
                  !filters.categoryId
                    ? 'text-primary font-bold'
                    : 'text-[rgba(255,255,255,0.55)] group-hover:text-white'
                }`}
              >
                الكل
              </span>
            </div>
            <span className="text-[11px] tabular-nums text-[rgba(255,255,255,0.3)]">
              ({totalProducts})
            </span>
          </label>

          {filteredCategories.map((cat) => {
            const isActive = filters.categoryId === cat.id
            const count = countsMap.get(cat.id) ?? 0

            return (
              <label
                key={cat.id}
                className="flex items-center justify-between gap-2.5 cursor-pointer group text-sm py-1.5 px-1 rounded-lg transition-colors duration-150 hover:bg-[rgba(255,255,255,0.03)]"
                onClick={() => handleCategoryChange(cat.id)}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`
                      w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center
                      transition-all duration-200
                      ${isActive
                        ? 'bg-primary border-primary shadow-[0_0_8px_rgba(185,242,13,0.25)]'
                        : 'border-[rgba(255,255,255,0.15)] bg-transparent group-hover:border-[rgba(255,255,255,0.35)]'}
                    `}
                  >
                    {isActive && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-primary font-bold'
                        : 'text-[rgba(255,255,255,0.55)] group-hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </span>
                </div>
                <span className="text-[11px] tabular-nums text-[rgba(255,255,255,0.3)]">
                  ({count})
                </span>
              </label>
            )
          })}

          {filteredCategories.length === 0 && (
            <p className="text-[rgba(255,255,255,0.25)] text-xs text-center py-3">
              لا توجد نتائج
            </p>
          )}
        </div>
      </FilterSection>

      {/* Divider */}
      <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />

      {/* ─── Price Range Section ─── */}
      <FilterSection title="السعر">
        <PriceRangeSlider
          min={0}
          max={5000}
          valueMin={filters.priceMin ?? 0}
          valueMax={filters.priceMax ?? 5000}
          onMinChange={handlePriceMinChange}
          onMaxChange={handlePriceMaxChange}
        />
      </FilterSection>
    </div>
  )

  return (
    <>
      {/* ── Mobile filter button ── */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2.5 text-primary border border-primary/40 rounded-xl px-5 py-3 cursor-pointer
            bg-[rgba(185,242,13,0.04)] hover:bg-primary hover:text-black
            transition-all duration-300 text-sm font-bold backdrop-blur-sm"
        >
          <SlidersHorizontal size={16} />
          الفلاتر
        </button>
      </div>

      {/* ── Mobile overlay + drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 h-full w-[300px] sm:w-[340px]
                bg-[#0d0e14] border-l border-[rgba(255,255,255,0.08)]
                z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6" style={{ direction: 'rtl' }}>
                <div className="flex items-center gap-2 text-primary font-bold">
                  <SlidersHorizontal size={18} />
                  الفلاتر
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[rgba(255,255,255,0.5)] hover:text-white cursor-pointer bg-transparent border-none transition-colors duration-200 p-1"
                >
                  <X size={20} />
                </button>
              </div>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:block w-[290px] shrink-0">
        <div
          className="sticky top-24
            bg-[linear-gradient(160deg,#12131a_0%,#0d0e14_100%)]
            border border-[rgba(255,255,255,0.08)]
            rounded-2xl p-5
            shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          <div
            className="flex items-center gap-2 text-primary font-bold text-sm mb-5"
            style={{ direction: 'rtl' }}
          >
            <SlidersHorizontal size={16} />
            الفلاتر
          </div>
          {filterContent}
        </div>
      </div>
    </>
  )
}

export default FilterProducts
