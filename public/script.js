function handleClick() {
    console.log("button click successful!!");
    const input = document.getElementById("input").value;
    console.log(input);

    fetch("/data" + "?" +"input=" + input)
    .then(response=>response.text())
    .then(function(response){
      console.log(response);
      document.getElementById("results").innerHTML = response;
    });

}