import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { RiWhatsappLine, RiFacebookFill, RiInstagramLine, RiYoutubeFill, RiLinkedinFill } from 'react-icons/ri'
import { PHONE_CALL, PHONE_WHATSAPP, EMAIL } from '../data/content'

const socialLinks = [
  { Icon: RiFacebookFill, label: 'Facebook', href: '#' },
  { Icon: RiInstagramLine, label: 'Instagram', href: '#' },
  { Icon: RiYoutubeFill,   label: 'YouTube',   href: '#' },
  { Icon: RiLinkedinFill,  label: 'LinkedIn',  href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* Force white text in dark footer */}
              <img
                src="/favicon_io/apple-touch-icon.png"
                alt="HKMC Builders Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="leading-none">
                <div className="font-serif font-bold text-lg leading-tight text-white">HKMC</div>
                <div className="text-white/60 text-xs">Builders &amp; Developers</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Premium open plots in Hyderabad's fastest-growing corridors. HMDA & DTCP approved. Trusted by 500+ investors.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Our Projects', href: '#projects' },
                { label: 'Why Choose Us', href: '#why-us' },
                { label: 'Investment Calculator', href: '#calculator' },
                { label: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 hover:text-accent text-sm transition-colors">
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Our Projects</h4>
            <div className="space-y-4">
              <div>
                <div className="text-accent font-medium text-sm mb-1">Eden Farms</div>
                <div className="text-white/60 text-xs">Near Konadal · ₹2000/sq.yd</div>
                <div className="text-white/60 text-xs">100–800 sq. yards</div>
              </div>
              <div>
                <div className="text-accent font-medium text-sm mb-1">Deccan Heights</div>
                <div className="text-white/60 text-xs">Shadnagar · ₹8500/sq.yd</div>
                <div className="text-white/60 text-xs">121–242 sq. yards</div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Approvals</h4>
              <div className="flex flex-wrap gap-2">
                {['HMDA', 'DTCP', 'RERA'].map((badge) => (
                  <span key={badge} className="bg-primary/30 text-white/80 text-xs px-2.5 py-1 rounded-full border border-primary/40">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <a href={`tel:${PHONE_CALL}`} className="flex items-center gap-2 text-white/60 hover:text-accent text-sm transition-colors">
                <FiPhone className="w-4 h-4 shrink-0" /> {PHONE_CALL}
              </a>
              <a href={`https://wa.me/91${PHONE_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-green-400 text-sm transition-colors">
                <RiWhatsappLine className="w-4 h-4 shrink-0" /> {PHONE_WHATSAPP} (WhatsApp)
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-white/60 hover:text-accent text-sm transition-colors break-all">
                <FiMail className="w-4 h-4 shrink-0" /> {EMAIL}
              </a>
              <div className="flex items-start gap-2 text-white/60 text-sm">
                <FiMapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>

            <a href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I want to know more about your plots.`}
              target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2.5 rounded-lg font-medium transition-colors">
              <RiWhatsappLine className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            © {year} HKMC Builders and Developers Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
