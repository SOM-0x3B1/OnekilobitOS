function dropdown(id){
	let drop = document.getElementById(id);
	let icon = document.getElementById(id+'i');

	if (drop.style.display == "none") {
		drop.style.display = "block"
		icon.src = "media/arrowUp.png";
	}
	else{
		drop.style.display = "none"
		icon.src = "media/arrowDown.png";
	}
}