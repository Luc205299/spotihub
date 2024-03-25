// Accueil.js

import React, { useEffect } from 'react';
import logo from './logo.png'; // Assurez-vous que le chemin d'accès au logo est correct

function Accueil() {
  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data");
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      if (accessToken) {
        console.log("Fetching profile");
        const profile = await fetchProfile(accessToken);
        console.log("Populating UI");
        populateUI(profile);
        refreshTopArtists(accessToken);
      }
    }
    fetchData();
  }, []);

  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  }

  function populateUI(profile) {
    // Mettez à jour les éléments de l'interface utilisateur avec les informations du profil
    document.getElementById("displayName").innerText = profile.display_name;
    localStorage.setItem('username', profile.display_name);
    localStorage.setItem('email', profile.email);

    if (profile.images[0]) {
      const profileImage = new Image(200, 200);
      profileImage.src = profile.images[0].url;
      profileImage.height = "40";
      profileImage.width = "40";
      document.getElementById("avatar").appendChild(profileImage);
    }
  }

  async function refreshTopArtists(token) {
    const topArtists = await fetchTop(token, 'artists', "short_term");
    populateUI_artist(topArtists, 'topArtists');
  }

  async function fetchTop(token, type, time_range = 'short_term') {
    const result = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=1&offset=0`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  }

  function populateUI_artist(top, id) {
    const list = document.getElementById(id);
    list.innerHTML = ''; // Clear the list before populating it

    if (top.items.length > 0) {
      const itemName = top.items[0].name;
      list.innerText = itemName;
      const art_id = top.items[0].id;
      var iframe = document.getElementById("artist");
      iframe.src = `https://open.spotify.com/embed/artist/${art_id}?utm_source=generator`;
    } else {
      list.innerText = `No top ${id} found`;
    }
  }

  return (
    <div>
      <div className="sidebar">
        <a href="accueil.html">
          <img src={logo} alt="Logo" className="logo" width="200" height="200" /></a>
        <h2 className="header-title">SpotiHub</h2>
        <a href="accueil">Home Page</a>
        <a href="playlist_hub.html">Playlist Creator</a>
        <a href="Statistique.html">Statistics</a>
        <a href="logout.html">Log out</a>
      </div>

      <div className="main-content">
        <h3 id="profile"><span id="avatar" className="profile-image"></span><span id="displayName"></span></h3>
        <h2>Create a playlist with your friends !</h2>
        <p>Your favorite artist of the moment: <span id="topArtists"></span></p>
        <iframe id="artist" style={{ borderRadius: '12px' }} src="" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </div>
  );
}

export default Accueil;
