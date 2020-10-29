let db_rui = "mongodb+srv://" + process.env.ATLAS_NAME + ":" + process.env.ATLAS_PWD + "@mongodbserver.ljazu.mongodb.net/a2?retryWrites=true&w=majority";

module.exports =
{
    "URI": db_rui
}