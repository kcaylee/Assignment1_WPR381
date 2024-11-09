// Arlo W Roos: 577441
// Luan Davel: 577364
// Sinoyolo Londiwe Mabuza: 577768
// Kaylee Carstens: 577331


const readline = require("readline"); // Install the readline package to read input from the console

// Function to dynamically import node-fetch as it is an ES module 
const importFetch = async () => {
    const { default: fetch } = await import("node-fetch");
    return fetch;
}

// Create an interface for reading input from console
const readinput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Creating function to get an Access Token including error handling.
const _getToken = async (clientId, clientSecret) => {
    const fetch = await importFetch(); // Dynamically import node-fetch

    try {
        const credentials = `${clientId}:${clientSecret}`;
        const encodedCredentials = Buffer.from(credentials).toString('base64');

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedCredentials}`
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            })
        });

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        const data = await result.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
};

// Creating function to search for a song using an API including error handling.
const _searchSong = async (accessToken, trackEndPoint) => {
    const fetch = await importFetch(); // Import node-fetch
    try {
        const searchUrl = 'https://api.spotify.com/v1/search';
        const query = encodeURIComponent(trackEndPoint);
        const type = 'track';
        const result = await fetch(`${searchUrl}?q=${query}&type=${type}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        const data = await result.json();
        // If tracks are not found
        if (!data.tracks || !data.tracks.items || data.tracks.items.length === 0) {
            console.log("No Songs were found with the name that you entered");
            return;
        } else {
            const artistId = data.tracks.items[0].artists[0].id;
            const artistName = data.tracks.items[0].artists[0].name;
            const songName = data.tracks.items[0].name;
            const previewLink = data.tracks.items[0].external_urls.spotify;
            const albumName = data.tracks.items[0].album.name;

            // Get artist details
            const artistDetails = await _getArtistDetails(accessToken, artistId);

            console.log('Artist:', artistName);
            console.log('Song:', songName);
            console.log('Album:', albumName);
            console.log('Preview Link:', previewLink);
            console.log('Genres:', artistDetails.genres.join(', '));
        }
        return data;

    } catch (error) {
        console.error('Error searching for song:', error);
    }
};

// Creating function to get artist details
const _getArtistDetails = async (accessToken, artistId) => {
    const fetch = await importFetch(); // Import node-fetch
    try {
        const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
        const result = await fetch(artistUrl, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        const data = await result.json();
        return data;

    } catch (error) {
        console.error('Error fetching artist details:', error);
    }
};

// Creating API controller function that sends client ID and client secret to get an access token and then searches for a song.
const APIController = async () => {
    const clientId = '318641214040481cbf4b7f75cc05e233';
    const clientSecret = '61613ba80b164cbf84308f7c4505324e';

    // Get access token
    const token = await _getToken(clientId, clientSecret);
    if (!token) {
        console.error('Could not get access token.');
        return;
    }

    // Search for a song
    readinput.question("Please enter the song you are looking for: ", async (trackEndPoint) => {
        readinput.close();
        await _searchSong(token, trackEndPoint);
    });
};

APIController();
