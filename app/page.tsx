"use client";
import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  Circle, 
  Heart, 
  Droplet, 
  Moon, 
  Brain, 
  Send, 
  Lock, 
  Zap, 
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  UserCheck,
  Eye,
  LogIn,
  Share2,
  Copy
} from "lucide-react";

const quotes = [
  { text: "LIFE TO HAR KOI JEE LETA HAI, ENJOY SIRF HARDWORK SE KRSKTE", author: "~ARCHIT" },
  { text: "CHHOTI JAGAH CHHOTE LOG MILENGE BDI JAGAH ACHHE LOG MILENGE", author: "~ARCHIT" },
  { text: "Dr. Sahiba banna aasan nahi hai, par aapki mehnat ke aage NEET kuch bhi nahi.", author: "~ARCHIT" },
  { text: "Jab thak jayein toh yaad rakhna, stethoscope aapke gale me bohot sahi lagega.", author: "~ARCHIT" },
  { text: "BDS to chal hi raha hai, par surgical gown pehenna aapka asli destination hai.", author: "~ARCHIT" },
  { text: "Har ek tickbox aapko aapke sapno ke medical college ke paas le ja raha hai.", author: "~ARCHIT" },
  { text: "NEET 2027 door nahi hai, agar har din aisi hi consistency rahi.", author: "~ARCHIT" },
  { text: "Jab bhi padhne ka mann na kare, aankhein band karna aur apne naam ke aage 'Dr.' dekhna.", author: "~ARCHIT" },
  { text: "Consistent efforts hi sabse bada weapon hai, aap bohot aage jayegi.", author: "~ARCHIT" },
  { text: "Hard work se hi life premium banti hai, lage raho meri doctor sahiba.", author: "~ARCHIT" },
  { text: "Har ek MCQ practice aapko rankers ki list me upar lekar jayega.", author: "~ARCHIT" },
  { text: "Class locks ho sakti hain, par aapki udan ko koi lock nahi kar sakta.", author: "~ARCHIT" },
  { text: "Physics aur Chemistry pareshan kare toh break lo, par focus mat todo.", author: "~ARCHIT" },
  { text: "White coat aapke liye hi bani hai, bas usko achieve karne ka rasta ye tracker hai.", author: "~ARCHIT" },
  { text: "Saari duniya ek taraf, aapki NEET 2027 ki rank ek taraf.", author: "~ARCHIT" },
  { text: "Chhote mote distractions se door rehna, kyunki aapka destination bohot bada hai.", author: "~ARCHIT" },
  { text: "Aaj ki mehnat, kal ki success ki kahani likhegi.", author: "~ARCHIT" },
  { text: "Biology ke concepts fingertips par hone chahiye, aap intelligent hain, aap kar lengi.", author: "~ARCHIT" },
  { text: "Har din 1% better banna hai, 2027 tak aap topper hongi.", author: "~ARCHIT" },
  { text: "Water intake complete rakhna, brain fuel zaroori hai doctor banne ke liye.", author: "~ARCHIT" },
  { text: "Mujhe aapke hard work par pura bharosa hai, din raat ek kar do.", author: "~ARCHIT" }
];

// Strictly Indulged 8-Hour Daily Timeline with Specific Class Routines
const getDefaultTasks = (isCollegeDay: boolean) => [
  { id: 1, time: "08:30 AM - 09:30 AM", title: "Morning Flow & Light Concept Reading", done: false },
  { id: 2, time: "10:00 AM - 11:00 AM", title: isCollegeDay ? "🏛️ BDS College Class" : "🔬 High-Yield NEET Revision Study", done: false, locked: isCollegeDay },
  { id: 3, time: "11:30 AM - 01:30 PM", title: "🧬 Unacademy Recorded Lecture: Biology", done: false },
  { id: 4, time: "01:30 PM - 03:30 PM", title: "🥗 Lunch, Long Break & Power Nap (Relax Mode)", done: false },
  { id: 5, time: "03:30 PM - 05:30 PM", title: "⚛️ Unacademy Recorded Lecture: Physics", done: false },
  { id: 6, time: "05:30 PM - 07:00 PM", title: "☕ Extended Break & Evening Refreshment", done: false },
  { id: 7, time: "07:00 PM - 08:30 PM", title: "🧪 Unacademy Recorded Lecture: Chemistry", done: false },
  { id: 8, time: "08:30 PM - 10:00 PM", title: "🍽️ Dinner & Unwind Free Time", done: false },
  { id: 9, time: "10:00 PM - 11:30 PM", title: "📝 NEET MCQ Practice & Critical BDS Review", done: false },
  { id: 10, time: "11:30 PM - 12:00 AM", title: "⚡ Short Day Review & Deep Sleep Setup", done: false },
];

