import { useEffect } from "react";
import { useAppStore } from "./store/useAppStore.js";
import Header from "./components/Header.jsx";
import CreateEventForm from "./components/CreateEventForm.jsx";
import EventsPanel from "./components/EventsPanel.jsx";

function App() {
  const loadProfiles = useAppStore((state) => state.loadProfiles);
  const loadEvents = useAppStore((state) => state.loadEvents);
  const currentProfileId = useAppStore((state) => state.currentProfileId);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  useEffect(() => {
    if (currentProfileId) loadEvents();
  }, [currentProfileId, loadEvents]);

  return (
    <div className="page">
      <Header />
      <main className="layout">
        <CreateEventForm />
        <EventsPanel />
        <section className="card">Create Event goes here</section>
        <section className="card">Events go here</section>
      </main>
    </div>
  );
}

export default App;
