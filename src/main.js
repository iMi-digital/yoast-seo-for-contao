import {AnalysisWorkerWrapper, createWorker, Paper} from "yoastseo";

if (typeof tinymce !== "undefined") {
    const keyword_fields = ["ctrl_keyword" , "ctrl_keyword_translated"];
    const field = keyword_fields.find((field) => document.getElementById(field) != null);
    if (field) {
        const keyword_field = document.getElementById(field);
        window.yoastKeyword = keyword_field.value;
        keyword_field.addEventListener("keyup", function () {
            window.yoastKeyword = this.value;
        });
    }

    tinymce.on('SetupEditor', function (event) {
        const editor = event.editor;
        const worker = new AnalysisWorkerWrapper(new Worker(
            new URL('./webworker', import.meta.url),
            {type: 'module'}
        ));

        editor.on('init', function() {
            const results_list = document.createElement("ul");
            results_list.style.padding = "10px 0";
            results_list.classList.add("widget");
            editor.getContainer().insertAdjacentElement('afterend', results_list);

            yoastSEO(worker, editor, results_list);
            editor.on("keyup", function () {
                yoastSEO(worker, editor, results_list);
            });
        });
    });
}

function yoastSEO(worker, editor, results_list) {
    worker.initialize({
        locale: "de_DE",
        contentAnalysisActive: true,
        keywordAnalysisActive: true,
        logLevel: "ERROR",
    }).then(() => {
        const paper = new Paper(editor.getContent(), {
            keyword: window.yoastKeyword,
            locale: "de_DE"
        });

        return worker.analyze(paper);
    }).then((results) => {
        const data = results;
        results_list.innerHTML = "";

        // Iterate over readability results
        let h2 = document.createElement('h2');
        h2.innerHTML = "Readability (Yoast)";
        h2.style.paddingTop = "5px";
        results_list.appendChild(h2);
        for (const result of data.result.readability.results) {
            if (result.text) { // Only add if there's text to show
                resultElement(results_list, result);
            }
        }

        // Iterate over SEO results
        h2 = document.createElement('h2');
        h2.innerHTML = "SEO (Yoast)";
        h2.style.paddingTop = "5px";
        results_list.appendChild(h2);
        for (const result of data.result.seo[""].results) {
            if (result.text && result._identifier !== "titleWidth" && result._identifier !== "metaDescriptionLength" && !(window.yoastKeyword == "" && result._identifier === "keyphraseLength")) {
                resultElement(results_list, result);
            }
        }

    }).catch((error) => {
        console.error('An error occured while analyzing the text:');
        console.error(error);
    });
}

function resultElement(results_list, result) {
    const li = document.createElement('li');
    let color;

    if (result.score === 9) {
        color = "green";
    } else if (result.score >= 6) {
        color = "gold";
    } else if (result.score >= 3) {
        color = "orange";
    } else {
        color = "red";
    }

    li.innerHTML = "<span style='font-weight: bold; font-size: 2em; vertical-align: middle; color:" + color + ";'>&#8226;</span> " + result.text;
    results_list.appendChild(li);
}