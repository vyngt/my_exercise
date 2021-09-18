from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .authenticate import FaceIdAuthBackend
from .models import UserFaceImage
from .utils import base64_file, prepare_image, encode_base64



class RegisterUserView(APIView):
    def post(self, request):
        data = request.data
        user = User()
        if not User.objects.filter(username=data['username']).exists():
            user.username = data['username']
            user.email = data['email']
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            user.set_password(data['password'])
            user.save()
            image = base64_file(data['image_base64'])
            user_face = UserFaceImage(user=user, image=image)
            user_face.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class FaceLoginView(APIView):
    def post(self, request):
        data = request.data
        face_image = prepare_image(data['img'])
        face_id = FaceIdAuthBackend()
        user = face_id.authenticate(username=data['username'], face_id=face_image)
        if user is not None:
            # JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(status=status.HTTP_400_BAD_REQUEST)


class PasswordLoginView(APIView):
    def post(self, request):
        data = request.data
        user = authenticate(password=data['password'], username=data['username'])
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            user = User.objects.get(username=user.username)
            image = encode_base64(str(user.userfaceimage.image))

            profile = {'username': user.username,
                       'email': user.email,
                       'first_name': user.first_name,
                       'last_name': user.last_name,
                       'image': image}
            return Response(profile)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
