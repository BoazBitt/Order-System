from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Order ,OrderItem
from products.models import Product
from .serializer import OrderSerializer
from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 1  
    page_size_query_param = 'page_size'
    max_page_size = 2

# Create your views here.
class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = StandardResultsSetPagination

    permission_classes = [permissions.IsAuthenticated] 

    def create(self, request, *args, **kwargs):
        products_data = request.data.pop('products')
        serializer = self.get_serializer(data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        for product_data in products_data:
            product_id = product_data.get('id')
            quantity = product_data.get('quantity', 1)
            if product_id:
                product = Product.objects.get(id=product_id)
                OrderItem.objects.create(order=order, product=product, quantity=quantity)
                order.products.add(product)
        return Response({"message": "Order and OrderItems were created successfully"}, status=status.HTTP_201_CREATED)
     
    def retrieve(self, request, *args, **kwargs):
        order = self.get_object()
        if order:
            serializer = self.get_serializer(order)
            return Response(serializer.data)
        else:
            return Response({"message": "Order was not found"}, status=status.HTTP_404_NOT_FOUND)  
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data
        if 'comments' in data:
            instance.comments = data['comments']

        if 'products' in data:
            for product_data in data['products']:
                product = product_data.get('product')
                product_id = product.get('id')
                quantity = product_data.get('quantity')
                if product_id and quantity is not None:
                    try:
                        order_item = OrderItem.objects.get(order=instance, product_id=product_id)
                        if quantity > 0:
                            order_item.quantity = quantity
                            order_item.save()
                        else:
                            order_item.delete()
                    except OrderItem.DoesNotExist:
                        if quantity > 0:
                            OrderItem.objects.create(order=instance, product_id=product_id, quantity=quantity)

        instance.save()
        return Response({"message": "Order updated successfully",'data':OrderSerializer(instance).data}, status=status.HTTP_200_OK)
  
    def destroy(self, request, *args, **kwargs):
        order = self.get_object()
        allProducts = OrderItem.objects.filter(order__id=order.id)
        for product in allProducts:
            product.delete()
        if order:
            order.delete()
            return Response({"message": "Order deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
    
  
     
        