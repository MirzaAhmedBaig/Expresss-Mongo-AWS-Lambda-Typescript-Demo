import mongo from "mongoose";
import { MONGO_URL } from '../utils/secrets'

function mongoConnect() {
    mongo.connect(MONGO_URL, { useNewUrlParser: true }).then(() => {
        console.log("DB created successfully");
    }).catch(err => {
        console.error("Error : " + err);
    });
}

export default mongoConnect;