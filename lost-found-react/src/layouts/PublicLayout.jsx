import PublicHeader from "../components/PublicHeader";
import Footer from "../components/footer";

export default function PublicLayout({children}){
    return(
        <>
          <PublicHeader />
          {children}
          <Footer />
        </>
    );
}