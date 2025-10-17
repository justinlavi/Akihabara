# CMakeLists.txt
# Build configuration for graphics_2d.cpp to test C++ syntax highlighting

cmake_minimum_required(VERSION 3.15)

# Project setup
project(Graphics2D LANGUAGES CXX)

# Set C++ standard to 17 for modern features
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Define preprocessor macros for testing
add_definitions(-DENABLE_DEBUG_LOGGING=1)
add_definitions(-DMAX_FRAMES=60)

# Source file
set(SOURCES graphics_2d.cpp)

set(MY_VAR "TestValue" CACHE STRING "A test cache variable")

# Create executable
add_executable(Graphics2D ${SOURCES})

# Find and link threading library (for std::thread)
find_package(Threads REQUIRED)
target_link_libraries(Graphics2D PRIVATE Threads::Threads)

# Enable warnings for robust compilation
if (MSVC)
    target_compile_options(Graphics2D PRIVATE /W4 /WX)
else()
    target_compile_options(Graphics2D PRIVATE -Wall -Wextra -Werror)
endif()

# Conditional compilation for platform-specific code
if (UNIX AND NOT APPLE)
    target_compile_definitions(Graphics2D PRIVATE LINUX_BUILD)
endif()

# Include directories for standard library
target_include_directories(Graphics2D PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})

# Install target (optional, for testing install rules)
install(TARGETS Graphics2D DESTINATION bin)

# Custom target for debugging
add_custom_target(debug
    COMMAND ${CMAKE_COMMAND} -E echo "Debugging Graphics2D"
    DEPENDS Graphics2D
)
