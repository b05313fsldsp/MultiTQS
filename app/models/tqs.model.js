//var mongoose = require('mongoose')
//var SchemaTypes = mongoose.Schema.Types;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      status: String, // title
      concentration: Number,  // SN
      temp2: Number,  // CANID
      tanklevel: Number, // SPN1761
      tqstimestamps: String, // TTIMESTAMP
      // createdAt:String

    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tqs = mongoose.model("tqs", schema);
  return Tqs;
};
