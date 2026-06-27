import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Droplets, Sun, Coffee, Flower } from 'lucide-react';

export default function AmenitiesPage() {
  const { t } = useTranslation();

  const amenities = [
    {
      id: 'pool',
      icon: <Droplets className="w-8 h-8" />,
      titleKey: 'amenities_page.pool',
      descKey: 'amenities_page.pool_desc'
    },
    {
      id: 'rooftop',
      icon: <Sun className="w-8 h-8" />,
      titleKey: 'amenities_page.rooftop',
      descKey: 'amenities_page.rooftop_desc'
    },
    {
      id: 'breakfast',
      icon: <Coffee className="w-8 h-8" />,
      titleKey: 'amenities_page.breakfast',
      descKey: 'amenities_page.breakfast_desc'
    },
    {
      id: 'spa',
      icon: <Flower className="w-8 h-8" />,
      titleKey: 'amenities_page.spa',
      descKey: 'amenities_page.spa_desc'
    }
  ];

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-teal mb-6">{t('amenities_page.title')}</h1>
        <p className="font-body text-lg max-w-2xl mx-auto italic text-terracotta-dark mb-16">
          {t('amenities_page.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {amenities.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-12 rounded-sm shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all"
            >
              <div className="text-terracotta mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-heading text-2xl text-teal mb-4">{t(item.titleKey)}</h3>
              <p className="font-body text-charcoal/70 leading-relaxed">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
