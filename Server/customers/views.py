from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Customer
from .serializer import CustomerSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from orders.models import Order,OrderItem


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'
    max_page_size = 100

# Create your views here.
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated] 


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Customer was created successfully"}, status=status.HTTP_201_CREATED)
    
    def retrieve(self, request, *args, **kwargs):
        customer = self.get_object()
        if customer:
            serializer = self.get_serializer(customer)
            return Response(serializer.data)
        else:
            return Response({"message": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)  
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

    def update(self, request, *args, **kwargs):
        customer = self.get_object()
        serializer = self.get_serializer(customer, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Customer updated successfully",'data':serializer.data}, status=status.HTTP_200_OK)

  
    def destroy(self, request, *args, **kwargs):
        customer = self.get_object()
        if customer:
            customer.delete()
            return Response({"message": "Customer deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
    @action(detail=True, methods=['get'], url_path='report')
    def customer_report(self, request, pk=None):
        try:
            customer = self.get_object()
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
        orders = Order.objects.filter(customer=customer)
        report = {}
        for order in orders:
            for item in order.orderitem_set.all():
                product_name = item.product.prodName  
                product_price = item.product.price  
                quantity = item.quantity

                if product_name not in report:
                    report[product_name] = {'total_quantity': 0, 'total_spent': 0}

                report[product_name]['total_quantity'] += quantity
                report[product_name]['total_spent'] += quantity * product_price

        formatted_report = [{
            'product_name': key,
            'total_quantity': value['total_quantity'],
            'total_spent': value['total_spent']
        } for key, value in report.items()]

        response_data = {
            'customer_id': customer.id,
            'customer_name': customer.fullName,
            'report': formatted_report
        }
        return Response(response_data, status=status.HTTP_200_OK)
  
     
        
