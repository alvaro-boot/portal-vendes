import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/design-system/atoms/Button';
import { Typography } from '@/design-system/atoms/Typography';
import { VendesLogo } from '@/components/ui';
import { ArrowRight, Sparkles, Rocket, ShoppingCart, BarChart3 } from 'lucide-react';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  stats?: Array<{
    value: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "¡Bienvenido a Vendes!",
  subtitle = "Tu plataforma de comercio digital profesional",
  description = "Configura tu comercio en pocos pasos y comienza a vender en línea con herramientas profesionales y un diseño moderno.",
  primaryAction = {
    label: "Crear mi sitio web",
    onClick: () => console.log("Crear sitio web"),
  },
  secondaryAction = {
    label: "Ver demo",
    onClick: () => console.log("Ver demo"),
  },
  stats = [
    {
      value: "10,000+",
      label: "Comercios activos",
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      value: "$2.5M+",
      label: "Ventas generadas",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      value: "150+",
      label: "Países alcanzados",
      icon: <Rocket className="w-6 h-6" />,
    },
  ],
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-vendes-neutral/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-[#551BB3] rounded-full opacity-10"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-[#551BB3] rounded-full opacity-10"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 vendes-bg-primary rounded-full opacity-5"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo and Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                className="w-16 h-16 bg-[#551BB3] rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <VendesLogo size="xl" />
              </motion.div>
              <motion.div
                className="w-16 h-16 bg-[#551BB3] rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            <Typography variant="h1" className="mb-4 vendes-text-primary">
              {title}
            </Typography>
            
            <Typography variant="h2" className="mb-6 vendes-text-secondary">
              {subtitle}
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <Typography variant="body" className="text-lg vendes-text-neutral max-w-2xl mx-auto">
              {description}
            </Typography>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              variant="primary"
              size="xl"
              leftIcon={<Rocket className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={primaryAction.onClick}
              className="group"
            >
              {primaryAction.label}
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-[#551BB3] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <Typography variant="h2" className="vendes-text-primary mb-2">
                  {stat.value}
                </Typography>
                <Typography variant="body" className="vendes-text-neutral">
                  {stat.label}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-vendes-primary rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-vendes-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
