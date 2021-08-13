
ITEMS = {
    1: {
        'some': 'data',
    },
    2: {
        'some': 'more',
    }
}


class DataModelPythonDict():
    def __init__(self, items):
        self.items = items or {}
        self.items_id_max = max(self.items.keys())
    def get_item(self, item_id):
        return self.items.get(item_id)
    def delete_item(self, item_id):
        del self.items[item_id]
    def create_item(self, data):
        self.items_id_max += 1
        self.items[self.items_id_max] = data
        return self.items_id_max



datastore = DataModelPythonDict(ITEMS)
