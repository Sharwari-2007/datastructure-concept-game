import React from 'react';
import { useGame, GameProvider } from './context/GameContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { AITutorModal } from './components/tutor/AITutorModal';

// Pages
import { WelcomeScreen } from './pages/WelcomeScreen';
import { Dashboard } from './pages/Dashboard';
import { AdventureMap } from './pages/AdventureMap';
import { WorldDetail } from './pages/WorldDetail';
import { LearnHub } from './pages/LearnHub';
import { ChallengesPage } from './pages/ChallengesPage';
import { VisualizerLabPage } from './pages/VisualizerLabPage';
import { ExamArena } from './pages/ExamArena';
import { InterviewArena } from './pages/InterviewArena';
import { CodeLab } from './pages/CodeLab';
import { RevisionCenter } from './pages/RevisionCenter';
import { AchievementsPage } from './pages/AchievementsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

const AppContent = () => {
  const { activeTab } = useGame();

  if (activeTab === 'welcome') {
    return (
      <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col">
        <WelcomeScreen />
        <AITutorModal />
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <AdventureMap />;
      case 'world-detail':
        return <WorldDetail />;
      case 'learn':
        return <LearnHub />;
      case 'challenges':
        return <ChallengesPage />;
      case 'visualizer-lab':
        return <VisualizerLabPage />;
      case 'exam-arena':
        return <ExamArena />;
      case 'interview-arena':
        return <InterviewArena />;
      case 'code-lab':
        return <CodeLab />;
      case 'revision':
        return <RevisionCenter />;
      case 'achievements':
        return <AchievementsPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfileSettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          {renderActivePage()}
        </main>
      </div>
      <AITutorModal />
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
