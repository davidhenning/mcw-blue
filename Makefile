build:
	@echo "Building mcw-blue"
	@echo "\nCompiling Compass files ..."
	@compass compile -q
	@echo "Done"
	@echo "\nUglifying JavaScript ..."
	@rm -rf ./js/production/*
	@cp -r ./js/source/* ./js/production/
	@for f in `find ./js/production/ -iname "*.js"`; do uglifyjs --overwrite $$f; done
	@echo "Done"