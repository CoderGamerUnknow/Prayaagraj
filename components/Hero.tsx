'use client';

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-[68px]">
      <div className="relative h-[calc(100svh-68px)] min-h-[540px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1800&q=85&auto=format&fit=crop')] bg-center bg-cover animate-[hz_14s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,13,4,0.2)] via-[rgba(26,13,4,0.08)] to-[rgba(26,13,4,0.97)]"></div>
        <div className="relative z-10 px-[clamp(1.2rem,6vw,6rem)] pb-[clamp(3rem,6vh,5rem)] max-w-[780px] animate-[rise_0.9s_ease_both]">
          <div className="inline-flex items-center gap-[0.55rem] bg-[rgba(224,123,26,0.16)] border border-[rgba(224,123,26,0.32)] px-[0.95rem] py-[0.36rem] rounded-full mb-[1.3rem]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--saffron)] animate-[pulse_2s_ease_infinite]"></span>
            <span className="text-[0.64rem] tracking-[0.2em] uppercase text-[var(--saffron-w)]">Open Now · Closes 7 PM</span>
            <span className="text-white/25 text-[0.7rem]">·</span>
            <span className="text-[0.64rem] tracking-[0.2em] uppercase text-[var(--saffron-w)]">12A Ilaka St, Ilupeju</span>
          </div>
          <h1 className="font-['Fraunces'] text-[clamp(3rem,7vw,5.5rem)] font-bold text-white leading-[1.02] mb-[0.95rem]">
            Taste of <em className="italic text-[var(--saffron-w)]">Mumbai</em><br/>Heart of Lagos
          </h1>
          <p className="text-[1rem] text-white/60 leading-[1.75] font-light max-w-[510px] mb-[1.8rem]">
            Authentic Maharashtrian street food and home-style Indian cuisine — Misal Pav, Vada Pav, Thalis and more, cooked the way it&apos;s meant to be.
          </p>
          <div className="flex items-center gap-8 flex-wrap mb-[1.8rem]">
            <div className="flex items-center gap-[0.55rem]">
              <span className="text-[var(--turmeric)] text-[0.95rem] tracking-[0.05em]">★★★★★</span>
              <span className="font-['Fraunces'] text-[1.55rem] text-white font-medium leading-none">4.4</span>
              <span className="text-[0.76rem] text-white/40">(320 reviews)</span>
            </div>
            <div className="flex gap-[0.55rem] flex-wrap">
              <span className="text-[0.67rem] tracking-[0.1em] uppercase border border-white/20 text-white/60 px-[0.72rem] py-[0.26rem] rounded-full">Dine-In</span>
              <span className="text-[0.67rem] tracking-[0.1em] uppercase border border-white/20 text-white/60 px-[0.72rem] py-[0.26rem] rounded-full">Takeaway</span>
              <span className="text-[0.67rem] tracking-[0.1em] uppercase border border-white/20 text-white/60 px-[0.72rem] py-[0.26rem] rounded-full">Delivery</span>
            </div>
          </div>
          <div className="flex gap-[0.85rem] flex-wrap">
            <button onClick={() => scrollTo('menu')} className="btn-f">See Full Menu</button>
            <button onClick={onOpenModal} className="btn-g">Reserve a Table</button>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="bg-[var(--saffron)] overflow-hidden py-[0.6rem]">
        <div className="flex gap-10 w-max animate-[mq_26s_linear_infinite]">
          {Array(2).fill([
            "🌶 Misal Pav", "—", "🥔 Vada Pav · ₦1,700", "—", "🍛 Maharashtrian Thali · ₦8,000", "—", 
            "🥭 Mango Mastani", "—", "🥞 Sabudana Vada · ₦3,000", "—", "☕ Masala Chai · ₦1,000", "—", "🫓 Samosa · ₦1,700", "—"
          ]).flat().map((item, i) => (
            <div key={i} className="flex items-center gap-[0.55rem] text-[0.68rem] tracking-[0.18em] uppercase text-white whitespace-nowrap">
              {item === "—" ? <span className="opacity-55 text-[0.85rem]">—</span> : item}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[var(--ink)] border-b border-[rgba(224,123,26,0.1)]">
        <div className="py-[2.4rem] px-[1.4rem] text-center border-r border-[rgba(224,123,26,0.09)] transition-colors hover:bg-[rgba(224,123,26,0.07)]">
          <div className="font-['Fraunces'] text-[2.7rem] font-light text-[var(--saffron)] leading-none mb-[0.25rem]">4.4★</div>
          <div className="text-[0.63rem] tracking-[0.2em] uppercase text-white/40">Google Rating</div>
        </div>
        <div className="py-[2.4rem] px-[1.4rem] text-center border-r border-[rgba(224,123,26,0.09)] transition-colors hover:bg-[rgba(224,123,26,0.07)]">
          <div className="font-['Fraunces'] text-[2.7rem] font-light text-[var(--saffron)] leading-none mb-[0.25rem]">320</div>
          <div className="text-[0.63rem] tracking-[0.2em] uppercase text-white/40">Customer Reviews</div>
        </div>
        <div className="py-[2.4rem] px-[1.4rem] text-center border-r border-[rgba(224,123,26,0.09)] transition-colors hover:bg-[rgba(224,123,26,0.07)]">
          <div className="font-['Fraunces'] text-[2.7rem] font-light text-[var(--saffron)] leading-none mb-[0.25rem]">₦1,200</div>
          <div className="text-[0.63rem] tracking-[0.2em] uppercase text-white/40">Starts From</div>
        </div>
        <div className="py-[2.4rem] px-[1.4rem] text-center transition-colors hover:bg-[rgba(224,123,26,0.07)]">
          <div className="font-['Fraunces'] text-[2.7rem] font-light text-[var(--saffron)] leading-none mb-[0.25rem]">7 PM</div>
          <div className="text-[0.63rem] tracking-[0.2em] uppercase text-white/40">Open Daily Until</div>
        </div>
      </div>
    </section>
  );
}
