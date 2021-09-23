//Insert a document in the "user2" collection:
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";

const insert_massage = async (username,massage,time) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin");
        //insert data
        var data2 = { username:username ,massage:massage,time};
        dbo.collection("user2").insertOne(data2, function(err, res) {
            if (err) {throw err;}
            if(res){
                console.log("1 document inserted");
            } 
            db.close();
        });
    });
}
module.exports = {insert_massage}