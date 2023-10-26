import {AnalysisWorkerWrapper, createWorker, Paper} from "yoastseo";

// `url` needs to be the full URL to the script for the browser to know where to load the worker script from.
// This should be the script created by the previous code-snippet.

const worker = new AnalysisWorkerWrapper(new Worker(
    new URL('./webworker', import.meta.url),
    {type: 'module'}
));

console.debug('YoastSeo loaded');

if (typeof tinymce !== "undefined") {
    tinymce.on('SetupEditor', function (event) {
        const editor = event.editor;
        const text_field_set = document.getElementById("pal_text_legend");
        text_field_set.innerHTML += "<div><ul id=\"resultsList\" class=\"widget\" style=\"list-style: none; padding-top: 5px;\"></ul></div>";

        yoastSEO(editor);
        editor.on("keyup", function (event2) {
            yoastSEO(editor);
        });
    });
}

function yoastSEO(editor) {
    worker.initialize({
        locale: "de_DE",
        contentAnalysisActive: true,
        keywordAnalysisActive: true,
        logLevel: "ERROR",
    }).then(() => {
        // The worker has been configured, we can now analyze a Paper.
        const paper = new Paper(editor.getContent(), {
            keyword: window.yoastKeyword,
            locale: "de_DE"
        });

        return worker.analyze(paper);
    }).then((results) => {
        const data = results;
        const olElement = document.getElementById('resultsList');
        olElement.innerHTML = "";

        // Iterate over readability results
        let h2 = document.createElement('h2');
        h2.innerHTML = "Readability (Yoast)";
        h2.style.paddingTop = "5px";
        olElement.appendChild(h2);
        for (const result of data.result.readability.results) {
            if (result.text) { // Only add if there's text to show
                resultElement(olElement, result);
            }
        }

        // Iterate over SEO results
        h2 = document.createElement('h2');
        h2.innerHTML = "SEO (Yoast)";
        h2.style.paddingTop = "5px";
        olElement.appendChild(h2);
        for (const result of data.result.seo[""].results) {
            if (result.text && result._identifier !== "titleWidth" && result._identifier !== "metaDescriptionLength") {
                resultElement(olElement, result);
            }
        }

    }).catch((error) => {
        console.error('An error occured while analyzing the text:');
        console.error(error);
    });
}

function resultElement(olElement, result) {
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
    olElement.appendChild(li);
}