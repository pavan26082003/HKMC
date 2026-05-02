/**
 * Reusable HKMC logo — uses the favicon_io image with a text fallback.
 * Props:
 *   scrolled  – boolean, switches text colour between white (hero) and dark (scrolled)
 *   size      – 'sm' | 'md' (default 'md')
 */
export default function Logo({ scrolled = false, size = 'md' }) {
  const imgSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
  const titleSize = size === 'sm' ? 'text-base' : 'text-lg'

  return (
    <div className="flex items-center gap-2.5">
      {/* Logo image */}
      <img
        src="/favicon_io/apple-touch-icon.png"
        alt="HKMC Builders and Developers Pvt Ltd logo - open plots Hyderabad"
        className={`${imgSize} rounded-full object-cover`}
      />

      {/* Wordmark */}
      <div className="leading-none">
        <div
          className={`font-serif font-bold ${titleSize} leading-tight transition-colors duration-300 ${
            scrolled ? 'text-primary' : 'text-white'
          }`}
        >
          HKMC
        </div>
        <div
          className={`text-xs leading-tight transition-colors duration-300 ${
            scrolled ? 'text-gray-500' : 'text-white/75'
          }`}
        >
          Builders &amp; Developers
        </div>
      </div>
    </div>
  )
}
