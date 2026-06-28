interface FilterBarProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function FilterBar({ categories, activeCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-6 md:py-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-body text-xs md:text-sm transition-colors text-center whitespace-nowrap ${
            activeCategory === cat.id
              ? 'bg-terracotta text-white'
              : 'bg-white text-charcoal border border-charcoal/10 hover:border-terracotta hover:text-terracotta'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
