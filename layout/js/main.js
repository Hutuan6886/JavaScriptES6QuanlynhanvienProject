const validation = new Validation();

const getEle = (id) => {
    return document.getElementById(id);
}

//todo: lấy dữ liệu từ backend bằng thư viện axios

//todo: biến mảng để chứa dữ liệu sau khi lấy về
let studentList = [];

const getStudent = () => {
    //todo: Sử dụng thư viện axios để get dữ liệu từ backend
    axios({
        //todo: đường dẫn request API danh sách sinh viên
        url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
        //todo: gọi phương thức, lấy dữ liệu là Get
        method: "GET"
    })
        .then((res) => {
            //* kết quả trả ra res sẽ có data và status (HTTP status code)
            studentList = res.data;
            console.log(studentList);
            //*: Hàm hiển thị sinh viên hiển thị ngay sau khi get thành công data lấy từ backend
            renderStudent();
        })
        .catch((err) => {
            console.log(err);
        });
}

getStudent();

//todo: hiển thị sinh viên 
const renderStudent = () => {
    //todo: Tạo biến để hứng content HTML được tạo ra
    studentHtmlContent = "";

    //todo: Duyệt studentList, có bao nhiêu học sinh thì tạo ra tương ứng bấy nhiêu hàng <tr>
    for (let student of studentList) {
        studentHtmlContent += `
        <tr>
            <td>${student.MaSV}</td>
            <td>${student.HoTen}</td>
            <td>${student.Email}</td>
            <td>${student.SoDT}</td>
            <td>${student.DiemToan}</td>
            <td>${student.DiemLy}</td>
            <td>${student.DiemHoa}</td>
            <td class = "edit">
                <button onclick = "deleteStudent('${student.MaSV}')">
                    <i class="fa fa-minus-circle"></i>
                </button>
                <button onclick = "getToUpdateStudent('${student.MaSV}')">
                    <i class="fa fa-edit"></i>
                </button>
            </td>
        </tr>`;
    }
    //todo: hiển thị lên html
    document.getElementById("tableDanhSach").innerHTML = studentHtmlContent;
}

//todo: Thêm Sinh viên 
const addStudent = () => {
    //todo: Lấy dữ liệu từ người dùng
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let cmnd = document.getElementById("idCard").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let toan = document.getElementById("math").value;
    let ly = document.getElementById("physics").value;
    let hoa = document.getElementById("chemistry").value;

    let valid = true;
    valid = valid & KTDoDai(id, 8, "id")
        & KTRong(name, "name") & KTChu(name, "name")
        & KTDoDai(cmnd, 12, "idCard")
        & KTDoDai(phone, 10, "phone")
        & KTEmail(email, "email")
        & KTGiaTri(toan, 0, 10, "math") & KTGiaTri(ly, 0, 10, "physics") & KTGiaTri(hoa, 0, 10, "chemistry");
    if (valid == false) {
        return;
    }


    //todo: Tạo đối tượng sinh viên mới
    const sinhVien = new Student(id, name, email, phone, cmnd, toan, ly, hoa);

    //todo: Sau khi tạo đối tượng sinh viên mới thì gửi request lên backend để thêm đối tượng sinh viên đó
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
        method: "POST",
        data: sinhVien,
    })
        .then((res) => {
            //* sau khi cập nhật thêm sinh viên lên hệ thống thì tự động sẽ in danh sách ra màn hình mà không cần load lại
            getStudent();

            //* sau khi nhập xong thì clear toàn bộ giá trị đi
            getEle("btnReset").click();
        })
        .catch((err) => {
            console.log(err);
        });
}

