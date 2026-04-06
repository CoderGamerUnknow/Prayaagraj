'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import Chatbot from '@/components/Chatbot';
import { db, handleFirestoreError, OperationType } from '@/firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const [activeMenuCat, setActiveMenuCat] = useState('snacks');
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'menu'), (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Failed to fetch menu:", error);
    });
    return () => unsubscribe();
  }, []);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>, btn: HTMLButtonElement) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, 'messages'), {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        createdAt: new Date()
      });
      
      btn.textContent = '✓ Sent! We\'ll be in touch.';
      btn.style.background = '#2c7a3a';
      btn.style.boxShadow = 'none';
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    }
  };

  const handleHoneypot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'security_logs'), {
        action: 'Honeypot Triggered',
        details: 'Bot attempted to login via hidden admin form',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
      alert('Access Denied: Activity Logged');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} />

      {/* HOME PAGE */}
      <section id="home" className={`page ${activePage === 'home' ? 'active' : ''}`}>
        <div className="hero">
          <div className="hi"></div>
          <div className="hg"></div>
          <div className="hc">
            <div className="hbadge">
              <span className="dot"></span>
              <span>Open Now · Closes 7 PM</span>
              <span style={{color: 'rgba(255,255,255,.25)', fontSize: '.7rem'}}>·</span>
              <span>12A Ilaka St, Ilupeju</span>
            </div>
            <h1>Taste of <em>Mumbai</em><br/>Heart of Lagos</h1>
            <p className="htag">Authentic Maharashtrian street food and home-style Indian cuisine — Misal Pav, Vada Pav, Thalis and more, cooked the way it&apos;s meant to be.</p>
            <div className="hrow">
              <div className="hrat">
                <span className="hstars">★★★★★</span>
                <span className="hscore">4.4</span>
                <span className="hcount">(320 reviews)</span>
              </div>
              <div className="hpills">
                <span className="pill">Dine-In</span>
                <span className="pill">Takeaway</span>
                <span className="pill">Delivery</span>
              </div>
            </div>
            <div className="hctas">
              <button className="btn-f" onClick={() => handleNavigate('menu')}>See Full Menu</button>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="mq"><div className="mq-t">
          <div className="mq-i"><span>🌶</span>Misal Pav</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🥔</span>Vada Pav · ₦1,700</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🍛</span>Maharashtrian Thali · ₦8,000</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🥭</span>Mango Mastani</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🥞</span>Sabudana Vada · ₦3,000</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>☕</span>Masala Chai · ₦1,000</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🫓</span>Samosa · ₦1,700</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🌶</span>Misal Pav</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🥔</span>Vada Pav · ₦1,700</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🍛</span>Maharashtrian Thali · ₦8,000</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🥭</span>Mango Mastani</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🥞</span>Sabudana Vada · ₦3,000</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>☕</span>Masala Chai · ₦1,000</div><div className="mq-i"><span>—</span></div>
          <div className="mq-i"><span>🫓</span>Samosa · ₦1,700</div><div className="mq-i"><span>—</span></div>
        </div></div>

        {/* STATS */}
        <div className="stats">
          <div className="stat"><div className="stn">4.4★</div><div className="stl">Google Rating</div></div>
          <div className="stat"><div className="stn">320</div><div className="stl">Customer Reviews</div></div>
          <div className="stat"><div className="stn">₦1,200</div><div className="stl">Starts From</div></div>
          <div className="stat"><div className="stn">7 PM</div><div className="stl">Open Daily Until</div></div>
        </div>

        {/* FEATURED DISHES */}
        <div className="sec-c">
          <span className="eyebrow">Must Try</span>
          <h2 className="stitle">What We&apos;re <em>Famous For</em></h2>
          <p className="ssub">Real Maharashtrian flavours, cooked fresh every day — dishes that&apos;ll take you straight to the streets of Mumbai.</p>
          <div className="bar"></div>
        </div>
        <div className="dsec">
          <div className="dgrid">
            <div className="dish">
              <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=85&auto=format" alt="Misal Pav" loading="lazy"/>
              <div className="dov">
                <span className="dlabel pop">Most Popular</span>
                <div className="dname">Misal Pav</div>
                <div className="ddesc">Spicy sprouted Matki curry with crispy farsan, pav & extra tarri gravy on the side</div>
                <div className="dprice">from ₦4,500</div>
              </div>
            </div>
            <div className="dish">
              <img src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80&auto=format" alt="Vada Pav" loading="lazy"/>
              <div className="dov">
                <span className="dlabel">Street Classic</span>
                <div className="dname">Vada Pav</div>
                <div className="ddesc">Mumbai&apos;s iconic spiced potato fritter in a soft bun with chutneys</div>
                <div className="dprice">₦1,700</div>
              </div>
            </div>
            <div className="dish">
              <img src="https://images.unsplash.com/photo-1626132647523-66c6f776c030?w=600&q=80&auto=format" alt="Maharashtrian Thali" loading="lazy"/>
              <div className="dov">
                <span className="dlabel new">Chef&apos;s Pick</span>
                <div className="dname">Thali</div>
                <div className="ddesc">Rice, roti, dal, sabzi, pickle & sweet — the complete Maharashtrian meal</div>
                <div className="dprice">from ₦8,000</div>
              </div>
            </div>
            <div className="dish">
              <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&q=80&auto=format" alt="Masala Chai" loading="lazy"/>
              <div className="dov">
                <span className="dlabel">Crowd Fav</span>
                <div className="dname">Masala Chai</div>
                <div className="ddesc">Spiced milk tea — ginger, cardamom & cloves brewed the right way</div>
                <div className="dprice">₦1,000</div>
              </div>
            </div>
            <div className="dish">
              <img src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80&auto=format" alt="Samosa" loading="lazy"/>
              <div className="dov">
                <span className="dlabel">Snack</span>
                <div className="dname">Samosa Chat</div>
                <div className="ddesc">Smashed samosa with chole, yoghurt, tamarind chutney & sev</div>
                <div className="dprice">₦3,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT STRIP */}
        <div className="astrip">
          <div className="aimg">
            <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=85&auto=format" alt="Indian food spread" loading="lazy"/>
          </div>
          <div className="acopy">
            <span className="eyebrow">Our Story</span>
            <h2>A Slice of <em>India</em> in Ilupeju</h2>
            <p>Cafe Potoba brings the warmth and authenticity of Maharashtrian home cooking to Lagos. Every recipe is rooted in the culinary tradition of Maharashtra — the food of Dadar, Shivaji Park and the gullies of Mumbai.</p>
            <p>From dawn chai to evening thalis, we cook from scratch, every single day. Our spice blends are our own. Our recipes are real. Our portions? Generous, just like home.</p>
            <button className="btn-f" onClick={() => handleNavigate('about')} style={{alignSelf:'flex-start',marginTop:'.4rem'}}>Our Full Story</button>
          </div>
        </div>

        <Gallery />

        {/* CTA BAND */}
        <div className="ctaband">
          <div>
            <h2>Come hungry,<br/><em>leave happy.</em></h2>
            <p>Open daily · 12A Ilaka St, Ilupeju · Closes 7 PM</p>
          </div>
          <div className="ctaband-a">
            <a href="tel:07052463368" className="btn-g" style={{borderColor:'rgba(255,255,255,.45)'}}>📞 0705 246 3368</a>
          </div>
        </div>
      </section>

      {/* MENU PAGE */}
      <section id="menu" className={`page ${activePage === 'menu' ? 'active' : ''}`}>
        <div className="mhero">
          <div className="mhero-img"></div>
          <div className="mhero-g"></div>
          <div className="mhero-t">
            <h1>Our Menu</h1>
            <p>Authentic Maharashtrian Cuisine · Ilupeju, Lagos</p>
          </div>
        </div>
        <div className="mnav">
          <button className={`mtab ${activeMenuCat === 'snacks' ? 'active' : ''}`} onClick={() => setActiveMenuCat('snacks')}>Snacks & Starters</button>
          <button className={`mtab ${activeMenuCat === 'vada' ? 'active' : ''}`} onClick={() => setActiveMenuCat('vada')}>Vada Specials</button>
          <button className={`mtab ${activeMenuCat === 'misal' ? 'active' : ''}`} onClick={() => setActiveMenuCat('misal')}>Misal & Usal</button>
          <button className={`mtab ${activeMenuCat === 'thali' ? 'active' : ''}`} onClick={() => setActiveMenuCat('thali')}>Thali</button>
          <button className={`mtab ${activeMenuCat === 'breakfast' ? 'active' : ''}`} onClick={() => setActiveMenuCat('breakfast')}>Breakfast</button>
          <button className={`mtab ${activeMenuCat === 'drinks' ? 'active' : ''}`} onClick={() => setActiveMenuCat('drinks')}>Drinks & Desserts</button>
        </div>
        <div className="mbody">
          {/* Menu Categories */}
          <div className={`mcat ${activeMenuCat === 'snacks' ? 'active' : ''}`}>
            <div className="mhead"><h2>Snacks & Starters</h2><p>Crispy, spiced, made fresh daily</p></div>
            <div className="ig">
              {menuItems.filter(i => i.category?.toLowerCase().includes('snack') || i.category?.toLowerCase().includes('starter')).length > 0 ? (
                menuItems.filter(i => i.category?.toLowerCase().includes('snack') || i.category?.toLowerCase().includes('starter')).map(item => (
                  <div key={item.id} className="item"><div className="ib"><div className="iname">{item.name}</div><div className="idesc">{item.description}</div></div><div className="iprice">{item.price}</div></div>
                ))
              ) : (
                <>
                  <div className="item"><div className="ib"><div className="iname">Samosa <span className="itag">Mini · 1 pc</span></div><div className="idesc">Crispy pastry with spiced potato filling</div></div><div className="iprice">₦1,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Samosa</div><div className="idesc">Classic samosa with tamarind & green chutneys</div></div><div className="iprice">₦1,700</div></div>
                  <div className="item"><div className="ib"><div className="iname">Samosa Pav</div><div className="idesc">Samosa served with soft buttered pav buns</div></div><div className="iprice">₦2,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Samosa Chat</div><div className="idesc">Smashed samosa with chole, chutneys, onions & sev</div></div><div className="iprice">₦3,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Chole Samosa Chat</div><div className="idesc">Loaded chaat with extra chole gravy, yoghurt & chutneys</div></div><div className="iprice">₦4,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Onion Pakoda</div><div className="idesc">Crispy onion fritters in spiced chickpea batter</div></div><div className="iprice">₦2,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Chilli Pakoda</div><div className="idesc">Whole green chillies battered and deep-fried — for the bold</div></div><div className="iprice">₦2,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Mix Pakoda</div><div className="idesc">Assorted vegetable fritter platter with chutneys</div></div><div className="iprice">₦3,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Paneer Pakoda</div><div className="idesc">Cottage cheese in spiced batter, golden-fried</div></div><div className="iprice">₦4,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Dahi Vada <span className="itag">Popular</span></div><div className="idesc">Soft lentil dumplings in seasoned yoghurt, topped with chutneys & spices</div></div><div className="iprice">₦3,000</div></div>
                </>
              )}
            </div>
          </div>

          <div className={`mcat ${activeMenuCat === 'vada' ? 'active' : ''}`}>
            <div className="mhead"><h2>Vada Specials</h2><p>Mumbai&apos;s iconic bites — mastered in Ilupeju</p></div>
            <div className="ig">
              {menuItems.filter(i => i.category?.toLowerCase().includes('vada')).length > 0 ? (
                menuItems.filter(i => i.category?.toLowerCase().includes('vada')).map(item => (
                  <div key={item.id} className="item"><div className="ib"><div className="iname">{item.name}</div><div className="idesc">{item.description}</div></div><div className="iprice">{item.price}</div></div>
                ))
              ) : (
                <>
                  <div className="item"><div className="ib"><div className="iname">Only Vada</div><div className="idesc">Just the spiced potato fritter — pure, simple, perfect</div></div><div className="iprice">₦1,200</div></div>
                  <div className="item"><div className="ib"><div className="iname">Vada Pav <span className="itag">Most Popular</span></div><div className="idesc">Classic vada in a soft bun with green & garlic chutneys</div></div><div className="iprice">₦1,700</div></div>
                  <div className="item"><div className="ib"><div className="iname">Ulta Vada</div><div className="idesc">Reverse style — pav stuffed inside the vada batter</div></div><div className="iprice">₦2,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Vada Sambhar</div><div className="idesc">Vada served with South Indian lentil sambhar soup</div></div><div className="iprice">₦3,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Kat Vada</div><div className="idesc">Vada dunked in tangy kat gravy — a Kolhapur-style speciality</div></div><div className="iprice">₦4,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Sabudana Vada</div><div className="idesc">Crispy tapioca & potato vada — popular breakfast item</div></div><div className="iprice">₦3,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Sabudana Khichdi</div><div className="idesc">Tapioca pearls tempered with peanuts, cumin & green chilli</div></div><div className="iprice">₦3,500</div></div>
                </>
              )}
            </div>
          </div>

          <div className={`mcat ${activeMenuCat === 'misal' ? 'active' : ''}`}>
            <div className="mhead"><h2>Misal & Usal</h2><p>Maharashtra&apos;s most beloved dishes — fiery, hearty, satisfying</p></div>
            <div className="ig">
              {menuItems.filter(i => i.category?.toLowerCase().includes('misal') || i.category?.toLowerCase().includes('usal')).length > 0 ? (
                menuItems.filter(i => i.category?.toLowerCase().includes('misal') || i.category?.toLowerCase().includes('usal')).map(item => (
                  <div key={item.id} className="item"><div className="ib"><div className="iname">{item.name}</div><div className="idesc">{item.description}</div></div><div className="iprice">{item.price}</div></div>
                ))
              ) : (
                <>
                  <div className="item"><div className="ib"><div className="iname">Matki Misal Pav <span className="itag">Signature</span></div><div className="idesc">Sprouted moth beans in spicy tarri gravy with farsan, onion & pav</div></div><div className="iprice">₦4,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Matki Usal with Pav</div><div className="idesc">Sprouted Matki curry — dry preparation served with pav</div></div><div className="iprice">₦4,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Plain Subji Roti</div><div className="idesc">Purely home-made sabzi with fresh rotis — comfort food at its finest</div></div><div className="iprice">₦3,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Usal Pav</div><div className="idesc">Mixed sprout curry with soft pav — lighter preparation</div></div><div className="iprice">₦3,800</div></div>
                </>
              )}
            </div>
          </div>

          <div className={`mcat ${activeMenuCat === 'thali' ? 'active' : ''}`}>
            <div className="mhead"><h2>Thali Specials</h2><p>A complete Maharashtrian meal on one plate</p></div>
            <div className="ig">
              {menuItems.filter(i => i.category?.toLowerCase().includes('thali')).length > 0 ? (
                menuItems.filter(i => i.category?.toLowerCase().includes('thali')).map(item => (
                  <div key={item.id} className="item"><div className="ib"><div className="iname">{item.name}</div><div className="idesc">{item.description}</div></div><div className="iprice">{item.price}</div></div>
                ))
              ) : (
                <>
                  <div className="item"><div className="ib"><div className="iname">Thali with Sweet <span className="itag">Complete</span></div><div className="idesc">Rice, 2 rotis, dal, sabzi, salad, pickle, papad & sweet dessert</div></div><div className="iprice">₦8,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Premium Thali <span className="itag">Best Value</span></div><div className="idesc">All the above plus extra sabzi, extra sweet & unlimited roti</div></div><div className="iprice">₦9,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Mini Thali</div><div className="idesc">Rice, 1 roti, dal & sabzi — the lighter option</div></div><div className="iprice">₦5,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Shrikhand Puri Thali</div><div className="idesc">Puffed pooris with creamy saffron shrikhand — festive favourite</div></div><div className="iprice">₦7,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Pithale Bhakri</div><div className="idesc">Bajra bhakri with gram flour curry — rustic village meal</div></div><div className="iprice">₦4,500</div></div>
                </>
              )}
            </div>
          </div>

          <div className={`mcat ${activeMenuCat === 'breakfast' ? 'active' : ''}`}>
            <div className="mhead"><h2>Breakfast</h2><p>Start your morning the Maharashtrian way</p></div>
            <div className="ig">
              {menuItems.filter(i => i.category?.toLowerCase().includes('breakfast')).length > 0 ? (
                menuItems.filter(i => i.category?.toLowerCase().includes('breakfast')).map(item => (
                  <div key={item.id} className="item"><div className="ib"><div className="iname">{item.name}</div><div className="idesc">{item.description}</div></div><div className="iprice">{item.price}</div></div>
                ))
              ) : (
                <>
                  <div className="item"><div className="ib"><div className="iname">Poha</div><div className="idesc">Flattened rice with mustard seeds, turmeric, onion, peas & coriander</div></div><div className="iprice">₦2,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Upma</div><div className="idesc">Semolina porridge with curry leaves, mustard & mixed vegetables</div></div><div className="iprice">₦2,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Idli Sambhar (3 pcs)</div><div className="idesc">Steamed rice cakes with lentil soup & coconut chutney</div></div><div className="iprice">₦3,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Masala Dosa</div><div className="idesc">Crisp fermented crepe with spiced potato filling & chutneys</div></div><div className="iprice">₦4,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Thalipeeth</div><div className="idesc">Multi-grain savoury flatbread — a true Maharashtrian staple</div></div><div className="iprice">₦3,200</div></div>
                  <div className="item"><div className="ib"><div className="iname">Methi Thepla</div><div className="idesc">Soft fenugreek flatbreads with fresh curd & pickle</div></div><div className="iprice">₦2,800</div></div>
                  <div className="item"><div className="ib"><div className="iname">Sabudana Khichdi</div><div className="idesc">Tapioca with peanuts & cumin — popular breakfast or fasting meal</div></div><div className="iprice">₦3,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Chai + Vada Pav Combo <span className="itag">Deal</span></div><div className="idesc">Morning duo — masala chai & classic vada pav together</div></div><div className="iprice">₦2,500</div></div>
                </>
              )}
            </div>
          </div>

          <div className={`mcat ${activeMenuCat === 'drinks' ? 'active' : ''}`}>
            <div className="mhead"><h2>Drinks & Desserts</h2><p>Cool sips and sweet endings</p></div>
            <div className="ig">
              {menuItems.filter(i => i.category?.toLowerCase().includes('drink') || i.category?.toLowerCase().includes('dessert')).length > 0 ? (
                menuItems.filter(i => i.category?.toLowerCase().includes('drink') || i.category?.toLowerCase().includes('dessert')).map(item => (
                  <div key={item.id} className="item"><div className="ib"><div className="iname">{item.name}</div><div className="idesc">{item.description}</div></div><div className="iprice">{item.price}</div></div>
                ))
              ) : (
                <>
                  <div className="item"><div className="ib"><div className="iname">Masala Chai <span className="itag">Fav</span></div><div className="idesc">Spiced milk tea with ginger, cardamom & cloves</div></div><div className="iprice">₦1,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Mango Mastani</div><div className="idesc">Thick Pune-style mango shake with ice cream & dry fruits</div></div><div className="iprice">₦3,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Lassi · Sweet / Salted</div><div className="idesc">Chilled yoghurt drink — your choice of flavour</div></div><div className="iprice">₦2,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Sol Kadhi</div><div className="idesc">Coconut milk & kokum refresher — a Maharashtra original</div></div><div className="iprice">₦2,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Shrikhand</div><div className="idesc">Strained yoghurt with sugar, saffron & cardamom</div></div><div className="iprice">₦2,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Gulab Jamun (3 pcs)</div><div className="idesc">Soft milk dumplings in rose-scented sugar syrup</div></div><div className="iprice">₦2,500</div></div>
                  <div className="item"><div className="ib"><div className="iname">Puran Poli</div><div className="idesc">Sweet stuffed flatbread with chana dal & jaggery filling</div></div><div className="iprice">₦2,000</div></div>
                  <div className="item"><div className="ib"><div className="iname">Fresh Lime Soda</div><div className="idesc">Sparkling lime water — sweet, salted or masala</div></div><div className="iprice">₦1,200</div></div>
                </>
              )}
            </div>
          </div>

          <div className="mnote">
            💰 Average spend: <strong>₦10,000 – ₦20,000 per person</strong> · Mostly vegetarian kitchen · All prices per portion<br/>
            <span style={{fontSize:'.8rem',marginTop:'.3rem',display:'block'}}>Live digital menu: <a href="https://digitalmenu.applova.io/webstore/BIZ_14pc535qd2b/menu" target="_blank" style={{color:'var(--saffron)'}}>digitalmenu.applova.io →</a></span>
          </div>
        </div>
        <div style={{textAlign:'center',padding:'1rem 0 4rem'}}>
        </div>
      </section>

      {/* ABOUT PAGE */}
      <section id="about" className={`page ${activePage === 'about' ? 'active' : ''}`}>
        <div className="ahero">
          <div className="ahero-img"></div>
          <div className="ahero-g"></div>
          <div className="ahero-c">
            <span className="eyebrow" style={{color:'var(--saffron-w)'}}>Our Story</span>
            <h1>Where <em>Maharashtra</em><br/>Meets Lagos</h1>
            <p>A kitchen built on tradition, spice, and the honest belief that great food changes how a day feels.</p>
          </div>
        </div>
        <div className="astory">
          <div className="simg">
            <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=700&q=85&auto=format" alt="Indian cooking" loading="lazy"/>
          </div>
          <div className="stxt">
            <span className="eyebrow">The Potoba Name</span>
            <h2>Rooted in Maharashtrian Culinary Tradition</h2>
            <p>The name Potoba comes from a beloved Maharashtrian institution — a style of restaurant that honours the simple, deeply flavourful food of Maharashtra. Our Ilupeju outpost carries that same spirit to Lagos.</p>
            <p>Cafe Potoba was founded to serve the Indian community in Lagos and introduce Lagosians to the world of Maharashtrian street food: fiery Misal Pav, satisfying Thalis, crispy Vada Pav, and comforting Sabudana dishes.</p>
            <p>We cook everything from scratch — fresh every morning. Our spice blends are our own. Our portions are generous, just like home. Pull up a chair.</p>
            <button className="btn-d" onClick={() => handleNavigate('menu')} style={{marginTop:'.5rem'}}>Explore Our Menu</button>
          </div>
        </div>
        <div className="pillars">
          <div className="pillar"><div className="pico">🌿</div><h3>Fresh & Scratch</h3><p>Every dish cooked fresh from scratch daily. No frozen shortcuts, no compromises on quality.</p></div>
          <div className="pillar"><div className="pico">🌶</div><h3>Authentic Recipes</h3><p>Maharashtrian recipes that honour the food of Dadar, Pune and the lanes of old Mumbai.</p></div>
          <div className="pillar"><div className="pico">🤝</div><h3>Warm Hospitality</h3><p>Our staff are known for genuine warmth. Customers say it feels like being fed by family.</p></div>
          <div className="pillar"><div className="pico">💰</div><h3>Fair Prices</h3><p>From ₦1,200 snacks to ₦9,000 full thalis — real food at honest, accessible prices.</p></div>
        </div>
        <div className="aloc">
          <div className="al-l">
            <h2>Find Us in <em>Ilupeju</em></h2>
            <p>We&apos;re at 12A Ilaka Street, Ilupeju — open every day from morning until 7 PM. Walk-ins always welcome. We also do takeaway and delivery.</p>
            <div className="al-rows">
              <div className="al-row"><div className="al-ico">📍</div><div><div className="al-lbl">Address</div><div className="al-val">12A Ilaka Street, Ilupeju<br/>Lagos 102215, Nigeria</div></div></div>
              <div className="al-row"><div className="al-ico">📞</div><div><div className="al-lbl">Phone</div><div className="al-val"><a href="tel:07052463368" style={{color:'inherit'}}>0705 246 3368</a></div></div></div>
              <div className="al-row"><div className="al-ico">🕐</div><div><div className="al-lbl">Hours</div><div className="al-val">Open Daily · Closes 7 PM</div></div></div>
            </div>
            <div style={{display:'flex',gap:'.9rem',marginTop:'2rem',flexWrap:'wrap'}}>
              <a href="https://maps.google.com/?q=12A+Ilaka+Street+Ilupeju+Lagos" target="_blank" className="btn-f">Get Directions</a>
              <a href="tel:07052463368" className="btn-g" style={{borderColor:'rgba(255,255,255,.28)'}}>Call Now</a>
            </div>
          </div>
          <div className="al-r">
            <div className="albox"><div className="alboxn">4.4★</div><div className="alboxl">Google Rating</div></div>
            <div className="albox"><div className="alboxn">320+</div><div className="alboxl">Reviews</div></div>
            <div className="albox"><div className="alboxn">7 PM</div><div className="alboxl">Open Until</div></div>
            <div className="albox"><div className="alboxn">₦1.2k</div><div className="alboxl">Starts From</div></div>
          </div>
        </div>
      </section>

      {/* REVIEWS PAGE */}
      <section id="reviews" className={`page ${activePage === 'reviews' ? 'active' : ''}`}>
        <div className="rhero">
          <div className="rh-l">
            <span className="eyebrow">What Customers Say</span>
            <h1>Real Reviews,<br/><em>Real Flavours</em></h1>
            <p>Over 320 Google reviews averaging 4.4 stars — and growing every single day.</p>
            <div className="rsc">
              <div className="bnum">4.4</div>
              <div><div className="rstars">★★★★★</div><div className="rtotal">320 reviews on Google Maps</div></div>
            </div>
            <div className="bars">
              <div className="br"><span className="bn">5</span><div className="bt"><div className="bf" style={{width:'65%'}}></div></div><span style={{fontSize:'.66rem',color:'rgba(255,255,255,.28)'}}>65%</span></div>
              <div className="br"><span className="bn">4</span><div className="bt"><div className="bf" style={{width:'22%'}}></div></div><span style={{fontSize:'.66rem',color:'rgba(255,255,255,.28)'}}>22%</span></div>
              <div className="br"><span className="bn">3</span><div className="bt"><div className="bf" style={{width:'8%'}}></div></div><span style={{fontSize:'.66rem',color:'rgba(255,255,255,.28)'}}>8%</span></div>
              <div className="br"><span className="bn">2</span><div className="bt"><div className="bf" style={{width:'3%'}}></div></div><span style={{fontSize:'.66rem',color:'rgba(255,255,255,.28)'}}>3%</span></div>
              <div className="br"><span className="bn">1</span><div className="bt"><div className="bf" style={{width:'2%'}}></div></div><span style={{fontSize:'.66rem',color:'rgba(255,255,255,.28)'}}>2%</span></div>
            </div>
          </div>
          <div className="rh-r">
            <div className="rbox"><div className="rboxn">17</div><div className="rboxl">Reviews mention Vada Pav</div></div>
            <div className="rbox"><div className="rboxn">13</div><div className="rboxl">Mention Maharashtrian food</div></div>
            <div className="rbox"><div className="rboxn">9</div><div className="rboxl">Specifically praise Misal Pav</div></div>
            <div className="rbox"><div className="rboxn">10</div><div className="rboxl">Mention great value for money</div></div>
          </div>
        </div>
        <div className="topics">
          <div className="topic on">All</div>
          <div className="topic">Vada Pav (17)</div>
          <div className="topic">Maharashtrian Food (13)</div>
          <div className="topic">Value for Money (10)</div>
          <div className="topic">Misal Pav (9)</div>
          <div className="topic">Tea & Coffee</div>
          <div className="topic">Large Portions</div>
          <div className="topic">Thali</div>
        </div>
        <div className="rgrid">
          <div className="rcard">
            <div className="rcstars">★★★★★</div>
            <div className="rctext">&quot;After a past disappointment, this thali truly turned the tables. Perfectly cooked rice, soft rotis, flavourful curries, and comforting dal — every element balanced and satisfying. Bella full and absolutely yummy!&quot;</div>
            <div className="rcauth">
              <div className="rcav" style={{background:'linear-gradient(135deg,var(--saffron),var(--ember))'}}>R</div>
              <div><div className="rcname">Ranjith Pillai</div><div className="rcmeta">Local Guide · 19 reviews · 1 month ago</div></div>
            </div>
          </div>
          <div className="rcard">
            <div className="rcstars">★★★★★</div>
            <div className="rctext">&quot;Perfect place for Tea, coffee and chat. The vada pav is spot on — crispy outside, soft inside, just like back home. The staff remembered my regular order. That kind of warmth keeps me coming back.&quot;</div>
            <div className="rcauth">
              <div className="rcav" style={{background:'linear-gradient(135deg,var(--turmeric),#8a6208)'}}>A</div>
              <div><div className="rcname">Adaeze Okonkwo</div><div className="rcmeta">Lagos Island · 5 months ago</div></div>
            </div>
          </div>
          <div className="rcard">
            <div className="rcstars">★★★★☆</div>
            <div className="rctext">&quot;The Misal Pav has that authentic Pune-style heat I&apos;ve been missing in Lagos. Generous portions, very fair pricing — you won&apos;t leave hungry. The Mango Mastani is a non-negotiable order.&quot;</div>
            <div className="rcauth">
              <div className="rcav" style={{background:'linear-gradient(135deg,var(--ember),#6a0808)'}}>K</div>
              <div><div className="rcname">Kemi Adeyemi</div><div className="rcmeta">Ilupeju, Lagos · 2 months ago</div></div>
            </div>
          </div>
          <div className="rcard">
            <div className="rcstars">★★★★★</div>
            <div className="rctext">&quot;I&apos;m Indian, so my bar is high. Cafe Potoba cleared it easily. The masala chai, the misal, the whole vibe — it transported me. Lagos finally has a spot that genuinely feels like home.&quot;</div>
            <div className="rcauth">
              <div className="rcav" style={{background:'linear-gradient(135deg,#1a6b8a,#0a3a5a)'}}>P</div>
              <div><div className="rcname">Priya Sharma</div><div className="rcmeta">Lekki, Lagos · 4 months ago</div></div>
            </div>
          </div>
          <div className="rcard">
            <div className="rcstars">★★★★★</div>
            <div className="rctext">&quot;Found this gem while working nearby. The lunch thali is incredible value — you leave absolutely stuffed. From the dal to the bhakri to the little pickle bowl, everything is thoughtfully done.&quot;</div>
            <div className="rcauth">
              <div className="rcav" style={{background:'linear-gradient(135deg,#2c7a3a,#1a4a20)'}}>T</div>
              <div><div className="rcname">Tunde Fashola</div><div className="rcmeta">Maryland, Lagos · 3 weeks ago</div></div>
            </div>
          </div>
          <div className="rcard">
            <div className="rcstars">★★★★☆</div>
            <div className="rctext">&quot;Great portions, friendly staff who recommend what&apos;s fresh that day. The sabudana vada and sol kadhi were both excellent. A real neighbourhood gem right in the heart of Ilupeju.&quot;</div>
            <div className="rcauth">
              <div className="rcav" style={{background:'linear-gradient(135deg,#6a2c8a,#3a1050)'}}>S</div>
              <div><div className="rcname">Shaikh Ahmed</div><div className="rcmeta">Local Guide · 24 reviews · 5 months ago</div></div>
            </div>
          </div>
        </div>
        <div className="rbot">
          <p style={{color:'var(--muted)',marginBottom:'1.4rem',fontSize:'.87rem'}}>Enjoyed your meal? A quick Google review helps us a lot.</p>
          <a href="https://maps.google.com/search?q=Cafe+Potoba+Ilupeju+Lagos" target="_blank" className="btn-f">Write a Google Review</a>
        </div>
      </section>

      {/* CONTACT PAGE */}
      <section id="contact" className={`page ${activePage === 'contact' ? 'active' : ''}`}>
        <div className="clo">
          <div className="cleft">
            <h1>Visit <em>Us</em></h1>
            <p className="csub">Ilupeju, Lagos · Open Daily</p>
            <div className="clist">
              <div className="crow"><div className="cico">📍</div><div><div className="clbl">Address</div><div className="cval">12A Ilaka Street, Ilupeju<br/>Lagos 102215, Nigeria</div></div></div>
              <div className="crow"><div className="cico">📞</div><div><div className="clbl">Phone</div><div className="cval"><a href="tel:07052463368" style={{color:'inherit'}}>0705 246 3368</a></div></div></div>
              <div className="crow"><div className="cico">🕐</div><div><div className="clbl">Hours</div><div className="cval">Open Daily · Closes 7:00 PM</div></div></div>
              <div className="crow"><div className="cico">🍽️</div><div><div className="clbl">Services</div><div className="cval">Dine-In · Takeaway · Delivery</div></div></div>
              <div className="crow"><div className="cico">💰</div><div><div className="clbl">Price Range</div><div className="cval">₦1,200 – ₦20,000 per person</div></div></div>
              <div className="crow"><div className="cico">🌐</div><div><div className="clbl">Digital Menu</div><div className="cval"><a href="https://digitalmenu.applova.io/webstore/BIZ_14pc535qd2b/menu" target="_blank" style={{color:'var(--saffron-w)'}}>View live digital menu →</a></div></div></div>
            </div>
            <div className="cbtns">
              <a href="https://maps.google.com/?q=12A+Ilaka+Street+Ilupeju+Lagos" target="_blank" className="btn-f">Get Directions</a>
              <a href="tel:07052463368" className="btn-g" style={{borderColor:'rgba(255,255,255,.28)'}}>📞 Call Now</a>
            </div>
          </div>
          <div className="cright">
            <div className="mapbox">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.52!2d3.3573!3d6.5575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c4f7e9c4e57%3A0x0!2zNsKwMzMnMjcuMCJOIDPCsDIxJzI2LjMiRQ!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="hrow" id="hrow">
              <div className={`hcol ${new Date().getDay() === 1 ? 'today' : ''}`}><div className="hday">Mon</div><div className="htime">7 PM</div><div className="hstat">Open</div></div>
              <div className={`hcol ${new Date().getDay() === 2 ? 'today' : ''}`}><div className="hday">Tue</div><div className="htime">7 PM</div><div className="hstat">Open</div></div>
              <div className={`hcol ${new Date().getDay() === 3 ? 'today' : ''}`}><div className="hday">Wed</div><div className="htime">7 PM</div><div className="hstat">Open</div></div>
              <div className={`hcol ${new Date().getDay() === 4 ? 'today' : ''}`}><div className="hday">Thu</div><div className="htime">7 PM</div><div className="hstat">Open</div></div>
              <div className={`hcol ${new Date().getDay() === 5 ? 'today' : ''}`}><div className="hday">Fri</div><div className="htime">7 PM</div><div className="hstat">Open</div></div>
              <div className={`hcol ${new Date().getDay() === 6 ? 'today' : ''}`}><div className="hday">Sat</div><div className="htime">7 PM</div><div className="hstat">Open</div></div>
              <div className={`hcol ${new Date().getDay() === 0 ? 'today' : ''}`}><div className="hday">Sun</div><div className="htime">7 PM</div><div className="hstat">Open</div></div>
            </div>
          </div>
        </div>
        <div className="cformsec">
          <div className="sec-c" style={{padding:'0 0 2.3rem'}}>
            <span className="eyebrow">Get in Touch</span>
            <h2 className="stitle">Send Us a <em>Message</em></h2>
            <div className="bar"></div>
          </div>
          <form onSubmit={(e) => handleContactSubmit(e, e.currentTarget.querySelector('button')!)}>
            <div className="frow">
              <div className="fg" style={{marginBottom:0}}><label>Name</label><input name="name" type="text" placeholder="Your full name" required/></div>
              <div className="fg" style={{marginBottom:0}}><label>Phone</label><input name="phone" type="tel" placeholder="080x xxx xxxx"/></div>
            </div>
            <div className="fg" style={{marginTop:'1.05rem'}}><label>Email</label><input name="email" type="email" placeholder="you@email.com" required/></div>
            <div className="fg"><label>Subject</label><select name="subject"><option>General Inquiry</option><option>Table Reservation</option><option>Group / Corporate Booking</option><option>Feedback</option><option>Other</option></select></div>
            <div className="fg"><label>Message</label><textarea name="message" placeholder="How can we help?" required></textarea></div>
            <button type="submit" className="btn-f" style={{width:'100%',justifyContent:'center',padding:'.95rem',fontSize:'.82rem'}}>Send Message</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fgrid">
          <div className="fbrand">
            <div className="fbn">Cafe <em>Potoba</em></div>
            <div className="fbs">Maharashtrian Restaurant · Ilupeju, Lagos</div>
            <p>Authentic Maharashtrian and Indian street food served with warmth in the heart of Ilupeju. Open daily, closing at 7 PM. Dine-in, takeaway & delivery available.</p>
          </div>
          <div className="fcol">
            <h4>Pages</h4>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('home');}}>Home</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('menu');}}>Menu</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('about');}}>About Us</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('reviews');}}>Reviews</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('contact');}}>Contact</a>
          </div>
          <div className="fcol">
            <h4>Specialties</h4>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('menu');}}>Misal Pav</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('menu');}}>Vada Pav</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('menu');}}>Maharashtrian Thali</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('menu');}}>Sabudana Vada</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('menu');}}>Mango Mastani</a>
          </div>
          <div className="fcol">
            <h4>Contact</h4>
            <a href="#">12A Ilaka St, Ilupeju</a>
            <a href="tel:07052463368">0705 246 3368</a>
            <a href="#">Open Daily · Till 7 PM</a>
            <a href="https://digitalmenu.applova.io/webstore/BIZ_14pc535qd2b/menu" target="_blank">Live Digital Menu →</a>
          </div>
        </div>
        <div className="fbot">
          <div className="fcopy">© 2025 Cafe Potoba, 12A Ilaka Street, Ilupeju Lagos. All rights reserved. <a href="/admin/login" className="opacity-0 hover:opacity-100 text-xs ml-2 transition-opacity duration-300">Admin Login</a></div>
          <div className="socs">
            <a href="#" className="soc">f</a><a href="#" className="soc">in</a><a href="#" className="soc">tw</a><a href="#" className="soc">wa</a>
          </div>
        </div>

        {/* Security Honeypot - Invisible to normal users, traps bots */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <form onSubmit={handleHoneypot}>
            <label htmlFor="admin_username_fake">Admin Username</label>
            <input type="text" id="admin_username_fake" name="admin_username_fake" tabIndex={-1} autoComplete="off" />
            <label htmlFor="admin_password_fake">Admin Password</label>
            <input type="password" id="admin_password_fake" name="admin_password_fake" tabIndex={-1} autoComplete="off" />
            <button type="submit" tabIndex={-1}>Login to Admin Panel</button>
          </form>
        </div>
      </footer>

      <Chatbot />
    </>
  );
}
