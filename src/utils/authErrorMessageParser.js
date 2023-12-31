export default function(errorCode){

    switch(errorCode){

        case "auth/invalid-email":
            return("Geçersiz e-posta adresi")
        case "auth/user-not-found":
            return("Kullanıcı bulunamadı")
        case "auth/weak-password":
            return("Parola çok zayıf")
        case "auth/email-already-in-use":
                return("E-posta adresi zaten kullanılıyor")
        case "auth/invalid-login":
                return("Geçersiz giriş")  
            
        default :
            return(errorCode)    
    }
}