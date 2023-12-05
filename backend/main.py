import argparse
from app.utils import create_app

def run():
    app = create_app('development')
    app.run()

def unit_test():
    import unittest
    import sys

    tests = unittest.TestLoader().discover('tests/unit_test')
    result = unittest.TextTestRunner(verbosity=2).run(tests)

    if result.errors or result.failures:
        sys.exit(1)

def functional_test():
    NotImplementedError

def parse_args():
    parser = argparse.ArgumentParser(description='Flask backend application for parking system')
    parser.add_argument('action', choices=['run', 'unit-test', 'functional-test'], help='Action to perform')

    return parser.parse_args()

if __name__ == '__main__':
    args = parse_args()

    if args.action == 'run':
        run()
    elif args.action == 'unit-test':
        unit_test()
    elif args.action == 'functional_test':
        functional_test()

