const express = require("express");
const router = express.Router();
const Botellas = require("../models/Botellas");

router.get("/", async (req, res) => {
  try {
    const arrayBotellasDB = await Botellas.find();
    console.log(arrayBotellasDB);
    res.render("botellas", { arrayBotellas: arrayBotellasDB });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body
  console.log(body);
  try {
    const botellasDB = new Botellas(body)
    await botellasDB.save()
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
});

router.get("/crear", (req, res) => {
  res.render("crear")
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  
  try {
    const botellasDB = await Botellas.findOne({_id: id})
    res.render('detalle',{
      botellas : botellasDB,
      error: false
    })
  } catch (error) {
    console.log(error);
    res.render('detalle',{
      error: true,
      mensaje: 'Botella no encontrada'
    })
  }
});

router.delete('/:id', async (req, res) =>{
  const id = req.params.id;
  try{
    const botellasDB = await Botellas.findByIdAndDelete({_id: id});
    if(!botellasDB) {
      res.json({
        estado: false,
        mensaje: 'No se puede eliminar la Botella.'
      })
    }else{
      res.json({
        estado: true,
        mensaje: 'Botella eliminada.'
      })
    }
  }catch (error){
    console.log(error)
  }
});

router.put('/:id', async (req, res) =>{
  const id = req.params.id;
  const body = req.body;
  try{
    const botellasDB = await Botellas.findByIdAndUpdate(
      id,body, {useFindAndModify: false}
    )
    console.log(botellasDB)
    res.json({
      estado: true,
      mensaje: 'Botella editada.'
    })
  }catch (error){
    console.log(error)
    res.json({
      estado: false,
      mensaje: 'No se puede editar la Botella.'
    })
  }
});





module.exports = router;