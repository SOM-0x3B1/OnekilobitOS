var detect = false;

function modal(src){    
	let modal = document.getElementById('modal');
	let image = document.getElementById('modalImage')

	image.src = src.substring(0, src.length - 5)+'.png';
	modal.style.display = "block";
	modal.style.backdropFilter = "blur(5px)";	
}

function closeModal(){
	let modal = document.getElementById('modal');
	let image = document.getElementById('modalImage')

	modal.style.display = "none";
	modal.style.backdropFilter = "blur(0px)";

	detect=false;
}

window.addEventListener('click', function(e){   
  if (document.getElementById('modalImage').contains(e.target)){

  }
  else if (detect){
    closeModal()
  }
  else{
  	detect = true;
  }
});