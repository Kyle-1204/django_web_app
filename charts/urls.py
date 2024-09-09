from django.urls import path
from . import views

urlpatterns = [
    path('api/candlestick-data/', views.candlestick_data, name='candlestick-data'),
    path('api/line-chart-data/', views.line_chart_data, name='line-chart-data'),
    path('api/bar-chart-data/', views.bar_chart_data, name='bar-chart-data'),
    path('api/pie-chart-data/', views.pie_chart_data, name='pie-chart-data'),
]