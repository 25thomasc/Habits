import { useState } from 'react';
import { useHabits, type HabitStore } from './hooks/useHabits';
import { greeting, dateLabel } from './lib/dates';
import TabBar, { type Tab } from './components/TabBar';
import TodayView from './components/TodayView';
import StatsView from './components/StatsView';
import HabitModal from './components/HabitModal';
import type { HabitDraft } from './lib/types';

export default function App() {
  const store: HabitStore = useHabits();
  const [tab, setTab] = useState<Tab>('today');
  const [modal, setModal] = useState<{ id?: string } | null>(null);

  const openAdd = () => setModal({});
  const openEdit = (id: string) => setModal({ id });
  const closeModal = () => setModal(null);

  const handleSave = (data: HabitDraft) => {
    if (modal?.id) store.updateHabit(modal.id, data);
    else store.addHabit(data);
    closeModal();
  };

  const handleDelete = () => {
    if (modal?.id) store.deleteHabit(modal.id);
    closeModal();
  };

  const existing = modal?.id ? store.habits.find((h) => h.id === modal.id) ?? null : null;

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <div className="app-eyebrow">{greeting()}</div>
          <h1 className="app-title">Habits</h1>
        </div>
        <div className="header-date">{dateLabel()}</div>
      </header>

      <main className="app-main">
        {tab === 'today' ? (
          <TodayView store={store} onEdit={openEdit} onAdd={openAdd} />
        ) : (
          <StatsView store={store} />
        )}
      </main>

      <button className="fab" aria-label="Add habit" onClick={openAdd}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>

      <TabBar active={tab} onChange={setTab} />

      {modal && (
        <HabitModal
          existing={existing}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
