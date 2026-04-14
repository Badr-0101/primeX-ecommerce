import { LocateIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react";
import logo from "@assets/logo.jpg"

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] relative overflow-hidden">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none 
        [background:radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(185,242,13,0.05)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(185,242,13,0.03)_0%,transparent_60%)]">
      </div>

      {/* Top bar */}
      <div className="w-full h-[3px] bg-[linear-gradient(90deg,transparent,#B9F20D,#D4FF40,#B9F20D,transparent)]"></div>

      {/* Main */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-[56px] pb-10 flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12 relative z-1">

        {/* Contact */}
        <div className="text-right w-full md:w-auto">
          <a href="#" className="flex items-center gap-[14px] mb-7 no-underline justify-end md:justify-start">

            <img
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-[14px] border-2 border-[rgba(185,242,13,0.4)] object-cover shadow-[0_0_20px_rgba(185,242,13,0.2)] shrink-0"
              src={logo}
              alt="logo"
            />
                        <div className="flex flex-col items-end">
              <div className="text-xl sm:text-2xl font-black text-[#B9F20D] leading-none tracking-[2px] uppercase [text-shadow:0_0_16px_rgba(185,242,13,0.4)]">
                PRIME X
              </div>
              <div className="text-[9px] text-[#888] tracking-[3px] uppercase mt-[5px]">
                Unleash Your Prime
              </div>
            </div>
          </a>

          <h3 className="text-[16px] sm:text-[18px] font-extrabold text-white mb-5 relative pb-[14px] after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-9 after:h-[2px] after:bg-[#B9F20D] after:rounded">
            تواصل معنا
          </h3>

          <ul className="flex flex-col gap-3.5 items-start">
            {[
              { icon: <LocateIcon size={16} />, text: "مصر - القاهرة" },
              { icon: <PhoneIcon size={16} />, text: "+201027065509" },
              { icon: <MailIcon size={16} />, text: "alngarracer46@gmail.com" },
              { icon: <ClockIcon size={16} />, text: "9:00 ص – 12:00 م" },
            ].map((item, i) => (
              <li key={i} className="flex items-center justify-end gap-3 text-[#CCC] text-xs sm:text-sm font-medium group">
                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-[rgba(185,242,13,0.08)] border border-[rgba(185,242,13,0.2)] rounded-lg flex items-center justify-center text-sm transition group-hover:bg-[rgba(185,242,13,0.18)] group-hover:border-[#B9F20D]">
                  {item.icon}
                </span>
                {item.text}

              </li>
            ))}
          </ul>
        </div>

        {/* Categories 1 */}
        <div className="text-right w-full md:w-auto">
          <h3 className="text-[16px] sm:text-[18px] text-right font-extrabold text-white mb-5 relative pb-[14px]">
            التصنيفات
            <span className="absolute bottom-0 right-0 w-9 h-[2px] bg-[#B9F20D] rounded"></span>
          </h3>

          <ul className="flex flex-col gap-2.5">
            {[
              ["احماض امينية", 22],
              ["مكملات كرياتين", 25],
              ["مكملات بروتين", 23],
              ["فيتامينات ومعادن", 24],
              ["مكملات طاقة", 19],
              ["الماس جينز وزيادة الوزن", 10],
              ["حوارق دهون", 7],
              ["مكملات كربوهيدرات", 2],
            ].map(([name, count], i) => (
              <li key={i}>
                <a
                  href="#"
                  className="flex items-center justify-between text-[#CCC] text-xs sm:text-sm font-medium py-[6px] border-b border-[rgba(255,255,255,0.04)] hover:text-[#B9F20D] hover:pr-[6px] transition"
                >
                  <span className="text-[10px] sm:text-[11px] text-[#888] bg-[rgba(255,255,255,0.06)] rounded-[10px] px-2 py-[1px] font-semibold">
                    {count}
                  </span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories 2 */}
        <div className="text-right w-full md:w-auto">
          <h3 className="text-[16px] sm:text-[18px] font-extrabold text-white mb-5 relative pb-[14px] after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-9 after:h-[2px] after:bg-[#B9F20D] after:rounded">
            التصنيفات 2
          </h3>

          <ul className="flex flex-col gap-2.5">
            {[
              ["محفزات تستسترون", 3],
              ["منتجات اخرى", 6],
              ["اكسسوارات", 3],
            ].map(([name, count], i) => (
              <li key={i}>
                <a
                  href="#"
                  className="flex items-center justify-between text-[#CCC] text-xs sm:text-sm font-medium py-[6px] border-b border-[rgba(255,255,255,0.04)] hover:text-[#B9F20D] hover:pr-[6px] transition"
                >
                  <span className="text-[10px] sm:text-[11px] text-[#888] bg-[rgba(255,255,255,0.06)] rounded-[10px] px-2 py-[1px] font-semibold">
                    {count}
                  </span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="px-4 sm:px-8 max-w-[1200px] mx-auto">
        <div className="h-[1px] bg-[linear-gradient(90deg,transparent,rgba(185,242,13,0.25),transparent)]"></div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 text-center relative">
        <p className="text-[12px] sm:text-[13px] text-[#888] font-medium text-center">
          © 2024 <span className="text-[#B9F20D]">Prime X</span> — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}