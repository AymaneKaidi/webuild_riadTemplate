interface FilterBarProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function FilterBar({ categories, activeCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-6 py-2 rounded-full font-body text-sm transition-colors ${
            activeCategory === cat.id
              ? 'bg-terracotta text-white'
              : 'bg-white text-charcoal border border-sand hover:border-terracotta hover:text-terracotta'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
