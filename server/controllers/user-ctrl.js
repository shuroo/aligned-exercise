const UserModel = require('../models/user-model')

const fetch = require("node-fetch");

let headers = new fetch.Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

// headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

// constructHeaders = () => {
//     let headers = new fetch.Headers();
//     headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     return headers;
// }

createUser = (req, res) => {
    const body = req.body
        // let headers = new Headers();
        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        // let headers = constructHeaders();
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
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            headers: headers,
            success: false,
            error: 'You must provide a body to set the user status!',
        })
    }
    // req.params.id
    UserModel.findOne({ _id: body.id }, (err, user) => {
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
                    message: 'User updated!',
                })
            })
            // Need to add 'clone' to mongoose due to the recent release notes - to avoid calling 'find' twice.
            // Reference: https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed 
            .clone().catch(function(err) { console.log(err) })
    })
}

deleteUser = async(req, res) => {
    await UserModel.findOneAndDelete({ _id: req.params.id }, (err, user) => {

        if (!user) {
            return res
                .status(404)
                .json({ headers: headers, success: false, error: `User not found` })
        }
        if (!err) {
            return res.status(200).json({ headers: headers, success: true, data: user })
        }
        // Need to add 'clone' to mongoose due to the recent release notes - to avoid calling 'find' twice.
        // Reference: https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
    }).clone().catch(function(err) { console.log(err) })
}

getUsers = async(req, res) => {
    await UserModel.find({}, (err, users) => {
        console.log("users::" + users)
        if (!err) {

            return res.status(200).json({


                headers: headers,
                success: true,
                data: users
            })
        }

        // Need to add 'clone' to mongoose due to the recent release notes - to avoid calling 'find' twice.
        // Reference: https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
    }).clone().catch(function(err) { console.log(err) })
}

module.exports = {
    createUser,
    setUserStatus,
    deleteUser,
    getUsers
}