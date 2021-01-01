
$(document).ready(function(){

   var currentTab = 0;
   showTab(currentTab);
   function showTab(stepNo) {
      var pageEle = document.getElementsByClassName("page");
      pageEle[stepNo].style.display = "block";
      if (stepNo ==2) {
         document.getElementById("nextBtn").style.display = "none";
      }
      else {
         document.getElementById("nextBtn").style.display = "inline";
      }
   
   }
   function nextPrev(stepNo) {
      var pageEle = document.getElementsByClassName("page");
      if (stepNo == 1 && !checkForm()) return false;
      pageEle[currentTab].style.display = "none";
      currentTab = currentTab + stepNo;
      if (currentTab >= pageEle.length) {
         document.getElementById("regForm").submit();
         return false;
      }
      showTab(currentTab);
   }
   function checkForm() {
      var pageEle, inputEle, i, valid = true;
      pageEle = document.getElementsByClassName("page");
      inputEle = pageEle[currentTab].getElementsByTagName("input");
      for (i = 0; i < inputEle.length; i++) {
         if (inputEle[i].value == "") {
            inputEle[i].className += " invalid";
            valid = false;
         }
      }
      if (valid) {
         document.getElementsByClassName("step")[currentTab].className += " finish";
      }
      return valid;
   }

});


/////*
/*var mulSelectInput = document.getElementsByClassName("mul-select");
if(mulSelectInput.length > 0)
{
    .style.display = "none";
}*/
