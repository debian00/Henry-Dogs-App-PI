const { Router } = require("express");//Importamos un Router de express
const router = Router();//Instanciamos un nuevo router.

//Importamos las funciones o handlers relacionadas con dogs.
const {
  allDogsHandler,//Obtiene la lista de todos los perros.
  dogsByIdHandler,//Obtiene la lista de los perros por id.
  createDogsHandler,//Crea o postea un nuevo Dog.
  deleteDogsHandler,
} = require("../handlers/dogsHandlers");

router.get("/", allDogsHandler);//Le pasamos al metodo get del router la ruta y el handler.

router.get("/:id", dogsByIdHandler)//Le pasamos al metodo get del router la ruta y el handler.

router.post("/", createDogsHandler);//Le pasamos al metodo post del router la ruta y el handler.

router.delete("/delete/:id", deleteDogsHandler);

module.exports = router;
