import React, { useState, useEffect } from 'react';
import { generateSearchQueries, fetchNewVideo } from './getQuery';

const videoListStyle = {
    fontFamily: 'OptiSpire',
    backgroundColor: '#000',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
};

const videoContainerStyle = {
    textAlign: 'center',
    marginBottom: '20px'
};

function DisplayVideo() {
    const [query, setQuery] = useState('');
    const [video, setVideo] = useState(null);
    const [error, setError] = useState(null);

    // Function to generate a new search query
    const handleGenerateQuery = async () => {
        try {
            const newQuery = await generateSearchQueries();
            setQuery(newQuery);
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to fetch a new video
    const handleFetchNewVideo = async () => {
        if (!query) return;
        
        try {
            const newVideo = await fetchNewVideo(query);
            setVideo(newVideo);
        } catch (error) {
            setError(error.message);
        }
    };

    // Generate initial query on component mount
    useEffect(() => {
        handleGenerateQuery();
    }, []);

    // Fetch video when query changes
    useEffect(() => {
        if (query) {
            handleFetchNewVideo();
        }
    }, [query]);

    const StyledButton = ({ onClick, children }) => (
        <button
            style={{
                fontFamily: 'OptiSpire',
                fontWeight: 'bold',
                backgroundColor: 'black',
                color: 'White',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );

    return (
        <div style={videoListStyle}>
            <img 
                src="/public/SOFTWAREe.png" 
                alt="Software Logo"
            />
            <h1>RANDOM VIDEO TO SL33P TO</h1>
            <h1>FOR THOSE WHO CANT CH00SE</h1>
            
            {error && <div style={{color: 'red'}}>{error}</div>}
            
            {video && (
                <div style={videoContainerStyle}>
                    <iframe
                        title="YouTube Video"
                        width="1120"
                        height="630"
                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            
            <StyledButton onClick={handleGenerateQuery}>
                NEW VIDEO
            </StyledButton>
        </div>
    );
}

export default DisplayVideo;