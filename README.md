# easybase-website

Deploy:

minify ./assets/css/styles.css > ./assets/css/styles.min.css && minify ./assets/js/header.js > ./assets/js/header.min.js && minify index_raw.html > index.html && echo "---\nlayout: null\n---\n" | cat - index.html > temp && mv temp index.html