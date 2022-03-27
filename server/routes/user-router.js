const cors = require('cors');
const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

expressApp = express();
expressApp.use(cors());

expressApp.use(express.json());

router.post('/add', UserCtrl.createUser)
router.post('/status', UserCtrl.setUserStatus)
router.delete('/delete/:id', UserCtrl.deleteUser)
router.get('/', UserCtrl.getUsers)

module.exports = router