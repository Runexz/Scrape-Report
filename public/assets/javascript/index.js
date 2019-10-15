// Until the document is ready load html and css first before this function.
$(document).ready(function () {

    // Create a variable that contains the class article-container that is in html
    var articleContainer = $(".article-container");

    $(document).on("click", ".btn.save", handleArticleSave);

    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {

        // Empties the article container, run an AJAX request for any unsaved topics
        articleContainer.empty();
        $.get("/api/topics?saved=false")
            .then(function (data) {

                if (data && data.length) {
                    renderArticles(data);
                }
                else {
                    renderEmpty()
                }
            });
    }

    function renderArticles(articles) {

        var articlePanels = [];

        for (let i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }

        articleContainer.append(articlePanels);
    }

    function createPanel(article) {

        var panel =
            $(["<div class='card'>",
                "<div class='card-body'>",
                "<h3 class='card-title'>",
                article.topic,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "<p class='card-text'>",
                article.summary,
                "</p>",
                "</div>",
                "</div>"
            ].join(""));

        panel.data("_id", article._id);

        return panel;
    }

    function renderEmpty() {

        var emptyAlert =
            $(["<div class='alert alert-warning text-center' role='alert'>",
                "<h4>Uh Oh. Looks like we don't have any new topics.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-body'>",
                "<h3 class='card-title text-center'>Please make a choice!</h3>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Topics</a></h4>",
                "</div>",
                "</div>"
            ].join(""));

        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {

        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/topics",
            data: articleToSave
        })
            .then(function (data) {

                if (data.ok) {

                    initPage();
                }
            });
    }

    function handleArticleScrape() {

        $.get("/api/fetch")
            .then(function (data) {

                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
            });
    }
})