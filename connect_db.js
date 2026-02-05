import { connect } from "mongoose";

const connect_db=(mongo_uri)=>{
try {
    return connect(mongo_uri)
} catch (error) {
   console.log(error.message) 
}
}
export default connect_db