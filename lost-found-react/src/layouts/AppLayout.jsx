import Header from "../components/header";
import Footer from "../components/footer";

export default function AppLayout({children, isLoggedIn , onLogout , searchQuery, onSearchChange, searchStatus, onStatusChange}){
    return(
        <>
          <Header isLoggedIn={isLoggedIn} onLogout={onLogout} searchQuery={searchQuery} onSearchChange={onSearchChange} searchStatus={searchStatus} onStatusChange={onStatusChange} />
          {children}
          <Footer />
        </>
    );
}