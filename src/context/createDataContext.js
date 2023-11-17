// https://medium.com/swlh/ceating-context-for-your-next-react-app-9fa1670605d0

import React, {useReducer} from "react";

const createDataContext = (reducer, actions, initialState) =>{
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(initialState);

        const boundActions = {}
        for (let key in actions){
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{state, ...boundActions}}>
                {children}
            </Context.Provider>
        )
    }
}

export default createDataContext;

// exports a function that takes in three arguments: a reducer, actions, and an initial state