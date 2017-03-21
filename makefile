SHELL := /bin/bash

# Colors
# -----------------------------------------------------------------------------
YELLOW = \033[1;33m
CYAN = \033[1;36m
NC   = \033[0m

# Paths
# -----------------------------------------------------------------------------
BOWER = bower_components
ASSETS = public/assets
JS_VENDOR = $(ASSETS)/scripts/vendor
WEB_BRANCH = gh-pages

# Actions
# -----------------------------------------------------------------------------
all:
	@echo
	@echo -e "${CYAN}  HBBP - Harp Bootstrap BoilerPlate${NC}"
	@echo
	@echo "  Avaliable commands:"
	@echo
	@echo "    install      Install NPM and Bower dependencies of this project"
	@echo "    clean        Remove installed NPM and Bower dependecies"
	@echo "    chmod        Change files & directory permissions to 750 & 640"
	@echo "    initBranch   Build hosted web branch (default: gh-pages)"
	@echo "    harp         Install NodeJS, Bower, Gulp and Harp (Ubuntu/Debian)"
	@echo
	@echo "  Usage: make <command>"
	@echo

install:
	@echo -e "${YELLOW}Installing server-side dependencies${NC}"
	npm install

	@echo -e "${YELLOW}Installing front-end dependencies${NC}"
	bower install

	@echo -e "${YELLOW}Copy required assets from bower components${NC}"
	cp $(BOWER)/bootstrap/dist/js/bootstrap.js      $(JS_VENDOR)
	cp $(BOWER)/bootstrap/dist/js/bootstrap.min.js  $(JS_VENDOR)
	cp $(BOWER)/html5shiv/dist/html5shiv.js         $(JS_VENDOR)
	cp $(BOWER)/html5shiv/dist/html5shiv.min.js     $(JS_VENDOR)
	cp $(BOWER)/jquery/dist/jquery.js               $(JS_VENDOR)
	cp $(BOWER)/jquery/dist/jquery.min.js           $(JS_VENDOR)
	cp $(BOWER)/respond/dest/respond.src.js         $(JS_VENDOR)/respond.js
	cp $(BOWER)/respond/dest/respond.min.js         $(JS_VENDOR)
	cp $(BOWER)/bootstrap/less/variables.less       $(ASSETS)/styles/_bootstrap-variables-copy.less

clean:
	@echo -e "${YELLOW}Removing installed dependencies${NC}"
	rm -rf $(BOWER)
	rm -rf node_modules
	rm -rf www
	rm -rf $(ASSETS)/fonts/*
	rm -rf $(ASSETS)/styles/_bootstrap-variables-copy.less
	rm -rf $(JS_VENDOR)/*

chmod:
	@echo -e "${YELLOW}Changing permissions${NC}"
	find ./ -type d -exec chmod 750 {} \
	find ./ -type f -exec chmod 640 {} \

harp:
	@echo -e "${YELLOW}Installing NodeJS${NC}"
	sudo apt-get install nodejs npm
	sudo ln -s /usr/bin/nodejs /usr/bin/node
	@echo -e "${YELLOW}Installing Bower, Gulp and Harp{NC}"
	sudo npm install -g bower gulp harp

initBranch:
	@echo -e "${YELLOW}Initializating remote web branch${NC}"
	git checkout --orphan $(WEB_BRANCH)
	git rm -rf .
	touch README.md
	git add README.md
	git commit -m "First commit"
	git push --set-upstream origin $(WEB_BRANCH)
	git checkout master

deploy:
	@echo -e "${YELLOW}Cleaning www directory${NC}"
	rm -rf www
	@echo -e "${YELLOW}Compiling static files${NC}"
	harp compile
	@echo -e "${YELLOW}Deploying to gh-pages${NC}"
	gulp deploy
