import sys

import logbook
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer
from tornado.web import Application, FallbackHandler

from .config import PORT, IP
from unistore.app import app


def run_server():
    settings = dict()
    flask_container = WSGIContainer(app)
    handlers = [
        (r'.*', FallbackHandler, dict(fallback=flask_container))
    ]
    http_server = HTTPServer(Application(handlers), **settings)
    http_server.listen(PORT, IP)
    IOLoop.instance().start()


if __name__ == '__main__':
    # No need for a file handler, since the service directs all output to a file anyway.
    logger_setup = logbook.NestedSetup(
        [logbook.NullHandler(), logbook.StreamHandler(sys.stdout, level=logbook.DEBUG, bubble=True)])
    with logger_setup.applicationbound():
        run_server()
