//JS standart
// document.getElementById("Content").addEventListener("input", function() {
//     document.getElementById("count").innerText = 200 - document.getElementById("Content").value.length;
//     var check = 200 - document.getElementById("Content").value.length;
//     console.log(check);
// });

//JQuery
$("#content").on("input",function (){
    const currentValue = 200 - $("#content").val().length;
    $("#count").text(currentValue);
});