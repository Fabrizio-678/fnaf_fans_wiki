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

let canciones = [];
let indiceCancionActual = 0;
let modoAleatorio = false;

document.getElementById("musica-input").addListener("change", function(e){
	const files = Array.from(e.target.files);
	
	files.forEach(file => {
		const url = URL.createObjectURL(file);
		const nombreArchivo = file.name.replace(/\.[^/.]+$, "");
		
		canciones.push({
			titulo: nombreArchivo,
			nombre: "Local File",
			fuente: url
		});
	});
	
	actualizarPlaylist();
	if(canciones.length === files.length) {
		actualizarInfoCancion();
	}
});

function actualizarPlaylist() {
	playlistContainer.innerHTML = "";
	canciones.forEach((cancionItem, Index) => {
		const li = document.createElement("li");
		li.textContent = "${cancionItem.titulo} - ${cancionItem.nombre}"
		
		li.onclick = () =>{
			indiceCancionActual = index;
			actualizarInfoCancion();
			reproducirCancion();
		}
		
		if(index === indiceCancionActual) {
			li.classList.add("active");
		}
		
		playlistContainer.appendChild("li");
	})
}

const canciones = [
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
];

let indiceCancionActual = 0;

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
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

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

cancion.addEventListener('ended', function(){
    if(modoAleatorio) {
		indiceCancionActual = obtenerIndiceActual();
	} else{
		indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
	}
	
	actualizarInfoCancion();
	reproducirCancion();
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

progreso.addEventListener('change', ()=>{
    reproducirCancion();
});

botonAdelante.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAleatorio.addEventListener('click', function(){
	modoAleatorio = !modoAleatorio;
    botonAleatorio.classList.toggle("active");
});

botonRepetir.addEventListener('click', function(){
    botonRepetir.classList.toggle("active");
	
});

actualizarInfoCancion();