export default function IntegratedTracker() {
  const [session, setSession] = useState<{ name: string; username: string; role: "surgeon" | "viewer"; targetDoctor?: string } | null>(null);
  const [authTab, setAuthTab] = useState<"surgeon" | "viewer">("surgeon");
  const [inputName, setInputName] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputTarget, setInputTarget] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [currentQuote, setCurrentQuote] = useState({ text: "", author: "" });
  const [waterCount, setWaterCount] = useState(0);
  const [habits, setHabits] = useState({ sleep: false, meditation: false });
  const [tasks, setTasks] = useState(getDefaultTasks(true));
  const [currentDateString, setCurrentDateString] = useState("");

  const todayKey = new Date().toISOString().split('T')[0];
  const selectedDateKey = viewDate.toISOString().split('T')[0];
  const isToday = todayKey === selectedDateKey;
  const isReadOnly = session?.role === "viewer" || !isToday;

  const triggerRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    triggerRandomQuote();
    const interval = setInterval(() => triggerRandomQuote(), 25000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get("data");
    const doctorUser = params.get("doctor");
    
    if (sharedData && doctorUser) {
      try {
        const decoded = JSON.parse(atob(sharedData));
        setTasks(decoded.tasks);
        setWaterCount(decoded.waterCount);
        setHabits(decoded.habits);
        setSession({ name: "Archit", username: "archit_viewer", role: "viewer", targetDoctor: doctorUser });
        return;
      } catch (e) {
        console.error("Sync link error");
      }
    }

    const savedSession = localStorage.getItem("neet_tracker_user_session");
    if (savedSession) setSession(JSON.parse(savedSession));
  }, []);

  useEffect(() => {
    if (!session) return;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[viewDate.getDay()];
    const isCollegeDay = ["Monday", "Tuesday", "Wednesday", "Thursday"].includes(currentDay);
    
    setCurrentDateString(viewDate.toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' }));

    const dataScopeKey = session.role === "surgeon" ? session.username : session.targetDoctor || "default";
    const backupData = localStorage.getItem(`history_scope_v5_${dataScopeKey}`);
    let history = backupData ? JSON.parse(backupData) : {};

    if (history[selectedDateKey]) {
      const dayData = history[selectedDateKey];
      setTasks(dayData.tasks || getDefaultTasks(isCollegeDay));
      setWaterCount(dayData.waterCount || 0);
      setHabits(dayData.habits || { sleep: false, meditation: false });
    } else {
      setTasks(getDefaultTasks(isCollegeDay));
      setWaterCount(0);
      setHabits({ sleep: false, meditation: false });
    }
  }, [viewDate, selectedDateKey, session]);

  const saveToDatabaseSimulation = (t = tasks, w = waterCount, h = habits) => {
    if (isReadOnly || !session) return;
    const dataScopeKey = session.username;
    const backupData = localStorage.getItem(`history_scope_v5_${dataScopeKey}`);
    let history = backupData ? JSON.parse(backupData) : {};

    history[selectedDateKey] = { tasks: t, waterCount: w, habits: h };
    localStorage.setItem(`history_scope_v5_${dataScopeKey}`, JSON.stringify(history));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authTab === "surgeon") {
      if (!inputName || !inputUsername) return;
      const newSession = { name: inputName, username: inputUsername.toLowerCase().trim(), role: "surgeon" as const };
      setSession(newSession);
      localStorage.setItem("neet_tracker_user_session", JSON.stringify(newSession));
    } else {
      if (!inputName || !inputTarget) return;
      const newSession = { name: inputName, username: "archit_viewer", role: "viewer" as const, targetDoctor: inputTarget.toLowerCase().trim() };
      setSession(newSession);
      localStorage.setItem("neet_tracker_user_session", JSON.stringify(newSession));
    }
  };

  const generateSyncLink = () => {
    if (!session) return;
    const packageData = { tasks, waterCount, habits };
    const stringified = btoa(JSON.stringify(packageData));
    const generatedUrl = `${window.location.origin}${window.location.pathname}?doctor=${session.username}&data=${stringified}`;
    
    navigator.clipboard.writeText(generatedUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const logout = () => {
    localStorage.removeItem("neet_tracker_user_session");
    setSession(null);
    window.location.href = window.location.origin + window.location.pathname;
  };

  const toggleTask = (id: number) => {
    if (isReadOnly) return;
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);
    saveToDatabaseSimulation(updated, waterCount, habits);
    triggerRandomQuote();
  };

  const toggleHabit = (key: 'sleep' | 'meditation') => {
    if (isReadOnly) return;
    const updated = { ...habits, [key]: !habits[key] };
    setHabits(updated);
    saveToDatabaseSimulation(tasks, waterCount, updated);
    triggerRandomQuote();
  };

  const handleWater = (val: number) => {
    if (isReadOnly) return;
    const newCount = Math.max(0, Math.min(4, waterCount + val));
    setWaterCount(newCount);
    saveToDatabaseSimulation(tasks, newCount, habits);
    triggerRandomQuote();
  };

  const totalItems = tasks.length;
  const completedItems = tasks.filter(t => t.done).length;
  const taskProgress = Math.round((completedItems / totalItems) * 100) || 0;
  const dayNameDisplay = viewDate.toLocaleDateString("en-IN", { weekday: 'long' });

  if (!session) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center font-sans px-4">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
          <header className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-200">FUTURE SURGEON</h1>
            <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">Select Access Gate</p>
          </header>
          <div className="flex border border-zinc-800 p-1 rounded-xl mb-6 text-sm font-semibold bg-zinc-900/50">
            <button onClick={() => setAuthTab("surgeon")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${authTab === "surgeon" ? "bg-pink-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><UserCheck size={16} /> Dr. Sahiba</button>
            <button onClick={() => setAuthTab("viewer")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${authTab === "viewer" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}><Eye size={16} /> Archit</button>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Your Profile Name</label>
              <input type="text" required placeholder="e.g. Saumya" value={inputName} onChange={e => setInputName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 text-zinc-200" />
            </div>
            {authTab === "surgeon" ? (
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Create Username</label>
                <input type="text" required placeholder="e.g. saumya_2027" value={inputUsername} onChange={e => setInputUsername(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 text-zinc-200" />
              </div>
            ) : (
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Target Doctor ID</label>
                <input type="text" required placeholder="Enter her custom username" value={inputTarget} onChange={e => setInputTarget(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-zinc-200" />
              </div>
            )}
            <button type="submit" className="w-full mt-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-xl"><LogIn size={16} /> Open Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-24">
      {/* Top Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50 px-4 py-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${session.role === "surgeon" ? "bg-pink-500 animate-pulse" : "bg-blue-500"}`} />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{session.role === "surgeon" ? `Dr. ${session.name} 🥼` : `${session.name} View Mode`}</span>
            </div>
            <button onClick={logout} className="text-[10px] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2 py-1 rounded text-zinc-400 transition-all">Exit Profile</button>
          </div>
          <div className="flex items-center gap-2 select-none w-full sm:w-auto justify-end">
            <button onClick={() => { const d = new Date(viewDate); d.setDate(d.getDate() - 1); setViewDate(d); }} className="p-1 hover:bg-zinc-800 rounded text-zinc-400"><ChevronLeft size={16} /></button>
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-semibold text-zinc-300"><Calendar size={12} className="text-zinc-500" /> {currentDateString}</div>
            <button onClick={() => { const d = new Date(viewDate); d.setDate(d.getDate() + 1); setViewDate(d); }} className="p-1 hover:bg-zinc-800 rounded text-zinc-400"><ChevronRight size={16} /></button>
            <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full text-zinc-300 font-extrabold uppercase tracking-wider">{dayNameDisplay}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 mt-8 space-y-8">
        {/* HONESTY ALERTS */}
        <div className="border border-red-900/30 bg-gradient-to-r from-red-950/20 via-zinc-950 to-red-950/20 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-red-500 shrink-0 mt-0.5 animate-pulse" size={20} />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-red-400">INTEGRITY IS EVERYTHING</h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">Iss tracker mein hamesha khud se <span className="text-red-400 font-semibold">100% honest</span> rehna. Galat tracking se rank nahi, Stay honest to yourself . Jitna padha hai, wahi mark karna.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Rotation Quote Block */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-8 shadow-2xl transition-all duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Sparkles size={120} className="text-pink-500" /></div>
          <p className="text-xl sm:text-2xl font-semibold text-zinc-200 tracking-wide leading-relaxed italic text-center">"{currentQuote.text}"</p>
          <p className="text-right mt-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 tracking-widest text-lg">{currentQuote.author}</p>
        </div>

        {/* Dynamic Share Sync Panel */}
        {session.role === "surgeon" && (
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sync Live Status to Archit</h5>
              <p className="text-[11px] text-zinc-500 mt-0.5">Click to generate tracking token link for him</p>
            </div>
            <button onClick={generateSyncLink} className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${copySuccess ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950'}`}>
              {copySuccess ? <Copy size={14} /> : <Share2 size={14} />}
              {copySuccess ? "Sync Token Copied! Send it" : "Copy Live Sync URL"}
            </button>
          </div>
        )}

        {/* Global Progress Bar */}
        <div className="border border-zinc-800 bg-zinc-900/40 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-yellow-500 animate-bounce" />
              <span className="text-sm font-medium text-zinc-400">
                {isReadOnly ? "Archived View Mode / Read-Only" : "Daily Energy Velocity"}
              </span>
            </div>
            <span className="text-xl font-bold text-pink-500">{taskProgress}%</span>
          </div>
          <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden p-[2px]">
            <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 rounded-full transition-all duration-700 ease-out" style={{ width: `${taskProgress}%` }} />
          </div>
        </div>

        {/* Archit's Love Note */}
        <div className="p-4 bg-gradient-to-r from-zinc-950 via-pink-950/20 to-zinc-950 border border-zinc-800 rounded-2xl text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-pink-400/90 italic flex items-center justify-center gap-2">
            <Heart size={14} className="fill-pink-500 text-pink-500 animate-pulse" /> You can do it babe, I love you! <Heart size={14} className="fill-pink-500 text-pink-500 animate-pulse" />
          </p>
        </div>

        {/* Micro-Habits Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Water Intake */}
          <div className="border border-zinc-800 bg-zinc-900/60 rounded-2xl p-5 flex flex-col justify-between items-center text-center">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2"><Droplet size={18} /> Hydration Hub</div>
            <p className="text-xs text-zinc-500 mb-3">Target: 3-4 Liters Daily</p>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4].map(i => <div key={i} className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${i <= waterCount ? 'bg-cyan-500 text-zinc-950 scale-110 shadow-lg' : 'bg-zinc-800 text-zinc-500'}`}>💧</div>)}
            </div>
            <div className="flex gap-2 w-full">
              <button disabled={isReadOnly} onClick={() => handleWater(-1)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs py-1.5 rounded-lg font-medium">-</button>
              <button disabled={isReadOnly} onClick={() => handleWater(1)} className="flex-1 bg-cyan-950/50 hover:bg-cyan-900/50 disabled:opacity-40 text-cyan-400 text-xs py-1.5 border border-cyan-800/50 rounded-lg font-medium">+</button>
            </div>
          </div>

          {/* Sleep Recovery */}
          <div onClick={() => toggleHabit('sleep')} className={`border rounded-2xl p-5 flex flex-col justify-between items-center text-center transition-all ${isReadOnly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${habits.sleep ? 'border-violet-500/40 bg-violet-950/10' : 'border-zinc-800 bg-zinc-900/60'}`}>
            <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm"><Moon size={18} /> Deep Sleep</div>
            <p className="text-xs text-zinc-500 my-2">7 Hours Rest Required</p>
            <div className={`mt-2 px-4 py-1.5 rounded-full text-xs font-bold ${habits.sleep ? 'bg-violet-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>{habits.sleep ? "Recovered ⚡" : "Mark Rest"}</div>
          </div>

          {/* Mindfulness */}
          <div onClick={() => toggleHabit('meditation')} className={`border rounded-2xl p-5 flex flex-col justify-between items-center text-center transition-all ${isReadOnly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${habits.meditation ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-zinc-800 bg-zinc-900/60'}`}>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm"><Brain size={18} /> Meditation</div>
            <p className="text-xs text-zinc-500 my-2">10 Mins De-stress Box</p>
            <div className={`mt-2 px-4 py-1.5 rounded-full text-xs font-bold ${habits.meditation ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>{habits.meditation ? "Mindful 🧠" : "Mark Done"}</div>
          </div>
        </div>

        {/* Master Integrated Task List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Target Routine Flow</h3>
            {isReadOnly && <span className="text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">Locked / View Only</span>}
          </div>
          {tasks.map(task => (
            <div key={task.id} onClick={() => toggleTask(task.id)} className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${isReadOnly ? 'cursor-not-allowed' : 'cursor-pointer'} ${task.done ? 'bg-zinc-900/30 border-zinc-800/40 opacity-40' : 'bg-zinc-900/90 border-zinc-800 hover:border-pink-500/40 shadow-md'}`}>
              <div className="flex items-center gap-4 flex-1">
                {task.done ? <CheckCircle className="text-pink-500 shrink-0" size={22} /> : <Circle className="text-zinc-600 group-hover:text-pink-400 shrink-0" size={22} />}
                <div>
                  <p className={`text-sm font-medium tracking-wide ${task.done ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>{task.title}</p>
                  <span className="text-xs text-zinc-500 mt-1 block font-mono">{task.time}</span>
                </div>
              </div>
              {task.locked && isToday && ["Monday", "Tuesday", "Wednesday", "Thursday"].includes(dayNameDisplay) && (
                <div className="flex items-center gap-1 bg-zinc-800/80 px-2 py-1 rounded text-[10px] font-bold text-zinc-400 border border-zinc-700"><Lock size={10} /> LOCK</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Telegram Action Button */}
      <a href="https://t.me/GREYERAX" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform group">
        <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        <span className="text-xs tracking-wider font-bold">STUDY BREAK</span>
      </a>
    </div>
  );
}