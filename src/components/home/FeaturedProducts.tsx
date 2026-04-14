
export function FeaturedProducts() {
  return (
    <div className="py-12 bg-[#020617]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">أبرز المنتجات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Products will be rendered here */}
          <p className="text-gray-400 text-center col-span-full">جاري تحميل المنتجات المميزة...</p>
        </div>
      </div>
    </div>
  );
}

