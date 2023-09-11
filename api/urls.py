from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('advertisement', views.AdvertisementViewSet)
router.register('updateAds', views.UpdateAdvertisementViewSet)
router.register('profile', views.ProfileViewSet)
router.register('pageattribute', views.PageAttributeViewSet)
router.register('monopage', views.MonoPageViewSet)
router.register('monopost', views.MonoPostViewSet)
router.register('monocomment', views.MonoCommentViewSet)
router.register("approval", views.FriendRequestViewSet)
router.register("mymonopost", views.MyMonoPostViewSet)
router.register("userintpage", views.UserIntPageViewSet)
router.register("userintpost", views.UserIntPostViewSet)
router.register("userintcomment", views.UserIntCommentViewSet)
router.register("userintuser", views.UserIntUserViewSet)
router.register("userintattribute", views.UserIntAttributeViewSet)
router.register("followingpage", views.FollowingPageViewSet)
router.register("affiliatelinks", views.AffiliateLinksViewSet)
router.register("userrecommendeduser", views.UserRecommendedUserViewSet)
router.register("userrecommendedpage", views.UserRecommendedPageViewSet)
router.register("owningpage", views.OwningPageViewSet)
router.register("example", views.MyExampleViewSet)


urlpatterns = [
    path('create-checkout-session/', views.StripeCheckoutView.as_view(), name='stripe-create-checkout-session'),
    path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password'),
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('loginGoogle/', views.LoginGoogleView.as_view(), name='loginGoogle'),
    path('verify/', views.EmailVerifyView.as_view(), name='verify'),
    path('reset-password/', views.ResetPasswordView.as_view(), name='reset-password'),
    path('verify-for-password-reset/', views.PasswordVerifyView.as_view(), name='verifyPasswordReset'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path('', include(router.urls)),
    path('userrecommendeduser/bulk',
         views.BulkUserRecommendedUserView.as_view(), name='userrecommendedpage'),
    path('userrecommendedpage/bulk',
         views.BulkUserRecommendedPageView.as_view(), name='userrecommendeduser'),
    path('monopage/bulk',
         views.BulkMonoPageView.as_view(), name='monopage'),
]
