const    AlpaNum="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const generateCode=()=>{
    let code=""
    for(let x=0;x<16;x++){
        code+=AlpaNum[Math.floor(Math.random()*AlpaNum.length)];
    }
    return code
}

generateCode()
export  default generateCode