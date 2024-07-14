const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = process.env.MYSQL_ADDON_PORT || 3000;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQ_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT  
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});


app.post('/api/estudiantes', (req, res) => {
    const { nombre, rol, comision, fechaDeInscripcion } = req.body;

    const query = 'INSERT INTO estudiantes (nombre, rol, comision, fechaDeInscripcion) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, rol, comision, fechaDeInscripcion], (err, result) => {
        if (err) {
            console.error('Error al agregar el estudiante:', err);
            res.status(500).send('Error al agregar el estudiante.');
            return;
        }
        res.status(201).json({ success: true, message: 'Estudiante agregado.' });
    });
});


app.get('/api/estudiantes', (req, res) => {
    const query = 'SELECT * FROM estudiantes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los estudiantes:', err);
            res.status(500).send('Error al obtener los estudiantes.');
            return;
        }
        res.json(results);
    });
});


app.put('/api/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, rol, comision, fechaDeInscripcion } = req.body;

    const query = 'UPDATE estudiantes SET nombre = ?, rol = ?, comision = ?, fechaDeInscripcion = ? WHERE id = ?';
    connection.query(query, [nombre, rol, comision, fechaDeInscripcion, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el estudiante:', err);
            res.status(500).send('Error al actualizar el estudiante.');
            return;
        }
        res.send('Estudiante actualizado.');
    });
});


app.delete('/api/estudiantes/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM estudiantes WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el estudiante:', err);
            res.status(500).send('Error al eliminar el estudiante.');
            return;
        }
        res.send('Estudiante eliminado.');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});





