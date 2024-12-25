import axios from 'axios';


const API_KEY = 'AIzaSyByqojcWF-QWPe_K95SRxrfcpz9o6tKQpE';


// Function to generate search queries
export const generateSearchQueries = async () => {
    try {
        const response = await axios.post('http://localhost:5050/generate-queries', {
            prompt: "everytime you generate this I want it to be a random topic that I described. Generate 1 unique Youtube search queries that are focused on videos for someone to sleep to, like crime documentaries, unsolved mysteries, sports stories, random facts, animal documentaries. Do not include sleep or bedtime in the query."
        });
        return response.data;
    } catch (error) {
        console.error('Error generating queries:', error);
        throw new Error('Failed to generate queries');
    }
};

// Function to fetch videos from YouTube based on a random query
export const fetchNewVideo = async (randomQuery) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&maxResults=50&part=snippet&type=video&q=${encodeURIComponent(randomQuery)}`);
        if (response.data.items && response.data.items.length > 0) {
            return response.data.items[0];
        } else {
            throw new Error("No videos found for the selected query");
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw new Error("Error fetching videos");
    }
};


