#include "graphics_2d.h"

const double Point2D::origin = 0.0;

Shape::Shape(double x) : center_x(x) {}

Circle::Circle(double x, double radius)
    : Shape(x), radius_(radius) {}

void Circle::draw()
{
    std::cout << "Circle at " << center_x
              << ", radius " << radius_ << "\n";
}

double Point2D::distance() const
{
    return x * x + y * y;
}

void transform(Point2D &point, double offset)
{
    point.x += offset;
    point.y += offset;
}

int main()
{
    int frame_count = 0;
    const double max_fps = 60.0;
    double frame_time = SCALE_FACTOR(0.016);
    bool is_running = true;
    std::string status = "active";

    graphics_2d::canvas_width = 1024.0;

    Circle circle(100.0, 50.0);
    Point2D point{1.0, 2.0};

    try
    {
        if (!is_running) {
            throw std::runtime_error("Not running");
        }

        for (u32 i = 0; i < 3; ++i) {
            transform(point, 10.0);
            circle.draw();

            if (frame_count >= 60) {
                return 0;
            }
            frame_count++;
        }
    }
    catch (const std::runtime_error &e)
    {
        std::cout << "Error: " << e.what() << "\n";
    }

    std::cout << "Distance: " << point.distance() << "\n";
    std::cout << "Mode: " << static_cast<int>(RenderMode::FILLED) << "\n";

    return 0;
}
