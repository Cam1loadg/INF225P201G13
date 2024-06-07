import unittest
import requests
import json
from bson import ObjectId

class customJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
    

class modificar_cita_Tests(unittest.TestCase):
    valid_request_data = None
    invalid_request_data = None

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:5000/citas/modify/{}"
        cls.valid_request_data = {
            "_id": ObjectId("6625808339d27fad9f3b6137"),#id valido
            "fecha": "2024-07-20T15:30"                 #fecha valida
        }
        cls.invalid_request_data = {
            "_id": ObjectId("6625808339d27fad9f3b6137"),#id valido (existente)
            "fecha": "2023-05-20T15:30"                 #fecha anterior a la actual
        }
    
    @classmethod
    def tearDownClass(cls):
        del cls.valid_request_data
        del cls.invalid_request_data

    def test_modificar_cita_valido(self):
        url = self.base_url.format(self.valid_request_data["_id"])
        response = requests.put(url, data=json.dumps(self.valid_request_data, cls=customJSONEncoder),
                                headers={'Content-Type': 'application/json'})
        
        self.assertEqual(response.status_code, 200)

    def test_modificar_cita_invalido(self):
        url = self.base_url.format(self.invalid_request_data["_id"])
        response = requests.put(url, data=json.dumps(self.invalid_request_data, cls=customJSONEncoder),
                                headers={'Content-Type': 'application/json'})

        self.assertEqual(response.status_code, 400)


##########################################################################################

class crear_usuario_Tests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:5000/user/register"
        cls.valid_request_data = {
            "name": "tets v 1",
            "rut": "1.000.001-7", #Rut valido, es decir, real con dv calculado a partir del resto del rut
            "password": "anypassword",
            "cargo": "TENS"
        }
        cls.invalid_request_data_1 = {
            "name": "tets inv 1",
            "rut": "999.999-99", #Rut mal formateado
            "password": "anypassword",
            "cargo": "TENS"
        }
        cls.invalid_request_data_2 = {
            "name": "tets inv 2",
            "rut": "77.777.777-7",  # Rut existente
            "password": "anypassword",
            "cargo": "TENS"
        }
        cls.invalid_request_data_3 = {
            "name": "tets inv 3",
            "rut": "ab.cde.fgh-i", #Rut con letras
            "password": "anypassword",
            "cargo": "TENS"
        }

    @classmethod
    def tearDownClass(cls):
        del cls.valid_request_data
        del cls.invalid_request_data_1
        del cls.invalid_request_data_2
        del cls.invalid_request_data_3
    
    #-----------
    def test_crear_usuario_valido(self):
        response = requests.post(self.base_url, data=json.dumps(self.valid_request_data, cls=customJSONEncoder),
                                 headers={'Content-Type': 'application/json'})
        
        self.assertEqual(response.json()["message"], "User registered successfully")

    #-----------    
    def test_crear_usuario_invalido_1(self):
        response = requests.post(self.base_url, data=json.dumps(self.invalid_request_data_1, cls=customJSONEncoder),
                                 headers={'Content-Type': 'application/json'})
        
        self.assertEqual(response.json()["message"], "Invalid RUT format")
        

    #-----------
    def test_crear_usuario_invalido_2(self):
        response = requests.post(self.base_url, data=json.dumps(self.invalid_request_data_2, cls=customJSONEncoder),
                                 headers={'Content-Type': 'application/json'})
        
        self.assertEqual(response.json()["message"], "User already exists")

    #-----------
    def test_crear_usuario_invalido_3(self):
        response = requests.post(self.base_url, data=json.dumps(self.invalid_request_data_3, cls=customJSONEncoder),
                                 headers={'Content-Type': 'application/json'})
        
        self.assertEqual(response.json()["message"], "Invalid RUT format")



if __name__ == '__main__':
    unittest.main()