const KTRong = (input, id) => {
    if (validation.KiemTraRong(input) === true) {
        document.getElementById(id).style.border = "#ced4da 1px solid";
        document.getElementById(id).style.background = "#ced4da";
        return true;
    }
    else {
        document.getElementById(id).style.border = "#9a1b1b 2px solid";
        document.getElementById(id).style.background = "transparent";
        return false;
    }
}
const KTChu = (input, id) => {
    if (validation.kiemTraChu(input) === true) {
        document.getElementById(id).style.border = "#ced4da 1px solid";
        document.getElementById(id).style.background = "#ced4da";
        return true;
    }
    else {
        document.getElementById(id).style.border = "#9a1b1b 2px solid";
        document.getElementById(id).style.background = "transparent";
        return false;
    }
}
const KTEmail = (input, id) => {
    if (validation.kiemTraEmail(input) === true) {
        document.getElementById(id).style.border = "#ced4da 1px solid";
        document.getElementById(id).style.background = "#ced4da";
        return true;
    }
    else {
        document.getElementById(id).style.border = "#9a1b1b 2px solid";
        document.getElementById(id).style.background = "transparent";
        return false;
    }
}
const KTDoDai = (input, length, id) => {
    if (validation.kiemTraDoDai(input, length) === true) {
        document.getElementById(id).style.border = "#ced4da 1px solid";
        document.getElementById(id).style.background = "#ced4da";
        return true;
    }
    else {
        document.getElementById(id).style.border = "#9a1b1b 2px solid";
        document.getElementById(id).style.background = "transparent";
        return false;
    }
}
const KTGiaTri = (input, min, max, id) => {
    if (validation.kiemTraGiaTri(input, min, max) === true) {
        document.getElementById(id).style.border = "#ced4da 1px solid";
        document.getElementById(id).style.background = "#ced4da";
        return true;
    }
    else {
        document.getElementById(id).style.border = "#9a1b1b 2px solid";
        document.getElementById(id).style.background = "transparent";
        return false;
    }
}

getEle("btnAdd").addEventListener("click", () => {
    //todo: Khi ấn vào nút có id:"btnAdd" thì hàm addStudent mới thự thi
    addStudent();
})

const deleteStudent = (id) => {
    //todo: Để xóa thì cần id student cần xóa
    //* Vì vậy input của hàm cần truyền vào id khi ấn nút xóa
    //todo: sau đó call api cho backend và backend xóa id gửi
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
        method: "DELETE",
    })
        .then((res) => {
            //todo: sau khi xóa thành công, chạy hàm then() thì cập nhật lại danh sách trên server
            getStudent();
        })
        .catch((err) => {
            console.log(err);
        });
    //todo: backend trả lại giá trị và render 
}


//todo: editStudent
    //todo: get information
const getToUpdateStudent = (id) => {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
        method: "GET"
    }).then((res) => {
        // console.log(res);
        //todo: khi ấn nút cập nhật thì nút btnThem cũng ấn theo để hiện form input 
        getEle("btnThem").click();
        //todo: Sau đó form input sẽ hiển thị lại nội dung của sinh viên đó
        getEle("id").value = res.data.MaSV;
        //* giá trị id sẽ không được chỉnh sửa
        getEle("id").setAttribute("disabled",true);
        getEle("name").value = res.data.HoTen;
        getEle("idCard").value = res.data.CMND;
        getEle("phone").value = res.data.SoDT;
        getEle("email").value = res.data.Email;
        getEle("math").value = res.data.DiemToan;
        getEle("physics").value = res.data.DiemLy;
        getEle("chemistry").value = res.data.DiemHoa;
    }).catch((err) => {
        console.log(err);
    });
}

    //todo: update information
const updateInformation = () => {
    //todo: dom tới input để sửa thông tin 
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let cmnd = document.getElementById("idCard").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let toan = document.getElementById("math").value;
    let ly = document.getElementById("physics").value;
    let hoa = document.getElementById("chemistry").value;

    //todo: form validation để sửa thông tin 
    let valid = true;
    valid = valid & KTDoDai(id, 8, "id")
        & KTRong(name, "name") & KTChu(name, "name")
        & KTDoDai(cmnd, 12, "idCard")
        & KTDoDai(phone, 10, "phone")
        & KTEmail(email, "email")
        & KTGiaTri(toan, 0, 10, "math") & KTGiaTri(ly, 0, 10, "physics") & KTGiaTri(hoa, 0, 10, "chemistry");
    if (valid == false) {
        return;
    }

    //todo: sau khi sửa thông tin thì Tạo đối tượng sinh viên mới với id cũ
    const updatedSinhVien = new Student(id, name, email, phone, cmnd, toan, ly, hoa);

    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
        method: "PUT",
        data: updatedSinhVien
    }).then((res) => {
        // console.log(res);
        getStudent();

        //todo: sau khi cập nhật dữ liệu thì tắt form input đi
        getEle("btnClose").click();

        //todo: và clear form input để người nhập thêm ng dùng
        getEle("btnReset").click();
        //todo: và remove đi disabled của phần id
        getEle("id").removeAttribute("disabled");

    }).catch((err) => {
        console.log(err);
    });
}
getEle("btnUpdate").addEventListener("click", () => {
    updateInformation();
})
