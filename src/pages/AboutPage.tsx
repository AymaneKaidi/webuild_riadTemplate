import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      
      gsap.from('.reveal-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-sand text-charcoal pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="font-heading text-5xl md:text-6xl text-teal mb-6">{t('about_page.title')}</h1>
        <p className="font-body text-lg italic text-terracotta-dark mb-16">
          {t('about_page.subtitle')}
        </p>

        <div ref={sectionRef} className="space-y-24 text-start">
          <div className="reveal-item flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 aspect-[4/3] bg-charcoal/5 rounded-sm relative overflow-hidden flex items-center justify-center">
               <span className="font-body text-xs tracking-widest uppercase text-charcoal/20">{t('common.image')}</span>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="font-heading text-3xl text-teal">{t('about_page.story_title')}</h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                {t('about_page.story_desc1')}
              </p>
              <p className="font-body text-charcoal/80 leading-relaxed">
                {t('about_page.story_desc2')}
              </p>
            </div>
          </div>

          <div className="reveal-item flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="w-full md:w-1/2 aspect-[4/3] bg-charcoal/5 rounded-sm relative overflow-hidden flex items-center justify-center">
               <span className="font-body text-xs tracking-widest uppercase text-charcoal/20">{t('common.image')}</span>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="font-heading text-3xl text-teal">{t('about_page.philosophy_title')}</h2>
              <p className="font-body text-charcoal/80 leading-relaxed">
                {t('about_page.philosophy_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
