from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django.utils import timezone
import random
from hashlib import sha256


def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.userProfile.id)+str(instance.nickName)+str(".")+str(ext)])

def upload_advertisement_path(instance, filename):
    print(filename)
    ext = filename.split('.')[-1]
    return '/'.join(['advertisements', str(sha256().hexdigest()) + str(".") + str(ext)])

def upload_avatar_path_background(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.userProfile.id)+str(instance.nickName)+str("_background")+str(".")+str(ext)])


def upload_mono_page_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['posts', str(instance.title)+str(".")+str(ext)])


def upload_mono_post_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['posts', str(instance.userPost.id)+str(instance.created_on)+str(".")+str(ext)])


def upload_affiliate_links_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['af_', str(instance.title)+str(".")+str(ext)])


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('emailは必須項目です')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_time = models.DateTimeField(default=timezone.now)
    objects = UserManager()
    verification_key = models.IntegerField(null=True)
    type = models.CharField(max_length=50, default='normal')

    def save(self, *args, **kwargs):
        if not self.pk:  # Check if the user is being created
            self.verification_key = random.randint(100000, 999999)  # Generate a random number with 5 digits
        super().save(*args, **kwargs)

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Profile(models.Model):
    nickName = models.CharField(max_length=20, default="default")
    caption = models.CharField(blank=True, null=True, max_length=100)
    userProfile = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='userProfile',
        on_delete=models.CASCADE
    )
    created_on = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True,
                            upload_to=upload_avatar_path, default="avatars/default.jpg")
    imgBackground = models.ImageField(blank=True, null=True,
                                      upload_to=upload_avatar_path_background, default="avatars/default_background.jpg")
    birth = models.DateField(null=True)
    sex = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.nickName


class FriendRequest(models.Model):
    askFrom = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='askFrom',
        on_delete=models.CASCADE
    )
    askTo = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='askTo',
        on_delete=models.CASCADE
    )
    approved = models.BooleanField(default=False)
    deletedByAskFrom = models.BooleanField(default=False)
    deletedByAskTo = models.BooleanField(default=False)

    class Meta:
        unique_together = (('askFrom', 'askTo'),)

    def __str__(self):
        return str(self.askFrom) + '----->' + str(self.askTo)


class Message(models.Model):
    message = models.CharField(max_length=140)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="sender",
        on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="receiver",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.sender


class PageAttribute(models.Model):
    attributeName = models.CharField(max_length=50)
    created_on = models.DateTimeField(auto_now_add=True)
    userCreate = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userAttribute',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.attributeName


class AffiliateLinks(models.Model):
    title = models.CharField(max_length=100)
    img = models.ImageField(blank=True, null=True,
                            upload_to=upload_affiliate_links_path)
    url = models.URLField(blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class MonoPage(models.Model):
    title = models.CharField(max_length=50)
    summary = models.CharField(max_length=150)
    goodpoint = models.CharField(max_length=150)
    badpoint = models.CharField(max_length=150)
    point1 = models.CharField(max_length=150, blank=True, null=True)
    point2 = models.CharField(max_length=150, blank=True, null=True)
    point3 = models.CharField(max_length=150, blank=True, null=True)
    point4 = models.CharField(max_length=150, blank=True, null=True)
    point5 = models.CharField(max_length=150, blank=True, null=True)
    rating = models.IntegerField()
    # userCreate = models.ForeignKey(
    #     settings.AUTH_USER_MODEL, related_name='userCreate',
    #     on_delete=models.CASCADE
    # )
    created_on = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True,
                            upload_to=upload_mono_page_path)
    followed = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='followed', blank=True)
    attribute = models.ManyToManyField(
        PageAttribute, related_name="pageattributeid", blank=True)
    affiliateId = models.ForeignKey(
        AffiliateLinks, blank=True, null=True, related_name='affiliateId', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class MonoPost(models.Model):
    text = models.CharField(max_length=150)
    rating = models.IntegerField()
    userPost = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userPost',
        on_delete=models.CASCADE
    )
    reviewTo = models.ForeignKey(
        MonoPage, on_delete=models.CASCADE
    )
    created_on = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True,
                            upload_to=upload_mono_post_path)
    liked = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='liked', blank=True)
    repost = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='repost', blank=True)
    reposting = models.BooleanField(default=False)
    repostingFrom = models.IntegerField(blank=True, null=True)
    repostingFromUser = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.text


class MonoComment(models.Model):
    text = models.CharField(max_length=100)
    userComment = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userComment',
        on_delete=models.CASCADE
    )
    post = models.ForeignKey(MonoPost, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text


class UserIntPage(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userIntPageId',
        on_delete=models.CASCADE
    )
    intPageId = models.ForeignKey(
        MonoPage, blank=True, null=True, related_name='intPageId', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_on)


class UserIntPost(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userIntPostId',
        on_delete=models.CASCADE
    )
    intPostId = models.ForeignKey(
        MonoPost, blank=True, null=True, related_name='intPostId', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_on)


class UserIntComment(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='useIntCommentId',
        on_delete=models.CASCADE
    )
    intCommentId = models.ForeignKey(
        MonoComment, blank=True, null=True, related_name='intCommentId', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_on)


class UserIntUser(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='useIntUserId',
        on_delete=models.CASCADE
    )
    intUserId = models.ForeignKey(settings.AUTH_USER_MODEL, null=True,
                                  related_name='intUserId', blank=True, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_on)


class UserIntAttribute(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='useIntAttributeId',
        on_delete=models.CASCADE
    )
    intAttributeId = models.ForeignKey(
        PageAttribute, blank=True, null=True, related_name="intAttributeId", on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_on)


class FollowingPage(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='followingUser',
        on_delete=models.CASCADE
    )
    pageId = models.ForeignKey(MonoPage, blank=True, null=True,
                               related_name='followPageId', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_on)


class UserRecommendedPage(models.Model):
    pageRecommendedUser = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='pageRecommendedUser',
        on_delete=models.CASCADE
    )
    recommendedPage = models.ManyToManyField(
        MonoPage, related_name="recommendedPage", blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pageRecommendedUser)


class UserRecommendedUser(models.Model):
    userRecommendedUser = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userRecommendedUser',
        on_delete=models.CASCADE
    )
    recommendedUser = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='recommendedUser', blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.userRecommendedUser)


class OwningPage(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='OwningUser',
        on_delete=models.CASCADE
    )
    pageId = models.ForeignKey(MonoPage, blank=True, null=True,
                               related_name='OwningPageId', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_on)

class Advertisement(models.Model):
    type = models.IntegerField()
    url = models.CharField(max_length=50, null=True)
    content = models.CharField(max_length=210)
    img = models.ImageField(blank=True, null=False, upload_to=upload_advertisement_path)
    target = models.IntegerField(default=0)
    cnt = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False
    )
    stripe_flag = models.BooleanField(default=True)
    del_flag = models.BooleanField(default=False)

    def __str__(self):
        return str(self.created)