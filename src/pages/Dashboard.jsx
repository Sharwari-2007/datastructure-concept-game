import React from 'react';
import {
  Sparkles,
  Flame,
  Coins,
  Trophy,
  ArrowRight,
  Play,
  CheckCircle2,
  Lock,
  Award,
  Zap,
  Target,
  Clock,
  Compass,
  Cpu
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useGame } from '../context/GameContext';
import { WORLDS } from '../data/worldsData';
import { DAILY_QUESTS } from '../data/dailyQuestsData';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { LEADERBOARD_USERS } from '../data/leaderboardData';
import { sound } from '../utils/soundEffects';

export const Dashboard = () => {
  const {
    user,
    unlockedWorlds,
    completedLevels,
    completedMissions,
    unlockedAchievements,
    completedQuests,
    claimQuest,
    setActiveTab,
    setSelectedWorldId,
    weakTopics
  } = useGame();

  const handleResumeMission = () => {
    sound.playClick();
    let targetWorldId = 'array-kingdom';
    for (const w of WORLDS) {
      if (unlockedWorlds.includes(w.id)) {
        const hasUnfinishedLevel = w.levels.some(lvl => !completedLevels.includes(lvl.id));
        if (hasUnfinishedLevel) {
          targetWorldId = w.id;
          break;
        }
        targetWorldId = w.id;
      }
    }
    setSelectedWorldId(targetWorldId);
    setActiveTab('world-detail');
  };

  const handleOpenWorld = (worldId) => {
    if (!unlockedWorlds.includes(worldId)) {
      sound.playError();
      return;
    }
    sound.playClick();
    setSelectedWorldId(worldId);
    setActiveTab('world-detail');
  };

  // Radar chart data for mastery
  const radarData = [
    { subject: 'Arrays', A: (weakTopics['Arrays']?.correct || 3) * 20, fullMark: 100 },
    { subject: 'Lists', A: (weakTopics['Linked Lists']?.correct || 2) * 25, fullMark: 100 },
    { subject: 'Stacks', A: 70, fullMark: 100 },
    { subject: 'Trees', A: (weakTopics['Trees']?.correct || 1) * 30, fullMark: 100 },
    { subject: 'Graphs', A: (weakTopics['Graphs']?.correct || 1) * 25, fullMark: 100 },
    { subject: 'Sorting', A: 85, fullMark: 100 },
  ];

  const totalSyllabusLevels = WORLDS.reduce((acc, w) => acc + w.levels.length, 0);
  const completionPercentage = Math.round((completedLevels.length / totalSyllabusLevels) * 100);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Player Overview HUD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl shadow-neon-cyan">
              {user.avatar || '⚔️'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-gaming text-white">
                  {user.username}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-600/60 text-cyan-300 font-mono text-xs font-bold">
                  {user.rankTitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-400">
                Goal: <span className="text-cyan-400">{user.goal}</span> | Difficulty: <span className="text-purple-400">{user.difficulty}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleResumeMission}
              className="px-6 py-3.5 cyber-button-primary text-xs font-bold font-gaming uppercase tracking-wider flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Resume Last Mission
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('map'); }}
              className="px-5 py-3.5 cyber-button-secondary text-xs font-mono font-bold flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyan-400" /> Explore Map
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80 font-mono">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-xs block mb-1">TOTAL XP</span>
            <div className="flex items-center gap-2 text-xl font-bold text-cyan-400">
              <Zap className="w-5 h-5 text-cyan-400" /> {user.xp}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-xs block mb-1">COIN BALANCE</span>
            <div className="flex items-center gap-2 text-xl font-bold text-amber-400">
              <Coins className="w-5 h-5 text-amber-400" /> {user.coins}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-xs block mb-1">ACTIVE STREAK</span>
            <div className="flex items-center gap-2 text-xl font-bold text-rose-400">
              <Flame className="w-5 h-5 text-rose-500 animate-pulse" /> {user.streak} Days
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 text-xs block mb-1">MISSIONS COMPLETE</span>
            <div className="flex items-center gap-2 text-xl font-bold text-emerald-400">
              <Target className="w-5 h-5 text-emerald-400" /> {completedMissions}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Worlds & Side Hubs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Worlds & Progression */}
        <div className="lg:col-span-2 space-y-8">
          {/* Unlocked Worlds Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-gaming font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-cyan-400" /> DSA Worlds Adventure
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Progressively unlock and conquer all 8 data structure kingdoms.
                </p>
              </div>
              <button
                onClick={() => { sound.playClick(); setActiveTab('map'); }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                View Full Map <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WORLDS.slice(0, 4).map((world) => {
                const isUnlocked = unlockedWorlds.includes(world.id);
                return (
                  <div
                    key={world.id}
                    onClick={() => handleOpenWorld(world.id)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isUnlocked
                        ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-neon-cyan hover:-translate-y-1'
                        : 'bg-slate-950/50 border-slate-900 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-400">
                        {world.tag}
                      </span>
                      {isUnlocked ? (
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-gaming font-bold text-white mb-1">
                      {world.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {world.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
                      <span className="text-slate-400">{world.levels.length} Levels</span>
                      <span className="text-cyan-400 font-bold group flex items-center gap-1">
                        Enter World ➔
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Quests Board */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-gaming font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" /> Daily Quests
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Complete missions today to maintain your streak and earn bonus coins.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Resets in 11h
              </span>
            </div>

            <div className="space-y-3">
              {DAILY_QUESTS.slice(0, 3).map((quest) => {
                const isClaimed = completedQuests.includes(quest.id);
                return (
                  <div
                    key={quest.id}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h5 className="font-mono text-xs font-bold text-white mb-0.5">
                        {quest.title}
                      </h5>
                      <p className="text-[11px] text-slate-400">{quest.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right text-xs font-mono">
                        <span className="text-cyan-400 block font-bold">+{quest.xpReward} XP</span>
                        <span className="text-amber-400 text-[10px]">+{quest.coinReward} Coins</span>
                      </div>
                      <button
                        onClick={() => claimQuest(quest.id, quest.xpReward, quest.coinReward)}
                        disabled={isClaimed}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                          isClaimed
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'cyber-button-primary'
                        }`}
                      >
                        {isClaimed ? 'Claimed' : 'Claim'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Mastery Radar & Weekly Leaderboard */}
        <div className="space-y-8">
          {/* Radar Analytics Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-gaming font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" /> Mastery Radar
              </h3>
              <span className="text-xs font-mono text-cyan-400">{completionPercentage}% Total</span>
            </div>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis stroke="#334155" />
                  <Radar name="Mastery" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[11px] font-mono text-slate-400 text-center">
              Strengthen weak areas in <button onClick={() => setActiveTab('revision')} className="text-cyan-400 underline">Revision Center</button>.
            </p>
          </div>

          {/* Leaderboard Preview Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-gaming font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Top Roster
              </h3>
              <button
                onClick={() => { sound.playClick(); setActiveTab('leaderboard'); }}
                className="text-xs font-mono text-amber-400 hover:underline"
              >
                Full League ➔
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {LEADERBOARD_USERS.slice(0, 5).map((u) => (
                <div
                  key={u.rank}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center font-bold text-amber-400">#{u.rank}</span>
                    <span className="text-lg">{u.avatar}</span>
                    <div>
                      <span className="font-bold text-white block">{u.name}</span>
                      <span className="text-[10px] text-slate-500">{u.title}</span>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-bold">{u.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
