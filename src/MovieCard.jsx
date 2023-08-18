import React, { useState } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root')

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '30%',
      bottom: '25%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        position: 'fixed',
        zIndex: 5
    }
  };

const API_URL = 'http://www.omdbapi.com?apikey=dc6ce803'



const MovieCard = ({ movie }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movieInfo, setMovieInfo] = useState('')

    const searchMovieInfo = async (imdbID) => {
        const response = await fetch(`${API_URL}&i=${imdbID}&plot="long"`);
        const data = await response.json();

        setMovieInfo(data);
        console.log(data)
    }

    function handleOpenModal () {
        searchMovieInfo(movie.imdbID).then(() => {
            setModalIsOpen(true)
        });
    }

    function handleCloseModal (e) {
        e.stopPropagation(); // modal wasn't closing when clicking button until this line was added
        /*
        This is because the modal element is inside the movie div so clicking on it trigers the div's onclick openmodal event. 
        this function prevents the event from propagating to the parent aka the movie div class.
        */
        setModalIsOpen(false)
    }


    return(
        <div 
            className="movie"
            onClick={() => {
                handleOpenModal();
            }}
        >
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster: "https://via.placeholder.com/400"} alt={movie.Title}>
                </img>
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>

            <Modal 
                isOpen={modalIsOpen}
                contentLabel='Movie description'
                onRequestClose={handleCloseModal}
                style={customStyles}
                >
                    <button onClick={handleCloseModal}>Close</button>
                    <h3 className='popUpTitle'>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <br></br>
                    <div className='movieplot'>
                        <p>{movieInfo.Plot}</p>
                    </div>
            </Modal>
        </div>
    )
}

export default MovieCard;