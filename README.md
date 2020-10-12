# easybase-website

Deploy:

minify ./assets/css/styles.css > ./assets/css/styles.min.css && minify ./assets/css/custom_bootstrap.css > ./assets/css/custom_bootstrap.min.css && minify ./assets/js/header.js > ./assets/js/header.min.js && minify index_raw.html > index.html && echo "---\nlayout: null\n---\n" | cat - index.html > temp && mv temp index.html && bundle exec jekyll serve