import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { ContentContext } from "./contentContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function ContentProvider({children}){
    const [reviews, setReviews] = useState();

    async function getReviews(){
        let response = await axios.get(`${API_URL}/publicPages/reviews`);
        setReviews(response.data);
    }

    useEffect(() => {
        getReviews()
    }, []);

    return (
        <ContentContext.Provider value={{reviews, setReviews, getReviews}}>
            {children}
        </ContentContext.Provider>
    )
}

export default ContentProvider;