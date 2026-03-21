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
  const defaultImage = "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800"; // Placeholder premium

  return (
    <div 
      onClick={() => navigate(`/catalog/${product._id}`)}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={product.images?.[0] || defaultImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Tag size={12} className="text-primary" />
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">{product.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-on-surface font-headline leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-on-surface-variant text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center gap-1 text-xs text-outline mb-4">
          <MapPin size={14} className="text-primary" />
          <span>{product.city}</span>
        </div>

        <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-outline font-medium">Prix</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-primary">{product.price.toLocaleString()}</span>
              <span className="text-xs font-bold text-primary uppercase">FCFA / {product.unit}</span>
            </div>
          </div>
          
          <button className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
