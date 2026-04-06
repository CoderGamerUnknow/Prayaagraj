'use client';

import { useState } from 'react';

export default function Menu({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeCat, setActiveCat] = useState('snacks');

  const categories = [
    { id: 'snacks', name: 'Snacks & Starters' },
    { id: 'vada', name: 'Vada Specials' },
    { id: 'misal', name: 'Misal & Usal' },
    { id: 'thali', name: 'Thali' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'drinks', name: 'Drinks & Desserts' }
  ];

  const menuItems: Record<string, { name: string, desc: string, price: string, tag?: string }[]> = {
    snacks: [
      { name: 'Samosa', desc: 'Crispy pastry with spiced potato filling', price: '₦1,000', tag: 'Mini · 1 pc' },
      { name: 'Samosa', desc: 'Classic samosa with tamarind & green chutneys', price: '₦1,700' },
      { name: 'Samosa Pav', desc: 'Samosa served with soft buttered pav buns', price: '₦2,000' },
      { name: 'Samosa Chat', desc: 'Smashed samosa with chole, chutneys, onions & sev', price: '₦3,000' },
      { name: 'Dahi Vada', desc: 'Soft lentil dumplings in seasoned yoghurt, topped with chutneys & spices', price: '₦3,000', tag: 'Popular' },
    ],
    vada: [
      { name: 'Only Vada', desc: 'Just the spiced potato fritter — pure, simple, perfect', price: '₦1,200' },
      { name: 'Vada Pav', desc: 'Classic vada in a soft bun with green & garlic chutneys', price: '₦1,700', tag: 'Most Popular' },
      { name: 'Ulta Vada', desc: 'Reverse style — pav stuffed inside the vada batter', price: '₦2,000' },
      { name: 'Vada Sambhar', desc: 'Vada served with South Indian lentil sambhar soup', price: '₦3,000' },
      { name: 'Sabudana Vada', desc: 'Crispy tapioca & potato vada — popular breakfast item', price: '₦3,000' },
    ],
    misal: [
      { name: 'Matki Misal Pav', desc: 'Sprouted moth beans in spicy tarri gravy with farsan, onion & pav', price: '₦4,500', tag: 'Signature' },
      { name: 'Matki Usal with Pav', desc: 'Sprouted Matki curry — dry preparation served with pav', price: '₦4,000' },
      { name: 'Plain Subji Roti', desc: 'Purely home-made sabzi with fresh rotis — comfort food at its finest', price: '₦3,500' },
      { name: 'Usal Pav', desc: 'Mixed sprout curry with soft pav — lighter preparation', price: '₦3,800' },
    ],
    thali: [
      { name: 'Thali with Sweet', desc: 'Rice, 2 rotis, dal, sabzi, salad, pickle, papad & sweet dessert', price: '₦8,000', tag: 'Complete' },
      { name: 'Premium Thali', desc: 'All the above plus extra sabzi, extra sweet & unlimited roti', price: '₦9,000', tag: 'Best Value' },
      { name: 'Mini Thali', desc: 'Rice, 1 roti, dal & sabzi — the lighter option', price: '₦5,500' },
      { name: 'Pithale Bhakri', desc: 'Bajra bhakri with gram flour curry — rustic village meal', price: '₦4,500' },
    ],
    breakfast: [
      { name: 'Poha', desc: 'Flattened rice with mustard seeds, turmeric, onion, peas & coriander', price: '₦2,500' },
      { name: 'Upma', desc: 'Semolina porridge with curry leaves, mustard & mixed vegetables', price: '₦2,500' },
      { name: 'Idli Sambhar (3 pcs)', desc: 'Steamed rice cakes with lentil soup & coconut chutney', price: '₦3,000' },
      { name: 'Masala Dosa', desc: 'Crisp fermented crepe with spiced potato filling & chutneys', price: '₦4,000' },
      { name: 'Chai + Vada Pav Combo', desc: 'Morning duo — masala chai & classic vada pav together', price: '₦2,500', tag: 'Deal' },
    ],
    drinks: [
      { name: 'Masala Chai', desc: 'Spiced milk tea with ginger, cardamom & cloves', price: '₦1,000', tag: 'Fav' },
      { name: 'Mango Mastani', desc: 'Thick Pune-style mango shake with ice cream & dry fruits', price: '₦3,500' },
      { name: 'Lassi · Sweet / Salted', desc: 'Chilled yoghurt drink — your choice of flavour', price: '₦2,000' },
      { name: 'Sol Kadhi', desc: 'Coconut milk & kokum refresher — a Maharashtra original', price: '₦2,000' },
      { name: 'Gulab Jamun (3 pcs)', desc: 'Soft milk dumplings in rose-scented sugar syrup', price: '₦2,500' },
    ]
  };

  return (
    <section id="menu" className="pt-[68px]">
      <div className="relative h-[clamp(260px,38vh,400px)] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1600&q=80&auto=format')] bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,13,4,0.95)] via-[rgba(26,13,4,0.95)] to-[rgba(26,13,4,0.38)]"></div>
        <div className="relative z-10 p-[clamp(2rem,5vw,4rem)]">
          <h1 className="font-['Fraunces'] text-[clamp(2.3rem,5vw,4rem)] text-white font-semibold leading-none mb-[0.35rem]">Our Menu</h1>
          <p className="text-[0.7rem] tracking-[0.27em] uppercase text-[var(--saffron)]">Authentic Maharashtrian Cuisine · Ilupeju, Lagos</p>
        </div>
      </div>

      <div className="sticky top-[68px] z-50 flex border-b-2 border-[var(--smoke)] px-[clamp(1.2rem,5vw,4rem)] bg-[var(--cream)] overflow-x-auto gap-0 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-6 py-4 text-[0.72rem] tracking-[0.15em] uppercase border-b-2 -mb-[2px] whitespace-nowrap font-medium transition-all duration-200 ${
              activeCat === cat.id ? 'text-[var(--saffron)] border-[var(--saffron)]' : 'text-[var(--muted)] border-transparent hover:text-[var(--ink)]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="py-[3.5rem] px-[clamp(1.2rem,5vw,4rem)] pb-[5rem]">
        <div className="mb-[2.3rem]">
          <h2 className="font-['Fraunces'] text-[2rem] text-[var(--ink)] italic font-medium mb-[0.25rem]">
            {categories.find(c => c.id === activeCat)?.name}
          </h2>
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--saffron)]">Freshly prepared daily</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {menuItems[activeCat].map((item, idx) => (
            <div key={idx} className={`flex justify-between items-start gap-[1.4rem] py-[1.4rem] border-b border-[var(--smoke)] transition-all duration-200 hover:bg-[rgba(224,123,26,0.04)] hover:pl-[0.55rem] md:odd:pr-[2.8rem] md:even:pl-[2.4rem] md:even:border-l md:even:border-[var(--smoke)] md:even:hover:pl-[3rem]`}>
              <div className="flex-1">
                <div className="font-['Fraunces'] text-[1.08rem] text-[var(--ink)] font-medium mb-[0.28rem]">
                  {item.name}
                  {item.tag && (
                    <span className="inline-block text-[0.57rem] tracking-[0.08em] uppercase px-[0.48rem] py-[0.18rem] bg-[var(--saffron-pale)] text-[var(--ember)] border border-[rgba(192,57,15,0.2)] rounded-full ml-[0.35rem] align-middle">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="text-[0.79rem] text-[var(--muted)] leading-[1.55] font-light">{item.desc}</div>
              </div>
              <div className="font-['Fraunces'] text-[1.08rem] text-[var(--saffron)] font-semibold whitespace-nowrap">{item.price}</div>
            </div>
          ))}
        </div>

        <div className="text-center p-[1.8rem] mt-[2rem] bg-[var(--saffron-pale)] rounded-lg text-[0.84rem] text-[var(--muted)]">
          💰 Average spend: <strong>₦10,000 – ₦20,000 per person</strong> · Mostly vegetarian kitchen · All prices per portion<br/>
          <span className="text-[0.8rem] mt-[0.3rem] block">
            Live digital menu: <a href="https://digitalmenu.applova.io/webstore/BIZ_14pc535qd2b/menu" target="_blank" rel="noreferrer" className="text-[var(--saffron)]">digitalmenu.applova.io →</a>
          </span>
        </div>
      </div>

      <div className="text-center py-4 pb-16">
        <button className="btn-f" onClick={onOpenModal}>Reserve Your Table</button>
      </div>
    </section>
  );
}
