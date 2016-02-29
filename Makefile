PAELLADIR = submodules/paella
EXTDIR = node_modules/dce-paella-extensions
UIDIR = paella-matterhorn/ui
BROWSERIFYCMD = node_modules/.bin/browserify

copy-extensions-to-paella: \
	copy-vendor-extensions-to-paella \
	copy-resources-to-paella \
	copy-test-repository-to-paella \
	copy-config-to-paella \
	copy-skins-to-paella

copy-vendor-extensions-to-paella:
	mkdir -p $(PAELLADIR)/vendor && \
	cp -r $(EXTDIR)/vendor/* $(PAELLADIR)/vendor

copy-resources-to-paella:
	mkdir -p $(PAELLADIR)/resources && \
	cp -r $(EXTDIR)/resources/* $(PAELLADIR)/resources

copy-test-repository-to-paella:
	mkdir -p $(PAELLADIR)/repository_test/repository && \
	cp -r $(EXTDIR)/repository_test/repository/* $(PAELLADIR)/repository_test/repository

copy-skins-to-paella:
	cp $(EXTDIR)/vendor/skins/* $(PAELLADIR)/resources/style/skins

copy-config-to-paella:
	mkdir -p $(PAELLADIR)/config/profiles && \
	cp $(EXTDIR)/config/profiles/profiles.json $(PAELLADIR)/config/profiles && \
	mkdir -p $(UIDIR)/config && \
	cp $(EXTDIR)/config/config.json $(UIDIR)/config

run-test-server:
	node test-server.js

# TODO: uglify-js, source map build.
build-app-index:
	$(BROWSERIFYCMD) app-src/index.js > build/javascript/app-index.js


SMOKECHROME = node_modules/.bin/tap-closer | \
	node_modules/.bin/smokestack -b chrome

SMOKEFIREFOX = node_modules/.bin/tap-closer | \
	node_modules/.bin/smokestack -b firefox

test-chrome: build-text-fixtures run-plain-web-server
	$(BROWSERIFYCMD) tests/parent-appriser-tests.js | $(SMOKECHROME)

test-chrome-leave-up: build-text-fixtures run-plain-web-server
	$(BROWSERIFYCMD) tests/parent-appriser-tests.js| node_modules/.bin/smokestack -b chrome

test-firefox: build-text-fixtures run-plain-web-server
	$(BROWSERIFYCMD) tests/parent-appriser-tests.js | $(SMOKEFIREFOX)

run-plain-web-server:
	python -m SimpleHTTPServer &

build-text-fixtures:
	$(BROWSERIFYCMD) tests/fixtures/inner-frame-src.js > tests/fixtures/inner-frame.js
