import { useState } from "react";
import CustomAside from "../components/home/AsideCustom";
import ChatCustom from "../components/home/ChatCustom";
import GlobalStateContext from "../components/home/GlobalStateContext";

const Home = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <GlobalStateContext.Provider value={{ selectedUserId, setSelectedUserId }}>
            <>
                <div className="flex">
                    <CustomAside />
                    <ChatCustom />
                </div>
            </>
        </GlobalStateContext.Provider>

    )
}

export default Home;