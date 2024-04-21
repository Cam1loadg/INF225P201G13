const router = require('express').Router();
let Cita = require('../Models/cita.model');

router.route('/').get((req, res) => {
    Cita.find().then(citas => res.json(citas)).catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const nombre_paciente = req.body.nombre_paciente;
    const correo_paciente = req.body.correo_paciente;
    const rut = req.body.rut;
    const nombre_doctor = req.body.nombre_doctor;
    const fecha = Date.parse(req.body.fecha);
    const maquina = req.body.maquina;

    const nuevaCita = new Cita({nombre_paciente,correo_paciente,rut,nombre_doctor,fecha,maquina});

    nuevaCita.save()
        .then(() => res.json('Cita anadida!'))
        .catch(err => res.status(400).json('Error: ' + err))

});

router.route('/:id').get((req, res) => {
    Cita.findById(req.params.id)
    .then(cita => res.json(cita))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/rut/:rut').get((req, res) => {
    Cita.find({rut: req.params.rut})
    .then(cita => res.json(cita))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Cita.findByIdAndRemove(req.params.id)
    .then(() => res.json('Cita eliminada correctamente.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/modify/:id').put((req, res) => {
    Cita.findById(req.params.id)
    .then(cita => {
        // Update the cita object with the new data
        cita.fecha = req.body.fecha; // Update fecha with the new value

        // Save the updated cita object
        cita.save()
        .then(() => res.json('Cita updated successfully'))
        .catch(err => res.status(400).json('Error updating cita: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;