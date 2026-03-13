let currentStep = 1

function showStep(){

document.querySelectorAll(".step").forEach(step=>{
step.classList.remove("active")
})

document.getElementById("step"+currentStep).classList.add("active")

updateProgress()

if(currentStep === 3){
showSummary()
}

}

function nextStep(){

if(!validateStep()) return

currentStep++

showStep()

}

function prevStep(){

currentStep--

showStep()

}

function updateProgress(){

const percent = (currentStep / 3) * 100

document.getElementById("progressBar").style.width = percent + "%"

}

function validateStep(){

if(currentStep === 1){

const name = document.getElementById("name").value
const birth = document.getElementById("birth").value
const gender = document.getElementById("gender").value

if(name === "" || birth === "" || gender === ""){
alert("Vui lòng nhập đầy đủ thông tin")
return false
}

}

if(currentStep === 2){

const email = document.getElementById("email").value
const pass = document.getElementById("password").value
const confirm = document.getElementById("confirmPassword").value

if(email === "" || pass === "" || confirm === ""){
alert("Vui lòng nhập đầy đủ thông tin")
return false
}

if(pass !== confirm){
alert("Mật khẩu không khớp")
return false
}

}

return true

}

function showSummary(){

const name = document.getElementById("name").value
const birth = document.getElementById("birth").value
const gender = document.getElementById("gender").value
const email = document.getElementById("email").value

document.getElementById("summary").innerHTML = `
<p><b>Họ tên:</b> ${name}</p>
<p><b>Ngày sinh:</b> ${birth}</p>
<p><b>Giới tính:</b> ${gender}</p>
<p><b>Email:</b> ${email}</p>
`

}

document.getElementById("form").addEventListener("submit",function(e){

e.preventDefault()

alert("Đăng ký thành công!")

})