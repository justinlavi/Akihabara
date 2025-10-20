#pragma once

#include <iostream>
#include <string>

#define SCALE_FACTOR(x) ((x) * 2.0)

namespace graphics_2d
{
    double canvas_width = 800.0;
}

using u32 = uint32_t;

enum class RenderMode
{
    FILLED = 1,
    WIREFRAME
};

struct Point2D
{
    double x, y;
    static const double origin;

    double distance() const;
};

class Shape
{
protected:
    double center_x;
    const double opacity = 0.8;

public:
    Shape(double x);
    virtual void draw() = 0;
};

class Circle : public Shape
{
private:
    double radius_;

public:
    Circle(double x, double radius);
    void draw() override;
};

void transform(Point2D &point, double offset);
