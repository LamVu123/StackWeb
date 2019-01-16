var totalArr = [];
const gameID = window.location.pathname.replace("/game/", "");
var numberRound = 0;

//event change value input score
function changeValue(element) {
    const id = element.id;
    var newScore = document.getElementById(id).value;
    console.log(newScore);

    //send data to server and save in DB
    $.ajax({
        url: "/api/gameCreated/score/" + gameID,
        type: "POST",
        dataType: "json",
        data: {
            id: id,    // id contain number of round and who player is.
            score: newScore
        },
        success: function (data) {
            const { gameCreated } = data;
            totalArr = [];
            $("#sum1").text(sumScore(gameCreated.player1.score));
            $("#sum2").text(sumScore(gameCreated.player2.score));
            $("#sum3").text(sumScore(gameCreated.player3.score));
            $("#sum4").text(sumScore(gameCreated.player4.score));
            $("#SumScore").text(sumScore(totalArr));
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function createRow(round) {
    var createRow = `
        <tr>
            <th scope="row">Round `+ round + ` </th>
            <td><input type="number" id="1r`+ round + `" class="elmInput" value="0" onchange = "changeValue(this)"></td>
            <td><input type="number" id="2r`+ round + `" class="elmInput" value="0" onchange = "changeValue(this)"></td>
            <td><input type="number" id="3r`+ round + `" class="elmInput" value="0" onchange = "changeValue(this)"></td>
            <td><input type="number" id="4r`+ round + `" class="elmInput" value="0" onchange = "changeValue(this)"></td>
        </tr>
    `;
    $("table tbody").append(createRow);
};


function sumScore(arr) {
    var sum = 0;
    arr.forEach(score => {
        sum += score;
    });
    totalArr.push(sum);
    return sum;
}



$(document).ready(function () {
    $("#btnCreate").click(function () {
        createRow(++numberRound);
    });
});

$.ajax({
    type: "GET",
    url: "/api/gameCreated/" + gameID,
    success: function (data) {
        const { gameCreated } = data;
        numberRound = Math.max(gameCreated.player1.score.length,gameCreated.player2.score.length,gameCreated.player3.score.length,gameCreated.player4.score.length,);
        for (i = 1; i <= numberRound; i++) {
            createRow(i);
            $("#1r" + i).val(gameCreated.player1.score[i - 1]);
            $("#2r" + i).val(gameCreated.player2.score[i - 1]);
            $("#3r" + i).val(gameCreated.player3.score[i - 1]);
            $("#4r" + i).val(gameCreated.player4.score[i - 1]);
        }
        //load name player
        $("#playerName1").text(gameCreated.player1.name);
        $("#playerName2").text(gameCreated.player2.name);
        $("#playerName3").text(gameCreated.player3.name);
        $("#playerName4").text(gameCreated.player4.name);

        //load Sum score each player
        $("#sum1").text(sumScore(gameCreated.player1.score));
        $("#sum2").text(sumScore(gameCreated.player2.score));
        $("#sum3").text(sumScore(gameCreated.player3.score));
        $("#sum4").text(sumScore(gameCreated.player4.score));
        $("#SumScore").text(sumScore(totalArr));

    },
    error: function (error) {
        console.log(error);
    }
});