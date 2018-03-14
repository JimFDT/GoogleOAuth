function onSignIn(googleUser) {
  console.log('on signin')
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  $(".g-signin2").css("display", "none")
  $(".data").css("display", "block")
  $("#pic").attr('src', profile.getImageUrl())
  $("#email").text(profile.getEmail())

  var id_token = googleUser.getAuthResponse().id_token;
  console.log(googleUser.getAuthResponse());
  console.log("ID Token: " + id_token);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8888/tokeninfo?id_token=' + id_token);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('idtoken=' + id_token)
}

function signout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("你已成功登出")
    $(".g-signin2").css("dispalay", "block")
    $(".data").css("dispalay", "block")
  })
}