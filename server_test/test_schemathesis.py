import os
import schemathesis

#schema = schemathesis.from_path(
#    os.environ.get('OPENAPI_SPEC', 'openapi.yml'),
#    base_url=os.environ.get('URI_SERVER', 'http://localhost:8000'),
#)


#@schema.parametrize()
#def test_api(case):
#    case.call_and_validate()

def test_example():
    pass
