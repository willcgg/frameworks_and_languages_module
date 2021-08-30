import pytest

import os
import time

import requests


@pytest.fixture(scope="session")
def ENDPOINT():
    return os.environ.get('URI_SERVER', 'http://localhost:8000')


@pytest.fixture(scope="session", autouse=True)
def wait_for_service(ENDPOINT):
    """
    Before starting tests
    Wait for service to become available
    """
    for attempt in range(10):
        try:
            if requests.get(ENDPOINT).status_code == 200:
                return
        except requests.exceptions.ConnectionError as ex:
            pass
        time.sleep(1)
    raise Exception(f"{ENDPOINT} not responding")  # TODO: This does not seem to stop execution of tests?
    #request.addfinalizer(finalizer_function)


