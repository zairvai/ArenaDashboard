
exports.validate = (fieldName,value,{required,email,mobile,password,equalTo,minLen,maxLen}) => {

    if(required && !value) return `${fieldName} is required`

    if(minLen && value.length < minLen) return `${fieldName} must be atleast ${minLen} characters`
    if(maxLen && value.length > maxLen) return `${fieldName} must not exceed ${maxLen} characters`

    if(email && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return "Please type valid and proper email address"

    if(password && !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) return "Password must be atleast 8 characters consists of lowercase letters, uppercase letters and numbers"

    if(mobile && !value.match(/^[1-9]\d{0,14}$/)) return "Please type valid phone number without leading 0"

    if(equalTo && value!==equalTo.value) return `${fieldName} must be in the same value as ${equalTo.fieldName}`

    return null
}
