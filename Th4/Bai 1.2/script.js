// mảng gốc
let students = []

// mảng sau khi lọc
let filteredStudents = []

// trạng thái sắp xếp
let sortAsc = true

// lấy phần tử HTML
const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const searchInput = document.getElementById("search")
const filterSelect = document.getElementById("filterRank")
const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")
const scoreHeader = document.getElementById("scoreHeader")

// hàm xếp loại
function getRank(score){
    if(score >= 8.5) return "Giỏi"
    if(score >= 7) return "Khá"
    if(score >= 5) return "Trung bình"
    return "Yếu"
}

// thêm sinh viên
function addStudent(){

    const name = nameInput.value.trim()
    const score = parseFloat(scoreInput.value)

    if(name === ""){
        alert("Họ tên không được trống")
        return
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10")
        return
    }

    students.push({
        name:name,
        score:score
    })

    nameInput.value=""
    scoreInput.value=""
    nameInput.focus()

    applyFilters()
}

// áp dụng tìm kiếm + lọc + sắp xếp
function applyFilters(){

    const keyword = searchInput.value.toLowerCase()
    const rankFilter = filterSelect.value

    filteredStudents = students.filter(function(sv){

        const matchName = sv.name.toLowerCase().includes(keyword)

        const rank = getRank(sv.score)

        const matchRank = rankFilter === "all" || rank === rankFilter

        return matchName && matchRank
    })

    // sắp xếp
    filteredStudents.sort(function(a,b){

        if(sortAsc){
            return a.score - b.score
        }else{
            return b.score - a.score
        }

    })

    renderTable()
}

// render bảng
function renderTable(){

    tableBody.innerHTML=""

    if(filteredStudents.length === 0){

        tableBody.innerHTML =
        `<tr>
            <td colspan="5">Không có kết quả</td>
        </tr>`

        stats.innerText="Tổng sinh viên: 0"
        return
    }

    filteredStudents.forEach(function(sv,index){

        const tr = document.createElement("tr")

        if(sv.score < 5){
            tr.style.background="yellow"
        }

        const realIndex = students.indexOf(sv)

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
            <button data-index="${realIndex}">Xóa</button>
        </td>
        `

        tableBody.appendChild(tr)
    })

    updateStats()
}

// cập nhật thống kê
function updateStats(){

    const total = students.length

    let avg = 0

    if(total>0){

        const sum = students.reduce(function(s,sv){
            return s + sv.score
        },0)

        avg = (sum/total).toFixed(2)
    }

    stats.innerText =
    "Tổng sinh viên: " + total + " | Điểm trung bình: " + avg
}

// sự kiện tìm kiếm realtime
searchInput.addEventListener("input",applyFilters)

// sự kiện lọc
filterSelect.addEventListener("change",applyFilters)

// sự kiện sắp xếp
scoreHeader.addEventListener("click",function(){

    sortAsc = !sortAsc

    scoreHeader.innerText = sortAsc ? "Điểm ▲" : "Điểm ▼"

    applyFilters()
})

// Enter để thêm
scoreInput.addEventListener("keypress",function(e){

    if(e.key === "Enter"){
        addStudent()
    }

})

// xóa sinh viên
tableBody.addEventListener("click",function(e){

    if(e.target.tagName === "BUTTON"){

        const index = e.target.dataset.index

        students.splice(index,1)

        applyFilters()
    }

})

// chạy lần đầu
applyFilters()