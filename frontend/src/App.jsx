import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Bot,
  ChevronDown,
  ChevronRight,
  Cloud,
  LayoutGrid,
  Leaf,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useEffect, useState } from 'react';

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: Cloud, label: 'Infrastructure & AI Assets' },
  { icon: Sparkles, label: 'AI Recommendations' },
  { icon: TrendingUp, label: 'Cost Analytics' },
  { icon: Leaf, label: 'Carbon Tracker' },
  { icon: AlertTriangle, label: 'Alerts' },
  { icon: ShieldCheck, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
];

const kpis = [
  { title: 'Monthly Cloud Spend', value: '$18,430', change: '+8%', icon: Activity, accent: 'from-blue-500/30 to-cyan-400/10', text: 'text-blue-300' },
  { title: 'Savings Identified', value: '$6,200', change: '+12%', icon: TrendingUp, accent: 'from-emerald-500/30 to-green-400/10', text: 'text-emerald-300' },
  { title: 'Idle Resources', value: '24', change: '+3', icon: AlertTriangle, accent: 'from-amber-500/30 to-orange-400/10', text: 'text-amber-300' },
  { title: 'Carbon Emission', value: '1.8 tCO₂', change: '-6%', icon: Leaf, accent: 'from-emerald-600/30 to-lime-400/10', text: 'text-emerald-300' },
];

const costTrendData = [
  { month: 'Jan', current: 14200, optimized: 12800 },
  { month: 'Feb', current: 15100, optimized: 13200 },
  { month: 'Mar', current: 13900, optimized: 12400 },
  { month: 'Apr', current: 16800, optimized: 14600 },
  { month: 'May', current: 17800, optimized: 15400 },
  { month: 'Jun', current: 18430, optimized: 15980 },
];

const distributionData = [
  { name: 'AWS', value: 42, color: '#3B82F6' },
  { name: 'Azure', value: 28, color: '#22C55E' },
  { name: 'GCP', value: 19, color: '#F59E0B' },
  { name: 'Oracle', value: 11, color: '#EF4444' },
];

const recommendations = [
  { service: 'EC2', recommendation: 'Resize instance', savings: '$320', priority: 'High', status: 'Pending' },
  { service: 'RDS', recommendation: 'Enable auto scaling', savings: '$180', priority: 'Medium', status: 'Applied' },
  { service: 'S3', recommendation: 'Delete unused buckets', savings: '$95', priority: 'Low', status: 'Pending' },
];

const alerts = ['Unused GPU detected', 'Idle Kubernetes cluster', 'High egress cost'];

