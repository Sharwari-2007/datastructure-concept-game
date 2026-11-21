import React, { createContext, useContext, useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { sound } from '../utils/soundEffects';
import { triggerCelebration, triggerGrandCelebration } from '../utils/confetti';

const GameContext = createContext();

const STORAGE_KEY = 'dsa_quest_save_v1';

const INITIAL_STATE = {
  user: {
    username: 'CyberKnight',
    avatar: '⚔️',
    difficulty: 'Beginner',
    goal: 'Complete DSA Mastery',
    rankTitle: 'Beginner',
    xp: 120,
    coins: 50,
    streak: 3,
    lastActiveDate: new Date().toISOString(),
    soundEnabled: true
  },
  unlockedWorlds: ['array-kingdom'],
  completedLevels: ['arr-lvl-1'],
  completedMissions: 1,
  unlockedAchievements: ['first_mission'],
  completedQuests: [],
  quizHistory: [],
  weakTopics: {
    'Arrays': { correct: 4, total: 5 },
    'Linked Lists': { correct: 1, total: 3 },
    'Trees': { correct: 0, total: 2 },
    'Graphs': { correct: 0, total: 2 }
  },
  activeTab: 'welcome', // welcome | dashboard | map | world-detail | learn | challenges | visualizer-lab | code-lab | exam-arena | interview-arena | revision | achievements | leaderboard | profile
  selectedWorldId: 'array-kingdom',
  selectedLevelId: 'arr-lvl-1'
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
    return INITIAL_STATE;
  });

  const [activeTab, setActiveTab] = useState(gameState.activeTab || 'welcome');
  const [selectedWorldId, setSelectedWorldId] = useState(gameState.selectedWorldId || 'array-kingdom');
  const [selectedLevelId, setSelectedLevelId] = useState(gameState.selectedLevelId || 'arr-lvl-1');
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');
  const [rewardNotification, setRewardNotification] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...gameState,
        activeTab,
        selectedWorldId,
        selectedLevelId
      }));
    } catch (e) {
      console.error('Failed to persist game state:', e);
    }
  }, [gameState, activeTab, selectedWorldId, selectedLevelId]);

  // Level Progression helper
  const calculateRankTitle = (xp) => {
    if (xp >= 3500) return 'DSA Champion';
    if (xp >= 2000) return 'Algorithm Master';
    if (xp >= 1000) return 'Problem Solver';
    if (xp >= 400) return 'Explorer';
    return 'Beginner';
  };

  const showReward = (text, xp = 0, coins = 0) => {
    setRewardNotification({ text, xp, coins });
    setTimeout(() => setRewardNotification(null), 3500);
  };

  const addXP = (amount, reason = 'Mission complete') => {
    setGameState(prev => {
      const newXP = prev.user.xp + amount;
      const oldRank = prev.user.rankTitle;
      const newRank = calculateRankTitle(newXP);
      const leveledUp = newRank !== oldRank;

      if (leveledUp) {
        sound.playLevelUp();
        triggerGrandCelebration();
        showReward(`🏆 RANK UP! You are now a ${newRank}!`, amount, 50);
      } else {
        sound.playCoin();
        triggerCelebration();
        showReward(`+${amount} XP (${reason})`, amount);
      }

      return {
        ...prev,
        user: {
          ...prev.user,
          xp: newXP,
          rankTitle: newRank,
          coins: prev.user.coins + (leveledUp ? 50 : 0)
        }
      };
    });
  };

  const addCoins = (amount) => {
    sound.playCoin();
    setGameState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        coins: prev.user.coins + amount
      }
    }));
  };

  const unlockNextWorld = (currentWorldId) => {
    const worldOrder = [
      'array-kingdom',
      'linked-list-land',
      'stack-queue-dungeon',
      'recursion-backtracking',
      'sorting-speedway',
      'searching-hashing',
      'tree-forest',
      'graph-galaxy',
      'algorithm-arena'
    ];
    const currentIndex = worldOrder.indexOf(currentWorldId);
    if (currentIndex !== -1 && currentIndex + 1 < worldOrder.length) {
      const nextWorld = worldOrder[currentIndex + 1];
      setGameState(prev => {
        if (!prev.unlockedWorlds.includes(nextWorld)) {
          showReward(`🗺️ NEW WORLD UNLOCKED: ${nextWorld.replace('-', ' ').toUpperCase()}!`, 100, 50);
          return {
            ...prev,
            unlockedWorlds: [...prev.unlockedWorlds, nextWorld]
          };
        }
        return prev;
      });
    }
  };

  const completeLevel = (levelId, worldId, score = 100) => {
    sound.playSuccess();
    triggerCelebration();
    setGameState(prev => {
      const isNewLevel = !prev.completedLevels.includes(levelId);
      const updatedLevels = isNewLevel ? [...prev.completedLevels, levelId] : prev.completedLevels;
      const updatedMissions = isNewLevel ? prev.completedMissions + 1 : prev.completedMissions;

      // Check achievements
      const updatedAchievements = [...prev.unlockedAchievements];
      if (updatedMissions >= 1 && !updatedAchievements.includes('first_mission')) {
        updatedAchievements.push('first_mission');
      }

      const xpGained = isNewLevel ? 50 : 15;
      const coinsGained = isNewLevel ? 25 : 5;
      showReward(`Level Complete! +${xpGained} XP, +${coinsGained} Coins`, xpGained, coinsGained);

      return {
        ...prev,
        completedLevels: updatedLevels,
        completedMissions: updatedMissions,
        unlockedAchievements: updatedAchievements,
        user: {
          ...prev.user,
          xp: prev.user.xp + xpGained,
          coins: prev.user.coins + coinsGained,
          rankTitle: calculateRankTitle(prev.user.xp + xpGained)
        }
      };
    });

    // Check if we should unlock next world
    unlockNextWorld(worldId);
  };

  const recordQuizAnswer = (topic, isCorrect, timeTaken = 5) => {
    if (isCorrect) {
      sound.playSuccess();
      addXP(10, 'Correct Answer');
      addCoins(5);
    } else {
      sound.playError();
    }

    setGameState(prev => {
      const currentTopic = prev.weakTopics[topic] || { correct: 0, total: 0 };
      const updatedTopic = {
        correct: currentTopic.correct + (isCorrect ? 1 : 0),
        total: currentTopic.total + 1,
        lastTrained: new Date().toISOString()
      };

      const newHistory = [
        ...prev.quizHistory,
        { topic, isCorrect, timeTaken, timestamp: new Date().toISOString() }
      ];

      return {
        ...prev,
        weakTopics: {
          ...prev.weakTopics,
          [topic]: updatedTopic
        },
        quizHistory: newHistory
      };
    });
  };

  const claimQuest = (questId, xp, coins) => {
    sound.playSuccess();
    triggerCelebration();
    setGameState(prev => ({
      ...prev,
      completedQuests: [...prev.completedQuests, questId],
      user: {
        ...prev.user,
        xp: prev.user.xp + xp,
        coins: prev.user.coins + coins,
        rankTitle: calculateRankTitle(prev.user.xp + xp)
      }
    }));
    showReward(`Daily Quest Claimed! +${xp} XP, +${coins} Coins`, xp, coins);
  };

  const updateUserProfile = (fields) => {
    sound.playClick();
    setGameState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        ...fields
      }
    }));
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState(INITIAL_STATE);
    setActiveTab('welcome');
    sound.playClick();
  };

  const openAITutor = (contextText = '') => {
    setTutorContext(contextText);
    setAiTutorOpen(true);
    sound.playWhoosh();
  };

  const closeAITutor = () => {
    setAiTutorOpen(false);
  };

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        activeTab,
        setActiveTab,
        selectedWorldId,
        setSelectedWorldId,
        selectedLevelId,
        setSelectedLevelId,
        aiTutorOpen,
        tutorContext,
        openAITutor,
        closeAITutor,
        rewardNotification,
        addXP,
        addCoins,
        completeLevel,
        recordQuizAnswer,
        claimQuest,
        updateUserProfile,
        resetProgress
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
