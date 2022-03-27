const cors = require('cors');
const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

expressApp = express();
expressApp.use(cors());

expressApp.use(express.json());

router.post('/users/add', UserCtrl.createUser)
router.put('/users/status', UserCtrl.setUserStatus)
router.delete('/users/delete/:id', UserCtrl.deleteUser)
router.get('/users', UserCtrl.getUsers)

module.exports = router