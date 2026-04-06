'use client';

export default function Contact() {
  const days = [
    { d: 'Mon', t: '7 PM' },
    { d: 'Tue', t: '7 PM' },
    { d: 'Wed', t: '7 PM' },
    { d: 'Thu', t: '7 PM' },
    { d: 'Fri', t: '7 PM' },
    { d: 'Sat', t: '7 PM' },
    { d: 'Sun', t: '7 PM' }
  ];
  const todayIdx = (new Date().getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

  return (
    <section id="contact" className="pt-[68px]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] min-h-[600px]">
        <div className="bg-[var(--ink)] p-[clamp(3rem,6vw,5rem)] flex flex-col justify-center">
          <h1 className="font-['Fraunces'] text-[clamp(2.2rem,4vw,3.2rem)] text-white font-medium mb-[0.35rem] leading-[1.1]">
            Visit <em className="italic text-[var(--saffron)]">Us</em>
          </h1>
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-white/30 mb-[2.8rem]">Ilupeju, Lagos · Open Daily</p>
          <div className="flex flex-col gap-[1.7rem]">
            <div className="flex gap-[0.95rem] items-start">
              <div className="w-[38px] h-[38px] rounded-full bg-[rgba(224,123,26,0.13)] flex items-center justify-center text-[0.95rem] text-[var(--saffron)] shrink-0">📍</div>
              <div>
                <div className="text-[0.59rem] tracking-[0.22em] uppercase text-[var(--saffron)] mb-[0.2rem]">Address</div>
                <div className="text-white/65 text-[0.9rem] leading-[1.5] font-light">12A Ilaka Street, Ilupeju<br/>Lagos 102215, Nigeria</div>
              </div>
            </div>
            <div className="flex gap-[0.95rem] items-start">
              <div className="w-[38px] h-[38px] rounded-full bg-[rgba(224,123,26,0.13)] flex items-center justify-center text-[0.95rem] text-[var(--saffron)] shrink-0">📞</div>
              <div>
                <div className="text-[0.59rem] tracking-[0.22em] uppercase text-[var(--saffron)] mb-[0.2rem]">Phone</div>
                <div className="text-white/65 text-[0.9rem] leading-[1.5] font-light"><a href="tel:07052463368" className="text-inherit">0705 246 3368</a></div>
              </div>
            </div>
            <div className="flex gap-[0.95rem] items-start">
              <div className="w-[38px] h-[38px] rounded-full bg-[rgba(224,123,26,0.13)] flex items-center justify-center text-[0.95rem] text-[var(--saffron)] shrink-0">🕐</div>
              <div>
                <div className="text-[0.59rem] tracking-[0.22em] uppercase text-[var(--saffron)] mb-[0.2rem]">Hours</div>
                <div className="text-white/65 text-[0.9rem] leading-[1.5] font-light">Open Daily · Closes 7:00 PM</div>
              </div>
            </div>
          </div>
          <div className="flex gap-[0.85rem] mt-[2.8rem] flex-wrap">
            <a href="https://maps.google.com/?q=12A+Ilaka+Street+Ilupeju+Lagos" target="_blank" rel="noreferrer" className="btn-f">Get Directions</a>
            <a href="tel:07052463368" className="btn-g border-white/30">📞 Call Now</a>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 min-h-[320px] md:min-h-[400px] bg-[var(--parchment)]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.52!2d3.3573!3d6.5575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c4f7e9c4e57%3A0x0!2zNsKwMzMnMjcuMCJOIDPCsDIxJzI2LjMiRQ!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng" allowFullScreen loading="lazy" className="w-full h-full border-0 block"></iframe>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-[1px] bg-[var(--smoke)]">
            {days.map((day, i) => (
              <div key={i} className={`bg-[var(--cream)] p-[1.5rem_0.8rem] text-center transition-colors hover:bg-[var(--saffron-pale)] ${i === todayIdx ? 'bg-[var(--saffron-pale)] border-t-[3px] border-[var(--saffron)]' : ''}`}>
                <div className="text-[0.6rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-[0.35rem]">{day.d}</div>
                <div className="font-['Fraunces'] text-[0.95rem] text-[var(--ink)] font-medium">{day.t}</div>
                <div className="text-[0.63rem] text-[var(--saffron)] mt-[0.18rem]">Open</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
