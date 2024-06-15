import { createContext, useReducer } from "react";

const INITIAL_STATE={
    destination:undefined,
    returndestination:undefined,
    date:undefined,
    returnDate:undefined,
    options:{
        passengers:undefined,
        class:undefined,

    },
};

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state,action) =>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }

};

export const SearchContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(SearchReducer, INITIAL_STATE);

return(
    <SearchContext.Provider 
    value={{
        destination:state.destination, 
        returndestination:state.returndestination,
        date:state.date,
        returnDate:state.returnDate,
        options:state.options, 
        dispatch,
        }}>
        {children}
    </SearchContext.Provider>
);

};