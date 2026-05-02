import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const projectOptions = [
  { name: 'Eden Farms (Konadal)', pricePerSqYd: 2000, annualGrowth: 0.20 },
  { name: 'Deccan Heights (Shadnagar)', pricePerSqYd: 8500, annualGrowth: 0.28 },
]

const plotSizeOptions = {
  'Eden Farms (Konadal)': [100, 200, 400, 800],
  'Deccan Heights (Shadnagar)': [121, 242],
}

function formatINR(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`
  return `₹${val.toLocaleString('en-IN')}`
}

export default function Calculator() {
  const [ref, inView] = useInView()
  const [selectedProject, setSelectedProject] = useState(projectOptions[0])
  const [plotSize, setPlotSize] = useState(200)
  const [years, setYears] = useState(3)

  const result = useMemo(() => {
    const investedAmount = plotSize * selectedProject.pricePerSqYd
    const futureValue = investedAmount * Math.pow(1 + selectedProject.annualGrowth, years)
    const profit = futureValue - investedAmount
    const roi = ((profit / investedAmount) * 100).toFixed(0)
    return { investedAmount, futureValue, profit, roi }
  }, [selectedProject, plotSize, years])

  const yearlyBreakdown = useMemo(() => {
    return Array.from({ length: years }, (_, i) => {
      const y = i + 1
      const val = result.investedAmount * Math.pow(1 + selectedProject.annualGrowth, y)
      return { year: y, value: val }
    })
  }, [result.investedAmount, selectedProject.annualGrowth, years])

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-primary via-blue-900 to-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-accent/20 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Investment Calculator
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white gold-underline">
            Calculate Your Returns
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            See how your investment grows over time with HKMC's premium plots.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <h3 className="font-semibold text-dark text-lg">Configure Your Investment</h3>

              {/* Project Select */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Select Project</label>
                <div className="grid grid-cols-1 gap-2">
                  {projectOptions.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setSelectedProject(p)
                        setPlotSize(plotSizeOptions[p.name][0])
                      }}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        selectedProject.name === p.name
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 text-gray-600 hover:border-primary/40'
                      }`}
                    >
                      <div className="font-medium text-sm">{p.name}</div>
                      <div className="text-xs text-gray-400">₹{p.pricePerSqYd.toLocaleString('en-IN')}/sq.yd • ~{(p.annualGrowth * 100).toFixed(0)}% annual growth</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Plot Size */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Plot Size (sq. yards)</label>
                <div className="grid grid-cols-2 gap-2">
                  {plotSizeOptions[selectedProject.name].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPlotSize(size)}
                      className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        plotSize === size
                          ? 'border-accent bg-accent text-dark'
                          : 'border-gray-200 text-gray-600 hover:border-accent/40'
                      }`}
                    >
                      {size} sq.yd
                    </button>
                  ))}
                </div>
              </div>

              {/* Years Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Investment Period: <span className="text-primary font-bold">{years} Years</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>10 Years</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="font-semibold text-dark text-lg">Your Investment Summary</h3>

              {/* Main Result */}
              <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-6 text-white text-center">
                <div className="text-white/70 text-sm mb-1">Investment Today</div>
                <div className="text-3xl font-bold font-serif mb-3">{formatINR(result.investedAmount)}</div>
                <div className="text-accent text-2xl font-bold">→</div>
                <div className="text-white/70 text-sm mt-3 mb-1">Value in {years} Year{years > 1 ? 's' : ''}</div>
                <div className="text-4xl font-bold font-serif text-accent">{formatINR(result.futureValue)}</div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-green-600 font-bold text-xl">{formatINR(result.profit)}</div>
                  <div className="text-gray-500 text-xs mt-1">Total Profit</div>
                </div>
                <div className="bg-accent/10 rounded-xl p-4 text-center">
                  <div className="text-accent font-bold text-xl">{result.roi}%</div>
                  <div className="text-gray-500 text-xs mt-1">Total ROI</div>
                </div>
              </div>

              {/* Year-by-year */}
              <div className="bg-light rounded-xl p-4">
                <h4 className="text-sm font-semibold text-dark mb-3">Year-by-Year Growth</h4>
                <div className="space-y-2">
                  {yearlyBreakdown.map((y) => {
                    const pct = ((y.value - result.investedAmount) / result.investedAmount) * 100
                    const barWidth = Math.min((pct / (result.roi * 1)) * 100, 100)
                    return (
                      <div key={y.year} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-12">Yr {y.year}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${barWidth}%` } : {}}
                            transition={{ duration: 0.8, delay: y.year * 0.1 }}
                            className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                          />
                        </div>
                        <span className="text-xs font-medium text-primary w-20 text-right">{formatINR(y.value)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <a href="tel:7801052288"  className="btn-primary w-full text-center block">
                Invest Now — Book Site Visit
              </a>


                  {/* Invest Now — Book Site Visit */}


                  {/* <a href="tel:7801052288" class="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-white text-primary font-semibold py-2.5 rounded-xl transition-all text-sm"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Call: 7801052288</a> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
