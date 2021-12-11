const signInBtn = document.getElementById('form')
const baseURL = `http://localhost:5432/password-manager`

const signIn = (body) => {
    axios.post(`${baseURL}/sign-in`, body)
        .then((res)=>{
            console.log(res.data)
        })
        .catch(err => {console.log(err, "user already exists")})
}

const signInHandler = (e) => {
    e.preventDefault()
    console.log(e.target)

    let firstName = document.getElementById('form-name')
    let lastName = document.getElementById('form-lastname')
    let userName = document.getElementById('form-username')
    let email = document.getElementById('form-email')
    let password = document.getElementById('form-password')
    let confirmPassword = document.getElementById('form-confirm')

    if(password.value !== confirmPassword.value){
        alert("wrong password")
    } else {
        let bodyObj = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }
        signIn(bodyObj)
        firstName.value = '';
        lastName.value = '';
        userName.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
    }
    confirmPassword.value = '';
}

signInBtn.addEventListener('submit', signInHandler)






