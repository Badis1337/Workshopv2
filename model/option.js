var mongoose=require('mongoose');
var OptionSchema=mongoose.Schema({

    nom: {
        type :String,

        required: true
    } ,


score:{type: Number,
required: true}



});


var option = mongoose.model('Option',OptionSchema);

module.exports = option;