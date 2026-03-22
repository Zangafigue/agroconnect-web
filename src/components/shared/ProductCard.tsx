import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShoppingCart, ArrowRight, Tag } from 'lucide-react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    category: string;
    images: string[];
    city: string;
    seller?: {
      firstName: string;
      lastName: string;
    }
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const defaultImage = "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800";

  return (
    <div 
      onClick={() => navigate(`/catalog/${product._id}`)}
      className="group bg-white rounded-[2rem] overflow-hidden border border-[var(--gray-200)] hover:shadow-2xl hover:shadow-[var(--gray-900)]/5 transition-all duration-500 cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.images?.[0] || defaultImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/50">
          <Tag size={14} className="text-[var(--green-600)]" />
          <span className="text-[10px] font-black text-[var(--gray-900)] uppercase tracking-[0.1em]">{product.category}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
           <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 text-white">
              <MapPin size={16} className="text-[var(--green-400)]" />
              <span className="text-xs font-bold">{product.city}</span>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-display text-[var(--gray-900)] leading-tight tracking-tight group-hover:text-[var(--green-600)] transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-[var(--gray-501)] text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
          {product.description}
        </p>

        <div className="pt-6 border-t border-[var(--gray-100)] flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--gray-400)]">Prix Direct</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[var(--green-600)] tracking-tight">{product.price.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-[var(--gray-501)] uppercase">FCFA</span>
            </div>
          </div>
          
          <button className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-[var(--green-600)] hover:scale-110 transition-all shadow-xl shadow-black/10 active:scale-95">
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
