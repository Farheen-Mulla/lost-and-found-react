function Footer(){
    return(
        <div className="h-[75px] bg-[#09297e] text-white flex items-center justify-around mt-[8rem]">
            <h1 className="font-[cursive] text-[#7489c2] text-[40px] font-bold pl-[5rem]">FindIt</h1>
            <p className="text-[1.6rem] italic p-[0.5rem]">"Helping you reunite with your item safely."</p>
            <a href="https://github.com/Farheen-Mulla/lost-and-found-react" target="_blank" rel="noopener noreferrer" className="text-[1.2rem] hover:underline">GitHub Repository</a>
            <p className="text-[1.2rem] italic">&copy; 2026 - All rights reserved.</p>
        </div>
    );
}
export default Footer;