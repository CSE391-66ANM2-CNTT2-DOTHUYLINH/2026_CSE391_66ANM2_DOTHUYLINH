// lấy phần tử
const fullname = document.getElementById("fullname")
const nameCounter = document.getElementById("nameCounter")

const password = document.getElementById("password")
const strengthBar = document.getElementById("strengthBar")
const strengthText = document.getElementById("strengthText")

const togglePass = document.getElementById("togglePass")

// ======================
// Đếm ký tự họ tên
// ======================

fullname.addEventListener("input", function(){

 const len = fullname.value.length

 nameCounter.innerText = len + "/50"

})


// ======================
// Thanh độ mạnh mật khẩu
// ======================

password.addEventListener("input", function(){

 const value = password.value

 let score = 0

 if(value.length >= 8) score++

 if(/[A-Z]/.test(value)) score++

 if(/[0-9]/.test(value)) score++

 if(/[!@#$%^&*]/.test(value)) score++


 if(score <= 1){

  strengthBar.style.width="33%"
  strengthBar.style.background="red"

  strengthText.innerText="Yếu"

 }

 else if(score <=3){

  strengthBar.style.width="66%"
  strengthBar.style.background="orange"

  strengthText.innerText="Trung bình"

 }

 else{

  strengthBar.style.width="100%"
  strengthBar.style.background="green"

  strengthText.innerText="Mạnh"

 }

})


// ======================
// Hiện / Ẩn mật khẩu
// ======================

togglePass.addEventListener("click", function(){

 if(password.type === "password"){

  password.type = "text"

 }

 else{

  password.type = "password"

 }

})