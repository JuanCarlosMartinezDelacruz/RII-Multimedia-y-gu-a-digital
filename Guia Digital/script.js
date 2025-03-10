// Constantes nuevas - añadir al principio del archivo
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
const API_KEY = 'AIzaSyD_49LYiO6wNMa-RBclHOHG4x-7CjxSDPM'; // Reemplaza esto con tu API Key real

const videos = [
    { id: 2, category: 'Cómo ESTUDIAR en la UNIVERSIDAD', src: 'https://www.youtube.com/embed/E6w8IQSPIOI' },
    { id: 2, category: 'Cómo Memorizar y Aprender más Rápido', src: 'https://www.youtube.com/embed/MLzrI6WYw3I' },
    { id: 2, category: 'La Técnica de Feynman', src: 'https://www.youtube.com/embed/inZe9kW5djI' },
    { id: 2, category: '¿Cómo MEJORAR tu manera de Estudiar?', src: 'https://www.youtube.com/embed/MAjm9Sfc9Mg' },

    { id: 2, category: 'Cómo activar ficha en SUBES', src: 'https://www.youtube.com/embed/r2bfjAp84DQ' },
    { id: 3, category: '¿Qué es la Maquetación web?', src: 'https://www.youtube.com/embed/zUplFZOc52g' },
    { id: 4, category: 'Está IA crea WIREFRAMES en segundos... Para figma', src: 'https://www.youtube.com/embed/WkQ9SeCdOL0' },
    { id: 5, category: '¿Cómo usar Figma? PlayList', playlistId: 'PLwnhGyiGaUscc6NRBbdwSjACJoNT22Vta', firstVideoId: 'QYTG-oI2h1Q' },
    { id: 1, category: 'Como quitar el encabezado de página en solo una hoja en Word', src: 'https://www.youtube.com/embed/Vh9KlKZ5HnM' },
    { id: 1, category: 'Como eliminar una hoja en blanco en Word', src: 'https://www.youtube.com/embed/xxZXfT9OqYw' },
    { id: 1, category: 'Cómo Incluir Números de Páginas en las Citas Textuales en APA 7ma Edición', src: 'https://www.youtube.com/embed/IU_zeRFD5rY' },
    { id: 1, category: 'EJEMPLO de Cómo CITAR una PÁGINA WEB según NORMAS APA 7ma,', src: 'https://www.youtube.com/embed/vkYbMuyepRk' },
    { id: 1, category: 'Paso a Paso Cómo HACER una CITA TEXTUAL LARGA según NORMAS APA 7ma.', src: 'https://www.youtube.com/embed/ejtyq4uOsXs' },
    { id: 1, category: 'Cómo instalar IntelliJ IDEA', src: 'https://www.youtube.com/embed/cnEJxLxOcds' },
    { id: 7, category: 'Abstracción, Encapsulamiento, Herencia, Polimorfismo.', src: 'https://www.youtube.com/embed/SI7O81GMG2A'},
    { id: 8, category: 'Aprende a PROGRAMAR en java en 5 minutos', src: 'https://www.youtube.com/embed/STVXkRO4LZY' },
    { id: 8, category: 'Aprende JAVA en 15 minutos 🔴', src: 'https://www.youtube.com/embed/_L7IxAwEgrY' },
    { id: 9, category: 'Aprende Java Ahora! curso completo desde cero para principiantes', src: 'https://www.youtube.com/embed/b0NHh8RNWK4' },
    { id: 10, category: 'Aprende Java en 15 Minutos ☕', src: 'https://www.youtube.com/embed/8iTO-BPkD5M' },
    { id: 11, category: 'CURSO DE JAVA Desde CERO PlayList', playlistId: 'PLO8lO9oepSLtbDS6pZV3Wh4uyN4K9t4Po', firstVideoId: 'ianRyf1uZgg' },


    

    

];

const themeToggle = document.getElementById('themeToggle');
const categoryBtns = document.querySelectorAll('.category-btn');
const contentGrid = document.getElementById('contentGrid');
const mediaOverlay = document.getElementById('mediaOverlay');
const mediaContent = document.getElementById('mediaContent');
const playlistContainer = document.getElementById('playlistContainer');
const playlist = document.getElementById('playlist');
const closeMediaBtn = document.getElementById('closeMedia');
const homeButton = document.getElementById('homeButton');

function toggleTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
}

function renderContent(category) {
    contentGrid.innerHTML = '';
    renderVideos();
}

function renderVideos() {
    videos.forEach(video => {
        contentGrid.appendChild(createVideoCard(video));
    });
}

function createVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';

    let thumbnailSrc;
    if (video.playlistId && video.firstVideoId) {
        thumbnailSrc = `https://img.youtube.com/vi/${video.firstVideoId}/0.jpg`;
    } else {
        thumbnailSrc = `https://img.youtube.com/vi/${getYouTubeVideoId(video.src)}/0.jpg`;
    }

    videoCard.innerHTML = `
        <div class="video-thumbnail">
            <img src="${thumbnailSrc}" alt="${video.category}">
            <div class="play-button"></div>
        </div>
        <div class="video-info">
            <h3>${video.category}</h3>
        </div>
    `;

    if (video.playlistId) {
        videoCard.addEventListener('click', () => openMedia(null, 'playlist', video.playlistId));
    } else {
        videoCard.addEventListener('click', () => openMedia(video.src, 'video'));
    }

    return videoCard;
}

function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Función modificada
async function openMedia(src, type, playlistId = null) {
    mediaOverlay.style.display = 'flex';
    
    if (type === 'video') {
        // Añadimos autoplay=1 y mute=1 a la URL del video
        const autoplaySrc = src.includes('?') ? `${src}&autoplay=1&mute=1` : `${src}?autoplay=1&mute=0`;
        mediaContent.innerHTML = `<iframe src="${autoplaySrc}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        renderPlaylist();
    } else if (type === 'playlist') {
        // Añadimos autoplay=1 y mute=1 a la URL de la playlist
        mediaContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${playlistId}?list=${playlistId}&autoplay=1&mute=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        await fetchAndRenderPlaylist(playlistId);
    }
}
// Función nueva
async function fetchAndRenderPlaylist(playlistId) {
    const cachedData = getCachedPlaylist(playlistId);
    if (cachedData) {
        renderFetchedPlaylist(cachedData);
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`);
        const data = await response.json();
        cachePlaylist(playlistId, data.items);
        renderFetchedPlaylist(data.items);
    } catch (error) {
        console.error('Error fetching playlist:', error);
        renderPlaylist(); // Fallback to default playlist
    }
}

// Función nueva
function getCachedPlaylist(playlistId) {
    const cachedData = localStorage.getItem(`playlist_${playlistId}`);
    if (cachedData) {
        const { timestamp, items } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
            return items;
        }
    }
    return null;
}

// Función nueva
function cachePlaylist(playlistId, items) {
    const cacheData = {
        timestamp: Date.now(),
        items: items
    };
    localStorage.setItem(`playlist_${playlistId}`, JSON.stringify(cacheData));
}

// Función nueva
function renderFetchedPlaylist(playlistItems) {
    playlistContainer.style.display = 'block';
    playlist.innerHTML = '';

    playlistItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'video-card';

        const thumbnailSrc = item.snippet.thumbnails.default.url;
        const videoId = item.snippet.resourceId.videoId;

        li.innerHTML = `
            <img src="${thumbnailSrc}" alt="${item.snippet.title}">
            <span>${item.snippet.title}</span>
        `;

        li.addEventListener('click', () => {
            // Añadimos autoplay=1 y mute=1 a la URL del video
            mediaContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0" frameborder="0" allowfullscreen></iframe>`;
        });

        playlist.appendChild(li);
    });
}

function renderPlaylist() {
    playlistContainer.style.display = 'block';
    playlist.innerHTML = '';

    videos.forEach(video => {
        const li = document.createElement('li');
        li.className = 'video-card';

        let thumbnailSrc;
        if (video.playlistId && video.firstVideoId) {
            thumbnailSrc = `https://img.youtube.com/vi/${video.firstVideoId}/0.jpg`;
        } else {
            thumbnailSrc = `https://img.youtube.com/vi/${getYouTubeVideoId(video.src)}/0.jpg`;
        }

        li.innerHTML = `
            <img src="${thumbnailSrc}" alt="${video.category}">
            <span>${video.category}</span>
        `;

        li.addEventListener('click', () => {
            if (video.playlistId) {
                // Añadimos autoplay=1 y mute=1 a la URL de la playlist
                mediaContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${video.firstVideoId}?list=${video.playlistId}&autoplay=1&mute=0" frameborder="0" allowfullscreen></iframe>`;
            } else {
                // Añadimos autoplay=1 y mute=1 a la URL del video
                const autoplaySrc = video.src.includes('?') ? `${video.src}&autoplay=1&mute=0` : `${video.src}?autoplay=1&mute=1`;
                mediaContent.innerHTML = `<iframe src="${autoplaySrc}" frameborder="0" allowfullscreen></iframe>`;
            }
        });

        playlist.appendChild(li);
    });
}

function closeMedia() {
    mediaOverlay.style.display = 'none';
    mediaContent.innerHTML = '';
    playlist.innerHTML = '';
}

themeToggle.addEventListener('click', toggleTheme);

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderContent(btn.dataset.category);
    });
});

closeMediaBtn.addEventListener('click', closeMedia);

mediaOverlay.addEventListener('click', (e) => {
    if (e.target === mediaOverlay) {
        closeMedia();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mediaOverlay.style.display === 'flex') {
        closeMedia();
    }
});

renderContent('Todo');