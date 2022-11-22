const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');
const app = express();
const mongoose = require('mongoose');
const configdb = require('./../configdb');
const materia = require('./../data/schemas/materiaschema');

const path = require('path');


app.use('/public', express.static(__dirname + '/../public'));


//Conectamos a la DB.
mongoose.connect(configdb.db.url);


// parse body as json

app.use(bodyParser.json());


// all requests

app.use((req, res, next) => {

    console.log(`${req.method}: ${req.path} - ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)}`);

    next();

});

// get home


console.log("Adding routes...")

app.get('/api/materias', (req, res) => {
        materia.find(function(err, materias){
          if (err)
            res.send(err)
            res.json(materias); // return all in JSON format

          });


    });

 app.get('/', (req, res) => {            
	materia.find(function(err, materias){
		if (err)
        res.send(err)
        res.sendFile((path.resolve(__dirname + '/../public/index.html')))
        });
 });

// update materia by id

app.put('/api/materias/:id', async  (req, res) => {
	
	 const aSubject= await materia.findById(req.params.id)
	 aSubject.titulo=req.body.titulo;
	 aSubject.descripcion=req.body.descripcion;
	 aSubject.save()
	.then(async () => {
			await res.status(201).send(req.body);
})
.catch((err) => {
	if(err) {
		res.status(400).send(err);
	}
	 
});
});

// get materia by id

app.get('/api/materias/:id', async  (req, res) => {

   const aSubject= await materia.findById(req.params.id)

    
if (aSubject != null){
	res.status(200).send(aSubject);
}
else{
  res.status(404).send("Id no existente en la tabla");
};

});




// add new materia - Content Type: json
app.post('/api/materias', async (req, res) => {
  var myData = new materia(req.body);
  await myData.save()
.then(async () => {
	await res.status(201).send(req.body);
})
.catch((err) => {
	if(err) {
		res.status(400).send(err);
	}
});
});



//DELETE BY ID

app.delete('/api/materias/:id', async (req, res) => {
	

 	var aSubject= await materia.findByIdAndDelete(req.params.id);
 	
if (aSubject != null){
	res.status(200).send("materia con id" + req.params.id + " eliminada correctamente");
}
else{
  res.status(404).send("Id no existente en la tabla");
};

});



console.log("Routes Added!")

console.log("Index cargado")


// start server
app.listen(process.env.PORT || 3000, function () {
	console.log(process.env.PORT);
    console.log('API andando con express...');

});
