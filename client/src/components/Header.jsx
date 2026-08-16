import ProfileSelect from "./ProfileSelect.jsx";

function Header() {
  return (
    <header className="header">
      <div>
        <h1>Event Management</h1>
        <p className="subtitle">
          Create and manage events across multiple timezones
        </p>
      </div>

      <ProfileSelect />
    </header>
  );
}

export default Header;
