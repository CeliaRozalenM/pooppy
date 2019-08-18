const bcrypt = require('bcrypt');

const { userModel } = require("../models");

const binProvider = require("./bin");

var service = require('../services/jwt');

class UserProvider {

  async getFavoriteBinList(userId) {
    var favoriteBinsInfo = [];
    let binList = [];
    let resolvedFinalArray;
    console.log("getfavoriteBinlist favoriteBins: " + userId);
    var infoUser = await userModel.findById(userId, (error, usuario) => {
      console.log("getfavoriteBinlist favoriteBins: " + usuario);
      var info = usuario.favoriteBins.map((binId) => {
        let binInfo = binProvider.findBinById(binId);
        favoriteBinsInfo.push(binInfo);
        return favoriteBinsInfo;
      });

      resolvedFinalArray = Promise.all(info);

      return resolvedFinalArray;
    });
    await infoUser.favoriteBins.forEach(element => {
      if (element != null) {
        binList.push(element);
      }
    });
    //     await console.log(binList);

    return await binList;
  }

  async addFavoriteBin(userId, idBin) {
    console.log("add favorite userid + idbin: " + userId + ", " + idBin);
    let binChange = await userModel.findByIdAndUpdate(
      userId,
      { $push: { favoriteBins: idBin } },
      { new: true }
    );
    return binChange;
  }

  async deleteFavoriteBin(idUser, idBin) {
    let binChange = await userModel.update(
      { _id: idUser },
      { $pull: { favoriteBins: { $in: idBin } } }
    );
    return binChange;
  }

  login(req, res) {
    userModel.find({ email: req.body.user.email }, (err, user) => {
      console.log('Recibe' + user);
      if (err) return res.status(500).send({ message: err })
      if (user.length === 0 || user == null) {
        return res.status(200).send(new userModel());
      } else {
        console.log("Usuario en login " + user[0]);
        return res.status(200).send(user[0]);
        /*      
             bcrypt.compare(req.body.password, user[0].password, function (err, check) {
               console.log(user[0].password);
               if (check) {
                 return res.status(200).send({
                   message: "Te has logado correctamente",
                   token: service.createToken(user)
                 })
               } else {
                 return res.status(200).send({ message: "Usuario o clave incorrecta" })
               }
             });
      }) */
      }
    })
  }

  async register(req, res) {
    if (userExists(req.body.email)) {
      res.status(200).send({ message: 'This user already exists' })
    }
    var saltRounds = 10;
    await bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const user = new userModel({
        email: req.body.email,
        password: hash
      });

      await user.save((err) => {
        if (err) res.status(500).send({
          message: `Error adding user: $(err)`
        })
        res.status(200).send({ token: service.createToken(user) })
      });

    });
  }

  userExists(userEmail) {
    userModel.find({ email: userEmail }, function (err, user) {
      if (user.length) {
        return true;
      } else {
        return false;
      }
    })
  }
}
module.exports = new UserProvider();
