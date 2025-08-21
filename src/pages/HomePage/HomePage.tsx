import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/design-system/organisms/HeroSection';
import { ProductCard } from '@/design-system/molecules/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';
import { Typography } from '@/design-system/atoms/Typography';
import { 
  Rocket, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Globe,
  Star,
  Zap,
  CheckCircle
} from 'lucide-react';

// Datos de ejemplo para productos
const featuredProducts = [
  {
    id: '1',
    name: 'Producto Premium Vendes',
    description: 'Solución completa para comercio electrónico',
    price: 299000,
    originalPrice: 399000,
    image: '/api/images/vendes-logo-nombre.jpg',
    category: 'Software',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isNew: true,
    isOnSale: true,
    discountPercentage: 25,
  },
  {
    id: '2',
    name: 'Kit de Herramientas Digitales',
    description: 'Herramientas esenciales para vender en línea',
    price: 199000,
    image: '/api/images/vendes-logo.jpg',
    category: 'Herramientas',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: false,
  },
  {
    id: '3',
    name: 'Curso de Marketing Digital',
    description: 'Aprende a promocionar tu negocio en línea',
    price: 150000,
    image: '/api/images/vendes-logo-nombre.jpg',
    category: 'Educación',
    rating: 4.9,
    reviews: 256,
    inStock: true,
    isNew: false,
    isOnSale: true,
    discountPercentage: 15,
  },
];

const HomePage: React.FC = () => {
  const handleAddToCart = (product: any) => {
    console.log('Agregar al carrito:', product);
  };

  const handleAddToWishlist = (product: any) => {
    console.log('Agregar a favoritos:', product);
  };

  const handleViewDetails = (product: any) => {
    console.log('Ver detalles:', product);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants}>
              <Typography variant="h2" className="vendes-text-primary mb-4">
                Productos Destacados
              </Typography>
              <Typography variant="body" className="vendes-text-neutral max-w-2xl mx-auto">
                Descubre nuestras mejores herramientas y soluciones para hacer crecer tu negocio digital
              </Typography>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  onViewDetails={handleViewDetails}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants}>
              <Typography variant="h2" className="vendes-text-primary mb-4">
                ¿Por qué elegir Vendes?
              </Typography>
              <Typography variant="body" className="vendes-text-neutral max-w-2xl mx-auto">
                Nuestra plataforma ofrece todo lo que necesitas para crear un negocio digital exitoso
              </Typography>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Rocket className="w-8 h-8" />,
                title: 'Configuración Rápida',
                description: 'Crea tu tienda en línea en menos de 10 minutos con nuestras herramientas intuitivas.',
                features: ['Plantillas profesionales', 'Configuración automática', 'Soporte 24/7'],
              },
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: 'Gestión Completa',
                description: 'Administra productos, pedidos y clientes desde un solo panel de control.',
                features: ['Inventario automático', 'Procesamiento de pagos', 'Análisis de ventas'],
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Analytics Avanzadas',
                description: 'Obtén insights detallados sobre el rendimiento de tu negocio.',
                features: ['Reportes en tiempo real', 'Métricas personalizadas', 'Optimización automática'],
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#551BB3] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="vendes-text-primary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Typography variant="body" className="vendes-text-neutral mb-6">
                      {feature.description}
                    </Typography>
                    <div className="space-y-2">
                      {feature.features.map((item, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-vendes-secondary" />
                          <Typography variant="caption" className="vendes-text-neutral">
                            {item}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div variants={itemVariants}>
              <Typography variant="h2" className="vendes-text-primary mb-4">
                ¿Listo para comenzar?
              </Typography>
              <Typography variant="body" className="vendes-text-neutral max-w-2xl mx-auto mb-8">
                Únete a miles de comerciantes que ya están vendiendo en línea con Vendes. 
                Comienza tu viaje hacia el éxito digital hoy mismo.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Rocket className="w-5 h-5" />}
                  onClick={() => console.log('Crear sitio web')}
                >
                  Crear mi sitio web
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => console.log('Ver demo')}
                >
                  Ver demo
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
