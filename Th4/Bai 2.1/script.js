const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const terms = document.getElementById("terms")

const successMessage = document.getElementById("successMessage")

// regex
const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^0[0-9]{9}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/


// hiển thị lỗi
function showError(input, errorId, message){

 const error = document.getElementById(errorId)

 error.innerText = message

 input.classList.add("invalid")
 input.classList.remove("valid")

}

// xóa lỗi
function clearError(input, errorId){

 const error = document.getElementById(errorId)

 error.innerText=""

 input.classList.remove("invalid")
 input.classList.add("valid")

}


// validate fullname
function validateFullname(){

 const value = fullname.value.trim()

 if(value===""){
  showError(fullname,"fullnameError","Không được để trống")
  return false
 }

 if(value.length <3){
  showError(fullname,"fullnameError","Phải ≥ 3 ký tự")
  return false
 }

 if(!nameRegex.test(value)){
  showError(fullname,"fullnameError","Chỉ được chứa chữ cái")
  return false
 }

 clearError(fullname,"fullnameError")

 return true
}


// validate email
function validateEmail(){

 const value = email.value.trim()

 if(value===""){
  showError(email,"emailError","Không được để trống")
  return false
 }

 if(!emailRegex.test(value)){
  showError(email,"emailError","Email không hợp lệ")
  return false
 }

 clearError(email,"emailError")

 return true
}


// validate phone
function validatePhone(){

 const value = phone.value.trim()

 if(value===""){
  showError(phone,"phoneError","Không được để trống")
  return false
 }

 if(!phoneRegex.test(value)){
  showError(phone,"phoneError","SĐT phải 10 số bắt đầu bằng 0")
  return false
 }

 clearError(phone,"phoneError")

 return true
}


// validate password
function validatePassword(){

 const value = password.value

 if(value===""){
  showError(password,"passwordError","Không được để trống")
  return false
 }

 if(!passwordRegex.test(value)){
  showError(password,"passwordError","≥8 ký tự, có chữ hoa, chữ thường và số")
  return false
 }

 clearError(password,"passwordError")

 return true
}


// validate confirm password
function validateConfirm(){

 const value = confirmPassword.value

 if(value !== password.value){
  showError(confirmPassword,"confirmError","Mật khẩu không khớp")
  return false
 }

 clearError(confirmPassword,"confirmError")

 return true
}


// validate gender
function validateGender(){

 const genders = document.getElementsByName("gender")

 let checked = false

 genders.forEach(g=>{
  if(g.checked) checked=true
 })

 if(!checked){
  document.getElementById("genderError").innerText="Phải chọn giới tính"
  return false
 }

 document.getElementById("genderError").innerText=""
 return true
}


// validate terms
function validateTerms(){

 if(!terms.checked){
  document.getElementById("termsError").innerText="Phải đồng ý điều khoản"
  return false
 }

 document.getElementById("termsError").innerText=""
 return true
}


// submit form
form.addEventListener("submit",function(e){

 e.preventDefault()

 const valid =
 validateFullname() &
 validateEmail() &
 validatePhone() &
 validatePassword() &
 validateConfirm() &
 validateGender() &
 validateTerms()

 if(valid){

  form.style.display="none"

  successMessage.innerHTML =
  `<div class="success">
  Đăng ký thành công 🎉 <br>
  Xin chào ${fullname.value}
  </div>`

 }

})


// blur validation
fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirmPassword.addEventListener("blur",validateConfirm)


// input clear error
fullname.addEventListener("input",()=>clearError(fullname,"fullnameError"))
email.addEventListener("input",()=>clearError(email,"emailError"))
phone.addEventListener("input",()=>clearError(phone,"phoneError"))
password.addEventListener("input",()=>clearError(password,"passwordError"))
confirmPassword.addEventListener("input",()=>clearError(confirmPassword,"confirmError"))