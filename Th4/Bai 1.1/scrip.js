// mảng lưu danh sách sinh viên
let students = [];

// lấy các phần tử HTML
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

// hàm xếp loại
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}

// hàm render bảng
function renderTable() {

    tableBody.innerHTML = "";

    students.forEach(function (sv, index) {

        const tr = document.createElement("tr");

        if (sv.score < 5) {
            tr.style.background = "yellow";
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${getRank(sv.score)}</td>
            <td>
                <button data-index="${index}">Xóa</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    updateStats();
}

// hàm cập nhật thống kê
function updateStats() {

    const total = students.length;

    let avg = 0;

    if (total > 0) {

        let sum = students.reduce(function (s, sv) {
            return s + sv.score;
        }, 0);

        avg = (sum / total).toFixed(2);
    }

    stats.innerText = "Tổng sinh viên: " + total + " | Điểm trung bình: " + avg;
}

// hàm thêm sinh viên
function addStudent() {

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // kiểm tra dữ liệu
    if (name === "") {
        alert("Họ tên không được trống");
        return;
    }

    if (isNaN(score) || score < 0 || score > 10) {
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    // thêm vào mảng
    students.push({
        name: name,
        score: score
    });

    renderTable();

    // reset input
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

// sự kiện nút thêm
addBtn.addEventListener("click", addStudent);

// nhấn Enter để thêm
scoreInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        addStudent();
    }

});

// event delegation cho nút xóa
tableBody.addEventListener("click", function (e) {

    if (e.target.tagName === "BUTTON") {

        const index = e.target.dataset.index;

        students.splice(index, 1);

        renderTable();
    }

});