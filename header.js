window.addEventListener("scroll", function(){
	var header = document.querySelector("header");
	header.classList.toggle("abajo",window.scrollY>0);
})

const header = document.querySelector("header");
let prevY = window.scrollY;
window.addEventListener("scroll", function(){
	if(prevY > window.scrollY){
		header.classList.remove("off");
		//console.log("arriba");
	}else{
		header.classList.add("off");
		//console.log("abajo");
	}
	prevY = window.scrollY;
});