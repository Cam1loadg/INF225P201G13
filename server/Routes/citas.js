const router = require('express').Router();
let Cita = require('../Models/cita.model');

const validateRut = (rut) => {
    const regex = /^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/;
    if (!regex.test(rut)) return false;
  
    const [rutBody, dv] = rut.split('-');
    return calculateDv(rutBody) === dv;
};
  
  const calculateDv = (rut) => {
    const cleanRut = rut.replace(/\./g, '');
    let total = 0;
    let factor = 2;
  
    for (let i = cleanRut.length - 1; i >= 0; i--) {
      total += parseInt(cleanRut.charAt(i)) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
  
    const remainder = total % 11;
    const dv = 11 - remainder;
  
    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
};

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

    const now = new Date();
    now.setHours(now.getHours() + 1);

    if (!validateRut(rut) || rut.length < 11) {
        return res.status(401).json({ message: 'Invalid RUT format' });
    }

    if (fecha < now.getTime()) {
        return res.status(401).json('Error: La fecha y hora de la cita deben ser al menos una hora del tiempo actual.');
    }

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
        const nuevaFecha = Date.parse(req.body.fecha);

        const now = new Date();
        now.setHours(now.getHours() + 1);

        if (nuevaFecha < now.getTime()) {
            return res.status(400).json('Error: La fecha y hora de la cita deben ser al menos una hora del tiempo actual.');
        }

        cita.fecha = nuevaFecha;

        cita.save()
        .then(() => res.json('Cita updated successfully'))
        .catch(err => res.status(400).json('Error updating cita: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;