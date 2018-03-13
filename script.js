function onSignIn(googleUser) {
  console.log('on signin')
  var profile = googleUser.getBasicProfile();
  $(".g-signin2").css("display", "none")
  $(".data").css("display", "block")
  $("#pic").attr('src', profile.getImageUrl())
  $("#email").text(profile.getEmail())
  var id_token = googleUser.getAuthResponse().id_token;
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