from rest_framework import generics, authentication, permissions
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from . import serializers
from .models import Advertisement, User, Profile, MonoPage, MonoPost, MonoComment, FriendRequest, UserIntPage, UserIntPost, UserIntComment, UserIntUser, UserIntAttribute, PageAttribute, FollowingPage, AffiliateLinks, UserRecommendedPage, UserRecommendedUser, OwningPage
from django.shortcuts import render
from django.db.models import Q
from django.db import connection
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from config import custompermissions
from django.contrib.auth import get_user_model
from django.core import signing
import json
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
import random
from django.template import loader
import stripe
from django.conf import settings
from django.core.mail import send_mail

stripe.api_key = settings.STRIPE_SECRET_KEY

# This method for authentication
def authenticate(request) :
    tokenAuthenticator = authentication.TokenAuthentication()
    auth = tokenAuthenticator.authenticate(request)
    request.user = auth[0]

class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer

class StripeCheckoutView(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        SITE_URL = data.get('SITE_URL')
        pageId = data.get('pageId')
        encrypted_pageId = signing.dumps(pageId)
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': settings.PRICE_ID,
                        'quantity': 1,
                    },
                ],
                currency="JPY",
                payment_method_types=['card',],
                mode='payment',
                success_url = SITE_URL + '/gotpage?success=true&session_id={CHECKOUT_SESSION_ID}&index=' + encrypted_pageId,
                cancel_url = SITE_URL + '/mono?canceled=true',
            )
            return JsonResponse({'goTo': checkout_session.url})
        except Exception as e:
            # Handle the exception and retrieve the error message
            error_message = str(e)
            print("error_message")
            print(error_message)
            return Response(
                {'error': 'Something went wrong when creating stripe checkout session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ForgotPasswordView(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        try:
            userInfo=get_user_model().objects.get(email=email,type='normal')
        except get_user_model().DoesNotExist:
            return Response('Invalid email!', status=status.HTTP_400_BAD_REQUEST)
        new_verification_key=random.randint(100000, 999999)
        userInfo.verification_key=new_verification_key
        userInfo.save()
        encrypted_id = signing.dumps(userInfo.id)
        encrypted_key = signing.dumps(new_verification_key)
        html_message = loader.render_to_string(
        'email_sender_app/forgot-password.html',
        {
            # TODO:  Update with your own id
            'id': encrypted_id,
            # TODO:  Update with your own body
            'body': encrypted_key,
            # TODO: Update the signature
            'sign': 'The Tatami account team',
        })
        send_mail(
            'Reset your password',
            'You are lucky to receive this mail.',
            'noreply@tatami.com',  # TODO: Update this with your mail id
            [email],  # TODO: Update this with the recipients mail id
            html_message=html_message,
            fail_silently=False,
        )
        return JsonResponse({'message': 'OK'})

class PasswordVerifyView(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data.get('id')
        key = data.get('key')
        # Perform user activation logic here
        # You can use the id and key to activate the user
        user_id = signing.loads(id)
        verification_key = signing.loads(key)
        try:
            user = get_user_model().objects.get(id=user_id, verification_key=verification_key)
        except get_user_model().DoesNotExist:
           return Response('Invalid user ID or verification key.', status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse({'email': user.email})

class ResetPasswordView(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        # Perform password reset logic here
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
           return Response('Invalid email.', status=status.HTTP_400_BAD_REQUEST)
        user.set_password(password)
        new_verification_key=random.randint(100000, 999999)
        user.verification_key=new_verification_key
        user.save()
        return JsonResponse({'message': 'OK'})

class EmailVerifyView(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data.get('id')
        key = data.get('key')
        # Perform user activation logic here
        user_id = signing.loads(id)
        verification_key = signing.loads(key)
        try:
            user = get_user_model().objects.get(id=user_id, verification_key=verification_key)
        except get_user_model().DoesNotExist:
            raise serializers.ValidationError('Invalid user ID or verification key.')
        user.is_active = True
        user.save()
        return JsonResponse({'message': 'OK'})

class LoginGoogleView(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        # Perform user activation logic here
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            user =  get_user_model()(email=email)
            user.type='google'
            user.is_active = True
            user.save()
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key})

class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = serializers.FriendRequestSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        authenticate(self.request)
        return self.queryset.filter(Q(askTo=self.request.user) | Q(askFrom=self.request.user))

    def perform_create(self, serializer):
        authenticate(self.request)
        try:
            serializer.save(askFrom=self.request.user)
        except:
            raise ValidationError("User can have only unique request")

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'Delete is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Patch is not allowed !'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by("-created_on")
    serializer_class = serializers.ProfileSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,
    #                       custompermissions.ProfilePermission,)
    # def get_queryset(self):
    #     print("constructor")
    #     print(authentication.get_authorization_header(self.request))
    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userProfile=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all().order_by("-created_on")
    serializer_class = serializers.ProfileSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,
    #                       custompermissions.ProfilePermission,)

    def get_queryset(self):
        authenticate(self.request)
        data = self.queryset.filter(userProfile=self.request.user)
        print(data)
        if not data:
            profile = Profile(userProfile=self.request.user)
            profile.save()
        return self.queryset.filter(userProfile=self.request.user)


class PageAttributeViewSet(viewsets.ModelViewSet):
    queryset = PageAttribute.objects.all().order_by("-created_on")
    serializer_class = serializers.PageAttributeSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userCreate=self.request.user)


class MonoPageViewSet(viewsets.ModelViewSet):
    queryset = MonoPage.objects.all().order_by("-created_on")
    serializer_class = serializers.MonoPageSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userCreate=self.request.user)


class MonoPostViewSet(viewsets.ModelViewSet):
    queryset = MonoPost.objects.all().order_by("-created_on")
    serializer_class = serializers.MonoPostSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userPost=self.request.user)

class DeletePostViewSet(viewsets.ModelViewSet):
    queryset = MonoPost.objects.all().order_by("-created_on")
    serializer_class = serializers.MonoPostSerializer

    def create(self, request):
        MonoPost.objects.get(id=request.data["id"]).delete()
        return Response("success", status=status.HTTP_201_CREATED)

class MyMonoPostViewSet(viewsets.ModelViewSet):
    queryset = MonoPost.objects.all()
    serializer_class = serializers.MonoPostSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        authenticate(self.request)
        return self.queryset.filter(Q(userPost=self.request.user))

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userPost=self.request.user)


class MonoCommentViewSet(viewsets.ModelViewSet):
    queryset = MonoComment.objects.all()
    serializer_class = serializers.MonoCommentSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userComment=self.request.user)


