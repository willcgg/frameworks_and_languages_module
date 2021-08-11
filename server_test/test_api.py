import os
import schemathesis

schema = schemathesis.from_path(
    'openapi.yml',
    base_url=os.environ['URI_SERVER'],
)


@schema.parametrize()
def test_api(case):
    case.call_and_validate()
