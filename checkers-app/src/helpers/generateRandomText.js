function GenerateRandomText(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKL@#$%&*()!~MNOPQRSTU+=-_.,:;~VWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 export default GenerateRandomText