class UserIntPageViewSet(viewsets.ModelViewSet):
    queryset = UserIntPage.objects.all()
    serializer_class = serializers.UserIntPageSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter().order_by("-created_on")

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userId=self.request.user)


class UserIntPostViewSet(viewsets.ModelViewSet):
    queryset = UserIntPost.objects.all()
    serializer_class = serializers.UserIntPostSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter().order_by("-created_on")

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userId=self.request.user)


class UserIntCommentViewSet(viewsets.ModelViewSet):
    queryset = UserIntComment.objects.all()
    serializer_class = serializers.UserIntCommentSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter().order_by("-created_on")

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userId=self.request.user)


class UserIntUserViewSet(viewsets.ModelViewSet):
    queryset = UserIntUser.objects.all()
    serializer_class = serializers.UserIntUserSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter().order_by("-created_on")

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userId=self.request.user)


class UserIntAttributeViewSet(viewsets.ModelViewSet):
    queryset = UserIntAttribute.objects.all()
    serializer_class = serializers.UserIntAttributeSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter().order_by("-created_on")

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userId=self.request.user)


class FollowingPageViewSet(viewsets.ModelViewSet):
    queryset = FollowingPage.objects.all()
    serializer_class = serializers.FollowingPageSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userId=self.request.user).order_by("-created_on")

    def perform_create(self, serializer):
        serializer.save(userId=self.request.user)


class AffiliateLinksViewSet(viewsets.ModelViewSet):
    queryset = AffiliateLinks.objects.all().order_by("-created_on")
    serializer_class = serializers.AffiliateLinksSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)

    # def perform_create(self):
    #     authenticate(self.request)

class UserRecommendedUserViewSet(viewsets.ModelViewSet):
    queryset = UserRecommendedUser.objects.all()
    serializer_class = serializers.UserRecommendedUserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userRecommendedUser=self.request.user).order_by("-created_on")


class UserRecommendedPageViewSet(viewsets.ModelViewSet):
    queryset = UserRecommendedPage.objects.all()
    serializer_class = serializers.UserRecommendedPageSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(pageRecommendedUser=self.request.user).order_by("-created_on")


class BulkUserRecommendedUserView(generics.CreateAPIView):
    serializer_class = serializers.UserRecommendedUserSerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(BulkUserRecommendedUserView, self).get_serializer(*args, **kwargs)


class BulkUserRecommendedPageView(generics.CreateAPIView):
    serializer_class = serializers.UserRecommendedPageSerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(BulkUserRecommendedPageView, self).get_serializer(*args, **kwargs)


class BulkMonoPageView(generics.CreateAPIView):
    serializer_class = serializers.MonoPageSerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(BulkMonoPageView, self).get_serializer(*args, **kwargs)


class OwningPageViewSet(viewsets.ModelViewSet):
    queryset = OwningPage.objects.all()
    serializer_class = serializers.OwningPageSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userId=self.request.user).order_by("-created_on")

    def perform_create(self, serializer):
        encrypted_number = self.request.data.get('encrypted_pageId')
        number = signing.loads(encrypted_number)
        mono_page = MonoPage.objects.get(id=number)
        serializer.validated_data['pageId'] = mono_page
        serializer.save(userId=self.request.user)

class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = serializers.AdvertisementSerializer

    def perform_create(self, serializer):
        authenticate(self.request)
        serializer.save(userId=self.request.user)

class UpdateAdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = serializers.AdvertisementSerializer

    def create(self, request):
        authenticate(request)
        if (request.data["updateCnt"] == 1):
            cursor = connection.cursor()
            cursor.execute("UPDATE api_advertisement SET cnt = cnt+1 where id=" + str(request.data["adsId"]))
            cursor.fetchone()
            return Response("success", status=status.HTTP_200_OK)
        elif (request.data["updateDelFlag"] == 1):
            cursor = connection.cursor()
            cursor.execute("UPDATE api_advertisement SET del_flag = 1 where id=" + str(request.data["adsId"]))
            cursor.fetchone()
            return Response("success", status=status.HTTP_200_OK)

class MyExampleViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all()
    serializer_class = serializers.AdvertisementSerializer

    def get_queryset(self):
        return self.queryset.filter().order_by("-created_on")

    def put(self, serializer):
        print('1')
        return Response("hello", status=status.HTTP_400_BAD_REQUEST)
        # serializer.save(userId=self.request.user)

    def create(self, request):
        return Response("hello", status=status.HTTP_400_BAD_REQUEST)