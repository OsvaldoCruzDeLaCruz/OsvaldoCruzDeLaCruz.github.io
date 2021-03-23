let nombre = document.getElementById('nombre');
let edad = document.getElementById('edad');
function saluda() {   
    const respuesta = `Hola ${nombre.value} de ${edad.value} años de edad`;
    alert(respuesta);
  }
