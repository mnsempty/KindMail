import { useState } from "react";
import CustomAside from "../components/home/AsideCustom";
import ChatCustom from "../components/home/ChatCustom";
import GlobalStateContext from "../components/home/GlobalStateContext";

const Home = () => {
    const [ChatIds, setChatIds] = useState({
        current: null,
        previous: null,
    });

    const setSelectedChatId = (newId) => {
        setChatIds((prevChatIds) => ({
            current: newId,
            previous: prevChatIds.current,
        }));
    };

    return (
        <GlobalStateContext.Provider value={{ ChatIds, setSelectedChatId }}>
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