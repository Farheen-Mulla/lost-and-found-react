import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout({children, isLoggedIn , onLogout , searchQuery, onSearchChange, searchStatus, onStatusChange}){
    return(
        <>
          <Header isLoggedIn={isLoggedIn} onLogout={onLogout} searchQuery={searchQuery} onSearchChange={onSearchChange} searchStatus={searchStatus} onStatusChange={onStatusChange} />
          {children}
          <Footer />
        </>
    );
}