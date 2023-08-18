import React from "react";
import { useEffect,useState } from "react";
import Modal from 'react-modal'
import MovieCard from './MovieCard'

import './App.css';
import searchIcon from "./search.svg"

// dc6ce803

const API_URL = 'http://www.omdbapi.com?apikey=dc6ce803'


Modal.setAppElement('#root')


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);
        setMovies(data.Search);
    }

    function onKeyEnterSearch (e){
        if (e.key === "Enter"){
            searchMovies(searchTerm)
        }
    }

    useEffect(() => {
        // default state - initial state of web 
        searchMovies('Avengers');

    }, [])

    return (
        <div className="app"> 
            <h1>Movie Database</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                    onKeyDown={onKeyEnterSearch}
                    >
                </input>
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => {searchMovies(searchTerm)}}
                    >
                </img>
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                    ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                    )
            }
        </div>
    );
}

export default App;