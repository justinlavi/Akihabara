# graphics_2d.py
# A 2D graphics utility to test comprehensive Python syntax and semantic highlighting

# Standard library and third-party imports
import math
import typing
from typing import List, Tuple, Optional, Union, Callable
from collections import namedtuple
import numpy as np
import threading
from dataclasses import dataclass
from enum import Enum, auto
from abc import ABC, abstractmethod
from functools import wraps

# Docstring for module
"""A 2D graphics utility to test comprehensive Python syntax and semantic highlighting"""

# Constants
DEFAULT_ZOOM: float = 1.0
PI: float = 3.14159
MAX_FRAMES: int = 60
CANVAS_WIDTH: float = 800.0

# Global variables
frame_count: int = 0
is_running: bool = True
render_mode: str = "FILLED"

# Custom decorator for logging function execution
def log_execution(func: Callable) -> Callable:
    """Log function execution"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Executing {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

# Module alias
g2d = np

# Type aliases
PointArray = List[float]
Color = Tuple[int, int, int]
Numeric = Union[int, float]

# Enum for graphics states
class RenderMode(Enum):
    WIREFRAME = auto()
    FILLED = auto()
    TEXTURED = auto()

# Named tuple for 2D point
Point2D = namedtuple("Point2D", ["x", "y"])

# Dataclass for vector
@dataclass
class Vector2D:
    x: float = 0.0
    y: float = 0.0

    def distance_to_origin(self) -> float:
        """Calculate distance to origin"""
        return math.sqrt(self.x ** 2 + self.y ** 2)

# Abstract base class for shapes
class Shape(ABC):
    _center_x: float = 0.0
    _default_scale: float = 1.0

    def __init__(self, x: float):
        self._center_x = x

    @abstractmethod
    def draw(self) -> None:
        pass

    @property
    def opacity(self) -> float:
        return 0.8

# Derived class for circle
class Circle(Shape):
    def __init__(self, x: float, radius: float):
        super().__init__(x)
        self._radius: float = radius

    def draw(self) -> None:
        print(f"Drawing circle at {self._center_x} with radius {self._radius}")

    def render(self) -> None:
        self.draw()

# Function to transform coordinates
@log_execution
def transform(point: Point2D, offset: float, output: Optional[Point2D] = None) -> None:
    point.x += offset
    point.y += offset
    if output is not None:
        output.x = point.x
        output.y = point.y

# Generator function for frame times
def frame_generator(max_frames: int) -> typing.Generator[float, None, None]:
    for i in range(max_frames):
        yield i * 0.016

# Lambda for frame interpolation
interpolate = lambda frame: frame * 0.1

# Standard library containers
points: List[Point2D] = [Point2D(1.0, 2.0), Point2D(3.0, 4.0)]
transform_matrix: List[float] = [1.0, 0.0, 0.0, 1.0]
zoom_level: Optional[float] = DEFAULT_ZOOM
render_state: Union[int, str] = "active"

# Context manager for rendering
class RenderContext:
    def __enter__(self):
        print("Entering render context")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting render context")

# Thread-local storage
thread_local = threading.local()
thread_local.render_time = 0.0

# Class with property decorator
class Renderer:
    def __init__(self):
        self._brightness: float = 1.0

    @property
    def brightness(self) -> float:
        return self._brightness

    @brightness.setter
    def brightness(self, value: float) -> None:
        self._brightness = value

# List comprehension and set/dict literals
squares = [x**2 for x in range(10)]
unique_values = {x for x in [1, 2, 2, 3]}
config = {"mode": "default", "scale": 1.0}

# String literals
message = "Rendering started"
raw_string = r"\nRaw string"
f_string = f"Frame {frame_count}"
multiline = """Multiline
string"""

# Numeric literals
integer = 42
floating = 3.14
complex_num = 1 + 2j

# Boolean and None
flag = True
none_value = None

# Operator overloading
class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

# Main function to simulate a 2D graphics loop
def main() -> None:
    global frame_count, is_running

    if not is_running:
        raise RuntimeError("Graphics system not running")

    # Local variables
    frame_time: float = DEFAULT_ZOOM * 0.016
    max_fps: float = 60.0

    # Enum usage
    mode: RenderMode = RenderMode.FILLED

    # Class and dataclass instantiation
    circle = Circle(100.0, 50.0)
    vector = Vector2D(x=1.0, y=2.0)

    # Function calls
    transform(Point2D(0.0, 0.0), 10.0)

    # Generator usage
    for frame_time in frame_generator(MAX_FRAMES):
        print(f"Frame time: {frame_time}")

    # Context manager usage
    with RenderContext():
        circle.draw()

    # Operator usage
    v1 = Vector(1.0, 2.0)
    v2 = Vector(3.0, 4.0)
    v3 = v1 + v2

    # List comprehension
    scaled_points = [p.x * 2.0 for p in points]

    # Module usage
    g2d.array([1.0, 2.0])

    # Built-in function
    print(f"Render state: {render_state}")

if __name__ == "__main__":
    main()
