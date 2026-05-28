import React, { useState } from 'react';
import ProjectLayout from '../ProjectLayout';
import projectsData from '../../../data/projects.json';
import SnakeGame from './SnakeGame';
import TicTacToe from './TicTacToe';
import { useTheme } from '../../../ThemeContext';

export default function Games() {
  const project = projectsData.find(p => p.slug === 'games');
  const { accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState('snake'); // 'snake' or 'ttt'

  return (
    <ProjectLayout slug={project.slug} title={project.title} description={project.description}>
      <div className="w-full flex flex-col items-center gap-8 font-mono pb-20">
        
        {/* Navigation Selector */}
        <div 
          className="flex border rounded-xl p-1 bg-black/35 backdrop-blur" 
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <button
            onClick={() => setActiveTab('snake')}
            className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'snake'
                ? 'text-black shadow-[0_0_15px_var(--accent-glow)]'
                : 'hover:text-[color:var(--accent)]'
            }`}
            style={{
              backgroundColor: activeTab === 'snake' ? accentColor : 'transparent',
              color: activeTab === 'snake' ? 'black' : 'var(--text-secondary)'
            }}
          >
            Snake Game
          </button>
          <button
            onClick={() => setActiveTab('ttt')}
            className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'ttt'
                ? 'text-black shadow-[0_0_15px_var(--accent-glow)]'
                : 'hover:text-[color:var(--accent)]'
            }`}
            style={{
              backgroundColor: activeTab === 'ttt' ? accentColor : 'transparent',
              color: activeTab === 'ttt' ? 'black' : 'var(--text-secondary)'
            }}
          >
            Tic-Tac-Toe
          </button>
        </div>

        {/* Game Render Frame */}
        <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'snake' ? (
            <SnakeGame />
          ) : (
            <TicTacToe />
          )}
        </div>
      </div>
    </ProjectLayout>
  );
}
