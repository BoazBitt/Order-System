from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Product
from .serializer import ProductSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3  
    page_size_query_param = 'page_size'
    max_page_size = 9
# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [permissions.IsAuthenticated] 
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Product was created successfully"}, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        product = self.get_object()
        if product:
            serializer = self.get_serializer(product)
            return Response(serializer.data)
        else:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)  
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
      
    def update(self, request, *args, **kwargs):
        product = self.get_object()
        serializer = self.get_serializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Product updated successfully",'data':serializer.data}, status=status.HTTP_200_OK)

    
    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        if product:
            product.delete()
            return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='all')
    def all_products(self, request, pk=None):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
 
