.PHONY: build serve test check

build:
	python -m bookmarks 

serve:
	uvicorn bookmarks:api --reload

test:
	python -m unittest discover -s tests

check:
	pyright
