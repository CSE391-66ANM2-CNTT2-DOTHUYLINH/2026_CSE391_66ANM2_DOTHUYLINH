const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const date = document.getElementById("date")
const address = document.getElementById("address")
const note = document.getElementById("note")

const total = document.getElementById("total")

const counter = document.getElementById("counter")

const confirmBox = document.getElementById("confirmBox")
const summary = document.getElementById("summary")

const success = document.getElementById("success")

const prices={
 "Áo":150000,
 "Quần":200000,
 "Giày":500000
}

function showError(id,msg){
 document.getElementById(id).innerText=msg
}

function clearError(id){
 document.getElementById(id).innerText=""
}

// VALIDATE PRODUCT
function validateProduct(){

 if(product.value===""){
  showError("productError","Phải chọn sản phẩm")
  return false
 }

 clearError("productError")
 return true
}

// VALIDATE QUANTITY
function validateQuantity(){

 const q=parseInt(quantity.value)

 if(isNaN(q) || q<1 || q>99){
  showError("quantityError","Số lượng 1-99")
  return false
 }

 clearError("quantityError")
 return true
}

// VALIDATE DATE
function validateDate(){

 const selected=new Date(date.value)

 const today=new Date()

 const max=new Date()
 max.setDate(today.getDate()+30)

 if(!date.value){
  showError("dateError","Phải chọn ngày")
  return false
 }

 if(selected<today){
  showError("dateError","Không chọn ngày quá khứ")
  return false
 }

 if(selected>max){
  showError("dateError","Không quá 30 ngày")
  return false
 }

 clearError("dateError")
 return true
}

// VALIDATE ADDRESS
function validateAddress(){

 const v=address.value.trim()

 if(v.length<10){
  showError("addressError","Ít nhất 10 ký tự")
  return false
 }

 clearError("addressError")
 return true
}

// VALIDATE NOTE
function validateNote(){

 if(note.value.length>200){
  showError("noteError","Tối đa 200 ký tự")
  return false
 }

 clearError("noteError")
 return true
}

// VALIDATE PAYMENT
function validatePayment(){

 const p=document.querySelector('input[name="payment"]:checked')

 if(!p){
  showError("paymentError","Chọn phương thức thanh toán")
  return false
 }

 clearError("paymentError")
 return true
}

// CHARACTER COUNTER
note.addEventListener("input",()=>{

 const len=note.value.length

 counter.innerText=len+"/200"

 if(len>200){
  counter.style.color="red"
 }else{
  counter.style.color="black"
 }

})

// TOTAL PRICE
function updateTotal(){

 const p=product.value
 const q=parseInt(quantity.value)

 if(prices[p] && q){

  const money=prices[p]*q

  total.innerText=money.toLocaleString("vi-VN")

 }

}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

// SUBMIT
form.addEventListener("submit",(e)=>{

 e.preventDefault()

 const valid=
 validateProduct() &
 validateQuantity() &
 validateDate() &
 validateAddress() &
 validateNote() &
 validatePayment()

 if(valid){

  const money=prices[product.value]*quantity.value

  summary.innerHTML=
  `
  Sản phẩm: ${product.value} <br>
  Số lượng: ${quantity.value} <br>
  Tổng tiền: ${money.toLocaleString("vi-VN")} VNĐ <br>
  Ngày giao: ${date.value}
  `

  confirmBox.style.display="block"

 }

})

// CONFIRM
document.getElementById("confirmBtn").onclick=()=>{

 form.style.display="none"

 confirmBox.style.display="none"

 success.innerHTML="<h2>Đặt hàng thành công 🎉</h2>"

}

// CANCEL
document.getElementById("cancelBtn").onclick=()=>{

 confirmBox.style.display="none"

}