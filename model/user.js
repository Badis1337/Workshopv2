var mongoose=require('mongoose');
var userShema=mongoose.Schema({

    name: {
        type :String,
        default:  'user',
        required: true
    } ,

    age :{
        type : Number,
        min : 15 ,
        max : 30 ,
        required: true
    },

    classe:String,

    adresse:String,
    password:String ,
    option:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Option'
    }
});


var user = mongoose.model('User',userShema);

module.exports = user;