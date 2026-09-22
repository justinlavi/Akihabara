SHELL := /bin/sh
CC ?= cc
CFLAGS := -std=c17 -Wall -Wextra -Werror
BUILD_DIR := build
TARGET := $(BUILD_DIR)/fixture
SOURCES := sample.c

.PHONY: all clean test

all: $(TARGET)

$(BUILD_DIR):
	mkdir -p $@

$(TARGET): $(SOURCES) | $(BUILD_DIR)
	$(CC) $(CFLAGS) $< -o $@

test: $(TARGET)
	@echo "Running $(TARGET)"
	$(TARGET)

clean:
	rm -f $(TARGET)
