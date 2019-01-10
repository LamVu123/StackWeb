function loadData(urlPage) {
    $.ajax({
        url: urlPage,
        type: "GET",
        success: function (data) {
            $("#results").attr("currUrl", data.next);
            for (let i = 0; i < data.results.length; i++) {
                $("#results").append(
                    `
                    <div class="col-sm-6 col-lg-3 shadow-lg p-3 mb-5 bg-white rounded" >
                        <div class="card text-left" style="height: 450px;background-color:lavender;">
                            <img class="card-img-top border" src="${data.results[i].image_240x135}">
                            <div class="card-body style="position: relative;">
                                <h5 class="card-title" >${data.results[i].title}</h5>
                                <p class="card-text">Price: ${data.results[i].price}</p>
                                <p class="card-text">Score: ${data.results[i].predictive_score}</p>
                                <div class="d-flex justify-content-center">
                                <button class="btn btn-primary " style="position: absolute;bottom:5%;" href="https://www.udemy.com${data.results[i].url}" value="">Go to this course</button>
                                </div>
                            </div>
                        </div>
                        <br>
                    </div>
                    `
                );
            }
        },
        error: function (err) {
            console.log("Error!!!", err);
        }
    });
}

$("#udemy").on("submit", function () {
    event.preventDefault();
    $( "#results" ).empty();
    $( "#loading" ).empty();
    let course = $("#searchInput").val();
    let price = $("#price option:selected").text();
    let url = "http://udemy-course-api.herokuapp.com/api/courses?amp%3Bpage_size=12&amp%3Bprice=" + price + "&amp%3Bsearch=" + course + "&page=1&page_size=12";
    loadData(url);
    $("#loading ").append(`
    <div class="spinner-border text-success" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `);
    $(window).scroll(function () {
        var height = $(window).scrollTop() + $(window).height();
        let heightDoc = $(document).height();
        if (Math.abs(Math.floor(height) - $(document).height()) < 5) {
            url = $("#results").attr("currUrl");
            loadData(url);
        }
    });
});