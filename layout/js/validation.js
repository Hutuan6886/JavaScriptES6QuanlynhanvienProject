class Validation {
    KiemTraRong(input){
        if (input.trim() === "") {
            return false;
        }
        else {
            return true;
        }
    }
    //todo: kiểm tra text
    kiemTraChu(input){
        let letter = /^[\u0041-\u1ef5\s]+$/;
        if (input.match(letter)){
            return true;
        }
        else{
            return false;
        }
    }
    //todo: Kiểm tra số
    kiemTraSo(input){
        var number = /^[0-9]+$/;
        if (input.match(number)) {
            return true;
        }
        else {
            return false;
        }
    }
    //todo: Kiểm tra email
    kiemTraEmail(input) {
        var mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (input.match(mail)) {
            return true;
        }
        else {
            return false;
        }
    }
    //todo: Kiểm tra độ dài
    kiemTraDoDai(input,length){
        if (input.trim().length === length){
            return true;
        }
        else {
            return false;
        }
    }
    //todo: kiểm tra giá trị
    kiemTraGiaTri(input,min,max){
        if (Number(input) >= min && Number(input) <= max){
            return true;
        }
        else {
            return false;
        }
    }
}