#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

#define ARRAY_COUNT(values) (sizeof(values) / sizeof((values)[0]))

typedef enum Status { STATUS_IDLE, STATUS_READY } Status;

typedef struct Point {
    double x;
    double y;
} Point;

static const double SCALE = 1.5;

static double magnitude_squared(const Point *point) {
    return point->x * point->x + point->y * point->y;
}

int main(void) {
    Point points[] = {{1.0, 2.0}, {.x = 3.0, .y = 4.0}};
    bool ready = ARRAY_COUNT(points) > 0;
    for (size_t index = 0; ready && index < ARRAY_COUNT(points); ++index) {
        printf("%zu: %.2f\n", index, magnitude_squared(&points[index]) * SCALE);
    }
    return STATUS_READY == 1 ? 0 : 1;
}
