# from django.test import tag
# from rest_framework import status
# from rest_framework.authtoken.admin import User
# from rest_framework.authtoken.models import Token
# from django.urls import reverse
# from rest_framework.test import APIClient
# from rest_framework.test import APITestCase
# from .models import Product
# from decimal import Decimal



# class ProductViewSetTestCase(APITestCase):

#     def setUp(self):
#         super().setUp()
#         self.client = APIClient()
#         self.user = User.objects.create_user(username='testuser', password='testpassword')
#         self.token = Token.objects.create(user=self.user)
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

#     @tag('Unit-Test')
#     def test_CreateProduct(self):
#         url = reverse('product-list')
#         data = {"prodName": "Test Product", "price": "10.99", "type": "raw"}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Product.objects.count(), 1)
#         self.assertEqual(Product.objects.get().prodName, "Test Product")

#     @tag('Unit-Test')
#     def test_RetrieveProduct(self):
#         product = Product.objects.create(prodName="Test Product", price="10.99", type="raw")
#         url = reverse('product-detail', kwargs={'pk': product.pk})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['prodName'], "Test Product")

#     @tag('Unit-Test')
#     def test_ListProducts(self):
#         Product.objects.create(prodName="Product 1", price="10.99", type="raw")
#         Product.objects.create(prodName="Product 2", price="20.99", type="dish")
#         url = reverse('product-list')
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 2)

#     @tag('Unit-Test')
#     def test_UpdateProduct(self):
#         product = Product.objects.create(prodName="Test Product", price="10.99", type="raw")
#         url = reverse('product-detail', kwargs={'pk': product.pk})
#         data = {"prodName": "Updated Product", "price": "15.99"}
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # Retrieve the updated product from the database to get the correct price
#         updated_product = Product.objects.get(pk=product.pk)
#         self.assertEqual(updated_product.prodName, "Updated Product")
#         self.assertEqual(updated_product.price, Decimal("15.99"))


#     @tag('Unit-Test')
#     def test_DeleteProduct(self):
#         product = Product.objects.create(prodName="Test Product", price="10.99", type="raw")
#         url = reverse('product-detail', kwargs={'pk': product.pk})
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Product.objects.count(), 0)
