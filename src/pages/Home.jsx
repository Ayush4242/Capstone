import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import ArgoSimulator from '../components/ArgoSimulator';
import {
  MessageSquareCode,
  Database,
  Cpu,
  LineChart,
  GraduationCap,
  Microscope,
  Anchor,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const workflowSteps = [
    {
      step: '01',
      title: 'Ask a Question',
      description:
        'Inquire about temperature anomalies, ARGO float trajectories, or seasonal thermocline changes using conversational prompts.',
      icon: MessageSquareCode,
    },
    {
      step: '02',
      title: 'Retrieve Ocean Data',
      description:
        'FloatChat coordinates with verified ARGO, NOAA, and INCOIS global repositories to extract calibrated profile metrics.',
      icon: Database,
    },
    {
      step: '03',
      title: 'Analyze with AI/ML',
      description:
        'Domain-trained models evaluate spatial correlations, thermohaline depth patterns, and anomaly deviations.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Visualize Scientific Insights',
      description:
        'Render publication-grade vertical depth profiles, contour maps, salinity cross-sections, and clear narrative summaries.',
      icon: LineChart,
    },
  ];

  const missionPillars = [
    {
      role: 'Students & Educators',
      icon: GraduationCap,
      description:
        'Demystify oceanography with intuitive interactive tools, making complex ocean physics accessible to classroom learners.',
    },
    {
      role: 'Climate & Marine Researchers',
      icon: Microscope,
      description:
        'Accelerate exploratory data analysis without writing boilerplate NetCDF parsers or spatial query scripts.',
    },
    {
      role: 'Coastal Communities',
      icon: Anchor,
      description:
        'Provide early insights into regional ocean conditions, storm surge drivers, and fishery-critical oxygen levels.',
    },
    {
      role: 'Policymakers & NGOs',
      icon: FileCheck2,
      description:
        'Deliver evidence-backed ocean intelligence to drive informed marine conservation and climate adaptation policies.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100">
      {/* Hero Section with High-Resolution ARGO Float & Marine Life Background */}
      <Hero />

      {/* Handcrafted Asymmetric Bento Grid of Scientific Capabilities */}
      <BentoGrid />

      {/* ARGO Float 10-Day Depth Cycle Simulator */}
      <ArgoSimulator />

      {/* About FloatChat Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#030914] border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Making Ocean Data Accessible to Everyone</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif] leading-tight">
                Democratizing Deep Ocean <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400">
                  Planetary Observation
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                FloatChat simplifies the discovery and analysis of complex oceanographic data through conversational AI, interactive visualizations, and scientific datasets from the international ARGO program.
              </p>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                The global ocean absorbs more than 90% of excess heat trapped by greenhouse gases. By opening up the physical measurements gathered across the water column (0m to 2,000m), FloatChat provides actionable intelligence on marine heatwaves, thermohaline circulation, and hypoxia.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#020611] border border-cyan-500/20 shadow-lg">
                  <div className="text-3xl font-black text-cyan-300 font-mono">3,900+</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Autonomous Floats Continuously Monitored</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#020611] border border-cyan-500/20 shadow-lg">
                  <div className="text-3xl font-black text-teal-300 font-mono">2,000m</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Deep Sea Profiling Depth</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#020611] border border-cyan-500/20 shadow-lg">
                  <div className="text-3xl font-black text-sky-300 font-mono">100% Real</div>
                  <div className="text-xs text-slate-300 font-medium mt-1">Verified Scientific CTD Calibration</div>
                </div>
              </div>
            </div>

            {/* Right Column: Research Imagery with Glass Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
                  alt="Marine scientific observation and deep coral reef monitoring"
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

                {/* Floating Telemetry Glass Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#040e21]/90 backdrop-blur-xl border border-cyan-400/40 shadow-2xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-300 mb-1">
                    <span>Autonomous ARGO Profiler</span>
                    <span className="text-emerald-400 font-mono">10-Day Cycle Active</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    Equipped with Seabird CTD and Aanderaa Optode sensors to quantify salinity, temperature, and dissolved oxygen down to 2,000m depth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#020617] border-y border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              Scientific Workflow
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif] mb-4">
              How FloatChat Works
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Transforming raw sensor streams into actionable planetary intelligence in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#030914] border border-cyan-500/20 backdrop-blur-xl flex flex-col justify-between group hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-cyan-400/30 font-['Outfit',sans-serif] group-hover:text-cyan-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-cyan-950/90 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                      <StepIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 font-['Outfit',sans-serif]">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#030914]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              Our Planetary Mission
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif] mb-4">
              Bridging the Gap Between <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400">
                Ocean Science and Everyone
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              FloatChat makes oceanographic information accessible to students, researchers, coastal communities, and policymakers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#020611] border border-cyan-500/15 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-5">
                    <PillarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-['Outfit',sans-serif]">
                    {pillar.role}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom High-Impact Call to Action Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#04122e] via-[#06204c] to-[#04122e] border border-cyan-400/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
                Ready to explore the depths with AI?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Join our network of researchers, educators, and climate analysts utilizing real-time ARGO observations.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-2xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 hover:opacity-90 shadow-xl shadow-cyan-500/30 transition-all flex items-center gap-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
