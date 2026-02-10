import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";

export default function PublicLayout({children}){
    return(
        <>
          <PublicHeader />
          {children}
          <Footer />
        </>
    );
}