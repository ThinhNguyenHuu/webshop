function getToReview() {
  document.getElementById("reviews_tabs_nav").click();
}

function checkNum(){
  if(isNaN(parseFloat(document.getElementById('num1').value))){
      notify("Giá trị nhập ở ô <span>Số thứ nhất</span> không phải là số");
  }else if(isNaN(parseFloat(document.getElementById('num2').value))){
      notify("Giá trị nhập ở ô <span>Số thứ hai</span> không phải là số");
  }else{
      notify("");
      return true;
  };

  return false;
}

function calculate(){
  if(!checkNum())
      return;
      
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const add = document.getElementById('add').checked;
  const subtract = document.getElementById('subtract').checked;
  const multiple = document.getElementById('multiple').checked;
  const divide = document.getElementById('devide').checked;

  let result;
  if(add){
      result = num1 + num2;
  }else if(subtract){
      result = num1 - num2;
  }else if(multiple){
      result = num1 * num2;
  }else if(divide){
      result = num1 / num2;
  }else{
      notify("Chưa chọn phép tính");
      return;
  }

  notify("");
  document.getElementById('result').value = result.toString();
}