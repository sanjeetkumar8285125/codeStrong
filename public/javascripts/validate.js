function validateForm() {
  var fname = document.getElementById("fname").value;
  if (fname == "") {
    alert("Firstname cannot be empty");
    return false;
  }
  var lname = document.getElementById("lname").value;
  if (lname == "") {
    alert("Lastname cannot be empty");
    return false;
  }
  var email = document.getElementById("email").value;
  if (email == "") {
    alert("Email Id cannot be empty");
    return false;
  } else {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      alert("Email Id format is not correct");
      return false;
    }
  }
  var number = document.getElementById("number").value;
  if (number == "") {
    alert("Mobile number cannot be empty");
    return false;
  }
  var subject = document.getElementById("subject").value;
  if (subject == "") {
    alert("Subject cannot be empty");
    return false;
  }
  //   var message = document.getElementById("message").value;
  //   if (message == "") {
  //     document.querySelector(".status").innerHTML = "Message cannot be empty";
  //     return false;
  //   }
  //   document.querySelector(".status").innerHTML = "Sending...";
}
