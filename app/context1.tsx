import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
// import HomeScreen from "./homeScreen";
// import MovieScreen from "./movieScreen";
// import TicketScreen from "./(pvrScreen)/ticketScreen";

export interface moviesType {
    id: string;
    image: string;
    name: string;
    language: string;
    genre: string;
    occ1: {
        "PVR MSR Elements Mall Bengaluru": never[];
        "PVR Vaishnavi Sapphire Bengaluru": never[];
        "PVR Orion Bengaluru": never[];
        "PVR Aura Park Square Bengaluru": never[];
        "PVR The Cinema GT World Bengaluru": never[];
    }
}

// Define types for the context value
interface MoviesCardsContextType {
    seats: string[];
    setSeats: Dispatch<SetStateAction<string[]>>;
    occupied: string[];
    setOccupied: Dispatch<SetStateAction<string[]>>;
    ticket: any[];
    setTicket: Dispatch<SetStateAction<any[]>>;
    movies: any[];
    setMovies: any;

}

// Create the context with default values
const MoviesCards = createContext<MoviesCardsContextType | undefined>(undefined);

interface MovieContextProps {
    children: ReactNode;
}
const initialData = [
    {
        id: "0",
        image:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rS8fGGgs9panboG1ZVGS6CFzXJM.jpg",
        name: "LAL SINGH CHADDHA",
        language: "Hindi",
        genre: "DRAMA",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }

    },
    {
        id: "1",
        image:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ykefXRqhM7HVnLWPtXWcWCcvBy6.jpg",
        name: "RAKSHA BANDHAN",
        language: "Hindi",
        genre: "ACTION",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }
        ,
    },
    {
        id: "2",
        image:
            "https://www.themoviedb.org/t/p/w440_and_h660_face/6SYaaIjLDistEd7DoeS328FVWn0.jpg",
        name: "SEETHARAMAM",
        language: "TELUGU",
        genre: "DRAMA",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }

    },
    {
        id: "3",
        image:
            "https://www.themoviedb.org/t/p/w440_and_h660_face/6QxZRJsODH2kNZ6oNd3qug73FoQ.jpg",
        name: "BIMBISAARA",
        language: "TELUGU",
        genre: "ACTION",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }
        ,
    },
    {
        id: "4",
        image:
            "https://www.themoviedb.org/t/p/w440_and_h660_face/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
        name: "BULLET TRAIN",
        language: "ENGLISH",
        genre: "ACTION",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }
        ,
    },
    {
        id: "5",
        image:
            "https://www.themoviedb.org/t/p/w440_and_h660_face/r7XifzvtezNt31ypvsmb6Oqxw49.jpg",
        name: "DC LEAGUE OF SUPER-PETS",
        language: "ENGLISH",
        genre: "ANIMATI",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }
        ,
    },
    {
        id: "6",
        image:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/a2oUkUgMowYyi8qeGS28rAXPNXT.jpg",
        name: "KURUTHI AATTAM",
        language: "TAMIL",
        genre: "ACTION",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }
        ,
    },
    {
        id: "7",
        image:
            "https://www.themoviedb.org/t/p/w188_and_h282_bestv2/amAbP9YbIAlAXHdIon1x8l7aDFT.jpg",
        name: "EK VILLIAN RETURNS",
        language: "HINDI",
        genre: "ACTION",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }
        ,
    },
    {
        id: "8",
        image:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qlsNqqczg1rr5lfUgiPlLiykGGM.jpg",
        name: "VIRUMAN",
        language: "TAMIL",
        genre: "ACTION",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }
    },
    {
        id: "9",
        image: "https://www.themoviedb.org/t/p/w440_and_h660_face/xAG7S6X73B74CeLjo8gcVoWtunr.jpg",
        name: "ROCKETRY",
        language: "HINDI",
        genre: "DRAMA",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }

    },
    {
        id: "10",
        image: "https://www.themoviedb.org/t/p/w188_and_h282_bestv2/irmHAELoYRaECBr8zQAlD4myrfk.jpg",
        name: "777 CHARLIE",
        language: "KANNADA",
        genre: "DRAMA",
        occ1: {
            "PVR MSR Elements Mall Bengaluru": [],
            "PVR Vaishnavi Sapphire Bengaluru": [],
            "PVR Orion Bengaluru": [],
            "PVR Aura Park Square Bengaluru": [],
            "PVR The Cinema GT World Bengaluru": []
        }

    }
];
const MovieContext = ({ children }: MovieContextProps) => {
    const [seats, setSeats] = useState<string[]>([]);
    const [occupied, setOccupied] = useState<string[]>([]);
    const [ticket, setTicket] = useState<any[]>([]);
    const [movies, setMovies] = useState<any[]>(initialData);

    return (
        <MoviesCards.Provider value={{ seats, setSeats, occupied, setOccupied, ticket, setTicket, movies, setMovies }}>
            {children}
        </MoviesCards.Provider>
    );
};

export { MoviesCards, MovieContext };
