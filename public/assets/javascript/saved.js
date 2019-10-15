// Until the document is ready load html and css first before this function.
$(document).ready(function () {

    var articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {

        articleContainer.empty();
        $.get("/api/topics?saved=true").then(function(data) {

            if(data && data.length) {
                renderArticles(data);
            }
            else {

                renderEmpty();
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
                "<a class='btn btn-danger delete'>",
                "Delete from saved",
                "</a>",
                ",a class='btn btn-info notes'>Article Notes</a>",
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
                "<h4>Uh Oh. Looks like we don't have any saved topics.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-body'>",
                "<h3 class='card-title text-center'>Would you like to see availabe Articles?</h3>",
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));

        articleContainer.append(emptyAlert);
    }

    function renderNotesList(data) {

        var notesToRender = [];
        var currentNote;
        if (!data.notes.length) {

            currentNote = [
                "<li class='list-group-item'>",
                "No notes for this article yet.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        }
        else {

            for (let i = 0; i < data.notes.length; i++) {
                
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.note[i].noteText,
                    "button class='btn btn-danger note-delete'>x</button>",
                    "</li>"
                ].join(""));

                currentNote.children("button").data("_id", data.notes[i]._id);

                notesToRender.push(currentNote);
            }
        }
        $(".note-container").append(notesToRender);
    }

    function handleArticleDelete() {

        var articleToDelete = $(this).parents(".panel").data();

        $.ajax({
            method: "DELETE",
            url: "/api/topics/" + articleToDelete._id
        }).then(function(data) {

            if (data.ok) {
                initPage();
            }
        });
    }

    function handleArticleNotes() {

        var currentArticle = $(this).parents(".panel").data();

        $.get("/api/notes/" + currentArticle._id).then(function(data) {

            var modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Notes for article: ",
                currentArticle._id,
                "</hr",
                "<hr />",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");

            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            var noteData = {
                _id: currentArticle._id,
                notes: data || []
            };

            $(".btn.save").data("article", noteData);

            renderNotesList(noteData);
        });
    }

    function handleNoteSave() {

        var noteData;
        var newNote = $(".bootbox-body textarea").val().trim();

        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("/api/notes", noteData).then(function() {

                bootbox.hideAll();
            });
        }
    }

    function handleNoteDelete() {

        var noteToDelete = $(this).data("_id");

        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(function() {

            bootbox.hideAll();
        });
    }
})