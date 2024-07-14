document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderTable();

    document.getElementById('filtro-nombre').addEventListener('change', filtrarTabla);
    document.getElementById('filtro-comision').addEventListener('change', filtrarTabla);

    function fetchAndRenderTable() {
        fetch('http://localhost:3000/api/estudiantes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud fetch ha fallado');
                }
                return response.json();
            })
            .then(data => {
                renderTable(data); 
            })
            .catch(error => {
                console.error('Error al obtener los estudiantes:', error);
                
            });
    }

    function renderTable(data) {
        const tableBody = document.getElementById('cuerpo-tabla');
        tableBody.innerHTML = ''; 

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.rol}</td>
                <td>${item.comision}</td>
                <td>${formatDate(item.fechaDeInscripcion)}</td>
                <td>
                    <button id="boton-edicion" onclick="editarEstudiante(${item.id})">Editar</button>
                    <button id="boton-eliminar" onclick="eliminarEstudiante(${item.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('es-ES'); 
    }

    window.editarEstudiante = function(id) {
        
        const nombre = prompt("Nuevo nombre:");
        const rol = prompt("Nuevo rol:");
        const comision = prompt("Nueva comisión:");


        const fechaDeInscripcion = prompt("Nueva fecha de inscripción (YYYY-MM-DD):");

        fetch(`http://localhost:3000/api/estudiantes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                rol,
                comision,
                fechaDeInscripcion
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Estudiante actualizado:', data);
            fetchAndRenderTable(); 
        })
        .catch(error => {
            console.error('Error al actualizar el estudiante:', error);
        });
    }

    window.eliminarEstudiante = function(id) {
        fetch(`http://localhost:3000/api/estudiantes/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Estudiante eliminado:', data);
            fetchAndRenderTable(); 
        })
        .catch(error => {
            console.error('Error al eliminar el estudiante:', error);
        });
    }

    function filtrarTabla() {
        const filtroNombre = document.getElementById('filtro-nombre').value.toLowerCase();
        const filtroComision = document.getElementById('filtro-comision').value;
        const rows = document.getElementById('cuerpo-tabla').getElementsByTagName('tr');

        Array.from(rows).forEach(row => {
            const nombre = row.getElementsByTagName('td')[0];
            const comision = row.getElementsByTagName('td')[2];

            const nombreMatches = filtroNombre === 'todos' || nombre.textContent.toLowerCase().startsWith(filtroNombre);
            const comisionMatches = filtroComision === 'todos' || comision.textContent === filtroComision;

            if (nombreMatches && comisionMatches) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});
















