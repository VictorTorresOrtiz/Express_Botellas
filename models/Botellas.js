"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const botellaSchema = new Schema({
  id: String,
  nombre: String,
  tipo: String,
  graduacion: String,
  calidad: String,
});

//Creación Modelo
const Botellas = mongoose.model("Botellas", botellaSchema, "botellas");

module.exports = Botellas;
