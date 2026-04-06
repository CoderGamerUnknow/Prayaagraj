export default function Reviews() {
  return (
    <section id="reviews" className="pt-[68px]">
      <div className="bg-[var(--ink)] p-[clamp(4rem,7vw,6rem)_clamp(1.2rem,5vw,4rem)] grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="eyebrow">What Customers Say</span>
          <h1 className="font-['Fraunces'] text-[clamp(2rem,4vw,3.2rem)] text-white font-medium mb-[0.7rem] leading-[1.1]">
            Real Reviews,<br/><em className="italic text-[var(--saffron)]">Real Flavours</em>
          </h1>
          <p className="text-[0.88rem] text-white/40 leading-[1.75] font-light mb-[1.4rem]">
            Over 320 Google reviews averaging 4.4 stars — and growing every single day.
          </p>
          <div className="flex items-end gap-[0.9rem] mb-[0.9rem]">
            <div className="font-['Fraunces'] text-[5.5rem] text-[var(--saffron)] font-light leading-none">4.4</div>
            <div>
              <div className="text-[1.2rem] text-[var(--turmeric)] mb-[0.25rem]">★★★★★</div>
              <div className="text-[0.76rem] text-white/30 tracking-[0.08em]">320 reviews on Google Maps</div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.5rem] max-w-[250px]">
            {[
              { n: 5, w: '65%' },
              { n: 4, w: '22%' },
              { n: 3, w: '8%' },
              { n: 2, w: '3%' },
              { n: 1, w: '2%' }
            ].map((bar) => (
              <div key={bar.n} className="flex items-center gap-[0.85rem]">
                <span className="text-[0.7rem] text-white/30 w-[10px] text-right">{bar.n}</span>
                <div className="flex-1 h-[4px] bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--saffron)] rounded-full" style={{ width: bar.w }}></div>
                </div>
                <span className="text-[0.66rem] text-white/30">{bar.w}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          <div className="flex-1 min-w-[120px] bg-[rgba(224,123,26,0.09)] border border-[rgba(224,123,26,0.18)] rounded-lg p-[1.3rem_1.5rem]">
            <div className="font-['Fraunces'] text-[1.9rem] text-[var(--saffron)] font-light">17</div>
            <div className="text-[0.64rem] tracking-[0.15em] uppercase text-white/40">Reviews mention Vada Pav</div>
          </div>
          <div className="flex-1 min-w-[120px] bg-[rgba(224,123,26,0.09)] border border-[rgba(224,123,26,0.18)] rounded-lg p-[1.3rem_1.5rem]">
            <div className="font-['Fraunces'] text-[1.9rem] text-[var(--saffron)] font-light">13</div>
            <div className="text-[0.64rem] tracking-[0.15em] uppercase text-white/40">Mention Maharashtrian food</div>
          </div>
          <div className="flex-1 min-w-[120px] bg-[rgba(224,123,26,0.09)] border border-[rgba(224,123,26,0.18)] rounded-lg p-[1.3rem_1.5rem]">
            <div className="font-['Fraunces'] text-[1.9rem] text-[var(--saffron)] font-light">9</div>
            <div className="text-[0.64rem] tracking-[0.15em] uppercase text-white/40">Specifically praise Misal Pav</div>
          </div>
          <div className="flex-1 min-w-[120px] bg-[rgba(224,123,26,0.09)] border border-[rgba(224,123,26,0.18)] rounded-lg p-[1.3rem_1.5rem]">
            <div className="font-['Fraunces'] text-[1.9rem] text-[var(--saffron)] font-light">10</div>
            <div className="text-[0.64rem] tracking-[0.15em] uppercase text-white/40">Mention great value for money</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5px] bg-[var(--smoke)] mx-[clamp(1.2rem,5vw,4rem)] mt-10 rounded-lg overflow-hidden">
        {[
          { text: "After a past disappointment, this thali truly turned the tables. Perfectly cooked rice, soft rotis, flavourful curries, and comforting dal — every element balanced and satisfying. Bella full and absolutely yummy!", name: "Ranjith Pillai", meta: "Local Guide · 19 reviews · 1 month ago", initial: "R", bg: "from-[var(--saffron)] to-[var(--ember)]" },
          { text: "Perfect place for Tea, coffee and chat. The vada pav is spot on — crispy outside, soft inside, just like back home. The staff remembered my regular order. That kind of warmth keeps me coming back.", name: "Adaeze Okonkwo", meta: "Lagos Island · 5 months ago", initial: "A", bg: "from-[var(--turmeric)] to-[#8a6208]" },
          { text: "The Misal Pav has that authentic Pune-style heat I've been missing in Lagos. Generous portions, very fair pricing — you won't leave hungry. The Mango Mastani is a non-negotiable order.", name: "Kemi Adeyemi", meta: "Ilupeju, Lagos · 2 months ago", initial: "K", bg: "from-[var(--ember)] to-[#6a0808]", stars: "★★★★☆" },
          { text: "I'm Indian, so my bar is high. Cafe Potoba cleared it easily. The masala chai, the misal, the whole vibe — it transported me. Lagos finally has a spot that genuinely feels like home.", name: "Priya Sharma", meta: "Lekki, Lagos · 4 months ago", initial: "P", bg: "from-[#1a6b8a] to-[#0a3a5a]" },
          { text: "Found this gem while working nearby. The lunch thali is incredible value — you leave absolutely stuffed. From the dal to the bhakri to the little pickle bowl, everything is thoughtfully done.", name: "Tunde Fashola", meta: "Maryland, Lagos · 3 weeks ago", initial: "T", bg: "from-[#2c7a3a] to-[#1a4a20]" },
          { text: "Great portions, friendly staff who recommend what's fresh that day. The sabudana vada and sol kadhi were both excellent. A real neighbourhood gem right in the heart of Ilupeju.", name: "Shaikh Ahmed", meta: "Local Guide · 24 reviews · 5 months ago", initial: "S", bg: "from-[#6a2c8a] to-[#3a1050]", stars: "★★★★☆" }
        ].map((review, i) => (
          <div key={i} className="bg-[var(--cream)] p-[2.1rem] transition-colors hover:bg-white">
            <div className="text-[var(--turmeric)] text-[0.83rem] tracking-[0.05em] mb-[0.85rem]">{review.stars || "★★★★★"}</div>
            <div className="font-['Fraunces'] text-[1.02rem] text-[var(--ink)] leading-[1.7] italic mb-[1.2rem] font-normal">&quot;{review.text}&quot;</div>
            <div className="flex items-center gap-[0.7rem]">
              <div className={`w-[38px] h-[38px] rounded-full flex items-center justify-center font-['Fraunces'] text-[0.95rem] text-white font-semibold shrink-0 bg-gradient-to-br ${review.bg}`}>
                {review.initial}
              </div>
              <div>
                <div className="text-[0.82rem] font-semibold text-[var(--ink)]">{review.name}</div>
                <div className="text-[0.7rem] text-[var(--muted)]">{review.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center p-[3.5rem_clamp(1.2rem,5vw,4rem)]">
        <p className="text-[var(--muted)] mb-[1.4rem] text-[0.87rem]">Enjoyed your meal? A quick Google review helps us a lot.</p>
        <a href="https://maps.google.com/search?q=Cafe+Potoba+Ilupeju+Lagos" target="_blank" rel="noreferrer" className="btn-f">Write a Google Review</a>
      </div>
    </section>
  );
}