const serverData = [
  {
    id: 1,
    name: 'prod-analytics-01',
    provider: 'AWS',
    type: 'm6g.xlarge',
    region: 'us-east-1',
    cpu: 38,
    ram: 52,
    storage: '1.2 TB',
    network: '320 GB',
    monthlyCost: '$2,340',
    health: 'Healthy',
    uptime: '99.98%',
    savings: '$480',
    recommendation: 'Switch to m6g.large',
    currentInstance: 'm6g.xlarge',
    recommendedInstance: 'm6g.large',
    estimatedSavings: '$480 / month',
    performanceImpact: 'Low',
    confidence: '94%',
    reason: 'This workload is consistently underutilized and can move to a smaller instance without significant latency impact.',
    cpuSeries: [{ label: '00', value: 24 }, { label: '04', value: 33 }, { label: '08', value: 31 }, { label: '12', value: 38 }, { label: '16', value: 29 }, { label: '20', value: 36 }],
    ramSeries: [{ label: '00', value: 42 }, { label: '04', value: 47 }, { label: '08', value: 51 }, { label: '12', value: 52 }, { label: '16', value: 49 }, { label: '20', value: 54 }],
    storageSeries: [{ label: 'Mon', value: 60 }, { label: 'Tue', value: 63 }, { label: 'Wed', value: 66 }, { label: 'Thu', value: 64 }, { fontLabel: 'Fri', value: 68 }, { label: 'Sat', value: 72 }],
    networkSeries: [{ label: 'Mon', value: 180 }, { label: 'Tue', value: 210 }, { label: 'Wed', value: 195 }, { label: 'Thu', value: 220 }, { label: 'Fri', value: 240 }, { label: 'Sat', value: 260 }],
  },
  {
    id: 2,
    name: 'ml-training-02',
    provider: 'Azure',
    type: 'Standard_D8s_v5',
    region: 'eastus2',
    cpu: 79,
    ram: 68,
    storage: '3.4 TB',
    network: '512 GB',
    monthlyCost: '$4,120',
    health: 'Scaling',
    uptime: '99.95%',
    savings: '$620',
    recommendation: 'Enable burst capacity scheduling',
    currentInstance: 'Standard_D8s_v5',
    recommendedInstance: 'Standard_D4s_v5',
    estimatedSavings: '$620 / month',
    performanceImpact: 'Medium',
    confidence: '88%',
    reason: 'The model training pool peaks at certain hours and can leverage auto-scaling to prevent overprovisioning.',
    cpuSeries: [{ label: '00', value: 61 }, { label: '04', value: 70 }, { label: '08', value: 79 }, { label: '12', value: 82 }, { label: '16', value: 73 }, { label: '20', value: 66 }],
    ramSeries: [{ label: '00', value: 58 }, { label: '04', value: 60 }, { label: '08', value: 67 }, { label: '12', value: 68 }, { label: '16', value: 64 }, { label: '20', value: 59 }],
    storageSeries: [{ label: 'Mon', value: 72 }, { label: 'Tue', value: 75 }, { label: 'Wed', value: 77 }, { label: 'Thu', value: 80 }, { label: 'Fri', value: 82 }, { label: 'Sat', value: 84 }],
    networkSeries: [{ label: 'Mon', value: 280 }, { label: 'Tue', value: 320 }, { label: 'Wed', value: 310 }, { label: 'Thu', value: 360 }, { label: 'Fri', value: 390 }, { label: 'Sat', value: 410 }],
  },
];

const modelData = [
  {
    name: 'GPT-4.1',
    provider: 'OpenAI',
    inputTokens: '18.2M',
    outputTokens: '4.9M',
    totalTokens: '23.1M',
    latency: '890 ms',
    monthlyCost: '$4,200',
    utilization: 91,
    currentCost: '$4,200',
    tokenUsage: '23.1M',
    qualityScore: '95/100',
    altModels: [
      { name: 'Claude Sonnet', cost: '$2,780', savings: '$1,420', latencyDiff: '-120 ms', performanceDiff: 'Similar', reason: 'Claude Sonnet provides similar output quality for summarization and classification workloads while reducing monthly cost by approximately 35%.' },
      { name: 'Gemini', cost: '$2,950', savings: '$1,250', latencyDiff: '-80 ms', performanceDiff: 'Slightly lower', reason: 'Gemini performs well for rapid reasoning tasks and can lower spend for lighter production workloads.' },
      { name: 'Llama', cost: '$1,620', savings: '$2,580', latencyDiff: '+180 ms', performanceDiff: 'Lower', reason: 'Llama is the most economical option for routine classification, content moderation, and chat routing.' },
    ],
  },
  {
    name: 'Claude Sonnet',
    provider: 'Anthropic',
    inputTokens: '12.4M',
    outputTokens: '3.2M',
    totalTokens: '15.6M',
    latency: '740 ms',
    monthlyCost: '$2,780',
    utilization: 76,
    currentCost: '$2,780',
    tokenUsage: '15.6M',
    qualityScore: '92/100',
    altModels: [
      { name: 'Gemini', cost: '$2,150', savings: '$630', latencyDiff: '-45 ms', performanceDiff: 'Similar', reason: 'Gemini offers strong cost efficiency for moderate throughput workloads with minimal quality impact.' },
      { name: 'Llama', cost: '$1,480', savings: '$1,300', latencyDiff: '+210 ms', performanceDiff: 'Lower', reason: 'Llama is attractive for latency-tolerant and bulk routing workloads.' },
    ],
  },
];

