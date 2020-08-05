const txt_first_name = document.getElementById("txt_first_name");
const txt_last_name = document.getElementById("txt_last_name");
const btn_send = document.getElementById("btn_send");
const txt_result = document.getElementById("txt_result");

var lambda = new AWS.Lambda({
  apiVersion: "latest",
  accessKeyId: "xxx",
  secretAccessKey: "xxx",
  endpoint: "lambda.us-east-2.amazonaws.com",
  region: "us-east-2",
});

btn_send.addEventListener("click", function () {
  event.preventDefault();
  var params = {
    FunctionName: "arn_de_mi_lambda",
    Payload: JSON.stringify({
      first_name: txt_first_name.value,
      last_name: txt_last_name.value,
    }),
  };
  lambda.invoke(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      let obj = JSON.parse(data['Payload'])
      txt_result.innerHTML = obj['message'];
    }
  });
});
