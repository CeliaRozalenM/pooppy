const { binModel } = require("../models");

class BinProvider {

  async findAll() {
    const bins = binModel.find();
    return await bins;
  };

  async findBinById(id) {
    const bin = await binModel.findById(id);
    return bin;
  };

  async updateBin(id, info) {
    var binChange = await binModel.findOneAndUpdate({ _id: id }, { $set: { bag: info } }, (err, doc) => {
      if (err) {
        console.log("Something went wrong finding the data!");
      }

      console.log("The inserted data is: " + doc);
    })
    return binChange;
  }
  async findByUser(arrayBin) {
    const bins = await binModel.find({ _id: arrayBin });
    await console.log("The bin list for this user is: " + bins);
    return await bins;
  };
}

module.exports = new BinProvider;