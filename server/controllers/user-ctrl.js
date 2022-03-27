const UserModel = require('../models/user-model')

// Headers to overcome cross browser validation block by cors:
let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));


constructUsrId = (user) => user.firstName + '_' + user.lastName

createUser = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            headers: headers,
            success: false,
            error: 'You must provide valid user details..',
        })
    }

    const user = new UserModel(body)

    if (!user) {
        return res.status(400).json({ headers: headers, success: false, error: err })
    }
    user
        .save()
        .then(() => {

            return res.status(201).json({
                headers: headers,
                success: true,
                id: user._id,
                message: 'User saved to db!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                headers: headers,
                error,
                message: 'User not saved!',
            })
        })
}

setUserStatus = async(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            headers: headers,
            success: false,
            error: 'You must provide a body to set the user status!',
        })
    }
    // req.params.id
    UserModel.findOne({ _id: constructUsrId(req.params) }, (err, user) => {
        if (err) {
            return res.status(404).json({
                headers: headers,
                err,
                message: 'user not found!',
            })
        }
        user.status = body.status
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    headers: headers,
                    success: true,
                    id: constructUsrId(user),
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async(req, res) => {
    await UserModel.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ headers: headers, success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ headers: headers, success: false, error: `User not found` })
        }

        return res.status(200).json({ headers: headers, success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async(req, res) => {
    await UserModel.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `No such user found` })
        }
        return res.status(200).json({


            headers: headers,
            success: true,
            data: users
        })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    setUserStatus,
    deleteUser,
    getUsers
}