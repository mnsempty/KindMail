import { useState } from "react";
import CustomAside from "../components/home/AsideCustom";
import ChatCustom from "../components/home/ChatCustom";
import GlobalStateContext from "../components/home/GlobalStateContext";

const Home = () => {
    const [selectedChatId, setSelectedChatId] = useState(null);

    return (
        <GlobalStateContext.Provider value={{ selectedChatId, setSelectedChatId }}>
            <>
                <div className="flex gap-8 mb-8">
                    <CustomAside />
                    <ChatCustom />
                </div>
            </>
        </GlobalStateContext.Provider>

    )
}

export default Home;