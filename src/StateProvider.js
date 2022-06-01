import { createContext, useContext } from "react";
import usePolls from "./hooks/usePolls";


const PollContext = createContext();

const StateProvider = ({children}) => {
    const polls = usePolls();
    return (
        <PollContext.Provider value={polls}>
          {children}
        </PollContext.Provider>
    )
}

export const usePollContext = () => useContext(PollContext);

export default StateProvider;