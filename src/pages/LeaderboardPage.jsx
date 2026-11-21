import React, { useState } from 'react';
import { Trophy, Flame, Shield, Award, Users, ArrowUp, Zap } from 'lucide-react';
import { LEADERBOARD_USERS } from '../data/leaderboardData';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/soundEffects';

export const LeaderboardPage = () => {
  const { user } = useGame();
  const [selectedLeague, setSelectedLeague] = useState('Platinum');

  // Insert current user into leaderboard dynamically
  const allRoster = [
    ...LEADERBOARD_USERS,
    { rank: 6, name: user.username, avatar: user.avatar, title: user.rankTitle, xp: user.xp, streak: user.streak, league: 'Platinum', isCurrentUser: true }
  ].sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-xs font-bold uppercase">
          <Trophy className="w-3.5 h-3.5 text-amber-400" /> Weekly Cyber League
        </div>
        <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold text-white">
          Global DSA Quest Leaderboard
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
          Top tier rankings reset every Monday at 00:00 UTC. Top 3 competitors promote to Grandmaster!
        </p>
      </div>

      {/* Roster Table */}
      <div className="cyber-panel p-6 space-y-4">
        <div className="space-y-2 font-mono text-xs">
          {allRoster.map((u) => {
            const isMe = u.isCurrentUser;
            return (
              <div
                key={u.name}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isMe
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-neon-cyan scale-[1.01]'
                    : u.rank <= 3
                    ? 'bg-slate-900 border-amber-500/40'
                    : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className={`w-8 text-center font-bold text-sm sm:text-base ${
                    u.rank === 1 ? 'text-amber-400' :
                    u.rank === 2 ? 'text-slate-300' :
                    u.rank === 3 ? 'text-amber-600' : 'text-slate-500'
                  }`}>
                    #{u.rank}
                  </span>

                  <span className="text-2xl">{u.avatar}</span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {u.name}
                      </span>
                      {isMe && (
                        <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px]">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{u.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="hidden sm:flex items-center gap-1 text-rose-400 font-bold">
                    <Flame className="w-4 h-4 text-rose-500" />
                    <span>{u.streak}d</span>
                  </div>

                  <div className="text-right">
                    <span className="text-cyan-400 font-bold text-sm sm:text-base block">
                      {u.xp} XP
                    </span>
                    <span className="text-[10px] text-slate-500">{u.league}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
