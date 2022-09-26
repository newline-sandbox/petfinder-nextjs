include .env
export

PETFINDER_ACCESS_TOKEN := $(shell curl -d grant_type=client_credentials -d client_id=$(NEXT_PUBLIC_PETFINDER_CLIENT_ID) -d client_secret=$(NEXT_PUBLIC_PETFINDER_CLIENT_SECRET) $(NEXT_PUBLIC_PETFINDER_API_URL)/oauth2/token | sed -E 's/.*"access_token":"?([^,"]*)"?.*/\1/')

dev:
	@(PETFINDER_ACCESS_TOKEN=$(PETFINDER_ACCESS_TOKEN) npm run dev)

build:
	@(PETFINDER_ACCESS_TOKEN=$(PETFINDER_ACCESS_TOKEN) npm run build)

export_html:
	@(PETFINDER_ACCESS_TOKEN=$(PETFINDER_ACCESS_TOKEN) NEXT_EXPORT=1 npm run export)