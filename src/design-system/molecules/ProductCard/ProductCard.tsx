import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';
import { Badge } from '@/design-system/atoms/Badge';
import { Typography } from '@/design-system/atoms/Typography';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  discountPercentage?: number;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  className?: string;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onViewDetails,
  className,
  delay = 0,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        )}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={cn('group', className)}
    >
      <Card className="relative overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="primary" size="sm">
                Nuevo
              </Badge>
            )}
            {product.isOnSale && product.discountPercentage && (
              <Badge variant="secondary" size="sm">
                -{product.discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
              onClick={() => onAddToWishlist?.(product)}
              aria-label="Agregar a favoritos"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
              onClick={() => onViewDetails?.(product)}
              aria-label="Ver detalles"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" size="lg">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <Typography variant="caption" className="text-vendes-text-secondary mb-1">
            {product.category}
          </Typography>

          {/* Product Name */}
          <Typography variant="h4" className="mb-2 line-clamp-2">
            {product.name}
          </Typography>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderRating(product.rating)}
            </div>
            <Typography variant="caption" className="text-vendes-text-neutral">
              ({product.reviews})
            </Typography>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <Typography variant="h3" className="vendes-text-primary">
              {formatPrice(product.price)}
            </Typography>
            {product.originalPrice && product.originalPrice > product.price && (
              <Typography variant="body" className="line-through text-vendes-text-neutral">
                {formatPrice(product.originalPrice)}
              </Typography>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            leftIcon={<ShoppingCart className="w-4 h-4" />}
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Agregar al carrito' : 'Agotado'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