const aiRecommendations = [
  {
    resource: 'EC2 / prod-analytics-01',
    replacement: 'm6g.large',
    savings: '$480 / mo',
    annualSavings: '$5,760 / yr',
    performanceImpact: 'Low',
    confidence: '94%',
    reason: 'Right-size the instance to fit observed CPU usage and reduce idle overhead.',
    riskLevel: 'Low',
  },
  {
    resource: 'GPT-4.1 routing',
    replacement: 'Claude Sonnet',
    savings: '$1,420 / mo',
    annualSavings: '$17,040 / yr',
    performanceImpact: 'Low',
    confidence: '91%',
    reason: 'Route summary and classification prompts to a cheaper model with similar quality.',
    riskLevel: 'Low',
  },
  {
    resource: 'Storage volume',
    replacement: 'Archive tier',
    savings: '$220 / mo',
    annualSavings: '$2,640 / yr',
    performanceImpact: 'Low',
    confidence: '89%',
    reason: 'Move cold data to archive storage without impacting performance-sensitive services.',
    riskLevel: 'Medium',
  },
];

const splashParticles = Array.from({ length: 16 }, (_, index) => ({
  left: `${(index * 7) % 100}%`,
  top: `${(index * 11) % 100}%`,
  delay: `${index * 0.12}s`,
}));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [expandedServer, setExpandedServer] = useState(1);
  const [selectedModel, setSelectedModel] = useState(modelData[0]);

  // LIVE STREAMLIT SYSTEM URL
  const STREAMLIT_URL = "https://cloudoptima-finops-engine-kjnxbvkjrf86avkfgckqxz.streamlit.app";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsExiting(true);
      window.setTimeout(() => setLoading(false), 500);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.28),transparent_30%),#020617] transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 overflow-hidden">
          {splashParticles.map((particle, index) => (
            <span
              key={index}
              className="splash-particle absolute h-2 w-2 rounded-full bg-blue-400/50"
              style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
            />
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-blue-400/20 bg-slate-900/70 shadow-[0_0_70px_rgba(59,130,246,0.25)] backdrop-blur-xl">
            <div className="glow-ring flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_0_40px_rgba(59,130,246,0.35)]">
              <Cloud size={28} />
            </div>
          </div>
          <div className="mb-4 h-2 w-72 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 animate-pulse" />
          </div>
          <p className="text-2xl font-semibold tracking-tight text-white">Initializing Cloud Infrastructure...</p>
          <p className="mt-2 max-w-md text-sm text-slate-400">Preparing observability, recommendations, and cost intelligence for your workspace.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col px-3 py-3 sm:px-4 lg:px-6">
        <header className="mb-4 flex items-center justify-between rounded-[20px] border border-white/10 bg-slate-900/70 px-4 py-3 shadow-[0_16px_50px_-22px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 lg:hidden"
              onClick={() => setSidebarOpen((val) => !val)}
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-glow">
                <Cloud size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">CloudOptima</p>
                <p className="text-xs text-slate-400">FinOps Intelligence</p>
              </div>
            </div>
          </div>

          <div className="hidden flex-1 items-center gap-3 px-6 lg:flex">
            <label className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-400">
              <Search size={16} />
              <input
                className="w-full bg-transparent outline-none placeholder:text-slate-500"
                placeholder="Search resources, alerts, recommendations"
              />
            </label>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href={STREAMLIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              <Sparkles size={16} /> Launch Live Agent Scan <ExternalLink size={14} />
            </a>

            <button className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10">
              <Bell size={18} />
            </button>
            <button className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10">
              <Settings size={18} />
            </button>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-1.5">
              <UserCircle2 size={24} className="text-slate-300" />
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Ava Chen</p>
                <p className="text-xs text-slate-400">Ops Lead</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex gap-4">
          <aside className={`fixed inset-y-0 left-0 z-20 w-72 -translate-x-full border-r border-white/10 bg-slate-950/95 p-4 backdrop-blur-xl transition duration-300 lg:static lg:translate-x-0 lg:rounded-[24px] lg:border lg:bg-slate-900/70 ${sidebarOpen ? 'translate-x-0' : ''}`}>
            <div className="flex h-full flex-col">
              <div className="mb-6 mt-2 px-2">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Workspace</p>
              </div>
              <nav className="space-y-1">
                {navItems.map(({ icon: Icon, label }) => {
                  const isActive = activeView === (label === 'Dashboard' ? 'dashboard' : 'assets');
                  return (
                    <button
                      key={label}
                      onClick={() => {
                        setActiveView(label === 'Dashboard' ? 'dashboard' : 'assets');
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition hover:-translate-y-0.5 hover:bg-white/10 ${isActive ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/10 text-white' : 'text-slate-300'}`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={16} className={isActive ? 'text-blue-300' : 'text-slate-400'} />
                        {label}
                      </span>
                      {isActive && <ChevronRight size={16} className="text-slate-400" />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-3 rounded-[20px] border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/20 p-2 text-emerald-300">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">AI Copilot Ready</p>
                    <p className="text-xs text-slate-400">Autonomous actions enabled</p>
                  </div>
                </div>
                <a 
                  href={STREAMLIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-2xl bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                >
                  View Live Engine
                </a>
              </div>
            </div>
          </aside>

          <main className="flex-1 lg:pl-2">
            {activeView === 'assets' ? (
              <section className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_16px_50px_-22px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-6">
                <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                      <Bot size={14} /> Unified operations center
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Infrastructure & AI Assets</h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                      Manage infrastructure resources and LLM model usage from a single premium control surface.
                    </p>
                  </div>
                  <a 
                    href={STREAMLIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    <Sparkles size={16} /> Run AI Optimization
                  </a>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-[20px] border border-white/10 bg-gradient-to-br from-blue-500/15 to-cyan-400/10 p-4 backdrop-blur-xl">
                    <p className="text-sm text-slate-400">Total Tokens Used</p>
                    <p className="mt-2 text-2xl font-semibold text-white">38.7M</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-gradient-to-br from-emerald-500/15 to-green-400/10 p-4 backdrop-blur-xl">
                    <p className="text-sm text-slate-400">Today's AI Cost</p>
                    <p className="mt-2 text-2xl font-semibold text-white">$1,260</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-gradient-to-br from-amber-500/15 to-orange-400/10 p-4 backdrop-blur-xl">
                    <p className="text-sm text-slate-400">Monthly AI Cost</p>
                    <p className="mt-2 text-2xl font-semibold text-white">$4,200</p>
                  </div>
                </div>

                <div className="mb-6 rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">AI Recommendation Center</h2>
                      <p className="text-sm text-slate-400">Cross-platform optimization across servers and LLM usage</p>
                    </div>
                  </div>
                  <div className="grid gap-4 xl:grid-cols-3">
                    {aiRecommendations.map((item) => (
                      <div key={item.resource} className="rounded-[20px] border border-white/10 bg-slate-950/60 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">{item.resource}</p>
                          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                            {item.riskLevel}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">Suggested replacement</p>
                        <p className="mt-1 text-lg font-semibold text-white">{item.replacement}</p>
                        <div className="mt-3 space-y-2 text-sm text-slate-300">
                          <div className="flex items-center justify-between">
                            <span>Estimated savings</span>
                            <span className="text-emerald-300">{item.savings}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Annual savings</span>
                            <span className="text-cyan-300">{item.annualSavings}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Confidence</span>
                            <span className="text-blue-300">{item.confidence}</span>
                          </div>
                        </div>
                        <a 
                          href={STREAMLIT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center mt-4 w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                        >
                          Apply Recommendation
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">Cloud Infrastructure</h2>
                        <p className="text-sm text-slate-400">Live server health and optimization potential</p>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-950/70 text-slate-400">
                          <tr>
                            <th className="px-3 py-3">Server</th>
                            <th className="px-3 py-3">Provider</th>
                            <th className="px-3 py-3">Type</th>
                            <th className="px-3 py-3">Region</th>
                            <th className="px-3 py-3">CPU</th>
                            <th className="px-3 py-3">RAM</th>
                            <th className="px-3 py-3">Cost</th>
                            <th className="px-3 py-3">Health</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serverData.map((server) => {
                            const isExpanded = expandedServer === server.id;
                            return (
                              <tr key={server.id} className="border-t border-white/10 bg-slate-900/40 text-slate-200">
                                <td className="px-3 py-3">
                                  <button onClick={() => setExpandedServer(isExpanded ? null : server.id)} className="flex items-center gap-2 font-medium text-white">
                                    {server.name}
                                    <ChevronDown size={14} className={`transition ${isExpanded ? 'rotate-180' : ''}`} />
                                  </button>
                                </td>
                                <td className="px-3 py-3">{server.provider}</td>
                                <td className="px-3 py-3">{server.type}</td>
                                <td className="px-3 py-3">{server.region}</td>
                                <td className="px-3 py-3">{server.cpu}%</td>
                                <td className="px-3 py-3">{server.ram}%</td>
                                <td className="px-3 py-3 text-emerald-300">{server.monthlyCost}</td>
                                <td className="px-3 py-3">
                                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">{server.health}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">LLM & Token Optimization</h2>
                          <p className="text-sm text-slate-400">Model-level cost steering</p>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                          <p className="text-sm text-slate-400">Input Tokens</p>
                          <p className="mt-1 text-xl font-semibold text-white">18.2M</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                          <p className="text-sm text-slate-400">Output Tokens</p>
                          <p className="mt-1 text-xl font-semibold text-white">4.9M</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">Selected Model</h2>
                          <p className="text-sm text-slate-400">Detailed comparison view</p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                        <p className="text-lg font-semibold text-white">{selectedModel.name}</p>
                        <p className="text-sm text-slate-400">{selectedModel.provider}</p>
                        <div className="mt-3 grid gap-3 text-sm text-slate-300">
                          <div className="flex items-center justify-between">
                            <span>Current monthly cost</span>
                            <span className="text-white">{selectedModel.currentCost}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Token usage</span>
                            <span className="text-white">{selectedModel.tokenUsage}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Latency</span>
                            <span className="text-white">{selectedModel.latency}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Quality score</span>
                            <span className="text-emerald-300">{selectedModel.qualityScore}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        {selectedModel.altModels.map((alt) => (
                          <div key={alt.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300">
                            <p className="font-semibold text-white">{alt.name}</p>
                            <p className="mt-1 text-slate-400">{alt.reason}</p>
                            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                              <span>Cost {alt.cost}</span>
                              <span>Savings {alt.savings}</span>
                              <span>Latency {alt.latencyDiff}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">LLM Model Usage</h2>
                      <p className="text-sm text-slate-400">Compare deployment efficiency and spend</p>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-950/70 text-slate-400">
                        <tr>
                          <th className="px-3 py-3">Model</th>
                          <th className="px-3 py-3">Provider</th>
                          <th className="px-3 py-3">Input Tokens</th>
                          <th className="px-3 py-3">Output Tokens</th>
                          <th className="px-3 py-3">Total Tokens</th>
                          <th className="px-3 py-3">Latency</th>
                          <th className="px-3 py-3">Monthly Cost</th>
                          <th className="px-3 py-3">Utilization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modelData.map((model) => (
                          <tr key={model.name} className="cursor-pointer border-t border-white/10 bg-slate-900/40 text-slate-200 transition hover:bg-slate-800/70" onClick={() => setSelectedModel(model)}>
                            <td className="px-3 py-3 font-medium text-white">{model.name}</td>
                            <td className="px-3 py-3">{model.provider}</td>
                            <td className="px-3 py-3">{model.inputTokens}</td>
                            <td className="px-3 py-3">{model.outputTokens}</td>
                            <td className="px-3 py-3">{model.totalTokens}</td>
                            <td className="px-3 py-3">{model.latency}</td>
                            <td className="px-3 py-3 text-emerald-300">{model.monthlyCost}</td>
                            <td className="px-3 py-3">{model.utilization}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ) : (
              <section className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_16px_50px_-22px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-6">
                <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
                      <Bot size={14} /> AI-powered cloud operations
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Cloud Infrastructure Overview</h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                      Monitor costs, optimize resources and reduce cloud waste using AI.
                    </p>
                  </div>
                  <a 
                    href={STREAMLIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    <Sparkles size={16} /> Run optimization
                  </a>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {kpis.map(({ title, value, change, icon: Icon, accent, text }) => (
                    <div key={title} className={`group rounded-[20px] border border-white/10 bg-gradient-to-br ${accent} p-4 shadow-[0_12px_35px_-18px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-glow`}>
                      <div className="mb-4 flex items-center justify-between">
                        <div className={`rounded-2xl border border-white/10 bg-slate-950/40 p-2 ${text}`}>
                          <Icon size={18} />
                        </div>
                        <span className={`rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium ${text}`}>{change}</span>
                      </div>
                      <p className="text-sm text-slate-400">{title}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.7fr_0.9fr]">
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">Cloud Spend Over Time</h2>
                        <p className="text-sm text-slate-400">Monthly data</p>
                      </div>
                      <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Savings highlighted</div>
                    </div>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={costTrendData}>
                          <defs>
                            <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.28} />
                              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.22} />
                              <stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <Tooltip />
                          <Area type="monotone" dataKey="current" stroke="#F87171" strokeWidth={3} fill="url(#currentGradient)" />
                          <Area type="monotone" dataKey="optimized" stroke="#4ADE80" strokeWidth={3} fill="url(#optimizedGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                      <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-red-300">Current Cost</span>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">Optimized Cost</span>
                      <span className="text-slate-400">Average savings: $1.2k/month</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">Cloud Provider Distribution</h2>
                          <p className="text-sm text-slate-400">Adoption mix</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="h-44 w-44">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={distributionData} innerRadius={58} outerRadius={80} paddingAngle={3} dataKey="value">
                                {distributionData.map((entry) => (
                                  <Cell key={entry.name} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="mt-2 space-y-2 text-sm text-slate-300">
                        {distributionData.map((entry) => (
                          <div key={entry.name} className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                              {entry.name}
                            </span>
                            <span className="text-slate-400">{entry.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[20px] border border-white/10 bg-gradient-to-br from-blue-500/10 via-slate-900/70 to-cyan-400/10 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-white/10 p-2 text-blue-200">
                          <Bot size={18} />
                        </div>
                        <div>
                          <p className="font-semibold">AI Insights</p>
                          <p className="text-sm text-slate-400">Your AWS spending increased 12% this week.</p>
                        </div>
                      </div>
                      <a 
                        href={STREAMLIT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                      >
                        View Recommendations <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">Recent Recommendations</h2>
                        <p className="text-sm text-slate-400">Prioritized optimization actions</p>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-950/70 text-slate-400">
                          <tr>
                            <th className="px-3 py-3">Service</th>
                            <th className="px-3 py-3">Recommendation</th>
                            <th className="px-3 py-3">Estimated Savings</th>
                            <th className="px-3 py-3">Priority</th>
                            <th className="px-3 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recommendations.map((row) => (
                            <tr key={row.service} className="border-t border-white/10 bg-slate-900/40 text-slate-200">
                              <td className="px-3 py-3 font-medium">{row.service}</td>
                              <td className="px-3 py-3">{row.recommendation}</td>
                              <td className="px-3 py-3 text-emerald-300">{row.savings}</td>
                              <td className="px-3 py-3">
                                <span className={`rounded-full px-2.5 py-1 text-xs ${row.priority === 'High' ? 'bg-red-500/10 text-red-300' : row.priority === 'Medium' ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
                                  {row.priority}
                                </span>
                              </td>
                              <td className="px-3 py-3">
                                <span className={`rounded-full px-2.5 py-1 text-xs ${row.status === 'Applied' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-500/10 text-slate-300'}`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">Carbon Tracker</h2>
                          <p className="text-sm text-slate-400">Sustainable progress</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24">
                          <div className="absolute inset-0 rounded-full border-[10px] border-emerald-400/20" />
                          <div className="absolute inset-0 rounded-full border-[10px] border-t-emerald-400 border-r-emerald-400" style={{ transform: 'rotate(72deg)' }} />
                          <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">72%</div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Current Emissions</p>
                          <p className="text-xl font-semibold text-white">1.8 tCO₂</p>
                          <p className="text-sm text-slate-400">Target Emissions</p>
                          <p className="text-lg font-medium text-emerald-300">1.2 tCO₂</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_35px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">Recent Alerts</h2>
                          <p className="text-sm text-slate-400">Priority monitoring</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {alerts.map((alert) => (
                          <div key={alert} className="flex items-center justify-between rounded-2xl border border-red-500/10 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">
                            <span>{alert}</span>
                            <span className="rounded-full bg-red-500/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300">Alert</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-3 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-4 lg:px-6">
        <p>CloudOptima © 2026</p>
        <div className="flex gap-4">
          <a href="#" className="transition hover:text-slate-300">Privacy</a>
          <a href="#" className="transition hover:text-slate-300">Terms</a>
          <a href="#" className="transition hover:text-slate-300">Support</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
