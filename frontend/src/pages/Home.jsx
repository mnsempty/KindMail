import { useEffect, useState } from "react";
import CustomAside from "../components/home/AsideCustom";
import ChatCustom from "../components/home/ChatCustom";
import GlobalStateContext from "../components/home/GlobalStateContext";
import VisibilityGlobalStateContext from "../components/home/VisibilityGlobalStateContext";
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
    
    const [isAsideVisible, setIsAsideVisible] = useState(true)
    const [isChatVisible, setIsChatVisible] = useState(true)

    const toggleVisibility = () => {
        setIsAsideVisible(!isAsideVisible);
        setIsChatVisible(!isChatVisible);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsAsideVisible(true);
                setIsChatVisible(false);
            } else {
                setIsAsideVisible(true);
                setIsChatVisible(true);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <GlobalStateContext.Provider value={{ ChatIds, setSelectedChatId }}>
            <VisibilityGlobalStateContext.Provider value={{ isAsideVisible, isChatVisible, toggleVisibility }}>
            <>
                <div className="flex justify-center gap-8 mb-8">
                    <CustomAside />
                    <ChatCustom />
                </div>
            </>
            </VisibilityGlobalStateContext.Provider>
        </GlobalStateContext.Provider>

    )
}

export default Home;