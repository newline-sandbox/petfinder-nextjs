ifeq ($(origin NEXT_PUBLIC_VERCEL_URL), undefined)
	include .env
	export
endif

# https://stackoverflow.com/questions/2019989/how-to-assign-the-output-of-a-command-to-a-makefile-variable
PETFINDER_ACCESS_TOKEN := $(shell curl -d "grant_type=client_credentials&client_id=$(NEXT_PUBLIC_PETFINDER_CLIENT_ID)&client_secret=$(NEXT_PUBLIC_PETFINDER_CLIENT_SECRET)" $(NEXT_PUBLIC_PETFINDER_API_URL)/oauth2/token | sed -E 's/.*"access_token":"?([^,"]*)"?.*/\1/')

dev:
	PETFINDER_ACCESS_TOKEN=$(PETFINDER_ACCESS_TOKEN) npm run dev

build:
	PETFINDER_ACCESS_TOKEN=$(PETFINDER_ACCESS_TOKEN) npm run build