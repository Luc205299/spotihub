import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour la redirection

function Auth() {
    const navigate = useNavigate(); // Initialisez l'hook useNavigate

    useEffect(() => {
        const clientId = "552c348b386b4469803e29ad54738dba"; //Client ID de Tristan
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        const fetchAccessToken = async () => {
            if (!code) {
                await redirectToAuthCodeFlow(clientId);

            } else {
                const accessToken = await getAccessToken(clientId, code);
                console.log(accessToken);
                console.log("test1");
                localStorage.setItem('accessToken', accessToken);
                console.log(accessToken);
                // Rediriger vers la page Redirect après avoir récupéré l'access token
                navigate('/redirect'); // Rediriger vers la page de redirection
            }
        };

        fetchAccessToken();
    }, [navigate]); // Ajoutez navigate comme dépendance pour que useEffect soit déclenché lorsque navigate change

    // Les fonctions redirectToAuthCodeFlow, getAccessToken et autres restent les mêmes...
}


async function redirectToAuthCodeFlow(clientId) {
    console.log("test2");
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/redirect");
    params.append("scope", "user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(clientId, code) {
    console.log("test3");
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/redirect");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    console.log("fintok ",access_token);
    return access_token;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export default Auth;
