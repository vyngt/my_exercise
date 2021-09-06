from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .authenticate import FaceIdAuthBackend
from .models import UserFaceImage
from .utils import base64_file, prepare_image


class RegisterUserView(APIView):
    def post(self, request):
        data = request.data
        user = User()
        if not User.objects.filter(username=data['username']).exists():
            user.username = data['username']
            user.set_password(data['password'])
            user.save()
            image = base64_file(data['img'])
            user_face = UserFaceImage(user=user, image=image)
            user_face.save()
            return Response({"message": "success"})
        return Response({"message": "already registered"})


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
        # return Response({"message": "Login failed"})
        return Response(status=status.HTTP_400_BAD_REQUEST)
