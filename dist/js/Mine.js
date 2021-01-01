var currentTab = 0;
showTab(currentTab);
function showTab(stepNo) {
  var pageEle = document.getElementsByClassName("page");
  pageEle[stepNo].style.display = "block";
  if (stepNo == 2) {
    document.getElementById("nextBtn").style.display = "none";
  } else {
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
  var pageEle,
    inputEle,
    i,
    valid = true;
  pageEle = document.getElementsByClassName("page");
  inputEle = pageEle[currentTab].getElementsByTagName("input");
  for (i = 0; i < inputEle.length; i++) {
    if (inputEle[i].value == "") {
      inputEle[i].className += " invalid";
      valid = false;
    }
  }
  //   if (valid) {
  //     document.getElementsByClassName("step")[currentTab].className += " finish";
  //   }
  return valid;
}

/////*
var mulSelectInput = document.getElementsByClassName("custom-select-mul");
if (mulSelectInput.length > 0) {
  console.log(mulSelectInput);
  //   for (let i = 0; i < mulSelectInput.length; i++) {
  //     mulSelectInput[i].style.display = "none";
  //     selElmnt = mulSelectInput[i].getElementsByTagName("select")[0];
  //     ll = selElmnt.length;
  //     /* For each element, create a new DIV that will act as the selected item: */
  //     a = document.createElement("DIV");
  //     a.setAttribute("class", "select-selected");
  //    //  console.log(selElmnt.options);
  //    //  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  //     mulSelectInput[i].appendChild(a);
  //    }

  var select = $("select[multiple]"); // بيحدد علي ال select
  var options = select.find("option"); // بيجب ال options

  var div = $("<div />").addClass("selectMultiple"); // بيعمل div
  var active = $("<div />");
  var list = $("<ul />"); // بيعمل list
  var placeholder = select.data("placeholder"); // placeholder

  var span = $("<span />").text(placeholder).appendTo(active); // اللي بنحط فيها الاحاجات اللي اختارنها

  options.each(function () {
    var text = $(this).text(); // الكلام اللي جوه
    if ($(this).is(":selected")) {
      active.append($("<a />").html("<em>" + text + "</em><i></i>"));
      span.addClass("hide");
    } else {
      list.append($("<li />").html(text)); // بيضيف ال options في الليست
    }
  });

  active.append($("<div />").addClass("arrow")); // عباره السهم
  div.append(active).append(list);

  select.wrap(div);

  $(document).on("click", ".selectMultiple ul li", function (e) {
    //
    var select = $(this).parent().parent();
    var li = $(this);
    if (!select.hasClass("clicked")) {
      select.addClass("clicked");
      li.prev().addClass("beforeRemove");
      li.next().addClass("afterRemove");
      li.addClass("remove");
      var a = $("<a />")
        .addClass("notShown")
        .html("<em>" + li.text() + "</em><i></i>")
        .hide()
        .appendTo(select.children("div"));
      a.slideDown(400, function () {
        setTimeout(function () {
          a.addClass("shown");
          select.children("div").children("span").addClass("hide");
          select
            .find("option:contains(" + li.text() + ")")
            .prop("selected", true);
        }, 500);
      });
      setTimeout(function () {
        if (li.prev().is(":last-child")) {
          li.prev().removeClass("beforeRemove");
        }
        if (li.next().is(":first-child")) {
          li.next().removeClass("afterRemove");
        }
        setTimeout(function () {
          li.prev().removeClass("beforeRemove");
          li.next().removeClass("afterRemove");
        }, 200);

        li.slideUp(400, function () {
          li.remove();
          select.removeClass("clicked");
        });
      }, 600);
    }
  });

  $(document).on("click", ".selectMultiple > div a", function (e) {
    var select = $(this).parent().parent();
    var self = $(this);
    self.removeClass().addClass("remove");
    select.addClass("open");
    setTimeout(function () {
      self.addClass("disappear");
      setTimeout(function () {
        self.animate(
          {
            width: 0,
            height: 0,
            padding: 0,
            margin: 0,
          },
          300,
          function () {
            var li = $("<li />")
              .text(self.children("em").text())
              .addClass("notShown")
              .appendTo(select.find("ul"));
            li.slideDown(400, function () {
              li.addClass("show");
              setTimeout(function () {
                select
                  .find("option:contains(" + self.children("em").text() + ")")
                  .prop("selected", false);
                if (!select.find("option:selected").length) {
                  select.children("div").children("span").removeClass("hide");
                }
                li.removeClass();
              }, 400);
            });
            self.remove();
          }
        );
      }, 300);
    }, 400);
  });

  $(document).on(
    "click",
    ".selectMultiple > div .arrow, .selectMultiple > div span",
    function (e) {
      $(this).parent().parent().toggleClass("open");
    }
  );
}
