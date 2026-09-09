import React from 'react';

interface OverlayFooterProps {
  lang?: 'de' | 'en';
}

export const OverlayFooter: React.FC<OverlayFooterProps> = ({ lang = 'de' }) => {
  return (
    <footer
      id="contact"
      className="relative z-10 w-full bg-[#0a0a0b] py-16 px-5 sm:py-24 sm:px-12 flex justify-center border-t border-[rgba(244,241,236,0.12)]"
    >
      <div className="w-full max-w-[640px] text-center">
        {/* Philosophie Label & Pullquote */}
        <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(244,241,236,0.45)] mb-6">
          {lang === 'de' ? 'Philosophie' : 'Philosophy'}
        </span>

        <blockquote className="font-serif text-[clamp(18px,2.2vw,22px)] italic text-parchment leading-relaxed px-4">
          {lang === 'de'
            ? '\u201ELust auf eine spannende Kueche bei gemuetlicher Atmosphaere & lockerem, freundlichem Service?\u201C'
            : '"Craving exciting regional cuisine in a cozy atmosphere with warm, attentive hospitality?"'}
        </blockquote>

        {/* Divider */}
        <div className="w-[120px] h-[1px] bg-[rgba(244,241,236,0.12)] mx-auto my-10" />

        {/* Contact Block */}
        <h3 className="font-serif text-[clamp(24px,3vw,32px)] font-semibold text-parchment mb-6">
          {lang === 'de' ? 'Wir freuen uns auf Sie!' : 'We look forward to welcoming you!'}
        </h3>

        <div className="space-y-2 mb-4">
          <div>
            <a
              href="mailto:mail@frischegrube.de"
              className="font-sans text-[15px] font-medium text-parchment underline underline-offset-[3px] hover:text-[#f5c97a] transition-colors pointer-events-auto"
            >
              mail@frischegrube.de
            </a>
          </div>
          <div>
            <a
              href="tel:038412440126"
              className="font-sans text-[15px] font-medium text-parchment underline underline-offset-[3px] hover:text-[#f5c97a] transition-colors pointer-events-auto"
            >
              03841-244-0126
            </a>
          </div>
        </div>

        <p className="font-sans text-[13px] italic text-[rgba(244,241,236,0.45)]">
          {lang === 'de'
            ? '(Reservierungen mit Kindern nehmen wir ab einem Alter von 16 Jahren an.)'
            : '(Reservations with young guests accepted from age 16.)'}
        </p>

        {/* WhatsApp CTA Button */}
        <div className="mt-8">
          <a
            href="https://wa.me/4938412440126"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-3.5 border-[1.5px] border-[#25D366] text-[#25D366] font-sans text-[15px] font-semibold tracking-[0.02em] hover:bg-[#25D366] hover:text-[#0a0a0b] transition-all duration-300 pointer-events-auto"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29" />
            </svg>
            <span>{lang === 'de' ? 'Kontaktieren Sie uns' : 'Message Us on WhatsApp'}</span>
          </a>
        </div>

        {/* Sign-off */}
        <p className="font-serif text-[16px] font-medium italic text-[rgba(244,241,236,0.55)] mt-12">
          Christian Mueller &amp; Team
        </p>

        {/* Address */}
        <p className="font-sans text-[13px] text-[rgba(244,241,236,0.35)] mt-2">
          Scheuerstrasse 1, 23966 Wismar
        </p>
      </div>
    </footer>
  );
};
