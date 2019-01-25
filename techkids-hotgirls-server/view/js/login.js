$(document).ready(function () {
    $("#btnLogin").click(function (){
        event.preventDefault();
        const username = $("#user").val();
        const password = $("#pass").val();
        $.ajax({
            url: "/api/auth/login",
            type: "POST",
            data: {username, password},
            success: function(data){
                if (data.data == false || data.error == "user not exist"){
                    $("#messageLogin").attr("class", "text-danger");
                    $("#messageLogin").text("Username or Password incorrect!");
                }
                else if (data.data == true){
                    $("#messageLogin").attr("class", "text-success");
                    $("#messageLogin").text("Login success!");
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});
