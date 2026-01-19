var loginTimer;

var setupTimer = function (time = 1801000) {
  clearTimeout(loginTimer);
  loginTimer = setTimeout(function () {
    if (checkLoggedin() == 1) {
      setupTimer();
    }
  }, time);
};
setupTimer();

function confirm_delete(title, url) {
  if (checkLoggedin() == 1) {
    ConfirmText = "Are you sure you want to delete " + title;
    var r = confirm(ConfirmText);
    if (r == true) {
      window.location.href = url;
    }
  }
}

function blurtextbox(boxid, orriginaltext) {
  boxid = "#" + boxid;
  contents = $(boxid).val();
  if (contents == "") {
    $(boxid).val(orriginaltext);
  }
}

function focustextbox(boxid, orriginaltext) {
  boxid = "#" + boxid;
  contents = $(boxid).val();
  if (contents == orriginaltext) {
    $(boxid).val("");
  }
}
