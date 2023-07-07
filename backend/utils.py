from types import NoneType


def to_int(value):
    return int(float(value))


def to_float(value):
    if not value:
        return 0.0
    as_str = str(value)
    if as_str == "nan":
        return 0.0
    as_str = as_str.replace(",", ".")
    return float(as_str)


def is_number(s):
    if type(s) == NoneType:
        return False
    try:
        float(s)
    except ValueError:
        return False
    return True
