import Header from "../components/header";
import Footer from "../components/footer";

export default function AppLayout({
  children,
  searchQuery,
  onSearchChange,
  searchStatus,
  onStatusChange,
  isLoggedIn,
  onLogout,
}) {
  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchStatus={searchStatus}
        onStatusChange={onStatusChange}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />
      {children}
      <Footer />
    </>
  );
}