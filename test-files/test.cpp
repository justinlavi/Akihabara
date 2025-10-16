// Comprehensive C++ file to test syntax and semantic highlighting

#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <functional>
#include <type_traits>
#include <concepts>
#include <array>
#include <optional>
#include <variant>
#include <thread>
#include <atomic>
#include <cstdint>
#include <cassert>

// Module import (C++20, if supported by compiler)
import <optional>; // For testing module-based imports

// Macro definitions
#define MY_MACRO(x) ((x) * 2)
#define DEBUG_LOG std::cout << "Debug\n"
#define CONST_MACRO 42

// Attributes
[[noreturn]] void panic() { throw std::runtime_error("Panic!"); }
[[deprecated("Use new_function instead")]] void old_function() {}
[[nodiscard]] int compute_value() { return 42; }

// Namespace and alias
namespace my_namespace {
    inline namespace v1 {
        int namespace_var = 10;
    }
}

namespace alias_ns = my_namespace;

// Using declarations
using std::string;
using IntVector = std::vector<int>;
using u32 = uint32_t;

// Concept definition
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

// Fundamental types
int global_int = 0;
unsigned int global_uint = 0u;
float global_float = 0.0f;
double global_double = 0.0;
long double global_long_double = 0.0L;
char global_char = 'A';
wchar_t global_wchar = L'B';
char16_t global_char16 = u'C';
char32_t global_char32 = U'D';
bool global_bool = true;
void* global_ptr = nullptr;
std::nullptr_t global_nullptr = nullptr;

// Enum definitions
enum Color { RED, GREEN, BLUE };
enum class Status : int { ACTIVE = 1, INACTIVE = 0 };

// Struct
struct Point {
    double x, y;
    static const int origin = 0;
    [[nodiscard]] double distance() const { return std::sqrt(x * x + y * y); }
};

// Union
union Data {
    int i;
    float f;
    char c;
};

// Class with various members
class MyClass {
private:
    int private_var = 0;
    static inline int static_var = 10;
    const int readonly_var = 20;

public:
    virtual void virtual_method() {}
    static void static_method() {}
    [[nodiscard]] int compute() const { return private_var + readonly_var; }
    explicit MyClass(int val) : private_var(val) {}
    virtual ~MyClass() = default;

    // Property-like getter
    int get_private_var() const { return private_var; }
};

// Abstract class
class AbstractBase {
public:
    virtual void pure_virtual() = 0;
    virtual ~AbstractBase() = default;
};

// Derived class
class Derived : public MyClass, public AbstractBase {
public:
    Derived(int val) : MyClass(val) {}
    void pure_virtual() override {}
};

// Template class
template<typename T, int N>
class TemplateClass {
private:
    T data[N];
public:
    TemplateClass() = default;
    T& operator[](int index) { return data[index]; }
};

// Template function
template<Numeric T>
T add(T a, T b) { return a + b; }

// Type alias
using StringVector = std::vector<std::string>;

// Function with various parameters
void process(int& ref_param, const int readonly_param, std::string* ptr_param) {
    ref_param += readonly_param;
    if (ptr_param) *ptr_param += " processed";
}

// Lambda expression
auto lambda = [](int x) -> int { return x * 2; };

// Standard library types
std::vector<int> vec = {1, 2, 3};
std::array<int, 3> arr = {4, 5, 6};
std::optional<int> opt = 42;
std::variant<int, std::string> var = "test";
std::unique_ptr<int> unique_ptr = std::make_unique<int>(10);
std::shared_ptr<int> shared_ptr = std::make_shared<int>(20);
std::function<void()> func = []() { std::cout << "Function\n"; };

// Thread-local and atomic
thread_local int tl_var = 0;
std::atomic<int> atomic_var = 0;

// Constexpr and inline
constexpr int square(int x) { return x * x; }
inline void inline_func() { std::cout << "Inline\n"; }

// Operator overloading
struct Vector2D {
    double x, y;
    Vector2D operator+(const Vector2D& other) const {
        return {x + other.x, y + other.y};
    }
};

// Function with default arguments
void default_args(int x = 10, std::string s = "default") {
    std::cout << x << " " << s << "\n";
}

// Async-like function (simulated)
std::thread async_task([]() { std::cout << "Async task\n"; });

// Main function to test various constructs
int main() {
    // Local variables
    int local_var = MY_MACRO(5);
    const int readonly_local = 10;
    static int static_local = 20;

    // Enum usage
    Color c = RED;
    Status s = Status::ACTIVE;

    // Struct and union
    Point p{1.0, 2.0};
    Data d{.i = 42};

    // Class instantiation
    MyClass obj(5);
    Derived derived(10);

    // Template instantiation
    TemplateClass<int, 3> t;
    t[0] = 1;

    // Function calls
    process(local_var, readonly_local, nullptr);
    int sum = add(5, 10);

    // Lambda call
    int result = lambda(4);

    // Standard library usage
    vec.push_back(4);
    opt = std::nullopt;
    var = 100;

    // Thread and atomic
    tl_var = 1;
    atomic_var.fetch_add(1);

    // Constexpr and inline
    constexpr int sq = square(5);
    inline_func();

    // Operator usage
    Vector2D v1{1.0, 2.0}, v2{3.0, 4.0};
    Vector2D v3 = v1 + v2;

    // Default arguments
    default_args();

    // Async task
    async_task.join();

    // Attribute usage
    old_function();
    compute_value();

    // Namespace usage
    alias_ns::namespace_var = 20;

    DEBUG_LOG;
    return 0;
}
