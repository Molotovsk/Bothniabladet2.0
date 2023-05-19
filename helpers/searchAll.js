var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic NTE4MzE2MjU0MTM3NDU2OlpnamJ4ckwtR0ozV2dJclR3ang3eXVoNU5oVQ==");

var raw = JSON.stringify({
  "expression": ""
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.cloudinary.com/v1_1/dmhozrlru/resources/search", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));