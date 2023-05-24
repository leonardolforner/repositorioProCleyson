import express from 'express';
import controller from '../controllers/controllers';
const router = express.Router();

//spaceships
router.get("/starships",controller.getAllStarships)
router.get("/starships/:sId", controller.getStarship)
//people
router.get("/people", controller.getAllPeople)
router.get("/people/available", controller.getAvailablePeople)
router.get("/people/:pId", controller.getPeople)
//crew
router.put("/crew/:sId/:cId", controller.createCrew)
router.put("/crew/add/:sId/:pId", controller.addToCrew)
router.delete("/crew/deleteFrom/:sId/:pId", controller.deleteFromCrew)
router.delete("/crew/delete/:sId", controller.deleteCrew)

export = router;