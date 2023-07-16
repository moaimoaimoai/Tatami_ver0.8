from rest_framework import generics, authentication, permissions
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from . import serializers
from .models import Profile, MonoPage, MonoPost, MonoComment, FriendRequest, UserIntPage, UserIntPost, UserIntComment, UserIntUser, UserIntAttribute, PageAttribute, FollowingPage, AffiliateLinks, UserRecommendedPage, UserRecommendedUser, OwningPage
from django.shortcuts import render
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from config import custompermissions
from django.views import generic


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = serializers.FriendRequestSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(Q(askTo=self.request.user) | Q(askFrom=self.request.user))

    def perform_create(self, serializer):
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
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,
                          custompermissions.ProfilePermission,)

    def perform_create(self, serializer):
        serializer.save(userProfile=self.request.user)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all().order_by("-created_on")
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,
                          custompermissions.ProfilePermission,)

    def get_queryset(self):
        return self.queryset.filter(userProfile=self.request.user)


class PageAttributeViewSet(viewsets.ModelViewSet):
    queryset = PageAttribute.objects.all().order_by("-created_on")
    serializer_class = serializers.PageAttributeSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(userCreate=self.request.user)


class MonoPageViewSet(viewsets.ModelViewSet):
    queryset = MonoPage.objects.all().order_by("-created_on")
    serializer_class = serializers.MonoPageSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(userCreate=self.request.user)


class MonoPostViewSet(viewsets.ModelViewSet):
    queryset = MonoPost.objects.all().order_by("-created_on")
    serializer_class = serializers.MonoPostSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(userPost=self.request.user)


class MyMonoPostViewSet(viewsets.ModelViewSet):
    queryset = MonoPost.objects.all()
    serializer_class = serializers.MonoPostSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(Q(userPost=self.request.user))

    def perform_create(self, serializer):
        serializer.save(userPost=self.request.user)


class MonoCommentViewSet(viewsets.ModelViewSet):
    queryset = MonoComment.objects.all()
    serializer_class = serializers.MonoCommentSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(userComment=self.request.user)


class UserIntPageViewSet(viewsets.ModelViewSet):
    queryset = UserIntPage.objects.all()
    serializer_class = serializers.UserIntPageSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userId=self.request.user).order_by("-created_on")

    def perform_create(self, serializer):
        serializer.save(userId=self.request.user)


class UserIntPostViewSet(viewsets.ModelViewSet):
    queryset = UserIntPost.objects.all()
    serializer_class = serializers.UserIntPostSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userId=self.request.user).order_by("-created_on")

    def perform_create(self, serializer):
        serializer.save(userId=self.request.user)


class UserIntCommentViewSet(viewsets.ModelViewSet):
    queryset = UserIntComment.objects.all()
    serializer_class = serializers.UserIntCommentSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userId=self.request.user).order_by("-created_on")

    def perform_create(self, serializer):
        serializer.save(userId=self.request.user)


class UserIntUserViewSet(viewsets.ModelViewSet):
    queryset = UserIntUser.objects.all()
    serializer_class = serializers.UserIntUserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userId=self.request.user).order_by("-created_on")

    def perform_create(self, serializer):
        serializer.save(userId=self.request.user)


class UserIntAttributeViewSet(viewsets.ModelViewSet):
    queryset = UserIntAttribute.objects.all()
    serializer_class = serializers.UserIntAttributeSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(userId=self.request.user).order_by("-created_on")

    def perform_create(self, serializer):
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
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)


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
        serializer.save(userId=self.request.user)
