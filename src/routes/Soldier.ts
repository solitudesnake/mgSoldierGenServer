import express from 'express';
import controller from '../controllers/Soldier';
import { Schemas, ValidateJoi } from '../middleware/joi';

const router = express.Router();

router.post('/createCustom', ValidateJoi(Schemas.soldier.create), controller.createCustomSoldier);
router.post('/createRandom', controller.createRandomSoldier);
// router.get('/get/:soldierId', controller.readSoldier);
router.get('/get', controller.readAll);
router.patch('/update/:soldierId', ValidateJoi(Schemas.soldier.update), controller.updateSoldier);
router.delete('/delete/:soldierId', controller.deleteSoldier);

export = router;
