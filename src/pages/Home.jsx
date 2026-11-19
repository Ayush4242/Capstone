import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import {
  MessageSquareCode,
  Map,
  History,
  Wind,
  CloudRain,
  AlertTriangle,
  ArrowRight,
  Database,
  Cpu,
  LineChart,
  Layers,
  GraduationCap,
  Microscope,
  Anchor,
  FileCheck2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  const coreFeatures = [
    {
      icon: MessageSquareCode,
      title: 'AI Ocean Assistant',
      description:
        'Ask questions about ocean temperature, salinity, depth, and other biogeochemical parameters using natural language.',
      badge: 'Conversational LLM',
      tag: 'Natural Language Query',
    },
    {
      icon: Map,
      title: 'Interactive ARGO Explorer',
      description:
        'Explore ocean observation floats through interactive geographical maps, trajectory tracking, and vertical profiles.',
      badge: 'Spatial GIS',
      tag: '4,000+ Floats Global Map',
    },
    {
      icon: History,
      title: 'Ocean Time Machine',
      description:
        'Explore historical changes in ocean conditions across different years, tracking warming trends and deep-sea shifts.',
      badge: 'Temporal Modeling',
      tag: '20+ Years Historical Data',
    },
    {
      icon: Wind,
      title: 'Oxygen Depletion Analysis',
      description:
        'Investigate low-oxygen regions, oceanic dead zones, and potential marine ecosystem risks under climate stress.',
      badge: 'Biogeochemistry',
      tag: 'Hypoxia & Marine Habitat Risk',
    },
    {
      icon: CloudRain,
      title: 'Ocean–Monsoon Analyzer',
      description:
        'Explore relationships between sea surface temperature, the Indian Ocean Dipole (IOD), and Indian monsoon rainfall patterns.',
      badge: 'Climate Teleconnections',
      tag: 'Monsoon Dynamics & IOD',
    },
    {
      icon: AlertTriangle,
      title: 'Ocean Anomaly Detection',
      description:
        'Identify unusual ocean temperature spikes, marine heatwaves, and abrupt salinity shifts with statistical anomaly models.',
      badge: 'Extreme Events',
      tag: 'Marine Heatwave Tracking',
    },
  ];

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About FloatChat Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#040e21]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>About FloatChat</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] leading-tight">
                Making Ocean Data <br />
                <span className="text-gradient-cyan">Accessible to Everyone</span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                The global ocean covers over 70% of Earth’s surface and absorbs 90% of excess heat generated by climate change. Yet, discovering and interpreting deep ocean measurements has long required specialized coding skills and proprietary software.
              </p>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                <strong className="text-white font-semibold">FloatChat</strong> simplifies the discovery and analysis of complex oceanographic data through conversational AI, interactive visualizations, and scientific datasets from the international ARGO program.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#071937]/60 border border-cyan-500/20">
                  <div className="text-2xl font-bold text-cyan-300 font-['Outfit',sans-serif]">4,000+</div>
                  <div className="text-xs text-slate-300 mt-1">Autonomous Floats Continuously Monitored</div>
                </div>
                <div className="p-4 rounded-xl bg-[#071937]/60 border border-cyan-500/20">
                  <div className="text-2xl font-bold text-sky-300 font-['Outfit',sans-serif]">2,000m</div>
                  <div className="text-xs text-slate-300 mt-1">Deep Sea Profiling Capacity</div>
                </div>
                <div className="p-4 rounded-xl bg-[#071937]/60 border border-cyan-500/20">
                  <div className="text-2xl font-bold text-teal-300 font-['Outfit',sans-serif]">100% Real</div>
                  <div className="text-xs text-slate-300 mt-1">Verified Scientific Calibration</div>
                </div>
              </div>
            </div>

            {/* Right Column: Research Imagery with Glass Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 group">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
                  alt="Oceanographic Research Diver and Marine Science Observation"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030b1a] via-[#030b1a]/40 to-transparent" />

                {/* Floating Telemetry Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#06152d]/90 backdrop-blur-md border border-cyan-400/30 shadow-lg">
                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-300 mb-1">
                    <span>ARGO Autonomous Profiling Float</span>
                    <span className="text-emerald-400 font-mono">10-Day Cycle Active</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    Descends to 1,000m drift depth, dives to 2,000m, and ascends while capturing precise CTD (Conductivity, Temperature, Depth) data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#020b18]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Scientific Intelligence Modules
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] mb-4">
              Advanced Oceanographic <span className="text-gradient-ocean">Exploration Suite</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Designed for oceanographers, climate scientists, and curious explorers alike. Every module leverages real-world ARGO observation data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreFeatures.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#040e21] border-y border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Scientific Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] mb-4">
              How FloatChat Works
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Transforming raw oceanic sensor readings into actionable planetary insights in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-[#06152d]/80 border border-cyan-500/20 backdrop-blur-md flex flex-col justify-between group hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-cyan-400/30 font-['Outfit',sans-serif] group-hover:text-cyan-400/60 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
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
      <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#020b18]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Planetary Purpose
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] mb-4">
              Bridging the Gap Between <br />
              <span className="text-gradient-cyan">Ocean Science and Everyone</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              FloatChat empowers diverse stakeholders worldwide to explore, understand, and protect our oceans through accessible, transparent, and verified intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#071937]/60 border border-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-5">
                    <PillarIcon className="w-5 h-5" />
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

          {/* Bottom Call to Action Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#061c3d] via-[#092955] to-[#061833] border border-cyan-400/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit',sans-serif]">
                Ready to explore the depths with AI?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Join our growing network of researchers, educators, and climate analysts utilizing real-time ARGO float observations.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-2"
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
