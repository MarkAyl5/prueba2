function register(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const rol = document.getElementById('rol').value;
    const comision = document.getElementById('comision').value;
    const fechaDeInscripcion = document.getElementById('fechaDeInscripcion').value;

    fetch('http://localhost:3000/api/estudiantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, rol, comision, fechaDeInscripcion })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.getElementById('formulario-inscripcion').reset();
    })
    .catch(error => console.error('Error al inscribirse:', error));
}







