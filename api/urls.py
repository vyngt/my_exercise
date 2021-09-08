from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# Create a router and register our viewsets with it.
router = DefaultRouter()
# router.register(r'example', views.example)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterUserView.as_view(), name="register"),
    path('login-face/', views.FaceLoginView.as_view(), name="face-login"),
    path('login-password/', views.PasswordLoginView.as_view(), name="password-login"),
    path('profile/', views.UserProfileView.as_view(), name="profile"),
]
