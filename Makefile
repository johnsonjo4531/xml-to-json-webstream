go: src/tests/example-data/example1.xml src/tests/example-data/example0.xml src/tests/example-data/example12.xml 
	npm run test


src/tests/example-data/example1.xml:
	./fetch-example1

src/tests/example-data/example0.xml:
	./fetch-example0

src/tests/example-data/example12.xml:
	./fetch-example12

examples: src/tests/example-data/example0.xml
	deno run ./src/tests/examples/*.ts

gen-icons: xml-to-json-webstream-docs/static/img/favicon.ico
	echo "done"

xml-to-json-webstream-docs/static/img/favicon.ico:
	./generate-favicon