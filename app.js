const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const inconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');
const botonAleatorio = document.querySelector('.controles button.aleatorio');
const botonRepetir = document.querySelector('.controles button.repetir');

const playlistContainer = document.getElementById("playlist-container");

const volumen = document.getElementById("volumen");

let canciones = [
	{
        titulo: "Five Nights at Freddy's",
        nombre: "The Living Tombstone",
        fuente: "music/fnaf_tlt.mp3"
    },
    {
        titulo: "It's Been So Long",
        nombre: "The Living Tombstone",
        fuente: "music/ibsl.mp3"
    },
    {
        titulo: "Join Us for a Bite (con Andrea Storm Kaden)",
        nombre: "JT Music",
        fuente: "music/jufb.mp3"
    },
    {
        titulo: "Bellow the Surface",
        nombre: "Griffinilla",
        fuente: "music/bts.mp3"
    }
];
let indiceCancionActual = 0;
let modoAleatorio = false;
let modoRepetir = false;

document.getElementById("musica-input").addEventListener("change", function(e){
	const files = Array.from(e.target.files);
	
	files.forEach(file => {
		const url = URL.createObjectURL(file);
		const nombreArchivo = file.name.replace(/\.[^/.]+$/, "");
		
		canciones.push({
			titulo: nombreArchivo,
			nombre: "Local File",
			fuente: url
		});
	});
	
	// Actualizar playlist siempre
	actualizarPlaylist();

	// SI NO hay nada reproduciéndose, inicializa en la 1° canción
	if (!cancion.src || cancion.src === "") {
		indiceCancionActual = 0;
		actualizarInfoCancion();
	}
});

function actualizarPlaylist() {
    playlistContainer.innerHTML = "";
    
    canciones.forEach((cancionItem, index) => {
        const li = document.createElement("li");
        li.textContent = `${cancionItem.titulo} - ${cancionItem.nombre}`;
        
        li.onclick = () => {
            indiceCancionActual = index;
            actualizarInfoCancion();
            reproducirCancion();
        };

        if (index === indiceCancionActual) {
            li.classList.add("active");
        }

        playlistContainer.appendChild(li);
    });
}

/*const canciones = [
    {
        titulo:'A Year Ago',
        nombre:'NEFFEX',
        fuente:'music/A Year Ago - NEFFEX.mp3'
    },
    {
        titulo:'As You Fade Away',
        nombre:'NEFFEX',
        fuente:'music/As You Fade Away - NEFFEX.mp3'
    },
    {
        titulo: "Catch Me If I Fall",
        nombre: "NEFFEX",
        fuente: "music/Catch Me If I Fall - NEFFEX.mp3",
    },
    {
        titulo: "Chasing",
        nombre: "NEFFEX",
        fuente: "music/Chasing - NEFFEX.mp3",
    },
    {
        titulo: "Play Dead",
        nombre: "NEFFEX",
        fuente: "music/Play Dead - NEFFEX.mp3",
    },
];*/

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
	cancion.loop = modoRepetir;
	actualizarPlaylist();
};

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion();
    }
};

function reproducirCancion(){
    cancion.play();
    inconoControl.classList.add('bi-pause-fill')
    inconoControl.classList.remove('bi-play-fill')
}

function pausarCancion(){
    cancion.pause();
    inconoControl.classList.remove('bi-pause-fill')
    inconoControl.classList.add('bi-play-fill')
}

/*cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});*/

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

cancion.addEventListener('ended', function(){
	if(modoRepetir){
		cancion.currentTime = 0;
		reproducirCancion();
		return;
	}
	
    if(modoAleatorio) {
		indiceCancionActual = obtenerIndiceAleatorio();
	} else{
		indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
	}
	
	actualizarInfoCancion();
	reproducirCancion();
});

function obtenerIndiceAleatorio() {
	let nuevoIndice;
	do{
		nuevoIndice = Math.floor(Math.random() * canciones.length);
	} while(nuevoIndice === indiceCancionActual && canciones.length > 1);
	return nuevoIndice;
}

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

progreso.addEventListener('change', ()=>{
    reproducirCancion();
});

botonAdelante.addEventListener('click', function(){
	if(modoRepetir){
		cancion.currentTime = 0;
		reproducirCancion();
		return;
	}
	
	if(modoAleatorio){
		indiceCancionActual = obtenerIndiceAleatorio();
	} else{
		indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
	}
	
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function(){
	if(modoRepetir){
		cancion.currentTime = 0;
		reproducirCancion();
		return;
	}
	
	if(modoAleatorio){
		indiceCancionActual = obtenerIndiceAleatorio();
	} else{
		indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length; //A
	}
    
    actualizarInfoCancion();
    reproducirCancion();
});

botonAleatorio.addEventListener('click', function(){
	if(modoAleatorio){
		modoAleatorio = false;
	} else{
		modoAleatorio = true;
		modoRepetir = false;
		botonRepetir.classList.remove("active");
	}
	
    botonAleatorio.classList.toggle("active");
	cancion.loop = modoRepetir;
});

botonRepetir.addEventListener('click', function(){
	if(modoRepetir){
		modoRepetir = false;
	} else{
		modoRepetir = true;
		modoAleatorio = false;
		botonAleatorio.classList.remove("active");
	}
	
    botonRepetir.classList.toggle("active");
	cancion.loop = modoRepetir;
});

volumen.addEventListener("input", () => {
    cancion.volume = volumen.value;
});

actualizarPlaylist();
actualizarInfoCancion();