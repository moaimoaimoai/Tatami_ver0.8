from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Profile, MonoPage, MonoPost, MonoComment, FriendRequest, UserIntPage, UserIntPost, UserIntComment, UserIntUser, PageAttribute, UserIntAttribute, FollowingPage, AffiliateLinks, UserRecommendedPage, UserRecommendedUser, OwningPage


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'nickName', 'caption', 'userProfile',
                  'created_on', 'img', 'imgBackground', 'birth', 'sex')
        extra_kwargs = {'userProfile': {'read_only': True}}


class PageAttributeSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = PageAttribute
        fields = ('id', "attributeName", "created_on", "userCreate")
        extra_kwargs = {'userCreate': {'read_only': True}}


class MonoPageListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        result = [MonoPage(**attrs) for attrs in validated_data]
        MonoPage.objects.bulk_create(result)
        return result


class MonoPageSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = MonoPage
        fields = ('id', 'title', "summary", "rating", 'created_on',
                  'img', 'followed', 'attribute', 'affiliateId', 'goodpoint', 'badpoint', 'point1', 'point2', 'point3', 'point4', 'point5',)
        list_serializers_class = MonoPageListSerializer


class MonoPostSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = MonoPost
        fields = ('id',  "text", "rating", 'userPost', 'created_on', 'img', "reviewTo",
                  'liked', 'repost', 'reposting', 'repostingFrom', 'repostingFromUser')
        extra_kwargs = {'userPost': {'read_only': True}}


class MonoCommentSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = MonoComment
        fields = ('id', 'text', 'userComment', 'post', 'created_on')
        extra_kwargs = {'userComment': {'read_only': True}}


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('id', 'askFrom', 'askTo', 'approved',
                  'deletedByAskFrom', 'deletedByAskTo')
        extra_kwargs = {'askFrom': {'read_only': True}}


class UserIntPageSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format=None, read_only=True)

    class Meta:
        model = UserIntPage
        fields = ('id', 'userId', 'intPageId', 'created_on')
        extra_kwargs = {'userId': {'read_only': True}}


class UserIntPostSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format=None, read_only=True)

    class Meta:
        model = UserIntPost
        fields = ('id', 'userId',  'intPostId', 'created_on')
        extra_kwargs = {'userId': {'read_only': True}}


class UserIntCommentSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format=None, read_only=True)

    class Meta:
        model = UserIntComment
        fields = ('id', 'userId', 'intCommentId', 'created_on')
        extra_kwargs = {'userId': {'read_only': True}}


class UserIntUserSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format=None, read_only=True)

    class Meta:
        model = UserIntUser
        fields = ('id', 'userId',  'intUserId', 'created_on')
        extra_kwargs = {'userId': {'read_only': True}}


class UserIntAttributeSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format=None, read_only=True)

    class Meta:
        model = UserIntAttribute
        fields = ('id', 'userId',  'intAttributeId', 'created_on')
        extra_kwargs = {'userId': {'read_only': True}}


class FollowingPageSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = FollowingPage
        fields = ('id', 'userId',  'pageId', 'created_on')
        extra_kwargs = {'userId': {'read_only': True}}


class AffiliateLinksSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = AffiliateLinks
        fields = ('id', 'title',  'img', 'url', 'created_on')


class UserRecommendUserListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        result = [UserRecommendedUser(**attrs) for attrs in validated_data]
        UserRecommendedUser.objects.bulk_create(result)
        return result


class UserRecommendPageListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        result = [UserRecommendedPage(**attrs) for attrs in validated_data]
        UserRecommendedPage.objects.bulk_create(result)
        return result


class UserRecommendedUserSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format=None, read_only=True)

    class Meta:
        model = UserRecommendedUser
        fields = ('id', 'userRecommendedUser',
                  'recommendedUser', 'created_on')
        list_serializer_class = UserRecommendUserListSerializer


class UserRecommendedPageSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format=None, read_only=True)

    class Meta:
        model = UserRecommendedPage
        fields = ('id', 'pageRecommendedUser',
                  'recommendedPage', 'created_on')
        list_serializer_class = UserRecommendPageListSerializer


class OwningPageSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = OwningPage
        fields = ('id', 'userId',  'pageId', 'created_on')
        extra_kwargs = {'userId': {'read_only': True}}
