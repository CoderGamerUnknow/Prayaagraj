import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="pt-[68px]">
      <div className="relative h-[clamp(340px,52vh,480px)] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1600&q=80&auto=format')] bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,13,4,0.9)] to-[rgba(192,57,15,0.28)]"></div>
        <div className="relative z-10 p-[clamp(2.5rem,6vw,5rem)] max-w-[700px]">
          <span className="eyebrow text-[var(--saffron-w)]">Our Story</span>
          <h1 className="font-['Fraunces'] text-[clamp(2.3rem,5vw,3.8rem)] text-white font-semibold leading-[1.1] mb-[0.9rem]">
            Where <em className="italic text-[var(--saffron)]">Maharashtra</em><br/>Meets Lagos
          </h1>
          <p className="text-[0.97rem] text-white/60 leading-[1.8] font-light max-w-[490px]">
            A kitchen built on tradition, spice, and the honest belief that great food changes how a day feels.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3rem,6vw,6rem)] py-[clamp(4rem,7vw,6rem)] px-[clamp(1.2rem,5vw,4rem)] items-center">
        <div className="relative rounded-lg overflow-hidden shadow-[0_22px_60px_rgba(26,13,4,0.13)]">
          <Image 
            src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=700&q=85&auto=format" 
            alt="Indian cooking" 
            width={700} 
            height={875} 
            className="aspect-[4/5] object-cover w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -inset-[14px] border-2 border-[rgba(224,123,26,0.28)] rounded-lg -z-10"></div>
        </div>
        <div>
          <span className="eyebrow text-left">The Potoba Name</span>
          <h2 className="font-['Fraunces'] text-[clamp(1.7rem,3vw,2.4rem)] text-[var(--ink)] font-medium mb-[1.2rem] leading-[1.2]">
            Rooted in Maharashtrian Culinary Tradition
          </h2>
          <p className="text-[0.91rem] text-[var(--muted)] leading-[1.85] font-light mb-[1rem]">
            The name Potoba comes from a beloved Maharashtrian institution — a style of restaurant that honours the simple, deeply flavourful food of Maharashtra. Our Ilupeju outpost carries that same spirit to Lagos.
          </p>
          <p className="text-[0.91rem] text-[var(--muted)] leading-[1.85] font-light mb-[1rem]">
            Cafe Potoba was founded to serve the Indian community in Lagos and introduce Lagosians to the world of Maharashtrian street food: fiery Misal Pav, satisfying Thalis, crispy Vada Pav, and comforting Sabudana dishes.
          </p>
          <p className="text-[0.91rem] text-[var(--muted)] leading-[1.85] font-light mb-[1rem]">
            We cook everything from scratch — fresh every morning. Our spice blends are our own. Our recipes are real. Our portions are generous, just like home. Pull up a chair.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1px] bg-[var(--smoke)] mx-[clamp(1.2rem,5vw,4rem)] mb-20 rounded-lg overflow-hidden">
        <div className="bg-[var(--cream)] p-[2.4rem_1.7rem] transition-colors hover:bg-[var(--saffron-pale)]">
          <div className="text-[1.75rem] mb-[0.85rem]">🌿</div>
          <h3 className="font-['Fraunces'] text-[1.05rem] text-[var(--ink)] mb-[0.45rem] font-medium">Fresh & Scratch</h3>
          <p className="text-[0.8rem] text-[var(--muted)] leading-[1.62] font-light">Every dish cooked fresh from scratch daily. No frozen shortcuts, no compromises on quality.</p>
        </div>
        <div className="bg-[var(--cream)] p-[2.4rem_1.7rem] transition-colors hover:bg-[var(--saffron-pale)]">
          <div className="text-[1.75rem] mb-[0.85rem]">🌶</div>
          <h3 className="font-['Fraunces'] text-[1.05rem] text-[var(--ink)] mb-[0.45rem] font-medium">Authentic Recipes</h3>
          <p className="text-[0.8rem] text-[var(--muted)] leading-[1.62] font-light">Maharashtrian recipes that honour the food of Dadar, Pune and the lanes of old Mumbai.</p>
        </div>
        <div className="bg-[var(--cream)] p-[2.4rem_1.7rem] transition-colors hover:bg-[var(--saffron-pale)]">
          <div className="text-[1.75rem] mb-[0.85rem]">🤝</div>
          <h3 className="font-['Fraunces'] text-[1.05rem] text-[var(--ink)] mb-[0.45rem] font-medium">Warm Hospitality</h3>
          <p className="text-[0.8rem] text-[var(--muted)] leading-[1.62] font-light">Our staff are known for genuine warmth. Customers say it feels like being fed by family.</p>
        </div>
        <div className="bg-[var(--cream)] p-[2.4rem_1.7rem] transition-colors hover:bg-[var(--saffron-pale)]">
          <div className="text-[1.75rem] mb-[0.85rem]">💰</div>
          <h3 className="font-['Fraunces'] text-[1.05rem] text-[var(--ink)] mb-[0.45rem] font-medium">Fair Prices</h3>
          <p className="text-[0.8rem] text-[var(--muted)] leading-[1.62] font-light">From ₦1,200 snacks to ₦9,000 full thalis — real food at honest, accessible prices.</p>
        </div>
      </div>
    </section>
  );
}
