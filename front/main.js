const loginBtn = document.getElementById('login-button')
const signUpBtn = document.getElementById('sign-up-button')
const loginUser = document.getElementById('login-username')
const loginPass = document.getElementById('login-password')


const baseURL = 'http://localhost:4000/password-manager'

const login = () =>{
    axios.post(baseURL)
        .then((request)=>{
            console.log(request.data)
            console.log("success")
            loginLink()
        }).catch(error => {
            console.log(error)
            alert("Sorry Wrong username or password")
    })
}

function loginLink () {
    let x = prompt('click')
    let testWindow = window.open('user.html', '_self');
    testWindow.addEventListener('click', login)
}

const loginHandler = (e) =>{
    e.preventDefault()
    let userObj = {
        loginUser: loginUser.value,
        loginPass: loginPass.value
    }

    login(userObj)
}

const signIn = (body) => {
    axios.post(`${baseURL}`, body)
        .then((res)=>{
            console.log(res)
        })
        .catch(err => {console.log(err)})
}
loginBtn.addEventListener('click', login)
signUpBtn.addEventListener('click', signIn)

const signInHandler = (e) => {
    e.preventDefault()

    let firstName = document.getElementById('form-name')
    let lastName = document.getElementById('form-lastname')
    let userName = document.getElementById('form-username')
    let email = document.getElementById('form-email')
    let password = document.getElementById('form-password')
    let confirmPassword = document.getElementById('form-confirm')

    let bodyObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.vallue,
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






