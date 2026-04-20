import type { Locale } from "./locale.ts";

type SeoPage = {
  title: string;
  description: string;
};

type SeoRoutes = {
  home: SeoPage;
  chatPeer: SeoPage;
  messages: SeoPage;
  notifications: SeoPage;
  profile: SeoPage;
  userProfile: SeoPage;
  userFollowers: SeoPage;
  userFollowing: SeoPage;
  settings: SeoPage;
  forgotPassword: SeoPage;
  resetPassword: SeoPage;
  login: SeoPage;
  banned: SeoPage;
  search: SeoPage;
  legal: SeoPage;
  security: SeoPage;
  sponsored: SeoPage;
  notFound: SeoPage;
};

type PagesBundle = {
  common: {
    loading: string;
    /** PlaceholderCard / future scaffold UI badge. */
    scaffoldInProgress: string;
    scaffoldInProgressHint: string;
  };
  home: {
    feedSortAria: string;
    latest: string;
    trending: string;
    trendingTagHint: string;
    filterTag: string;
    clear: string;
    invalidTag: string;
    loadingPosts: string;
    emptyTagged: string;
    emptyFeed: string;
    loadMore: string;
    /** Feed-top ad strip (FeedAdSlot). */
    feedAdSponsored: string;
    feedAdSponsoredContent: string;
    /** Premium promo on home (`feature_flags.home_premium_cta`). */
    premiumCtaTitle: string;
    premiumCtaBody: string;
    /** When checkout env off — points users to Settings for full plan. */
    premiumCtaBodyNoBilling: string;
    premiumCtaLinkSettings: string;
    premiumCtaLinkLogin: string;
    /** Home right column: trending tags widget title. */
    sidebarTrendingTitle: string;
    /** `aria-label` for the aside landmark. */
    sidebarTrendingAria: string;
    /** Whole home right column (trending + optional Premium). */
    sidebarLandmarkAria: string;
    /** CTA when the slot has `link_url` but no custom title (title is not the external link). */
    feedAdExternalCta: string;
    /** Fallback text inside `<video>` for browsers without playback. */
    feedAdVideoFallback: string;
    sidebarTrendingEmpty: string;
    /** Collapsed home composer — screen reader hint on the expand control. */
    composeExpandAria: string;
    /** Shrink full composer back to one line (logged-in home). */
    composeCollapse: string;
  };
  login: {
    titleSignIn: string;
    titleSignUp: string;
    termsPrefix: string;
    modeSignIn: string;
    modeSignUp: string;
    email: string;
    password: string;
    invalidCredentials: string;
    confirmPassword: string;
    passwordsDoNotMatch: string;
    checkEmailForConfirmation: string;
    emailAlreadyRegisteredHint: string;
    confirmationPendingTitle: string;
    confirmationPendingBody: string;
    backToSignIn: string;
    resendCta: string;
    resendSending: string;
    resendCooldown: string;
    resendSuccess: string;
    submitWait: string;
    submitSignIn: string;
    submitSignUp: string;
    forgotPasswordLink: string;
  };
  forgotPassword: {
    title: string;
    intro: string;
    emailLabel: string;
    submit: string;
    sending: string;
    success: string;
    backToLogin: string;
  };
  resetPassword: {
    title: string;
    intro: string;
    passwordLabel: string;
    confirmLabel: string;
    submit: string;
    submitWait: string;
    success: string;
    mismatch: string;
    invalidOrExpired: string;
    backToLogin: string;
  };
  search: {
    title: string;
    queryLabel: string;
    placeholder: string;
    submit: string;
    clear: string;
    hintMinChars: string;
    /** Shown when there is no `q` yet — what Search covers. */
    introHint: string;
    searching: string;
    usersWithCount: string;
    usersPrivacyNote: string;
    noProfiles: string;
    message: string;
    viewProfile: string;
    postsWithCount: string;
    noPosts: string;
    rankingHint: string;
    /** Both result lists empty for a valid query (`{q}` = trimmed term). */
    noResultsAny: string;
    noResultsTips: string;
    /** `aria-label` for the results landmark (loading + lists). */
    resultsRegionLabel: string;
    resultsSummary: string;
    errorTitle: string;
    errorHint: string;
    retry: string;
  };
  postForm: {
    signInPrompt: string;
    signInLink: string;
    banned: string;
    bodyLength: string;
    /** Server rejected body length for current plan. */
    bodyTierLimit: string;
    createFailed: string;
    label: string;
    placeholder: string;
    attachAria: string;
    /** Free tier: image-only file picker label. */
    attachImageAria: string;
    addMedia: string;
    /** Free tier: button label without video. */
    addMediaImage: string;
    removeMedia: string;
    mediaInvalidType: string;
    videoRequiresPremium: string;
    /** Free tier: already posted a video today (UTC day). */
    videoDailyLimitFree: string;
    /** Shown under media controls while a free video slot is still available. */
    videoFreeTierDailyHint: string;
    /** Shown when the free daily video slot is used (UTC day). */
    videoDailyLimitFreeHint: string;
    previewAlt: string;
    tagsLabel: string;
    tagsPlaceholder: string;
    tagsHint: string;
    /** Server rejected tag count for current plan (should be rare if client matches tier). */
    tagsTierLimit: string;
    /** Live preview: resolved tag slugs before submit. */
    tagsPreviewLabel: string;
    /** Shown when input has text but no valid slugs (e.g. non-Latin only). */
    tagsPreviewInvalid: string;
    posting: string;
    post: string;
    /** Info toast when anti-spam auto-flagged the new post (author still sees it). */
    flaggedAfterPost: string;
  };
  chrome: { backHome: string };
  notFoundPage: {
    title: string;
    body: string;
    homeLink: string;
  };
  profile: {
    title: string;
    premiumBadge: string;
    loading: string;
    emailLabel: string;
    changePhoto: string;
    uploadPhoto: string;
    settingsPhotoHint: string;
    postsCount: string;
    /** Short label for stats row (number shown above). */
    statsPosts: string;
    statsFollowers: string;
    statsFollowing: string;
    yourPosts: string;
    emptyPosts: string;
    /** CTA under empty own posts (link to home feed). */
    emptyPostsCta: string;
    avatarLabel: string;
    copyProfileLink: string;
    copyProfileLinkSuccess: string;
    copyProfileLinkFailed: string;
    tabPosts: string;
    tabCommented: string;
    sectionCommented: string;
    emptyCommented: string;
    editProfile: string;
    closeEdit: string;
    followRequests: string;
    acceptRequest: string;
    rejectRequest: string;
    /** Shown as title when display name empty (own profile). */
    noPublicNameYet: string;
    /** Under display name on own profile — email not listed. */
    publicNamePrivacyHint: string;
  };
  userProfile: {
    invalidTitle: string;
    invalidBody: string;
    backHome: string;
    title: string;
    notFound: string;
    bannedNotice: string;
    emailHidden: string;
    /** When `display_name` is empty — `{short}` = first 8 chars of user id. */
    memberFallback: string;
    followersStat: string;
    followingStat: string;
    follow: string;
    unfollow: string;
    /** Shown when viewer and profile user follow each other. */
    mutualFollowBadge: string;
    requestFollow: string;
    cancelRequest: string;
    followRequestSent: string;
    privateAccount: string;
    block: string;
    unblock: string;
    blocked: string;
    youBlockedUser: string;
    blockedByUser: string;
    report: string;
    reportPlaceholder: string;
    reportSubmit: string;
    reportSent: string;
    online: string;
    lastSeenMinutes: string;
    lastSeenHours: string;
    lastSeenDays: string;
    lastSeenLongAgo: string;
    lastSeenNever: string;
    signInToFollow: string;
    theirPosts: string;
    postsHiddenBanned: string;
    /** Empty posts list when viewing someone else's profile. */
    emptyPostsOther: string;
    sectionCommented: string;
    emptyCommentedOther: string;
  };
    followList: {
      followersHeading: string;
      followingHeading: string;
      backToProfile: string;
      emptyFollowers: string;
      emptyFollowing: string;
      loadMore: string;
      restricted: string;
    };
    messages: {
      title: string;
      introBefore: string;
      introAfter: string;
      empty: string;
    };
    /** /banned — account restriction notice (signed-in banned user). */
    bannedPage: {
      title: string;
      intro: string;
      loadingDetails: string;
      whyHeading: string;
      activeSincePrefix: string;
      signedInAsPrefix: string;
      contactSupport: string;
      signOut: string;
      legalLink: string;
    };
    chat: {
      chatHeading: string;
      invalidPeerId: string;
      backToMessages: string;
      allThreads: string;
      messageLabel: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      cannotMessageSelf: string;
      typing: string;
      online: string;
    };
    admin: {
      backToOverview: string;
      backToHome: string;
      refresh: string;
      refreshLists: string;
      overview: {
        title: string;
        promoteHintBefore: string;
        linkModeration: string;
        linkUsers: string;
        linkReports: string;
        linkStats: string;
        linkUserReports: string;
        linkBlocks: string;
        linkAds: string;
        linkAdRequests: string;
        linkApi: string;
        countsTitle: string;
        statProfiles: string;
        statPosts: string;
        statComments: string;
        statReactions: string;
        linkFeatures: string;
      };
      features: {
        title: string;
        listHeading: string;
        intro: string;
        feedTrendingTab: string;
        feedTrendingTabHelp: string;
        feedAds: string;
        feedAdsHelp: string;
        postComments: string;
        postCommentsHelp: string;
        navSearch: string;
        navSearchHelp: string;
        navMessages: string;
        navMessagesHelp: string;
        homePremiumCta: string;
        homePremiumCtaHelp: string;
        unknownKey: string;
        saving: string;
        savedToast: string;
      };
      moderation: {
        title: string;
        hint: string;
        latest50: string;
        autoFlagHint: string;
        postsHeading: string;
        commentsHeading: string;
        noPosts: string;
        noComments: string;
        flaggedLabel: string;
        spamScoreLabel: string;
        approvePost: string;
        approveComment: string;
        deletePost: string;
        deleteComment: string;
        confirmDeletePost: string;
        confirmDeleteComment: string;
        postRefPrefix: string;
      };
      reports: {
        title: string;
        intro: string;
        empty: string;
        dismiss: string;
        confirmDismiss: string;
        postIdPrefix: string;
      };
      ads: {
        title: string;
        intro: string;
        testModeBanner: string;
        feedTopTitle: string;
        fieldTitle: string;
        fieldBody: string;
        fieldLinkUrl: string;
        fieldVideo: string;
        videoHelp: string;
        pickVideo: string;
        pickVideoAria: string;
        removeVideo: string;
        uploadingVideo: string;
        videoInvalidMime: string;
        videoInvalidSize: string;
        activeLabel: string;
        phTitle: string;
        phBody: string;
        phUrl: string;
        saving: string;
        save: string;
        savedToast: string;
        noSlot: string;
        linkReviewRequests: string;
      };
      adRequests: {
        title: string;
        intro: string;
        testModeBanner: string;
        empty: string;
        colCreated: string;
        colApplicant: string;
        colTitle: string;
        colBody: string;
        colLink: string;
        colStatus: string;
        colNote: string;
        statusPending: string;
        statusApproved: string;
        statusRejected: string;
        placeholderNote: string;
        save: string;
        saving: string;
        savedToast: string;
        viewProfile: string;
      };
      stats: {
        title: string;
        intro: string;
        metricsTitle: string;
        metricProfiles: string;
        metricPosts: string;
        metricComments: string;
        metricReactions: string;
        metricReports: string;
        metricTags: string;
        metricPostTags: string;
        metricConversations: string;
        metricChatMessages: string;
        metricNotifications: string;
        metricUserReports: string;
        metricBlocks: string;
        metricFollowRequests: string;
        metricAdSlots: string;
      };
      userReports: {
        title: string;
        intro: string;
        empty: string;
        dismiss: string;
        confirmDismiss: string;
        reporter: string;
        reported: string;
        reportedLabel: string;
        viewProfile: string;
      };
      blocks: {
        title: string;
        intro: string;
        empty: string;
        blocker: string;
        blocked: string;
        viewBlocker: string;
        viewBlocked: string;
      };
      users: {
        title: string;
        introBefore: string;
        introAfter: string;
        banTitle: string;
        reasonLabel: string;
        reasonPlaceholder: string;
        charCount: string;
        confirmBan: string;
        cancel: string;
        colEmail: string;
        colAdmin: string;
        colBanned: string;
        colReason: string;
        colPremium: string;
        colActions: string;
        yes: string;
        emDash: string;
        labelModeration: string;
        labelPremium: string;
        unban: string;
        ban: string;
        clearPrem: string;
        premiumExpired: string;
        confirmClearPremium: string;
        confirmUnban: string;
        banReasonTooLong: string;
        ariaBan: string;
        ariaUnban: string;
        ariaPrem30: string;
        ariaPrem365: string;
        ariaClearPrem: string;
      };
      api: {
        title: string;
        intro: string;
        publicTables: string;
        clientRpcs: string;
        colTable: string;
        colRpc: string;
        footerNote: string;
      };
    };
    notifications: {
      title: string;
      loading: string;
      heroUnreadCount: string;
      heroTotalCount: string;
      statsTotal: string;
      statsUnread: string;
      statsRead: string;
      markAllRead: string;
      markRead: string;
      empty: string;
    backToFeed: string;
    /** Word before post id snippet, e.g. "post" */
    postLabel: string;
    viewProfile: string;
    msgComment: string;
    msgReaction: string;
    msgFollow: string;
  };
  postCard: {
    deleteConfirm: string;
    delete: string;
    deleting: string;
    netScoreTitle: string;
    /** Shown to the author when the post was auto-flagged (still visible to them). */
    flaggedAuthorHint: string;
    /** Long text under image/video — expand in place (legacy copy; primary control is arrow). */
    readMore: string;
    showLess: string;
    /** Icon-only expand button aria-label (caption under media). */
    expandBodyAria: string;
    collapseBodyAria: string;
    edit: string;
    editSave: string;
    editSaving: string;
    editCancel: string;
    editSaved: string;
    editFlaggedHint: string;
    edited: string;
  };
  comment: {
    comments: string;
    hideComments: string;
    loading: string;
    addLabel: string;
    placeholder: string;
    sending: string;
    submit: string;
    signInLink: string;
    signInSuffix: string;
    deleteCommentConfirm: string;
    delete: string;
    commentFailed: string;
    /** Info toast when anti-spam auto-flagged the new comment. */
    flaggedAfterComment: string;
  };
  report: {
    report: string;
    whyLabel: string;
    placeholder: string;
    sending: string;
    submit: string;
    cancel: string;
    success: string;
  };
  reactions: {
    ariaLabel: string;
    thumbsUp: string;
    thumbsDown: string;
    signInToReact: string;
  };
  legal: {
    navAria: string;
    title: string;
    lastUpdated: string;
  };
  sponsored: {
    title: string;
    testModeBanner: string;
    intro: string;
    howItWorksTitle: string;
    howItWorksBody: string;
    formTitle: string;
    fieldTitle: string;
    fieldTitleHint: string;
    fieldBody: string;
    fieldBodyHint: string;
    fieldLink: string;
    fieldLinkHint: string;
    submit: string;
    submitting: string;
    successToast: string;
    signInTitle: string;
    signInBody: string;
    signInLink: string;
    myRequestsTitle: string;
    emptyMine: string;
    statusPending: string;
    statusApproved: string;
    statusRejected: string;
    adminNoteFromTeam: string;
  };
  security: {
    navAria: string;
    title: string;
    intro: string;
    sectionAuth: string;
    sectionAuthLi1: string;
    sectionAuthLi2: string;
    sectionAuthLi2End: string;
    sectionData: string;
    sectionDataP1: string;
    sectionDataP2: string;
    sectionTransport: string;
    sectionTransportP: string;
    sectionPrivacy: string;
    privacyIntro: string;
    privacySettingsPrivacy: string;
    privacySeeAlso: string;
  };
};

export type Bundle = {
  layout: {
    skipToMain: string;
    brandAria: string;
    navAria: string;
    nav: {
      home: string;
      search: string;
      login: string;
      messages: string;
      notifications: string;
      profile: string;
      settings: string;
      premium: string;
      admin: string;
      adminMenuAria: string;
      adminOverview: string;
      users: string;
      moderation: string;
      reports: string;
      userReports: string;
      blocks: string;
      stats: string;
      ads: string;
      features: string;
      api: string;
      security: string;
      legal: string;
    };
    unreadBadge: string;
    toastRegionAria: string;
    toastDismiss: string;
    mobileMenuOpen: string;
    mobileMenuClose: string;
  };
  errors: {
    routeTitle: string;
    routeBody: string;
    tryAgain: string;
    homeLink: string;
    /** Root `ErrorBoundary` in `main.tsx` (full app failure). */
    appBoundaryBody: string;
    reload: string;
  };
  theme: {
    auto: string;
    light: string;
    dark: string;
    ariaGroup: string;
  };
  settings: {
    pageEyebrow: string;
    pageSubtitle: string;
    pageMetaAria: string;
    language: string;
    languageHelp: string;
    languageEn: string;
    languageKa: string;
    languageRu: string;
    appearance: string;
    appearanceHint: string;
    profileAbout: string;
    profileAboutHint: string;
    profileAboutLoading: string;
    displayName: string;
    displayNamePlaceholder: string;
    displayNameTooLong: string;
    bio: string;
    bioPlaceholder: string;
    bioTooLong: string;
    profileAboutSave: string;
    profileAboutSaving: string;
    profileAboutSaved: string;
    account: string;
    signedInAs: string;
    premium: string;
    premiumLoading: string;
    premiumActiveUntil: string;
    premiumNone: string;
    /** Visible label under Account — Premium purchase / billing (not only muted body). */
    premiumBillingTitle: string;
    /** Stripe Checkout (P1) — Settings → account. */
    premiumCheckoutHint: string;
    premiumCheckoutSubscribe: string;
    premiumCheckoutBusy: string;
    premiumCheckoutSuccess: string;
    premiumCheckoutCancelled: string;
    /** When VITE_BILLING_CHECKOUT_ENABLED is not true — no Stripe yet (short; details in plan block). */
    premiumCheckoutDisabledHint: string;
    /** Preview plan before Stripe is live — Account section. */
    premiumPlanSectionTitle: string;
    premiumPlanLead: string;
    premiumPlanBenefitsTitle: string;
    premiumPlanBenefit1: string;
    premiumPlanBenefit2: string;
    premiumPlanBenefit3: string;
    premiumPlanBenefit4: string;
    /** Roadmap / ideas — not a product commitment. */
    premiumPlanFutureTitle: string;
    premiumPlanFutureBody: string;
    premiumPlanDuration: string;
    premiumPlanPrice: string;
    premiumPlanWaitNote: string;
    privacy: string;
    privacyHint: string;
    privacyLoading: string;
    privateProfileCheckbox: string;
    privateProfileHint: string;
    privacyCheckbox: string;
    privacySave: string;
    privacySaving: string;
    privacySaved: string;
    notificationsSection: string;
    notificationsHint: string;
    notificationsLoading: string;
    notifyOnComment: string;
    notifyOnReaction: string;
    notifyOnFollow: string;
    notificationsSave: string;
    notificationsSaving: string;
    notificationsSaved: string;
    changePassword: string;
    passwordMinHint: string;
    newPassword: string;
    updatePassword: string;
    updatingPassword: string;
    passwordUpdated: string;
    passwordTooShort: string;
    session: string;
    sessionHint: string;
    logOut: string;
    deleteAccount: string;
    deleteAccountHint: string;
    deleteAccountTypeDelete: string;
    deleteAccountConfirmPlaceholder: string;
    deleteAccountSubmit: string;
    deleteAccountDeleting: string;
    deleteAccountFailed: string;
    /** Settings → profile photo upload (AvatarUploadSection). */
    avatarSectionTitle: string;
    avatarFormatHint: string;
    avatarChooseAria: string;
    avatarUpload: string;
    avatarRemove: string;
    avatarUpdated: string;
    avatarRemoved: string;
    avatarRemoveConfirm: string;
    avatarUserFallback: string;
    termsLink: string;
  };
  pages: PagesBundle;
  seo: {
    announcer: string;
    defaultDescription: string;
    /** `/search?q=` when `q` is valid (min length) — `{q}` in title. */
    searchWithQueryTitle: string;
    /** Meta description for search with `q`. */
    searchWithQueryDescription: string;
    admin: SeoPage;
    routes: SeoRoutes;
  };
};

const en: Bundle = {
  layout: {
    skipToMain: "Skip to main content",
    brandAria: "Metafeed home",
    navAria: "Main",
    nav: {
      home: "Home",
      search: "Search",
      login: "Login",
      messages: "Messages",
      notifications: "Notifications",
      profile: "Profile",
      settings: "Settings",
      premium: "Premium",
      admin: "Admin",
      adminMenuAria: "Admin pages",
      adminOverview: "Overview",
      users: "Users",
      moderation: "Moderation",
      reports: "Reports",
      userReports: "User Reports",
      blocks: "Blocks",
      stats: "Stats",
      ads: "Ads",
      features: "Features",
      api: "API",
      security: "Security",
      legal: "Legal",
    },
    unreadBadge: "{count} unread",
    toastRegionAria: "Notifications",
    toastDismiss: "Dismiss",
    mobileMenuOpen: "Open menu",
    mobileMenuClose: "Close menu",
  },
  errors: {
    routeTitle: "Something went wrong",
    routeBody: "This part of the page hit an unexpected error. You can try again or go home.",
    tryAgain: "Try again",
    homeLink: "← Home",
    appBoundaryBody: "The app hit an unexpected error. You can try reloading the page.",
    reload: "Reload",
  },
  theme: {
    auto: "Auto",
    light: "Light",
    dark: "Dark",
    ariaGroup: "Color theme",
  },
  settings: {
    pageEyebrow: "Account center",
    pageSubtitle: "Manage how Metafeed looks, what it shares, and how your account feels across this device.",
    pageMetaAria: "Settings summary",
    language: "Language",
    languageHelp: "Interface language (stored on this device).",
    languageEn: "English",
    languageKa: "Georgian",
    languageRu: "Russian",
    appearance: "Appearance",
    appearanceHint: "Color theme (stored on this device).",
    profileAbout: "Name & bio",
    profileAboutHint: "Shown on your public profile. Leave fields empty to show only your email in the header.",
    profileAboutLoading: "Loading…",
    displayName: "Display name",
    displayNamePlaceholder: "Optional",
    displayNameTooLong: "Display name must be at most {max} characters.",
    bio: "Bio",
    bioPlaceholder: "Short introduction (optional)",
    bioTooLong: "Bio must be at most {max} characters.",
    profileAboutSave: "Save name & bio",
    profileAboutSaving: "Saving…",
    profileAboutSaved: "Profile details saved.",
    account: "Account",
    signedInAs: "Signed in as",
    premium: "Premium",
    premiumLoading: "…",
    premiumActiveUntil: "active until",
    premiumNone: "none",
    premiumBillingTitle: "Premium purchase",
    premiumCheckoutHint:
      "Extend Premium (+30 days) via secure checkout when billing is enabled on the server (Stripe).",
    premiumCheckoutSubscribe: "Continue to checkout",
    premiumCheckoutBusy: "Opening checkout…",
    premiumCheckoutSuccess: "Payment received. Premium time will update in a moment.",
    premiumCheckoutCancelled: "Checkout was cancelled.",
    premiumCheckoutDisabledHint: "Setup details: README → Stripe Premium.",
    premiumPlanSectionTitle: "Premium plan (preview)",
    premiumPlanLead:
      "Premium is for members who want more room for text, tags, and video. Below is what we are targeting before paid checkout goes live — final numbers may be tuned at launch.",
    premiumPlanBenefitsTitle: "What Premium includes",
    premiumPlanBenefit1: "Longer posts — up to 5,000 characters per post (free tier: 1,000).",
    premiumPlanBenefit2: "More tags — up to 8 tags per post (free tier: 4).",
    premiumPlanBenefit3: "Video posts — MP4/WebM in the feed (not available on the free tier).",
    premiumPlanBenefit4: "Headroom for richer posts as Metafeed adds features.",
    premiumPlanFutureTitle: "Under consideration (not a commitment)",
    premiumPlanFutureBody:
      "We are reviewing additional Premium benefits — for example optional promotional placements in the feed for members who want to advertise their posts or business. Pricing could depend on placement size, duration, format, and legal/compliance rules in your region. Nothing is built or priced yet; if we ship it, we will announce clear terms and pricing beforehand.",
    premiumPlanDuration:
      "Billing: each successful Stripe checkout extends Premium by 30 days. You can purchase again before expiry to add more time.",
    premiumPlanPrice:
      "Price: not finalized yet — the exact amount and currency will be shown on the checkout screen before you pay. Nothing is charged until you confirm in Stripe.",
    premiumPlanWaitNote:
      "We are still wiring Stripe and final pricing. Until checkout is enabled here, Premium can be granted manually by admins. The “Continue to checkout” button will appear in this section when billing is turned on.",
    privacy: "Privacy",
    privacyHint:
      "Control whether your account appears when others search by email on the Search page.",
    privacyLoading: "Loading…",
    privateProfileCheckbox: "Private profile",
    privateProfileHint: "When enabled, only your approved followers can see your posts, bio, and stats. Others will need to send a follow request.",
    privacyCheckbox: "Show my profile in email search results",
    privacySave: "Save privacy",
    privacySaving: "Saving…",
    privacySaved: "Privacy settings saved.",
    notificationsSection: "Notifications",
    notificationsHint: "Choose which in-app notifications you receive (bell icon).",
    notificationsLoading: "Loading…",
    notifyOnComment: "Comments on my posts",
    notifyOnReaction: "Reactions on my posts",
    notifyOnFollow: "New followers",
    notificationsSave: "Save notification preferences",
    notificationsSaving: "Saving…",
    notificationsSaved: "Notification preferences saved.",
    changePassword: "Change password",
    passwordMinHint: "Use at least {min} characters.",
    newPassword: "New password",
    updatePassword: "Update password",
    updatingPassword: "Updating…",
    passwordUpdated: "Password updated.",
    passwordTooShort: "Password must be at least {min} characters.",
    session: "Session",
    sessionHint: "End your current session on this device when you are done.",
    logOut: "Log out",
    deleteAccount: "Delete account",
    deleteAccountHint:
      "Permanently removes your login, profile, posts, comments, reactions, messages, and uploaded images. This cannot be undone. Conversations you took part in are removed for both participants.",
    deleteAccountTypeDelete: "Type DELETE in the field below to confirm.",
    deleteAccountConfirmPlaceholder: "DELETE",
    deleteAccountSubmit: "Delete my account permanently",
    deleteAccountDeleting: "Deleting account…",
    deleteAccountFailed: "Could not delete account: {message}",
    avatarSectionTitle: "Profile photo",
    avatarFormatHint: "JPEG, PNG, WebP, or GIF — max 2 MB.",
    avatarChooseAria: "Choose profile photo",
    avatarUpload: "Upload photo",
    avatarRemove: "Remove photo",
    avatarUpdated: "Profile photo updated.",
    avatarRemoved: "Profile photo removed.",
    avatarRemoveConfirm: "Remove your profile photo?",
    avatarUserFallback: "User",
    termsLink: "Terms & Privacy",
  },
  pages: {
    common: {
      loading: "Loading…",
      scaffoldInProgress: "In progress",
      scaffoldInProgressHint: "Scaffold — in progress",
    },
    home: {
      feedSortAria: "Feed order",
      latest: "Latest",
      trending: "Trending",
      trendingTagHint:
        "Trending applies to the full feed. Showing latest posts for this tag.",
      filterTag: "Filter: tag {tag}",
      clear: "Clear",
      invalidTag: "Invalid tag in URL. Use letters, numbers, and hyphens only.",
      loadingPosts: "Loading posts…",
      emptyTagged: "No posts with this tag yet.",
      emptyFeed: "No posts yet. Be the first to post.",
      loadMore: "Load more ({pageSize} per page)",
      feedAdSponsored: "Sponsored",
      feedAdSponsoredContent: "Sponsored content",
      feedAdExternalCta: "Visit link",
      feedAdVideoFallback: "Your browser cannot play this video.",
      premiumCtaTitle: "Premium",
      premiumCtaBody: "Longer posts, more tags, video, and more. Manage your plan in Settings.",
      premiumCtaBodyNoBilling:
        "Longer posts, more tags, and video. Paid checkout is coming soon — open Settings → Account for the full plan, pricing preview, and timeline.",
      premiumCtaLinkSettings: "Open Settings",
      premiumCtaLinkLogin: "Sign in",
      sidebarTrendingTitle: "Trending tags",
      sidebarTrendingAria: "Trending tags and shortcuts",
      sidebarLandmarkAria: "Trending tags and Premium",
      sidebarTrendingEmpty: "No trending tags this week.",
      composeExpandAria: "Open post composer",
      composeCollapse: "Minimize",
    },
    login: {
      titleSignIn: "Log in",
      titleSignUp: "Create account",
      termsPrefix: "By continuing you agree to our",
      modeSignIn: "Sign in",
      modeSignUp: "Sign up",
      email: "Email",
      password: "Password",
      invalidCredentials: "Email or password is incorrect.",
      confirmPassword: "Confirm password",
      passwordsDoNotMatch: "Passwords do not match.",
      checkEmailForConfirmation:
        "Check your email to confirm your account before signing in.",
      emailAlreadyRegisteredHint:
        "If this email is already registered, use Sign in or Forgot password.",
      confirmationPendingTitle: "Registration created. Confirm your email to continue.",
      confirmationPendingBody:
        "We sent a confirmation link to {email}. Open your inbox, confirm the account, then return here to sign in.",
      backToSignIn: "Back to sign in",
      resendCta: "Resend confirmation email",
      resendSending: "Sending…",
      resendCooldown: "Resend in {seconds}s",
      resendSuccess: "Confirmation email sent again. Check your inbox.",
      submitWait: "Please wait…",
      submitSignIn: "Sign in",
      submitSignUp: "Sign up",
      forgotPasswordLink: "Forgot password?",
    },
    forgotPassword: {
      title: "Reset password",
      intro:
        "Enter your account email. If it matches an account, you will receive a link to choose a new password.",
      emailLabel: "Email",
      submit: "Send reset link",
      sending: "Sending…",
      success:
        "If an account exists for this email, we sent a message with a reset link. Check your inbox and spam folder.",
      backToLogin: "← Back to log in",
    },
    resetPassword: {
      title: "Set new password",
      intro: "Choose a new password for your account.",
      passwordLabel: "New password",
      confirmLabel: "Confirm new password",
      submit: "Update password",
      submitWait: "Updating…",
      success: "Password updated.",
      mismatch: "Passwords do not match.",
      invalidOrExpired:
        "This reset link is invalid or expired. Request a new link from the log-in page.",
      backToLogin: "← Back to log in",
    },
    search: {
      title: "Search",
      queryLabel: "Query",
      placeholder: "Posts (body) or users (email)…",
      submit: "Search",
      clear: "Clear",
      hintMinChars: "Enter at least 2 characters (after trimming).",
      introHint:
        "Search post bodies by keyword and users by email. Results update after you submit.",
      searching: "Searching…",
      usersWithCount: "Users ({count})",
      usersPrivacyNote:
        "Users who disabled email search discovery in Settings → Privacy won't appear here (except to themselves).",
      noProfiles: "No matching profiles.",
      message: "Message",
      viewProfile: "Profile",
      postsWithCount: "Posts ({count})",
      noPosts: "No matching posts.",
      rankingHint:
        "Results are ordered by relevance (full-text match, where the term appears) and recency. Flagged posts are excluded.",
      noResultsAny:
        "No posts or users matched “{q}”. Try other words or check email spelling (for profiles).",
      noResultsTips:
        "Tip: try one specific keyword, remove extra symbols, or search by full email address.",
      resultsRegionLabel: "Search results",
      resultsSummary:
        "Results for “{q}”: {total} total ({posts} posts, {users} users).",
      errorTitle: "Search failed.",
      errorHint: "Check your connection and try again.",
      retry: "Retry",
    },
    postForm: {
      signInPrompt: "Sign in to create posts.",
      signInLink: "Log in",
      banned: "Your account cannot create posts right now.",
      bodyLength: "Body must be 1–{max} characters.",
      bodyTierLimit: "Your plan allows up to {max} characters per post.",
      createFailed: "Could not create post",
      label: "New post",
      placeholder: "Write something…",
      attachAria: "Attach image or video",
      attachImageAria: "Attach image",
      addMedia: "Add image or video",
      addMediaImage: "Add image",
      removeMedia: "Remove attachment",
      mediaInvalidType: "Choose an image (JPEG, PNG, WebP, GIF) or a video (MP4, WebM).",
      videoRequiresPremium: "Video posts require Premium.",
      videoDailyLimitFree:
        "You have already published a video post today. Free plan allows one video post per day (UTC). Try again tomorrow or upgrade to Premium.",
      videoFreeTierDailyHint:
        "Free plan: one video post per calendar day (UTC). Premium allows more anytime.",
      videoDailyLimitFreeHint:
        "You have used today’s free video post (UTC). You can still add images, or try again tomorrow.",
      previewAlt: "Selected attachment preview",
      tagsLabel: "Tags (optional)",
      tagsPlaceholder: "e.g. news, dev, release-notes",
      tagsHint: "Comma-separated. Lowercase letters, numbers, hyphens. Up to {max} tags.",
      tagsPreviewLabel: "Will be saved as:",
      tagsPreviewInvalid:
        "No tags will be saved — use Latin letters (a–z), digits, and hyphens only.",
      tagsTierLimit: "Your plan allows up to {max} tags per post.",
      posting: "Posting…",
      post: "Post",
      flaggedAfterPost:
        "This post was flagged by automated checks. It is hidden from others until reviewed — you still see it on your profile.",
    },
    chrome: {
      backHome: "← Home",
    },
    notFoundPage: {
      title: "Page not found",
      body: "This link may be broken or the page was removed.",
      homeLink: "← Home",
    },
    profile: {
      title: "Profile",
      premiumBadge: "Premium",
      loading: "Loading…",
      emailLabel: "Email:",
      changePhoto: "Change profile photo",
      uploadPhoto: "Upload profile photo",
      settingsPhotoHint: "Settings → Profile photo",
      postsCount: "Posts: {count}",
      statsPosts: "Posts",
      statsFollowers: "Followers",
      statsFollowing: "Following",
      yourPosts: "Your posts",
      emptyPosts: "You have not posted yet.",
      emptyPostsCta: "Go to home feed",
      avatarLabel: "Profile",
      copyProfileLink: "Copy profile link",
      copyProfileLinkSuccess: "Link copied to clipboard.",
      copyProfileLinkFailed: "Could not copy link.",
      editProfile: "Edit Profile",
      closeEdit: "Close",
      followRequests: "Follow Requests",
      acceptRequest: "Accept",
      rejectRequest: "Decline",
      noPublicNameYet: "No public name yet",
      publicNamePrivacyHint:
        "Your email is not shown on your profile. Add a public name under Edit profile.",
      tabPosts: "Posts",
      tabCommented: "Commented",
      sectionCommented: "Posts you commented on",
      emptyCommented: "You have not commented on any posts yet.",
    },
    userProfile: {
      invalidTitle: "Profile",
      invalidBody: "This user link is not valid.",
      backHome: "Back to feed",
      title: "Member profile",
      notFound: "No profile found for this user.",
      bannedNotice: "This account is restricted.",
      emailHidden: "Hidden",
      memberFallback: "Member · {short}",
      followersStat: "Followers: {count}",
      followingStat: "Following: {count}",
      follow: "Follow",
      unfollow: "Unfollow",
      mutualFollowBadge: "Mutual",
      requestFollow: "Request Follow",
      cancelRequest: "Requested",
      followRequestSent: "Follow request sent.",
      privateAccount: "This account is private. Follow to see their posts and activity.",
      block: "Block",
      unblock: "Unblock",
      blocked: "User blocked.",
      youBlockedUser: "You have blocked this user.",
      blockedByUser: "This user is not available.",
      report: "Report",
      reportPlaceholder: "Describe the issue (spam, harassment, etc.)",
      reportSubmit: "Send Report",
      reportSent: "Report submitted. Thank you.",
      online: "Online",
      lastSeenMinutes: "Last seen {count} min ago",
      lastSeenHours: "Last seen {count}h ago",
      lastSeenDays: "Last seen {count}d ago",
      lastSeenLongAgo: "Last seen a long time ago",
      lastSeenNever: "Offline",
      signInToFollow: "Sign in to follow this user.",
      theirPosts: "Posts",
      postsHiddenBanned: "Posts are hidden for restricted accounts.",
      emptyPostsOther: "This member hasn't posted yet.",
      sectionCommented: "Posts they commented on",
      emptyCommentedOther: "This member has not commented on any posts yet.",
    },
    followList: {
      followersHeading: "Followers",
      followingHeading: "Following",
      backToProfile: "← Back to profile",
      emptyFollowers: "No followers yet.",
      emptyFollowing: "Not following anyone yet.",
      loadMore: "Load more ({pageSize} per page)",
      restricted: "Restricted",
    },
    messages: {
      title: "Messages",
      introBefore: "Open a chat from ",
      introAfter: " (user results) or pick a thread below.",
      empty: "No conversations yet.",
    },
    bannedPage: {
      title: "Account restricted",
      intro:
        "Your account cannot post, comment, react, or send messages until this restriction is lifted.",
      loadingDetails: "Loading details…",
      whyHeading: "Why",
      activeSincePrefix: "Restriction active since",
      signedInAsPrefix: "Signed in as",
      contactSupport: "If you think this is a mistake, contact support.",
      signOut: "Sign out",
      legalLink: "Legal",
    },
    chat: {
      chatHeading: "Chat",
      invalidPeerId: "Invalid user id.",
      backToMessages: "Back to messages",
      allThreads: "All threads",
      messageLabel: "Message",
      messagePlaceholder: "Write a message…",
      send: "Send",
      sending: "Sending…",
      cannotMessageSelf: "You cannot message yourself.",
      typing: "typing…",
      online: "online",
    },
    admin: {
      backToOverview: "← Admin overview",
      backToHome: "← Home",
      refresh: "Refresh",
      refreshLists: "Refresh lists",
      overview: {
        title: "Admin",
        promoteHintBefore: "Promote admins in Supabase SQL Editor if needed:",
        linkModeration: "Moderation — delete posts & comments",
        linkUsers: "Users — ban / unban accounts",
        linkReports: "Reports — user reports on posts",
        linkUserReports: "User Reports — reports between users",
        linkBlocks: "Blocks — user block log",
        linkStats: "Statistics — full platform counts",
        linkAds: "Ads — feed top sponsored strip",
        linkAdRequests: "Sponsored — application queue",
        linkApi: "API catalog — tables & RPCs (Supabase)",
        countsTitle: "Counts",
        statProfiles: "Profiles",
        statPosts: "Posts",
        statComments: "Comments",
        statReactions: "Reactions",
        linkFeatures: "Feature flags — show/hide home feed parts",
      },
      features: {
        title: "Feature flags",
        listHeading: "Flags",
        intro:
          "When a flag is off, that part of the site is hidden from users (e.g. home feed). Nothing says “disabled” on the home page — it simply does not appear.",
        feedTrendingTab: "Trending tab (home feed)",
        feedTrendingTabHelp: "Hides the Latest / Trending switch and forces latest sort.",
        feedAds: "Feed top sponsored strip",
        feedAdsHelp: "Hides the ad block above the post list (independent of Ads admin content).",
        postComments: "Comments under posts",
        postCommentsHelp: "Hides the comment thread and composer on every post card (feed, profile, search).",
        navSearch: "Search (header link)",
        navSearchHelp: "Hides the Search nav link; direct /search URLs redirect home.",
        navMessages: "Messages / chat",
        navMessagesHelp: "Hides Messages in the header and blocks /messages and /messages/:id (redirect home).",
        homePremiumCta: "Premium promo on home feed",
        homePremiumCtaHelp: "Hides the Premium card above the feed (links to Settings or Sign in).",
        unknownKey: "Flag",
        saving: "Saving…",
        savedToast: "Saved.",
      },
      moderation: {
        title: "Moderation",
        hint: "Review flagged content, approve to clear flags, or delete (admin only).",
        latest50: "Latest 50 each (flagged and highest spam score first).",
        autoFlagHint:
          "Automation: when 3 different users report the same post, it is auto-flagged and hidden from public lists (same as spam flag).",
        postsHeading: "Posts",
        commentsHeading: "Comments",
        noPosts: "No posts.",
        noComments: "No comments.",
        flaggedLabel: "Flagged",
        spamScoreLabel: "Spam score",
        approvePost: "Approve (clear flag)",
        approveComment: "Approve (clear flag)",
        deletePost: "Delete post",
        deleteComment: "Delete comment",
        confirmDeletePost: "Delete this post? (Comments will be removed with it.)",
        confirmDeleteComment: "Delete this comment?",
        postRefPrefix: "post",
      },
      reports: {
        title: "Reports",
        intro: "User-submitted reports on posts (newest first).",
        empty: "No reports yet.",
        dismiss: "Dismiss",
        confirmDismiss: "Remove this report from the list?",
        postIdPrefix: "post",
      },
      ads: {
        title: "Advertisements",
        intro: "Feed top strip on the home page. Plain text only (no HTML); optional promo video (MP4/WebM).",
        testModeBanner:
          "Test mode: no paid placement or payout program is active. Use for internal testing only until we publish a production update.",
        feedTopTitle: "Feed top",
        fieldTitle: "Title",
        fieldBody: "Body",
        fieldLinkUrl: "Link URL",
        fieldVideo: "Promotional video",
        videoHelp: "Optional. MP4 or WebM, max 50 MB. Uploading replaces the previous file.",
        pickVideo: "Upload video",
        pickVideoAria: "Choose promotional video file",
        removeVideo: "Remove video",
        uploadingVideo: "Uploading…",
        videoInvalidMime: "Only MP4 or WebM video is allowed.",
        videoInvalidSize: "Video must be 50 MB or smaller.",
        activeLabel: "Active (show on home feed)",
        phTitle: "Optional headline",
        phBody: "Short text",
        phUrl: "https://…",
        saving: "Saving…",
        save: "Save",
        savedToast: "Saved.",
        noSlot: "No ad slot row (run migrations).",
        linkReviewRequests: "Open application queue →",
      },
      adRequests: {
        title: "Sponsored applications",
        intro:
          "Members submit copy here for the feed-top strip. Set status when you decide; live text is still edited under Feed top (plain text, no HTML).",
        testModeBanner:
          "Test mode: applicants are not entering a paid contract. Communicate clearly if you reply; commercial terms come only after a future update.",
        empty: "No applications yet.",
        colCreated: "Submitted",
        colApplicant: "Applicant",
        colTitle: "Proposed title",
        colBody: "Proposed text",
        colLink: "Link",
        colStatus: "Status",
        colNote: "Note to applicant",
        statusPending: "Pending",
        statusApproved: "Approved",
        statusRejected: "Rejected",
        placeholderNote: "Optional — the applicant can read this on their requests list.",
        save: "Save",
        saving: "Saving…",
        savedToast: "Updated.",
        viewProfile: "Profile",
      },
      stats: {
        title: "Statistics",
        intro: "Row counts across public tables (approximate platform size).",
        metricsTitle: "Metrics",
        metricProfiles: "Profiles",
        metricPosts: "Posts",
        metricComments: "Comments",
        metricReactions: "Reactions",
        metricReports: "Reports",
        metricTags: "Tags",
        metricPostTags: "Post–tag links",
        metricConversations: "DM conversations",
        metricChatMessages: "Chat messages",
        metricNotifications: "Notifications",
        metricUserReports: "User reports",
        metricBlocks: "Blocks",
        metricFollowRequests: "Follow requests",
        metricAdSlots: "Ad slots",
      },
      userReports: {
        title: "User Reports",
        intro: "Reports filed by users against other users (newest first).",
        empty: "No user reports yet.",
        dismiss: "Dismiss",
        confirmDismiss: "Remove this user report from the list?",
        reporter: "Reporter",
        reported: "Reported",
        reportedLabel: "reported",
        viewProfile: "View profile",
      },
      blocks: {
        title: "Blocks",
        intro: "User-to-user blocks (newest first). Blocks auto-remove follows in both directions.",
        empty: "No blocks yet.",
        blocker: "Blocker",
        blocked: "Blocked",
        viewBlocker: "View blocker",
        viewBlocked: "View blocked",
      },
      users: {
        title: "Users",
        introBefore:
          "Ban blocks posting, comments, reactions, and chat messages (read-only). Optional reason is shown to the user on ",
        introAfter:
          ". Premium is admin-granted until a date (payments not wired yet).",
        banTitle: "Ban {name}",
        reasonLabel: "Reason (optional, shown to user)",
        reasonPlaceholder: "e.g. Spam, harassment, or a short note…",
        charCount: "{current}/{max} characters",
        confirmBan: "Confirm ban",
        cancel: "Cancel",
        colEmail: "Email",
        colAdmin: "Admin",
        colBanned: "Banned",
        colReason: "Reason",
        colPremium: "Premium",
        colActions: "Actions",
        yes: "yes",
        emDash: "—",
        labelModeration: "Moderation",
        labelPremium: "Premium",
        unban: "Unban",
        ban: "Ban",
        clearPrem: "Clear prem.",
        premiumExpired: "expired",
        confirmClearPremium: "Clear premium for this user?",
        confirmUnban: "Unban this user?",
        banReasonTooLong: "Reason must be at most {max} characters.",
        ariaBan: "Ban {name}",
        ariaUnban: "Unban {name}",
        ariaPrem30: "Add 30 days premium for {name}",
        ariaPrem365: "Add 365 days premium for {name}",
        ariaClearPrem: "Clear premium for {name}",
      },
      api: {
        title: "API catalog",
        intro:
          "Metafeed talks to Supabase (PostgREST + Auth + Realtime). There is no custom HTTP API in this repo — the app uses @supabase/supabase-js with Row Level Security. Names below are the canonical registry (src/lib/api). Column-level notes and migration order: supabase/SCHEMA.md in the repo.",
        publicTables: "Public tables",
        clientRpcs: "Client RPCs",
        colTable: "public.table",
        colRpc: "public function (RPC)",
        footerNote:
          "Triggers and internal helpers (e.g. handle_new_user) are not listed here — see migrations.",
      },
    },
    notifications: {
      title: "Notifications",
      loading: "Loading…",
      heroUnreadCount: "{count} unread",
      heroTotalCount: "{count} total",
      statsTotal: "Total",
      statsUnread: "Unread",
      statsRead: "Read",
      markAllRead: "Mark all read",
      markRead: "Mark read",
      empty:
        "No notifications yet. Comments and reactions on your posts and new followers appear here.",
      backToFeed: "Back to feed",
      postLabel: "post",
      viewProfile: "View profile",
      msgComment: "{actor} commented on your post",
      msgReaction: "{actor} reacted to your post",
      msgFollow: "{actor} started following you",
    },
    postCard: {
      deleteConfirm: "Delete this post?",
      delete: "Delete",
      deleting: "…",
      netScoreTitle: "Net score (thumbs up minus thumbs down)",
      flaggedAuthorHint: "Under review — only you and moderators see this in the public feed.",
      readMore: "Read more",
      showLess: "Show less",
      expandBodyAria: "Show full text",
      collapseBodyAria: "Collapse text",
      edit: "Edit",
      editSave: "Save",
      editSaving: "Saving…",
      editCancel: "Cancel",
      editSaved: "Post updated.",
      editFlaggedHint: "Your edit was flagged by automated checks. It may not appear in public feeds until reviewed.",
      edited: "(edited)",
    },
    comment: {
      comments: "Comments",
      hideComments: "Hide comments",
      loading: "Loading comments…",
      addLabel: "Add a comment",
      placeholder: "Write a comment…",
      sending: "Sending…",
      submit: "Comment",
      signInLink: "Sign in",
      signInSuffix: "to comment.",
      deleteCommentConfirm: "Delete this comment?",
      delete: "Delete",
      commentFailed: "Could not post comment",
      flaggedAfterComment:
        "This comment was flagged by automated checks. Others may not see it until reviewed.",
    },
    report: {
      report: "Report",
      whyLabel: "Why are you reporting this post?",
      placeholder: "Brief reason…",
      sending: "Sending…",
      submit: "Submit report",
      cancel: "Cancel",
      success: "Report sent. Thanks.",
    },
    reactions: {
      ariaLabel: "Reactions",
      thumbsUp: "Thumbs up",
      thumbsDown: "Thumbs down",
      signInToReact: "Sign in to react",
    },
    legal: {
      navAria: "Legal navigation",
      title: "Legal information",
      lastUpdated: "Last updated: April 1, 2026 · Metafeed v1 (MVP)",
    },
    sponsored: {
      title: "Sponsored placement",
      testModeBanner:
        "Test mode: we are not offering paid placements or money to anyone yet. Features here may change; please wait for a product update before expecting commercial terms.",
      intro:
        "The “Sponsored” label on the home feed links here. Submit the headline, short text, and optional URL you would like considered for the feed-top strip. A team member reviews requests; we may follow up by email.",
      howItWorksTitle: "How it works",
      howItWorksBody:
        "1) You send proposed copy below. 2) We review (pending → approved or rejected). 3) If approved, we still enter final text in the admin Ads tool before it goes live. This is not instant self-serve checkout yet.",
      formTitle: "Submit a request",
      fieldTitle: "Proposed headline (optional)",
      fieldTitleHint: "Short line; may be left empty if the body is enough.",
      fieldBody: "Proposed text",
      fieldBodyHint: "At least 10 characters. Plain text only.",
      fieldLink: "Destination URL (optional)",
      fieldLinkHint: "Where people go when they tap the headline (https://…).",
      submit: "Submit request",
      submitting: "Sending…",
      successToast: "Request received. You can track status below.",
      signInTitle: "Sign in to apply",
      signInBody: "You need an account to submit sponsored placement requests.",
      signInLink: "Log in or sign up",
      myRequestsTitle: "Your requests",
      emptyMine: "You have not submitted any requests yet.",
      statusPending: "Pending review",
      statusApproved: "Approved (not yet live until published in Ads)",
      statusRejected: "Rejected",
      adminNoteFromTeam: "Note from the team",
    },
    security: {
      navAria: "Security navigation",
      title: "Security",
      intro: "How Metafeed approaches security in the MVP (high level).",
      sectionAuth: "Account & passwords",
      sectionAuthLi1:
        "New passwords and password changes must be at least 8 characters (enforced in the app; Supabase Auth stores credentials securely).",
      sectionAuthLi2: "Use a unique password for this site; sign out from",
      sectionAuthLi2End: " on shared devices.",
      sectionData: "Data access",
      sectionDataP1:
        "The backend uses Row Level Security (RLS) on database tables so clients only access data allowed by policy (e.g. your own profile updates, public posts, admin tools for admins).",
      sectionDataP2:
        "API keys in the web app are anon keys (limited by RLS). Never put service-role or secret keys in the frontend or public repos.",
      sectionTransport: "Transport & hosting",
      sectionTransportP:
        "Use HTTPS in production. When deployed (e.g. Vercel), HTTP security headers can be set via hosting config to reduce common web risks (clickjacking, MIME sniffing, referrer leakage).",
      sectionPrivacy: "Privacy controls",
      privacyIntro: "Control email search visibility under",
      privacySettingsPrivacy: "Settings → Privacy",
      privacySeeAlso: "See also",
    },
  },
  seo: {
    announcer: "Navigated to {title}",
    defaultDescription:
      "Metafeed (metafeed.it.com) — social feed: posts, reactions, comments, tags, search, and messages.",
    searchWithQueryTitle: "Search: {q}",
    searchWithQueryDescription:
      "Search results for “{q}” on Metafeed — posts and profiles.",
    admin: {
      title: "Admin",
      description: "Administration tools for Metafeed.",
    },
    routes: {
      home: {
        title: "Home",
        description:
          "Metafeed (metafeed.it.com) — social feed: posts, reactions, comments, tags, search, and messages.",
      },
      chatPeer: {
        title: "Chat",
        description: "Direct message thread on Metafeed.",
      },
      messages: {
        title: "Messages",
        description: "Your conversations on Metafeed.",
      },
      notifications: {
        title: "Notifications",
        description: "Your notifications on Metafeed.",
      },
      profile: {
        title: "Profile",
        description: "Your profile and posts on Metafeed.",
      },
      userProfile: {
        title: "Member profile",
        description: "User profile and posts on Metafeed.",
      },
      userFollowers: {
        title: "Followers",
        description: "Accounts that follow this user on Metafeed.",
      },
      userFollowing: {
        title: "Following",
        description: "Accounts this user follows on Metafeed.",
      },
      settings: {
        title: "Settings",
        description: "Account and privacy settings on Metafeed.",
      },
      forgotPassword: {
        title: "Reset password",
        description: "Request a password reset email for Metafeed.",
      },
      resetPassword: {
        title: "Set new password",
        description: "Choose a new password after following the reset link.",
      },
      login: {
        title: "Log in",
        description: "Sign in to Metafeed.",
      },
      banned: {
        title: "Account restricted",
        description: "Account status on Metafeed.",
      },
      search: {
        title: "Search",
        description: "Search posts and find profiles on Metafeed.",
      },
      legal: {
        title: "Terms & Privacy",
        description: "Terms of service and privacy information for Metafeed.",
      },
      sponsored: {
        title: "Sponsored placement",
        description: "Request the feed-top sponsored strip on Metafeed.",
      },
      security: {
        title: "Security",
        description: "Security tips and account safety on Metafeed.",
      },
      notFound: {
        title: "Page not found",
        description: "This page does not exist or was moved on Metafeed.",
      },
    },
  },
};

const ka: Bundle = {
  layout: {
    skipToMain: "გადასვლა მთავარ შიგთავსზე",
    brandAria: "Metafeed — მთავარი",
    navAria: "მთავარი ნავიგაცია",
    nav: {
      home: "მთავარი",
      search: "ძიება",
      login: "შესვლა",
      messages: "მესიჯები",
      notifications: "შეტყობინებები",
      profile: "პროფილი",
      settings: "პარამეტრები",
      premium: "პრემიუმი",
      admin: "ადმინი",
      adminMenuAria: "ადმინის გვერდები",
      adminOverview: "მიმოხილვა",
      users: "მომხმარებლები",
      moderation: "მოდერაცია",
      reports: "რეპორტები",
      userReports: "მომხმ. რეპორტები",
      blocks: "ბლოკები",
      stats: "სტატისტიკა",
      ads: "რეკლამა",
      features: "ფლაგები",
      api: "API",
      security: "უსაფრთხოება",
      legal: "იურიდიული",
    },
    unreadBadge: "{count} წაუკითხავი",
    toastRegionAria: "შეტყობინებები",
    toastDismiss: "დახურვა",
    mobileMenuOpen: "მენიუს გახსნა",
    mobileMenuClose: "მენიუს დახურვა",
  },
  errors: {
    routeTitle: "შეცდომა",
    routeBody: "ამ ნაწილმა მოულოდნელი შეცდომა გამოიწვია. სცადეთ ხელახლა ან დაბრუნდით მთავარზე.",
    tryAgain: "ხელახლა",
    homeLink: "← მთავარი",
    appBoundaryBody: "აპმა მოულოდნელი შეცდომა განიცადა. ცადეთ გვერდის გადატვირთვა.",
    reload: "გადატვირთვა",
  },
  theme: {
    auto: "ავტო",
    light: "ღია",
    dark: "მუქი",
    ariaGroup: "ფერის თემა",
  },
  settings: {
    pageEyebrow: "ანგარიშის ცენტრი",
    pageSubtitle: "აქ მართავ Metafeed-ის იერს, გაზიარების პარამეტრებს და შენი ანგარიშის ძირითად გარემოს ამ მოწყობილობაზე.",
    pageMetaAria: "პარამეტრების შეჯამება",
    language: "ენა",
    languageHelp: "ინტერფეისის ენა (ინახება ამ მოწყობილობაზე).",
    languageEn: "ინგლისური",
    languageKa: "ქართული",
    languageRu: "რუსული",
    appearance: "გარეგნობა",
    appearanceHint: "ფერის თემა (ინახება ამ მოწყობილობაზე).",
    profileAbout: "სახელი და ბიო",
    profileAboutHint: "ჩანს საჯარო პროფილზე. ცარიელი დატოვება — ზედა ზოლში უპირატესოდ ელფოსტა.",
    profileAboutLoading: "იტვირთება…",
    displayName: "საჩვენებელი სახელი",
    displayNamePlaceholder: "არასავალდებულო",
    displayNameTooLong: "საჩვენებელი სახელი არაუმეტეს {max} სიმბოლოს.",
    bio: "ბიო",
    bioPlaceholder: "მოკლე შესავალი (არასავალდებულო)",
    bioTooLong: "ბიო არაუმეტეს {max} სიმბოლოს.",
    profileAboutSave: "სახელისა და ბიოს შენახვა",
    profileAboutSaving: "ინახება…",
    profileAboutSaved: "პროფილი შენახულია.",
    account: "ანგარიში",
    signedInAs: "შესული ხართ როგორც",
    premium: "პრემიუმი",
    premiumLoading: "…",
    premiumActiveUntil: "აქტიურია",
    premiumNone: "არა",
    premiumBillingTitle: "პრემიუმის ყიდვა",
    premiumCheckoutHint:
      "პრემიუმის გახანგრძლივება (+30 დღე) უსაფრთხო გადახდით, როცა სერვერზე ჩართულია ბილინგი (Stripe).",
    premiumCheckoutSubscribe: "გადახდაზე გადასვლა",
    premiumCheckoutBusy: "იხსნება გადახდა…",
    premiumCheckoutSuccess: "გადახდა მიღებულია. პრემიუმი მალე განახლდება.",
    premiumCheckoutCancelled: "გადახდა გაუქმდა.",
    premiumCheckoutDisabledHint: "დეტალები დაყენებაზე: README → Stripe Premium.",
    premiumPlanSectionTitle: "პრემიუმის გეგმა (წინასწარი)",
    premiumPlanLead:
      "პრემიუმი განკუთვნილია იმისთვის, ვინც მეტი ადგილს ითხოვს ტექსტზე, თეგებსა და ვიდეოზე. ქვემოთ არის ის, რას ვამიზნებთ გადახდიანი checkout-მდე — ციფრები შეიძლება გაშვებამდე დაზუსტდეს.",
    premiumPlanBenefitsTitle: "რას მოიცავს პრემიუმი",
    premiumPlanBenefit1: "უფრო გრძელი პოსტები — ერთ პოსტზე 5000 სიმბოლომდე (უფასო: 1000).",
    premiumPlanBenefit2: "მეტი თეგი — ერთ პოსტზე 8 თეგამდე (უფასო: 4).",
    premiumPlanBenefit3: "ვიდეო პოსტები — MP4/WebM ლენტაში (უფასო ტარიფზე არაა).",
    premiumPlanBenefit4: "სივრცე განვითარებადი ფუნქციებისთვის.",
    premiumPlanFutureTitle: "განხილვაშია (არა გარანტია)",
    premiumPlanFutureBody:
      "ვიკვლევთ დამატებით უპირატესობებს Premium-ისთვის — მაგალითად არჩევით სარეკლამო განთავსებას ლენტაში იმისთვის, ვისაც სურს პოსტის ან ბიზნესის ხილვადობა. ფასი შეიძლება დამოკიდებული იყოს ზომაზე, ხანგრძლივობაზე, ფორმატზე და იურიდიულ/რეგულაციულ მოთხოვნებზე. ჯერ არაფერია დაფასოებული ან გაშვებული; თუ გამოვა, წინასწარ გამოვაცხადებთ წესებსა და ფასებს.",
    premiumPlanDuration:
      "გადახდა: წარმატებული Stripe checkout ყოველ ჯერზე ახანგრძლივებს პრემიუმს 30 დღით. ვადამდე შეგიძლიათ ისევ იყიდოთ და დრო დაიმატოთ.",
    premiumPlanPrice:
      "ფასი: ჯერ არ არის გაფიქსირებული — ზუსტი თანხა და ვალუტა checkout-ის ეკრანზე გამოჩნდება გადახდამდე. Stripe-ში დადასტურებამდე თანხა არ ჩამოიჭრება.",
    premiumPlanWaitNote:
      "Stripe-სა და საბოლოო ფასს ვაბოლოებთ. სანამ აქ checkout არ ჩაირთვება, პრემიუმს ადმინი შეუძლია ხელით მიანიჭოს. „გადახდაზე გადასვლა“ ამ ბლოკში გამოჩნდება, როცა ბილინგი ჩაირთვება.",
    privacy: "პირადულობა",
    privacyHint:
      "განსაზღვრეთ, ჩანდება თუ არა თქვენი პროფილი სხვების ელფოსტით ძიებისას (ძიების გვერდი).",
    privacyLoading: "იტვირთება…",
    privateProfileCheckbox: "დახურული პროფილი",
    privateProfileHint: "ჩართვის შემთხვევაში მხოლოდ თქვენი დადასტურებული მიმდევრები ნახავენ პოსტებს, bio-ს და სტატისტიკას. სხვებს მოუწევთ გამოწერის მოთხოვნის გაგზავნა.",
    privacyCheckbox: "ჩემი პროფილი ჩანდეს ელფოსტით ძიების შედეგებში",
    privacySave: "პირადულობის შენახვა",
    privacySaving: "ინახება…",
    privacySaved: "პირადულობის პარამეტრები შენახულია.",
    notificationsSection: "შეტყობინებები",
    notificationsHint:
      "აირჩიეთ, რომელი აპლიკაციის შიდა შეტყობინებები მიიღოთ (ზარის ხატულა).",
    notificationsLoading: "იტვირთება…",
    notifyOnComment: "კომენტარები ჩემ პოსტებზე",
    notifyOnReaction: "რეაქციები ჩემ პოსტებზე",
    notifyOnFollow: "ახალი გამომწერები",
    notificationsSave: "შეტყობინებების პარამეტრების შენახვა",
    notificationsSaving: "ინახება…",
    notificationsSaved: "შეტყობინებების პარამეტრები შენახულია.",
    changePassword: "პაროლის შეცვლა",
    passwordMinHint: "გამოიყენეთ მინიმუმ {min} სიმბოლო.",
    newPassword: "ახალი პაროლი",
    updatePassword: "პაროლის განახლება",
    updatingPassword: "ახლდება…",
    passwordUpdated: "პაროლი განახლდა.",
    passwordTooShort: "პაროლი უნდა იყოს მინიმუმ {min} სიმბოლო.",
    session: "სესია",
    sessionHint: "მოწყობილობაზე მიმდინარე სესია დაასრულე, როცა მუშაობას ამთავრებ.",
    logOut: "გასვლა",
    deleteAccount: "ანგარიშის წაშლა",
    deleteAccountHint:
      "სამუდამოდ წაშლის შესვლას, პროფილს, პოსტებს, კომენტარებს, რეაქციებს, შეტყობინებებს, მესიჯებს და ატვირთულ სურათებს. უკან დაბრუნება შეუძლებელია. საუბრები, სადაც მონაწილე ხართ, ორივე მხარისთვის იშლება.",
    deleteAccountTypeDelete: "დადასტურებისთვის ქვემოთ ჩაწერეთ DELETE (ლათინურად).",
    deleteAccountConfirmPlaceholder: "DELETE",
    deleteAccountSubmit: "ანგარიშის სამუდამო წაშლა",
    deleteAccountDeleting: "იშლება…",
    deleteAccountFailed: "ანგარიშის წაშლა ვერ მოხერხდა: {message}",
    avatarSectionTitle: "პროფილის ფოტო",
    avatarFormatHint: "JPEG, PNG, WebP ან GIF — მაქს. 2 მბ.",
    avatarChooseAria: "აირჩიეთ პროფილის ფოტო",
    avatarUpload: "ფოტოს ატვირთვა",
    avatarRemove: "ფოტოს წაშლა",
    avatarUpdated: "პროფილის ფოტო განახლდა.",
    avatarRemoved: "პროფილის ფოტო წაიშალა.",
    avatarRemoveConfirm: "წავშალოთ პროფილის ფოტო?",
    avatarUserFallback: "მომხმარებელი",
    termsLink: "წესები და კონფიდენციალურობა",
  },
  pages: {
    common: {
      loading: "იტვირთება…",
      scaffoldInProgress: "მიმდინარე",
      scaffoldInProgressHint: "საკანდიდატო — მიმდინარე",
    },
    home: {
      feedSortAria: "ლენტის რიგი",
      latest: "ბოლო",
      trending: "ტრენდი",
      trendingTagHint:
        "ტრენდი მთელ ლენტაზე ვრცელდება. ამ თეგისთვის ნაჩვენებია ბოლო პოსტები.",
      filterTag: "ფილტრი: თეგი {tag}",
      clear: "გასუფთავება",
      invalidTag: "არასწორი თეგი URL-ში. გამოიყენეთ ასოები, ციფრები და ტირე.",
      loadingPosts: "პოსტები იტვირთება…",
      emptyTagged: "ამ თეგით პოსტები ჯერ არ არის.",
      emptyFeed: "პოსტები ჯერ არ არის. იყავით პირველი.",
      loadMore: "კიდევ ({pageSize} გვერდზე)",
      feedAdSponsored: "სპონსორი",
      feedAdSponsoredContent: "სპონსორის კონტენტი",
      feedAdExternalCta: "ბმულის გახსნა",
      feedAdVideoFallback: "ბრაუზერს არ შეუძლია ამ ვიდეოს დაკვრა.",
      premiumCtaTitle: "პრემიუმი",
      premiumCtaBody: "უფრო გრძელი პოსტები, მეტი თეგი, ვიდეო და სხვა. მართეთ პარამეტრებში.",
      premiumCtaBodyNoBilling:
        "უფრო გრძელი პოსტები, მეტი თეგი და ვიდეო. გადახდიანი checkout მალე — გახსენით პარამეტრები → ანგარიში სრული გეგმის, ფასის წინასწარი ხედისა და ვადებისთვის.",
      premiumCtaLinkSettings: "პარამეტრების გახსნა",
      premiumCtaLinkLogin: "შესვლა",
      sidebarTrendingTitle: "ტრენდული თეგები",
      sidebarTrendingAria: "ტრენდული თეგები და მალსახმობები",
      sidebarLandmarkAria: "ტრენდული თეგები და პრემიუმი",
      sidebarTrendingEmpty: "ამ კვირაში ტრენდული თეგები არაა.",
      composeExpandAria: "პოსტის ფორმის გახსნა",
      composeCollapse: "ჩაკეცვა",
    },
    login: {
      titleSignIn: "შესვლა",
      titleSignUp: "ანგარიშის შექმნა",
      termsPrefix: "გაგრძელებით ეთანხმებით",
      modeSignIn: "შესვლა",
      modeSignUp: "რეგისტრაცია",
      email: "ელფოსტა",
      password: "პაროლი",
      invalidCredentials: "ელფოსტა ან პაროლი არასწორია.",
      confirmPassword: "პაროლის გამეორება",
      passwordsDoNotMatch: "პაროლები არ ემთხვევა.",
      checkEmailForConfirmation:
        "ანგარიშის დასადასტურებლად გადაამოწმეთ ელფოსტა და შემდეგ შედით სისტემაში.",
      emailAlreadyRegisteredHint:
        "თუ ეს ელფოსტა უკვე დარეგისტრირებულია, გამოიყენეთ შესვლა ან პაროლის აღდგენა.",
      confirmationPendingTitle:
        "რეგისტრაცია შეიქმნა. გასაგრძელებლად დაადასტურეთ ელფოსტა.",
      confirmationPendingBody:
        "დადასტურების ბმული გამოგიგზავნეთ: {email}. გახსენით შემოსული წერილი, დაადასტურეთ ანგარიში და შემდეგ დაბრუნდით შესასვლელად.",
      backToSignIn: "შესვლაზე დაბრუნება",
      resendCta: "დადასტურების წერილის ხელახლა გაგზავნა",
      resendSending: "იგზავნება…",
      resendCooldown: "თავიდან გაგზავნა {seconds}წმ-ში",
      resendSuccess: "დადასტურების წერილი ხელახლა გაიგზავნა. შეამოწმეთ ელფოსტა.",
      submitWait: "დაელოდეთ…",
      submitSignIn: "შესვლა",
      submitSignUp: "რეგისტრაცია",
      forgotPasswordLink: "დაგავიწყდათ პაროლი?",
    },
    forgotPassword: {
      title: "პაროლის აღდგენა",
      intro:
        "შეიყვანეთ ანგარიშის ელფოსტა. თუ ანგარიში არსებობს, მიიღებთ ბმულს ახალი პაროლის ასარჩევად.",
      emailLabel: "ელფოსტა",
      submit: "ბმულის გაგზავნა",
      sending: "იგზავნება…",
      success:
        "თუ ასეთი ელფოსტით ანგარიში არსებობს, გამოგიგზავნეთ წერილი ბმულით. შეამოწმეთ საფოსტე ყუთი და სპამი.",
      backToLogin: "← უკან შესვლაზე",
    },
    resetPassword: {
      title: "ახალი პაროლი",
      intro: "აირჩიეთ ახალი პაროლი თქვენი ანგარიშისთვის.",
      passwordLabel: "ახალი პაროლი",
      confirmLabel: "გაიმეორეთ პაროლი",
      submit: "პაროლის განახლება",
      submitWait: "ახლდება…",
      success: "პაროლი განახლდა.",
      mismatch: "პაროლები არ ემთხვევა.",
      invalidOrExpired:
        "ბმული არასწორია ან ვადაგასულია. მოითხოვეთ ახალი ბმული შესვლის გვერდიდან.",
      backToLogin: "← უკან შესვლაზე",
    },
    search: {
      title: "ძიება",
      queryLabel: "მოთხოვნა",
      placeholder: "პოსტები (ტექსტი) ან მომხმარებლები (ელფოსტა)…",
      submit: "ძიება",
      clear: "გასუფთავება",
      hintMinChars: "შეიყვანეთ მინიმუმ 2 სიმბოლო (გაფართოების შემდეგ).",
      introHint:
        "ძებნა: პოსტების ტექსტი საკვანძო სიტყვით და მომხმარებლები ელფოსტით. შედეგი განახლდება გაგზავნის შემდეგ.",
      searching: "ძიება…",
      usersWithCount: "მომხმარებლები ({count})",
      usersPrivacyNote:
        "ვინც პარამეტრებში გამორთა ელფოსტით ძიება, აქ არ ჩანს (გარდა საკუთარი თავისა).",
      noProfiles: "შესაბამისი პროფილები არ მოიძებნა.",
      message: "მესიჯი",
      viewProfile: "პროფილი",
      postsWithCount: "პოსტები ({count})",
      noPosts: "შესაბამისი პოსტები არ არის.",
      rankingHint:
        "შედეგები დალაგებულია რელევანტურობით (სრული ტექსტური შესაბამისობა, სად ჩანს ტერმინი) და ახლობლობით. დაფლაგული პოსტები არ შედის.",
      noResultsAny:
        "„{q}“-ისთვის პოსტი ან მომხმარებელი არ მოიძებნა. სცადეთ სხვა სიტყვები ან ელფოსტის მართვა (პროფილებისთვის).",
      noResultsTips:
        "რჩევა: სცადეთ ერთი ზუსტი საკვანძო სიტყვა, მოაშორეთ ზედმეტი სიმბოლოები ან მოძებნეთ სრული ელფოსტა.",
      resultsRegionLabel: "ძიების შედეგები",
      resultsSummary:
        "„{q}“-ისთვის შედეგები: სულ {total} ({posts} პოსტი, {users} მომხმარებელი).",
      errorTitle: "ძიება ვერ შესრულდა.",
      errorHint: "შეამოწმეთ კავშირი და სცადეთ თავიდან.",
      retry: "თავიდან ცდა",
    },
    postForm: {
      signInPrompt: "პოსტისთვის შედით.",
      signInLink: "შესვლა",
      banned: "თქვენი ანგარიში ახლა პოსტებს ვერ ქმნის.",
      bodyLength: "ტექსტი იყოს 1–{max} სიმბოლო.",
      bodyTierLimit: "თქვენი გეგმით პოსტზე მაქსიმუმ {max} სიმბოლოა.",
      createFailed: "პოსტის შექმნა ვერ მოხერხდა",
      label: "ახალი პოსტი",
      placeholder: "დაწერეთ…",
      attachAria: "სურათი ან ვიდეო",
      attachImageAria: "სურათი",
      addMedia: "სურათი ან ვიდეო",
      addMediaImage: "სურათი",
      removeMedia: "მიმაგრების მოშორება",
      mediaInvalidType: "აირჩიეთ სურათი (JPEG, PNG, WebP, GIF) ან ვიდეო (MP4, WebM).",
      videoRequiresPremium: "ვიდეო პოსტზე საჭიროა პრემიუმი.",
      videoDailyLimitFree:
        "დღეს უკვე გამოქვეყნებული გაქვთ ვიდეო პოსტი. უფასო გეგმაზე დღეში ერთი ვიდეოა (UTC). ხვალ სცადეთ ან გადადით Premium-ზე.",
      videoFreeTierDailyHint:
        "უფასო გეგმა: ერთი ვიდეო პოსტი კალენდარულ დღეში (UTC). Premium-ზე — მეტი ნებისმიერ დროს.",
      videoDailyLimitFreeHint:
        "დღეური უფასო ვიდეო უკვე გამოყენებულია (UTC). სურათის დამატება კიდევ შეგიძლიათ, ან ხვალ სცადეთ.",
      previewAlt: "არჩეული ფაილის გადახედვა",
      tagsLabel: "თეგები (არასავალდებულო)",
      tagsPlaceholder: "მაგ. news, dev, release-notes",
      tagsHint: "მძიმით გამოყოფილი. პატარა ასოები, ციფრები, ტირე. მაქს. {max} თეგი.",
      tagsPreviewLabel: "შეინახება როგორც:",
      tagsPreviewInvalid:
        "თეგი არ შეინახება — გამოიყენეთ მხოლოდ ლათინური ასოები (a–z), ციფრები და ტირე.",
      tagsTierLimit: "თქვენი გეგმით პოსტზე მაქსიმუმ {max} თეგია.",
      posting: "იგზავნება…",
      post: "გამოქვეყნება",
      flaggedAfterPost:
        "პოსტი ავტომატურმა შემოწმებამ მონიშნა. სხვებისთვის დამალულია მოდერაციამდე — თქვენ კვლავ ხედავთ პროფილზე.",
    },
    chrome: {
      backHome: "← მთავარი",
    },
    notFoundPage: {
      title: "გვერდი ვერ მოიძებნა",
      body: "ბმული შეიძლება დაზიანებული იყოს ან გვერდი ამოღებულია.",
      homeLink: "← მთავარი",
    },
    profile: {
      title: "პროფილი",
      premiumBadge: "პრემიუმი",
      loading: "იტვირთება…",
      emailLabel: "ელფოსტა:",
      changePhoto: "პროფილის ფოტოს შეცვლა",
      uploadPhoto: "პროფილის ფოტის ატვირთვა",
      settingsPhotoHint: "პარამეტრები → პროფილის ფოტო",
      postsCount: "პოსტები: {count}",
      statsPosts: "პოსტები",
      statsFollowers: "გამომწერები",
      statsFollowing: "გამოწერები",
      yourPosts: "თქვენი პოსტები",
      emptyPosts: "ჯერ პოსტი არ გაქვთ.",
      emptyPostsCta: "მთავარ ფიდზე",
      avatarLabel: "პროფილი",
      copyProfileLink: "პროფილის ბმულის კოპირება",
      copyProfileLinkSuccess: "ბმული დაკოპირდა.",
      copyProfileLinkFailed: "ბმულის კოპირება ვერ მოხერხდა.",
      editProfile: "პროფილის რედაქტირება",
      closeEdit: "დახურვა",
      followRequests: "გამოწერის მოთხოვნები",
      acceptRequest: "დადასტურება",
      rejectRequest: "უარყოფა",
      noPublicNameYet: "საჯარო სახელი ჯერ არაა",
      publicNamePrivacyHint:
        "ელფოსტა პროფილზე არ ჩანს. დაამატეთ საჯარო სახელი «პროფილის რედაქტირებაში».",
      tabPosts: "პოსტები",
      tabCommented: "კომენტარები",
      sectionCommented: "პოსტები, სადაც დაგიწერით",
      emptyCommented: "ჯერ პოსტზე კომენტარი არ გაქვთ.",
    },
    userProfile: {
      invalidTitle: "პროფილი",
      invalidBody: "ბმული არასწორია.",
      backHome: "← ლენტა",
      title: "მომხმარებლის პროფილი",
      notFound: "პროფილი ვერ მოიძებნა.",
      bannedNotice: "ანგარიში შეზღუდულია.",
      emailHidden: "დამალული",
      memberFallback: "მონაწილე · {short}",
      followersStat: "გამომწერები: {count}",
      followingStat: "გამოწერები: {count}",
      follow: "გამოწერა",
      unfollow: "გამოწერის მოშორება",
      mutualFollowBadge: "ორმხრივი გამოწერა",
      requestFollow: "გამოწერის მოთხოვნა",
      cancelRequest: "მოთხოვნილი",
      followRequestSent: "გამოწერის მოთხოვნა გაიგზავნა.",
      privateAccount: "ეს ანგარიში დახურულია. გამოიწერეთ მათი პოსტების და აქტივობის სანახავად.",
      block: "დაბლოკვა",
      unblock: "განბლოკვა",
      blocked: "მომხმარებელი დაბლოკილია.",
      youBlockedUser: "თქვენ დაბლოკეთ ეს მომხმარებელი.",
      blockedByUser: "ეს მომხმარებელი მიუწვდომელია.",
      report: "შეტყობინება",
      reportPlaceholder: "აღწერეთ პრობლემა (სპამი, შეურაცხყოფა და ა.შ.)",
      reportSubmit: "გაგზავნა",
      reportSent: "შეტყობინება გაიგზავნა. გმადლობთ.",
      online: "ონლაინ",
      lastSeenMinutes: "ბოლოს ნანახი {count} წუთის წინ",
      lastSeenHours: "ბოლოს ნანახი {count} სთ-ის წინ",
      lastSeenDays: "ბოლოს ნანახი {count} დღის წინ",
      lastSeenLongAgo: "ბოლოს ნანახი დიდი ხნის წინ",
      lastSeenNever: "ოფლაინ",
      signInToFollow: "გამოსაწერად შედით.",
      theirPosts: "პოსტები",
      postsHiddenBanned: "შეზღუდული ანგარიშის პოსტები დამალულია.",
      emptyPostsOther: "ამ წევრს ჯერ პოსტი არ აქვს.",
      sectionCommented: "პოსტები, სადაც დაწერა",
      emptyCommentedOther: "ამ წევრს ჯერ პოსტზე კომენტარი არ აქვს.",
    },
    followList: {
      followersHeading: "გამომწერები",
      followingHeading: "გამოწერები",
      backToProfile: "← პროფილზე",
      emptyFollowers: "გამომწერები ჯერ არაა.",
      emptyFollowing: "ჯერ არავისთვის არ გაქვთ გამოწერა.",
      loadMore: "კიდევ ({pageSize} ერთ გვერდზე)",
      restricted: "შეზღუდული",
    },
    messages: {
      title: "მესიჯები",
      introBefore: "ჩატი გახსენით ",
      introAfter: " გვერდიდან (მომხმარებლის შედეგები) ან აირჩიეთ თრედი ქვემოთ.",
      empty: "საუბრები ჯერ არაა.",
    },
    bannedPage: {
      title: "ანგარიში შეზღუდულია",
      intro:
        "სანამ შეზღუდვა არ მოიხსნება, ვერ შეძლებთ პოსტების, კომენტარების, რეაქციების ან შეტყობინებების გაგზავნას.",
      loadingDetails: "დეტალები იტვირთება…",
      whyHeading: "მიზეზი",
      activeSincePrefix: "შეზღუდვა აქტიურია",
      signedInAsPrefix: "შესული ხართ როგორც",
      contactSupport: "თუ ფიქრობთ, რომ ეს შეცდომაა, დაუკავშირდით მხარდაჭერას.",
      signOut: "გამოსვლა",
      legalLink: "იურიდიული",
    },
    chat: {
      chatHeading: "ჩატი",
      invalidPeerId: "მომხმარებლის id არასწორია.",
      backToMessages: "← მესიჯებზე",
      allThreads: "ყველა თრედი",
      messageLabel: "შეტყობინება",
      messagePlaceholder: "დაწერეთ შეტყობინება…",
      send: "გაგზავნა",
      sending: "იგზავნება…",
      cannotMessageSelf: "საკუთარ თავს ვერ მისწერეთ.",
      typing: "წერს…",
      online: "ონლაინ",
    },
    admin: {
      backToOverview: "← ადმინის მიმოხილვა",
      backToHome: "← მთავარი",
      refresh: "განახლება",
      refreshLists: "სიების განახლება",
      overview: {
        title: "ადმინი",
        promoteHintBefore: "საჭიროების შემთხვევაში ადმინის მინიჭება Supabase SQL Editor-ში:",
        linkModeration: "მოდერაცია — პოსტებისა და კომენტარების წაშლა",
        linkUsers: "მომხმარებლები — ანგარიშის შეზღუდვა / მოხსნა",
        linkReports: "რეპორტები — მომხმარებლის რეპორტები პოსტებზე",
        linkUserReports: "მომხმ. რეპორტები — მომხმარებლებს შორის რეპორტები",
        linkBlocks: "ბლოკები — მომხმარებლის ბლოკირების ჟურნალი",
        linkStats: "სტატისტიკა — პლატფორმის სრული რაოდენობები",
        linkAds: "რეკლამა — ლენტის ზედა ზოლი",
        linkAdRequests: "სპონსორი — განაცხადების რიგი",
        linkApi: "API კატალოგი — ცხრილები და RPC (Supabase)",
        countsTitle: "რაოდენობები",
        statProfiles: "პროფილები",
        statPosts: "პოსტები",
        statComments: "კომენტარები",
        statReactions: "რეაქციები",
        linkFeatures: "ფუნქციის ფლაგები — მთავარი ლენტის ნაწილების ჩვენება/დამალვა",
      },
      features: {
        title: "ფუნქციის ფლაგები",
        listHeading: "ფლაგები",
        intro:
          "როცა ფლაგი გამორთულია, შესაბამისი ნაწილი მომხმარებლებს არ ჩანს (მაგ. მთავარი ლენტი). მთავარ გვერდზე არ ჩანს „გამორთულია“ — უბრალოდ არ ჩანს.",
        feedTrendingTab: "Trending ჩანართი (მთავარი ლენტი)",
        feedTrendingTabHelp: "ფარავს „ბოლო / Trending“ გადამრთველს და იძულებით „ბოლო“ სორტს.",
        feedAds: "ლენტის ზედა სპონსორის ზოლი",
        feedAdsHelp: "ფარავს რეკლამის ბლოკს პოსტების სიის ზემოთ (დამოუკიდებელია Ads ადმინის შიგთავსისგან).",
        postComments: "კომენტარები პოსტის ქვეშ",
        postCommentsHelp: "ფარავს კომენტარების თრედს და ფორმას ყველა პოსტზე (ლენტი, პროფილი, ძებნა).",
        navSearch: "ძებნა (ნავიგაციის ბმული)",
        navSearchHelp: "ფარავს „ძებნა“-ს ჰედერში; პირდაპირ /search მთავარზე გადამისამართდება.",
        navMessages: "მესიჯები / ჩატი",
        navMessagesHelp: "ფარავს „მესიჯებს“ ჰედერში და /messages · /messages/:id მთავარზე გადაყავს.",
        homePremiumCta: "პრემიუმის ბლოკი მთავარ ლენტაზე",
        homePremiumCtaHelp: "ფარავს პრემიუმის ბარათს ლენტის ზემოთ (ბმული პარამეტრებზე ან შესვლაზე).",
        unknownKey: "ფლაგი",
        saving: "ინახება…",
        savedToast: "შენახულია.",
      },
      moderation: {
        title: "მოდერაცია",
        hint: "დროშების განხილვა, დადასტურება ან წაშლა (მხოლოდ ადმინი).",
        latest50: "ბოლო 50 თითოეულიდან (დროშები და spam score პირველად).",
        autoFlagHint:
          "ავტომატიკა: თუ 3 სხვადასხვა მომხმარებელი იგივე პოსტს დაარეპორტებს, პოსტი ავტომატურად იფარება საჯარო სიებიდან (როგორც სპამ-დროშა).",
        postsHeading: "პოსტები",
        commentsHeading: "კომენტარები",
        noPosts: "პოსტები არაა.",
        noComments: "კომენტარები არაა.",
        flaggedLabel: "დროშა",
        spamScoreLabel: "Spam score",
        approvePost: "დადასტურება (დროშის მოხსნა)",
        approveComment: "დადასტურება (დროშის მოხსნა)",
        deletePost: "პოსტის წაშლა",
        deleteComment: "კომენტარის წაშლა",
        confirmDeletePost: "წავშალოთ ეს პოსტი? (კომენტარებიც წაიშლება.)",
        confirmDeleteComment: "წავშალოთ ეს კომენტარი?",
        postRefPrefix: "პოსტი",
      },
      reports: {
        title: "რეპორტები",
        intro: "მომხმარებლის რეპორტები პოსტებზე (ახალი პირველი).",
        empty: "რეპორტები ჯერ არაა.",
        dismiss: "დახურვა",
        confirmDismiss: "ამოვშალოთ ეს რეპორტი სიიდან?",
        postIdPrefix: "პოსტი",
      },
      ads: {
        title: "რეკლამა",
        intro: "ლენტის ზედა ზოლი მთავარ გვერდზე. ტექსტი (HTML არა); არასავალდებულო ვიდეო MP4/WebM.",
        testModeBanner:
          "სატესტო რეჟიმი: ფასიანი განთავსება ან გადახდები არ მუშაობს. გამოიყენეთ მხოლოდ შიდა ტესტისთვის, სანამ ოფიციალურ განახლებას არ გამოვაქვეყნებთ.",
        feedTopTitle: "ლენტის ზედა",
        fieldTitle: "სათაური",
        fieldBody: "ტექსტი",
        fieldLinkUrl: "ბმულის URL",
        fieldVideo: "სარეკლამო ვიდეო",
        videoHelp: "არასავალდებულო. MP4 ან WebM, მაქს. 50 მბ. ახალი ატვირთვა ცვლის წინას.",
        pickVideo: "ვიდეოს ატვირთვა",
        pickVideoAria: "სარეკლამო ვიდეოს ფაილის არჩევა",
        removeVideo: "ვიდეოს წაშლა",
        uploadingVideo: "იტვირთება…",
        videoInvalidMime: "დაშვებულია მხოლოდ MP4 ან WebM ვიდეო.",
        videoInvalidSize: "ვიდეო არ უნდა აღემატებოდეს 50 მბ-ს.",
        activeLabel: "აქტიური (ლენტაზე ჩვენება)",
        phTitle: "სათაური (არასავალდებულო)",
        phBody: "მოკლე ტექსტი",
        phUrl: "https://…",
        saving: "ინახება…",
        save: "შენახვა",
        savedToast: "შენახულია.",
        noSlot: "რეკლამის ჩანაწერი არაა (გაუშვით მიგრაციები).",
        linkReviewRequests: "განაცხადების რიგის გახსნა →",
      },
      adRequests: {
        title: "სპონსორის განაცხადები",
        intro:
          "წევრები აქ აგზავნიან ტექსტს ლენტის ზედა ზოლისთვის. დააყენეთ სტატუსი; ცოცხალი ტექსტი მაინც „ლენტის ზედა“-ში იწერება (მხოლოდ ტექსტი, HTML არა).",
        testModeBanner:
          "სატესტო რეჟიმი: განაცხადი არ არის ფასიანი კონტრაქტი. პასუხისას ნათლად უთხარით; საკომერციო პირობები მხოლოდ მომავალი განახლების შემდეგ.",
        empty: "განაცხადები ჯერ არაა.",
        colCreated: "გაგზავნა",
        colApplicant: "ავტორი",
        colTitle: "შემოთავაზებული სათაური",
        colBody: "შემოთავაზებული ტექსტი",
        colLink: "ბმული",
        colStatus: "სტატუსი",
        colNote: "შენიშვნა ავტორისთვის",
        statusPending: "მოლოდინში",
        statusApproved: "დამტკიცებული (სანამ Ads-ში არ გამოქვეყნდება)",
        statusRejected: "უარყოფილი",
        placeholderNote: "არასავალდებულო — ავტორი ხედავს თავისი განაცხადების სიაში.",
        save: "შენახვა",
        saving: "ინახება…",
        savedToast: "განახლდა.",
        viewProfile: "პროფილი",
      },
      stats: {
        title: "სტატისტიკა",
        intro: "სტრიქონების რაოდენობა public ცხრილებში (დაახლოებითი).",
        metricsTitle: "მეტრიკები",
        metricProfiles: "პროფილები",
        metricPosts: "პოსტები",
        metricComments: "კომენტარები",
        metricReactions: "რეაქციები",
        metricReports: "რეპორტები",
        metricTags: "თეგები",
        metricPostTags: "პოსტი–თეგი",
        metricConversations: "DM საუბრები",
        metricChatMessages: "ჩატის შეტყობინებები",
        metricNotifications: "შეტყობინებები",
        metricUserReports: "მომხმ. რეპორტები",
        metricBlocks: "ბლოკები",
        metricFollowRequests: "გამოწერის მოთხოვნები",
        metricAdSlots: "რეკლამის სლოტები",
      },
      userReports: {
        title: "მომხმარებლის რეპორტები",
        intro: "მომხმარებლების მიერ შეტანილი რეპორტები სხვა მომხმარებლებზე (ახალი პირველი).",
        empty: "მომხმარებლის რეპორტები ჯერ არაა.",
        dismiss: "დახურვა",
        confirmDismiss: "ამოვშალოთ ეს მომხმარებლის რეპორტი სიიდან?",
        reporter: "მომჩივანი",
        reported: "მოჩივნილი",
        reportedLabel: "რეპორტირებული",
        viewProfile: "პროფილის ნახვა",
      },
      blocks: {
        title: "ბლოკები",
        intro: "მომხმარებელთა ბლოკები (ახალი პირველი). ბლოკი ავტომატურად წაშლის გამოწერებს ორივე მიმართულებით.",
        empty: "ბლოკები ჯერ არაა.",
        blocker: "ბლოკავს",
        blocked: "დაბლოკილი",
        viewBlocker: "ბლოკავის ნახვა",
        viewBlocked: "დაბლოკილის ნახვა",
      },
      users: {
        title: "მომხმარებლები",
        introBefore:
          "შეზღუდვა ბლოკავს პოსტებს, კომენტარებს, რეაქციებს და ჩატს (მხოლოდ წაკითხვა). არჩევითი მიზეზი ჩანს მომხმარებელზე ",
        introAfter:
          ". Premium ადმინის მიერაა თარიღამდე (გადახდები ჯერ არაა მიბმული).",
        banTitle: "შეზღუდვა {name}",
        reasonLabel: "მიზეზი (არასავალდებულო, მომხმარებელს ეჩვენება)",
        reasonPlaceholder: "მაგ. სპამი, შევიწროება…",
        charCount: "{current}/{max} სიმბოლო",
        confirmBan: "დადასტურება",
        cancel: "გაუქმება",
        colEmail: "ელფოსტა",
        colAdmin: "ადმინი",
        colBanned: "შეზღუდული",
        colReason: "მიზეზი",
        colPremium: "Premium",
        colActions: "მოქმედებები",
        yes: "კი",
        emDash: "—",
        labelModeration: "მოდერაცია",
        labelPremium: "Premium",
        unban: "მოხსნა",
        ban: "შეზღუდვა",
        clearPrem: "Premium გასუფთავება",
        premiumExpired: "ვადაგასული",
        confirmClearPremium: "გავასუფთავოთ Premium ამ მომხმარებლისთვის?",
        confirmUnban: "მოვხსნათ შეზღუდვა ამ მომხმარებელს?",
        banReasonTooLong: "მიზეზი არ უნდა აღემატებოდეს {max} სიმბოლოს.",
        ariaBan: "შეზღუდვა {name}",
        ariaUnban: "შეზღუდვის მოხსნა {name}",
        ariaPrem30: "+30 დღე Premium — {name}",
        ariaPrem365: "+365 დღე Premium — {name}",
        ariaClearPrem: "Premium გასუფთავება — {name}",
      },
      api: {
        title: "API კატალოგი",
        intro:
          "Metafeed უკავშირდება Supabase-ს (PostgREST + Auth + Realtime). ამ რეპოში ცალკე HTTP API არაა — გამოიყენება @supabase/supabase-js RLS-ით. ქვემოთ სახელები არის რეესტრი (src/lib/api). სვეტები და მიგრაციის რიგი: supabase/SCHEMA.md.",
        publicTables: "Public ცხრილები",
        clientRpcs: "RPC ფუნქციები",
        colTable: "public.table",
        colRpc: "public function (RPC)",
        footerNote: "ტრიგერები და შიდა ფუნქციები (მაგ. handle_new_user) აქ არაა — იხილეთ მიგრაციები.",
      },
    },
    notifications: {
      title: "შეტყობინებები",
      loading: "იტვირთება…",
      heroUnreadCount: "{count} წაუკითხავი",
      heroTotalCount: "{count} სულ",
      statsTotal: "სულ",
      statsUnread: "წაუკითხავი",
      statsRead: "წაკითხული",
      markAllRead: "ყველა წავიკითხე",
      markRead: "წავიკითხე",
      empty:
        "შეტყობინებები ჯერ არაა. თქვენი პოსტების კომენტარები, რეაქციები და ახალი გამომწერები აქ გამოჩნდება.",
      backToFeed: "← ლენტა",
      postLabel: "პოსტი",
      viewProfile: "პროფილი",
      msgComment: "{actor} დაკომენტარა თქვენს პოსტზე",
      msgReaction: "{actor} რეაქცია აჩვენა თქვენს პოსტზე",
      msgFollow: "{actor} გამოგიწერათ",
    },
    postCard: {
      deleteConfirm: "წავშალოთ ეს პოსტი?",
      delete: "წაშლა",
      deleting: "…",
      netScoreTitle: "ქულა (მოწონება მინუს არ მოწონება)",
      flaggedAuthorHint: "შემოწმება — საჯარო ლენტაში ხედავთ მხოლოდ თქვენ და მოდერატორები.",
      readMore: "კიდევ",
      showLess: "ჩაკეცვა",
      expandBodyAria: "სრული ტექსტის ჩვენება",
      collapseBodyAria: "ტექსტის ჩაკეცვა",
      edit: "რედაქტირება",
      editSave: "შენახვა",
      editSaving: "ინახება…",
      editCancel: "გაუქმება",
      editSaved: "პოსტი განახლდა.",
      editFlaggedHint: "თქვენი რედაქტირება ავტომატურმა შემოწმებამ მოინიშნა. შეიძლება საჯარო ლენტაში არ გამოჩნდეს განხილვამდე.",
      edited: "(რედაქტირებული)",
    },
    comment: {
      comments: "კომენტარები",
      hideComments: "დამალვა",
      loading: "კომენტარები იტვირთება…",
      addLabel: "კომენტარი",
      placeholder: "დაწერეთ კომენტარი…",
      sending: "იგზავნება…",
      submit: "კომენტარი",
      signInLink: "შესვლა",
      signInSuffix: "კომენტარისთვის.",
      deleteCommentConfirm: "წავშალოთ ეს კომენტარი?",
      delete: "წაშლა",
      commentFailed: "კომენტარის გაგზავნა ვერ მოხერხდა",
      flaggedAfterComment:
        "კომენტარი ავტომატურმა შემოწმებამ მონიშნა. სხვებისთვის შეიძლება არ ჩანდეს მოდერაციამდე.",
    },
    report: {
      report: "რეპორტი",
      whyLabel: "რატომ არეპორტებთ ამ პოსტს?",
      placeholder: "მოკლე მიზეზი…",
      sending: "იგზავნება…",
      submit: "რეპორტის გაგზავნა",
      cancel: "გაუქმება",
      success: "რეპორტი გაიგზავნა. მადლობა.",
    },
    reactions: {
      ariaLabel: "რეაქციები",
      thumbsUp: "მოწონება",
      thumbsDown: "არ მოწონება",
      signInToReact: "რეაქციისთვის შედით",
    },
    legal: {
      navAria: "იურიდიული ნავიგაცია",
      title: "იურიდიული ინფორმაცია",
      lastUpdated: "ბოლო განახლება: 2026-04-01 · Metafeed v1 (MVP)",
    },
    sponsored: {
      title: "სპონსორის განთავსება",
      testModeBanner:
        "სატესტო რეჟიმი: ჯერ არავის ვთავაზობთ ფასიან განთავსებას ან ფულს. ფუნქციები შეიძლება შეიცვალოს — საკომერციო პირობებს მხოლოდ პროდუქტის განახლების შემდეგ ელოდეთ.",
      intro:
        "მთავარ ლენტაზე „სპონსორი“ აქ მოგიყვანთ. გაგზავნეთ სათაური, მოკლე ტექსტი და არასავალდებულო URL. გუნდი განიხილავს; საჭიროების შემთხვევაში დაგიკავშირდებით ელფოსტით.",
      howItWorksTitle: "როგორ მუშაობს",
      howItWorksBody:
        "1) აქ აგზავნით შემოთავაზებულ ტექსტს. 2) ვაკეთებთ გადაწყვეტილებას (მოლოდინში → დამტკიცება ან უარი). 3) დამტკიცების შემთხვევაშიც კი საბოლოო ტექსტს ადმინის Ads ხელს უწერს სანამ ცოცხლად გამოჩნდება. ეს ჯერ არ არის მყისიერი self-serve გადახდა.",
      formTitle: "განაცხადის გაგზავნა",
      fieldTitle: "შემოთავაზებული სათაური (არასავალდებულო)",
      fieldTitleHint: "მოკლე ხაზი; თუ ტექსტი საკმარისია, შეიძლება ცარიელი დატოვოთ.",
      fieldBody: "შემოთავაზებული ტექსტი",
      fieldBodyHint: "მინიმუმ 10 სიმბოლო. მხოლოდ ტექსტი.",
      fieldLink: "დანიშნულების URL (არასავალდებულო)",
      fieldLinkHint: "სადაც მომხმარებელი მიდის სათაურზე დაჭერისას (https://…).",
      submit: "განაცხადის გაგზავნა",
      submitting: "იგზავნება…",
      successToast: "მივიღეთ. სტატუსს ქვემოთ ნახავთ.",
      signInTitle: "შედით სისტემაში",
      signInBody: "განაცხადის გასაგზავნად საჭიროა ანგარიში.",
      signInLink: "შესვლა ან რეგისტრაცია",
      myRequestsTitle: "თქვენი განაცხადები",
      emptyMine: "ჯერ განაცხადი არ გაგიგზავნიათ.",
      statusPending: "განხილვაში",
      statusApproved: "დამტკიცებული (სანამ Ads-ში არ გამოქვეყნდება)",
      statusRejected: "უარყოფილი",
      adminNoteFromTeam: "შენიშვნა გუნდიდან",
    },
    security: {
      navAria: "უსაფრთხოების ნავიგაცია",
      title: "უსაფრთხოება",
      intro: "როგორ უდგება Metafeed უსაფრთხოებას MVP-ში (მოკლედ).",
      sectionAuth: "ანგარიში და პაროლები",
      sectionAuthLi1:
        "ახალი პაროლი და ცვლილება — მინიმუმ 8 სიმბოლო (აპლიკაციაში; Supabase Auth ინახავს უსაფრთხოდ).",
      sectionAuthLi2: "გამოიყენეთ უნიკალური პაროლი; საერთო მოწყობილობებზე გამოდით",
      sectionAuthLi2End: " ბმულით.",
      sectionData: "მონაცემებზე წვდომა",
      sectionDataP1:
        "ბექენდი იყენებს RLS-ს ცხრილებზე — კლიენტი ხედავს მხოლოდ ნებადართულ მონაცემს.",
      sectionDataP2:
        "API გასაღება ბრაუზერში — anon (RLS-ით შეზღუდული). service_role არ ჩასვათ ფრონტში.",
      sectionTransport: "ტრანსპორტი და ჰოსტინგი",
      sectionTransportP:
        "პროდაქშენში გამოიყენეთ HTTPS. ჰოსტინგზე (მაგ. Vercel) შეიძლება უსაფრთხოების ჰედერები.",
      sectionPrivacy: "კონფიდენციალურობის კონტროლი",
      privacyIntro: "ელფოსტით ძიების ხილვადობა:",
      privacySettingsPrivacy: "პარამეტრები → პირადულობა",
      privacySeeAlso: "იხილეთ ასევე",
    },
  },
  seo: {
    announcer: "გადასვლა: {title}",
    defaultDescription:
      "Metafeed (metafeed.it.com) — სოციალური ლენტა: პოსტები, რეაქციები, კომენტარები, თეგები, ძიება და მესიჯები.",
    searchWithQueryTitle: "ძიება: {q}",
    searchWithQueryDescription:
      "შედეგები „{q}“-ისთვის Metafeed-ზე — პოსტები და პროფილები.",
    admin: {
      title: "ადმინისტრაცია",
      description: "Metafeed-ის ადმინისტრაციული ინსტრუმენტები.",
    },
    routes: {
      home: {
        title: "მთავარი",
        description:
          "Metafeed (metafeed.it.com) — სოციალური ლენტა: პოსტები, რეაქციები, კომენტარები, თეგები, ძიება და მესიჯები.",
      },
      chatPeer: {
        title: "ჩატი",
        description: "პირდაპირი მესიჯების თრედი Metafeed-ზე.",
      },
      messages: {
        title: "მესიჯები",
        description: "თქვენი საუბრები Metafeed-ზე.",
      },
      notifications: {
        title: "შეტყობინებები",
        description: "თქვენი შეტყობინებები Metafeed-ზე.",
      },
      profile: {
        title: "პროფილი",
        description: "თქვენი პროფილი და პოსტები Metafeed-ზე.",
      },
      userProfile: {
        title: "მომხმარებლის პროფილი",
        description: "მომხმარებლის პროფილი და პოსტები Metafeed-ზე.",
      },
      userFollowers: {
        title: "გამომწერები",
        description: "ვინ არის გამოწერილი ამ მომხმარებელზე Metafeed-ზე.",
      },
      userFollowing: {
        title: "გამოწერები",
        description: "რომელ ანგარიშებს უწერს გამომწერებას ეს მომხმარებელი Metafeed-ზე.",
      },
      settings: {
        title: "პარამეტრები",
        description: "ანგარიშისა და პირადულობის პარამეტრები Metafeed-ზე.",
      },
      forgotPassword: {
        title: "პაროლის აღდგენა",
        description: "პაროლის აღდგენის ელფოსტის მოთხოვნა Metafeed-ზე.",
      },
      resetPassword: {
        title: "ახალი პაროლი",
        description: "ახალი პაროლის არჩევა აღდგენის ბმულის შემდეგ.",
      },
      login: {
        title: "შესვლა",
        description: "Metafeed-ზე ავტორიზაცია.",
      },
      banned: {
        title: "ანგარიში შეზღუდულია",
        description: "ანგარიშის სტატუსი Metafeed-ზე.",
      },
      search: {
        title: "ძიება",
        description: "პოსტების ძიება და პროფილების პოვნა Metafeed-ზე.",
      },
      legal: {
        title: "წესები და კონფიდენციალურობა",
        description: "მომსახურების წესები და კონფიდენციალურობა Metafeed-ზე.",
      },
      sponsored: {
        title: "სპონსორის განთავსება",
        description: "ლენტის ზედა სპონსორის ზოლისთვის განაცხადი Metafeed-ზე.",
      },
      security: {
        title: "უსაფრთხოება",
        description: "რჩევები ანგარიშის უსაფრთხოებისთვის Metafeed-ზე.",
      },
      notFound: {
        title: "გვერდი ვერ მოიძებნა",
        description: "ეს გვერდი არ არსებობს ან გადატანილია Metafeed-ზე.",
      },
    },
  },
};

const ru: Bundle = {
  layout: {
    skipToMain: "Перейти к основному содержимому",
    brandAria: "Metafeed — главная",
    navAria: "Основная навигация",
    nav: {
      home: "Главная",
      search: "Поиск",
      login: "Вход",
      messages: "Сообщения",
      notifications: "Уведомления",
      profile: "Профиль",
      settings: "Настройки",
      premium: "Премиум",
      admin: "Админ",
      adminMenuAria: "Страницы администратора",
      adminOverview: "Обзор",
      users: "Пользователи",
      moderation: "Модерация",
      reports: "Жалобы",
      userReports: "Жалобы на юзеров",
      blocks: "Блокировки",
      stats: "Статистика",
      ads: "Реклама",
      features: "Флаги",
      api: "API",
      security: "Безопасность",
      legal: "Правовая информация",
    },
    unreadBadge: "{count} непрочитанных",
    toastRegionAria: "Уведомления",
    toastDismiss: "Закрыть",
    mobileMenuOpen: "Открыть меню",
    mobileMenuClose: "Закрыть меню",
  },
  errors: {
    routeTitle: "Что-то пошло не так",
    routeBody: "В этой части страницы произошла ошибка. Попробуйте снова или перейдите на главную.",
    tryAgain: "Повторить",
    homeLink: "← Главная",
    appBoundaryBody: "Приложение столкнулось с неожиданной ошибкой. Попробуйте перезагрузить страницу.",
    reload: "Перезагрузить",
  },
  theme: {
    auto: "Авто",
    light: "Светлая",
    dark: "Тёмная",
    ariaGroup: "Цветовая тема",
  },
  settings: {
    pageEyebrow: "Центр аккаунта",
    pageSubtitle: "Здесь управляются внешний вид Metafeed, приватность и ключевые параметры аккаунта на этом устройстве.",
    pageMetaAria: "Сводка настроек",
    language: "Язык",
    languageHelp: "Язык интерфейса (сохраняется на этом устройстве).",
    languageEn: "Английский",
    languageKa: "Грузинский",
    languageRu: "Русский",
    appearance: "Оформление",
    appearanceHint: "Цветовая тема (сохраняется на этом устройстве).",
    profileAbout: "Имя и описание",
    profileAboutHint:
      "Отображается в публичном профиле. Оставьте пустым — в шапке будет только email.",
    profileAboutLoading: "Загрузка…",
    displayName: "Отображаемое имя",
    displayNamePlaceholder: "Необязательно",
    displayNameTooLong: "Имя не длиннее {max} символов.",
    bio: "О себе",
    bioPlaceholder: "Краткое описание (необязательно)",
    bioTooLong: "Описание не длиннее {max} символов.",
    profileAboutSave: "Сохранить имя и описание",
    profileAboutSaving: "Сохранение…",
    profileAboutSaved: "Данные профиля сохранены.",
    account: "Аккаунт",
    signedInAs: "Вы вошли как",
    premium: "Премиум",
    premiumLoading: "…",
    premiumActiveUntil: "активен до",
    premiumNone: "нет",
    premiumBillingTitle: "Покупка Premium",
    premiumCheckoutHint:
      "Продление Premium (+30 дней) через безопасную оплату, когда на сервере включён биллинг (Stripe).",
    premiumCheckoutSubscribe: "Перейти к оплате",
    premiumCheckoutBusy: "Открывается оплата…",
    premiumCheckoutSuccess: "Платёж получен. Статус Premium обновится через мгновение.",
    premiumCheckoutCancelled: "Оплата отменена.",
    premiumCheckoutDisabledHint: "Подробности настройки: README → Stripe Premium.",
    premiumPlanSectionTitle: "План Premium (черновик)",
    premiumPlanLead:
      "Premium даёт больше места для текста, тегов и видео. Ниже — что планируем до запуска оплаты; цифры могут уточняться к релизу.",
    premiumPlanBenefitsTitle: "Что входит в Premium",
    premiumPlanBenefit1: "Длиннее посты — до 5 000 символов (бесплатно: 1 000).",
    premiumPlanBenefit2: "Больше тегов — до 8 на пост (бесплатно: 4).",
    premiumPlanBenefit3: "Видео в ленте — MP4/WebM (на бесплатном уровне недоступно).",
    premiumPlanBenefit4: "Запас под новые функции по мере развития Metafeed.",
    premiumPlanFutureTitle: "На рассмотрении (без обязательств)",
    premiumPlanFutureBody:
      "Мы рассматриваем дополнительные возможности для Premium — например опциональное продвижение постов или бизнеса в ленте. Стоимость может зависеть от размера слота, срока, формата и юридических требований в вашем регионе. Пока это не реализовано и не оценено; если запустим, заранее опубликуем условия и цены.",
    premiumPlanDuration:
      "Оплата: каждая успешная оплата в Stripe продлевает Premium на 30 дней. Можно покупать снова до истечения срока.",
    premiumPlanPrice:
      "Цена: пока не финальна — точная сумма и валюта будут на экране checkout до оплаты. Списания не будет, пока вы не подтвердите в Stripe.",
    premiumPlanWaitNote:
      "Мы подключаем Stripe и финальные цены. Пока оплата здесь не включена, Premium может выдать админ. Кнопка «Перейти к оплате» появится, когда включим биллинг.",
    privacy: "Конфиденциальность",
    privacyHint:
      "Управляйте видимостью профиля при поиске по email на странице «Поиск».",
    privacyLoading: "Загрузка…",
    privateProfileCheckbox: "Закрытый профиль",
    privateProfileHint: "Если включено, только одобренные подписчики смогут видеть ваши посты, bio и статистику. Остальным нужно будет отправить запрос на подписку.",
    privacyCheckbox: "Показывать мой профиль в результатах поиска по email",
    privacySave: "Сохранить настройки",
    privacySaving: "Сохранение…",
    privacySaved: "Настройки конфиденциальности сохранены.",
    notificationsSection: "Уведомления",
    notificationsHint: "Выберите, какие уведомления в приложении получать (иконка колокольчика).",
    notificationsLoading: "Загрузка…",
    notifyOnComment: "Комментарии к моим постам",
    notifyOnReaction: "Реакции на мои посты",
    notifyOnFollow: "Новые подписчики",
    notificationsSave: "Сохранить настройки уведомлений",
    notificationsSaving: "Сохранение…",
    notificationsSaved: "Настройки уведомлений сохранены.",
    changePassword: "Смена пароля",
    passwordMinHint: "Не менее {min} символов.",
    newPassword: "Новый пароль",
    updatePassword: "Обновить пароль",
    updatingPassword: "Обновление…",
    passwordUpdated: "Пароль обновлён.",
    passwordTooShort: "Пароль должен содержать не менее {min} символов.",
    session: "Сессия",
    sessionHint: "Завершите текущую сессию на этом устройстве, когда закончите работу.",
    logOut: "Выйти",
    deleteAccount: "Удаление аккаунта",
    deleteAccountHint:
      "Безвозвратно удаляет вход, профиль, посты, комментарии, реакции, уведомления, сообщения и загруженные изображения. Беседы с вашим участием удаляются для обоих собеседников.",
    deleteAccountTypeDelete: "Введите DELETE в поле ниже для подтверждения.",
    deleteAccountConfirmPlaceholder: "DELETE",
    deleteAccountSubmit: "Удалить аккаунт навсегда",
    deleteAccountDeleting: "Удаление…",
    deleteAccountFailed: "Не удалось удалить аккаунт: {message}",
    avatarSectionTitle: "Фото профиля",
    avatarFormatHint: "JPEG, PNG, WebP или GIF — макс. 2 МБ.",
    avatarChooseAria: "Выбрать фото профиля",
    avatarUpload: "Загрузить фото",
    avatarRemove: "Удалить фото",
    avatarUpdated: "Фото профиля обновлено.",
    avatarRemoved: "Фото профиля удалено.",
    avatarRemoveConfirm: "Удалить фото профиля?",
    avatarUserFallback: "Пользователь",
    termsLink: "Условия и конфиденциальность",
  },
  pages: {
    common: {
      loading: "Загрузка…",
      scaffoldInProgress: "В разработке",
      scaffoldInProgressHint: "Черновик — в разработке",
    },
    home: {
      feedSortAria: "Порядок ленты",
      latest: "Свежие",
      trending: "В тренде",
      trendingTagHint:
        "«В тренде» считается для всей ленты. Для тега показаны свежие посты.",
      filterTag: "Фильтр: тег {tag}",
      clear: "Сбросить",
      invalidTag: "Некорректный тег в URL. Допустимы буквы, цифры и дефис.",
      loadingPosts: "Загрузка постов…",
      emptyTagged: "Постов с этим тегом пока нет.",
      emptyFeed: "Пока нет постов. Создайте первый.",
      loadMore: "Ещё (по {pageSize} на страницу)",
      feedAdSponsored: "Реклама",
      feedAdSponsoredContent: "Рекламный контент",
      feedAdExternalCta: "Перейти по ссылке",
      feedAdVideoFallback: "Ваш браузер не может воспроизвести это видео.",
      premiumCtaTitle: "Premium",
      premiumCtaBody: "Длиннее посты, больше тегов, видео и другое. Управление в Настройках.",
      premiumCtaBodyNoBilling:
        "Длиннее посты, больше тегов и видео. Оплата скоро — откройте Настройки → Аккаунт: там черновик плана, цены и сроки.",
      premiumCtaLinkSettings: "Открыть настройки",
      premiumCtaLinkLogin: "Войти",
      sidebarTrendingTitle: "Популярные теги",
      sidebarTrendingAria: "Популярные теги и быстрые ссылки",
      sidebarLandmarkAria: "Популярные теги и Premium",
      sidebarTrendingEmpty: "На этой неделе популярных тегов нет.",
      composeExpandAria: "Открыть форму поста",
      composeCollapse: "Свернуть",
    },
    login: {
      titleSignIn: "Вход",
      titleSignUp: "Создать аккаунт",
      termsPrefix: "Продолжая, вы соглашаетесь с",
      modeSignIn: "Вход",
      modeSignUp: "Регистрация",
      email: "Email",
      password: "Пароль",
      invalidCredentials: "Неверный email или пароль.",
      confirmPassword: "Подтвердите пароль",
      passwordsDoNotMatch: "Пароли не совпадают.",
      checkEmailForConfirmation:
        "Проверьте почту, подтвердите аккаунт и затем войдите в систему.",
      emailAlreadyRegisteredHint:
        "Если этот email уже зарегистрирован, используйте вход или восстановление пароля.",
      confirmationPendingTitle:
        "Регистрация создана. Подтвердите email, чтобы продолжить.",
      confirmationPendingBody:
        "Мы отправили ссылку подтверждения на {email}. Откройте письмо, подтвердите аккаунт и вернитесь для входа.",
      backToSignIn: "Вернуться ко входу",
      resendCta: "Отправить письмо подтверждения снова",
      resendSending: "Отправка…",
      resendCooldown: "Повтор через {seconds}с",
      resendSuccess: "Письмо подтверждения отправлено повторно. Проверьте почту.",
      submitWait: "Подождите…",
      submitSignIn: "Войти",
      submitSignUp: "Зарегистрироваться",
      forgotPasswordLink: "Забыли пароль?",
    },
    forgotPassword: {
      title: "Сброс пароля",
      intro:
        "Введите email аккаунта. Если он существует, мы отправим ссылку для нового пароля.",
      emailLabel: "Email",
      submit: "Отправить ссылку",
      sending: "Отправка…",
      success:
        "Если аккаунт существует, мы отправили письмо со ссылкой. Проверьте входящие и спам.",
      backToLogin: "← Назад ко входу",
    },
    resetPassword: {
      title: "Новый пароль",
      intro: "Задайте новый пароль для аккаунта.",
      passwordLabel: "Новый пароль",
      confirmLabel: "Подтверждение",
      submit: "Обновить пароль",
      submitWait: "Обновление…",
      success: "Пароль обновлён.",
      mismatch: "Пароли не совпадают.",
      invalidOrExpired:
        "Ссылка недействительна или устарела. Запросите новую на странице входа.",
      backToLogin: "← Назад ко входу",
    },
    search: {
      title: "Поиск",
      queryLabel: "Запрос",
      placeholder: "Посты (текст) или пользователи (email)…",
      submit: "Найти",
      clear: "Очистить",
      hintMinChars: "Введите не менее 2 символов (после обрезки пробелов).",
      introHint:
        "Ищите по тексту постов и по email пользователей. Результаты появятся после отправки формы.",
      searching: "Поиск…",
      usersWithCount: "Пользователи ({count})",
      usersPrivacyNote:
        "Пользователи, отключившие поиск по email в Настройках → Конфиденциальность, здесь не отображаются (кроме себя).",
      noProfiles: "Подходящих профилей нет.",
      message: "Написать",
      viewProfile: "Профиль",
      postsWithCount: "Посты ({count})",
      noPosts: "Подходящих постов нет.",
      rankingHint:
        "Результаты упорядочены по релевантности (полнотекстовое совпадение, позиция в тексте) и дате. Помеченные посты исключены.",
      noResultsAny:
        "Нет постов и пользователей по запросу «{q}». Попробуйте другие слова или проверьте написание email.",
      noResultsTips:
        "Подсказка: попробуйте одно точное ключевое слово, уберите лишние символы или ищите по полному email.",
      resultsRegionLabel: "Результаты поиска",
      resultsSummary:
        "Результаты по «{q}»: всего {total} ({posts} постов, {users} пользователей).",
      errorTitle: "Не удалось выполнить поиск.",
      errorHint: "Проверьте соединение и попробуйте снова.",
      retry: "Повторить",
    },
    postForm: {
      signInPrompt: "Войдите, чтобы публиковать посты.",
      signInLink: "Вход",
      banned: "Сейчас вы не можете создавать посты.",
      bodyLength: "Текст: от 1 до {max} символов.",
      bodyTierLimit: "На вашем тарифе до {max} символов в посте.",
      createFailed: "Не удалось создать пост",
      label: "Новый пост",
      placeholder: "Напишите что-нибудь…",
      attachAria: "Прикрепить фото или видео",
      attachImageAria: "Прикрепить фото",
      addMedia: "Добавить фото или видео",
      addMediaImage: "Добавить фото",
      removeMedia: "Убрать вложение",
      mediaInvalidType: "Выберите изображение (JPEG, PNG, WebP, GIF) или видео (MP4, WebM).",
      videoRequiresPremium: "Видео в постах доступны с Premium.",
      videoDailyLimitFree:
        "Сегодня вы уже опубликовали пост с видео. На бесплатном плане — одно видео в сутки (UTC). Попробуйте завтра или оформите Premium.",
      videoFreeTierDailyHint:
        "Бесплатный план: одно видео за календарный день (UTC). Premium — больше в любое время.",
      videoDailyLimitFreeHint:
        "Бесплатное видео на сегодня уже использовано (UTC). Можно добавить изображение или попробовать завтра.",
      previewAlt: "Предпросмотр вложения",
      tagsLabel: "Теги (необязательно)",
      tagsPlaceholder: "напр. news, dev, release-notes",
      tagsHint: "Через запятую. Строчные буквы, цифры, дефис. До {max} тегов.",
      tagsPreviewLabel: "Будут сохранены как:",
      tagsPreviewInvalid:
        "Теги не сохранятся — только латиница (a–z), цифры и дефис.",
      tagsTierLimit: "На вашем тарифе не больше {max} тегов на пост.",
      posting: "Публикация…",
      post: "Опубликовать",
      flaggedAfterPost:
        "Пост отмечен автоматической проверкой. Для других он скрыт до модерации — вы всё ещё видите его в профиле.",
    },
    chrome: {
      backHome: "← Главная",
    },
    notFoundPage: {
      title: "Страница не найдена",
      body: "Ссылка могла устареть или страница удалена.",
      homeLink: "← Главная",
    },
    profile: {
      title: "Профиль",
      premiumBadge: "Премиум",
      loading: "Загрузка…",
      emailLabel: "Email:",
      changePhoto: "Сменить фото профиля",
      uploadPhoto: "Загрузить фото профиля",
      settingsPhotoHint: "Настройки → Фото профиля",
      postsCount: "Посты: {count}",
      statsPosts: "Посты",
      statsFollowers: "Подписчики",
      statsFollowing: "Подписки",
      yourPosts: "Ваши посты",
      emptyPosts: "Вы ещё ничего не опубликовали.",
      emptyPostsCta: "На главную ленту",
      avatarLabel: "Профиль",
      copyProfileLink: "Копировать ссылку на профиль",
      copyProfileLinkSuccess: "Ссылка скопирована.",
      copyProfileLinkFailed: "Не удалось скопировать ссылку.",
      editProfile: "Редактировать профиль",
      closeEdit: "Закрыть",
      followRequests: "Запросы на подписку",
      acceptRequest: "Принять",
      rejectRequest: "Отклонить",
      noPublicNameYet: "Публичное имя не задано",
      publicNamePrivacyHint:
        "Email на профиле не показывается. Добавьте имя в «Редактировать профиль».",
      tabPosts: "Посты",
      tabCommented: "Комментарии",
      sectionCommented: "Посты, где вы оставили комментарии",
      emptyCommented: "Вы ещё не комментировали посты.",
    },
    userProfile: {
      invalidTitle: "Профиль",
      invalidBody: "Некорректная ссылка на пользователя.",
      backHome: "← Лента",
      title: "Профиль участника",
      notFound: "Профиль не найден.",
      bannedNotice: "Аккаунт ограничен.",
      emailHidden: "Скрыто",
      memberFallback: "Участник · {short}",
      followersStat: "Подписчики: {count}",
      followingStat: "Подписки: {count}",
      follow: "Подписаться",
      unfollow: "Отписаться",
      mutualFollowBadge: "Взаимная подписка",
      requestFollow: "Запросить подписку",
      cancelRequest: "Запрошено",
      followRequestSent: "Запрос на подписку отправлен.",
      privateAccount: "Это закрытый аккаунт. Подпишитесь, чтобы видеть посты и активность.",
      block: "Заблокировать",
      unblock: "Разблокировать",
      blocked: "Пользователь заблокирован.",
      youBlockedUser: "Вы заблокировали этого пользователя.",
      blockedByUser: "Этот пользователь недоступен.",
      report: "Пожаловаться",
      reportPlaceholder: "Опишите проблему (спам, оскорбления и т.д.)",
      reportSubmit: "Отправить жалобу",
      reportSent: "Жалоба отправлена. Спасибо.",
      online: "В сети",
      lastSeenMinutes: "Был(а) {count} мин назад",
      lastSeenHours: "Был(а) {count}ч назад",
      lastSeenDays: "Был(а) {count}д назад",
      lastSeenLongAgo: "Давно не был(а) в сети",
      lastSeenNever: "Не в сети",
      signInToFollow: "Войдите, чтобы подписаться.",
      theirPosts: "Посты",
      postsHiddenBanned: "Посты скрыты для ограниченных аккаунтов.",
      emptyPostsOther: "У этого участника пока нет постов.",
      sectionCommented: "Посты с комментариями участника",
      emptyCommentedOther: "Этот участник ещё не комментировал посты.",
    },
    followList: {
      followersHeading: "Подписчики",
      followingHeading: "Подписки",
      backToProfile: "← К профилю",
      emptyFollowers: "Подписчиков пока нет.",
      emptyFollowing: "Пока ни на кого не подписаны.",
      loadMore: "Загрузить ещё (по {pageSize})",
      restricted: "Ограничен",
    },
    messages: {
      title: "Сообщения",
      introBefore: "Откройте чат из ",
      introAfter: " (результаты пользователей) или выберите диалог ниже.",
      empty: "Пока нет переписок.",
    },
    bannedPage: {
      title: "Аккаунт ограничен",
      intro:
        "Пока ограничение действует, вы не можете публиковать посты, комментировать, ставить реакции и отправлять сообщения.",
      loadingDetails: "Загрузка сведений…",
      whyHeading: "Причина",
      activeSincePrefix: "Ограничение действует с",
      signedInAsPrefix: "Вы вошли как",
      contactSupport: "Если считаете, что это ошибка, свяжитесь с поддержкой.",
      signOut: "Выйти",
      legalLink: "Правовая информация",
    },
    chat: {
      chatHeading: "Чат",
      invalidPeerId: "Некорректный id пользователя.",
      backToMessages: "← К сообщениям",
      allThreads: "Все диалоги",
      messageLabel: "Сообщение",
      messagePlaceholder: "Напишите сообщение…",
      send: "Отправить",
      sending: "Отправка…",
      cannotMessageSelf: "Нельзя написать самому себе.",
      typing: "печатает…",
      online: "онлайн",
    },
    admin: {
      backToOverview: "← К обзору админки",
      backToHome: "← Главная",
      refresh: "Обновить",
      refreshLists: "Обновить списки",
      overview: {
        title: "Админка",
        promoteHintBefore: "При необходимости назначьте админов в Supabase SQL Editor:",
        linkModeration: "Модерация — удаление постов и комментариев",
        linkUsers: "Пользователи — бан / разбан",
        linkReports: "Жалобы — жалобы на посты",
        linkUserReports: "Жалобы на юзеров — между пользователями",
        linkBlocks: "Блокировки — журнал блокировок",
        linkStats: "Статистика — счётчики по платформе",
        linkAds: "Реклама — верхняя полоса в ленте",
        linkAdRequests: "Спонсорство — очередь заявок",
        linkApi: "Каталог API — таблицы и RPC (Supabase)",
        countsTitle: "Счётчики",
        statProfiles: "Профили",
        statPosts: "Посты",
        statComments: "Комментарии",
        statReactions: "Реакции",
        linkFeatures: "Флаги функций — показ/скрытие частей ленты",
      },
      features: {
        title: "Флаги функций",
        listHeading: "Флаги",
        intro:
          "Если флаг выключен, соответствующая часть сайта скрыта для пользователей (например, лента). На главной нет текста «отключено» — блок просто не показывается.",
        feedTrendingTab: "Вкладка Trending (лента)",
        feedTrendingTabHelp: "Скрывает переключатель «Последние / Trending» и принудительно сортирует по последним.",
        feedAds: "Верхний спонсорский блок в ленте",
        feedAdsHelp: "Скрывает рекламный блок над списком постов (независимо от содержимого в Ads).",
        postComments: "Комментарии под постами",
        postCommentsHelp: "Скрывает ветку комментариев и форму на каждой карточке (лента, профиль, поиск).",
        navSearch: "Поиск (ссылка в шапке)",
        navSearchHelp: "Скрывает пункт «Поиск»; прямой заход на /search ведёт на главную.",
        navMessages: "Сообщения / чат",
        navMessagesHelp: "Скрывает «Сообщения» в шапке и блокирует /messages и /messages/:id (редирект на главную).",
        homePremiumCta: "Блок Premium на главной ленте",
        homePremiumCtaHelp: "Скрывает карточку Premium над лентой (ссылка в Настройки или Вход).",
        unknownKey: "Флаг",
        saving: "Сохранение…",
        savedToast: "Сохранено.",
      },
      moderation: {
        title: "Модерация",
        hint: "Просмотр помеченного контента, одобрение или удаление (только админ).",
        latest50: "По 50 последних каждого (сначала помеченные и с высоким spam score).",
        autoFlagHint:
          "Автоматика: если 3 разных пользователя пожалуются на один пост, он помечается и скрывается из общих списков (как спам).",
        postsHeading: "Посты",
        commentsHeading: "Комментарии",
        noPosts: "Нет постов.",
        noComments: "Нет комментариев.",
        flaggedLabel: "Помечено",
        spamScoreLabel: "Spam score",
        approvePost: "Одобрить (снять флаг)",
        approveComment: "Одобрить (снять флаг)",
        deletePost: "Удалить пост",
        deleteComment: "Удалить комментарий",
        confirmDeletePost: "Удалить этот пост? (Комментарии будут удалены вместе с ним.)",
        confirmDeleteComment: "Удалить этот комментарий?",
        postRefPrefix: "пост",
      },
      reports: {
        title: "Жалобы",
        intro: "Жалобы пользователей на посты (сначала новые).",
        empty: "Жалоб пока нет.",
        dismiss: "Снять",
        confirmDismiss: "Убрать эту жалобу из списка?",
        postIdPrefix: "пост",
      },
      ads: {
        title: "Реклама",
        intro: "Верхняя полоса на главной ленте. Только текст (без HTML); опционально рекламное видео (MP4/WebM).",
        testModeBanner:
          "Тестовый режим: платные размещения и выплаты не активны. Используйте только для внутренних тестов до публикации производственного обновления.",
        feedTopTitle: "Верх ленты",
        fieldTitle: "Заголовок",
        fieldBody: "Текст",
        fieldLinkUrl: "URL ссылки",
        fieldVideo: "Рекламное видео",
        videoHelp: "Необязательно. MP4 или WebM, макс. 50 МБ. Новая загрузка заменяет предыдущую.",
        pickVideo: "Загрузить видео",
        pickVideoAria: "Выбрать файл рекламного видео",
        removeVideo: "Удалить видео",
        uploadingVideo: "Загрузка…",
        videoInvalidMime: "Разрешены только видео MP4 или WebM.",
        videoInvalidSize: "Видео должно быть не больше 50 МБ.",
        activeLabel: "Активно (показывать в ленте)",
        phTitle: "Заголовок (необязательно)",
        phBody: "Короткий текст",
        phUrl: "https://…",
        saving: "Сохранение…",
        save: "Сохранить",
        savedToast: "Сохранено.",
        noSlot: "Нет строки слота (выполните миграции).",
        linkReviewRequests: "Открыть очередь заявок →",
      },
      adRequests: {
        title: "Заявки на спонсорский блок",
        intro:
          "Участники присылают текст для верхней полосы ленты. Меняйте статус здесь; публикация по-прежнему в «Верх ленты» (только текст, без HTML).",
        testModeBanner:
          "Тестовый режим: заявка не является платным договором. Пишите ясно в ответах; коммерческие условия — только после будущего обновления.",
        empty: "Заявок пока нет.",
        colCreated: "Отправлено",
        colApplicant: "Заявитель",
        colTitle: "Предлагаемый заголовок",
        colBody: "Предлагаемый текст",
        colLink: "Ссылка",
        colStatus: "Статус",
        colNote: "Заметка для заявителя",
        statusPending: "На рассмотрении",
        statusApproved: "Одобрено (ещё не в ленте, пока не опубликовано в Ads)",
        statusRejected: "Отклонено",
        placeholderNote: "Необязательно — заявитель увидит в списке своих заявок.",
        save: "Сохранить",
        saving: "Сохранение…",
        savedToast: "Обновлено.",
        viewProfile: "Профиль",
      },
      stats: {
        title: "Статистика",
        intro: "Число строк в public-таблицах (приблизительный размер платформы).",
        metricsTitle: "Метрики",
        metricProfiles: "Профили",
        metricPosts: "Посты",
        metricComments: "Комментарии",
        metricReactions: "Реакции",
        metricReports: "Жалобы",
        metricTags: "Теги",
        metricPostTags: "Связи пост–тег",
        metricConversations: "Диалоги DM",
        metricChatMessages: "Сообщения чата",
        metricNotifications: "Уведомления",
        metricUserReports: "Жалобы на юзеров",
        metricBlocks: "Блокировки",
        metricFollowRequests: "Запросы на подписку",
        metricAdSlots: "Слоты рекламы",
      },
      userReports: {
        title: "Жалобы на пользователей",
        intro: "Жалобы пользователей на других пользователей (сначала новые).",
        empty: "Жалоб на пользователей пока нет.",
        dismiss: "Снять",
        confirmDismiss: "Убрать эту жалобу из списка?",
        reporter: "Жалобщик",
        reported: "Обвиняемый",
        reportedLabel: "пожаловались",
        viewProfile: "Профиль",
      },
      blocks: {
        title: "Блокировки",
        intro: "Блокировки между пользователями (сначала новые). Блок автоматически удаляет подписки в обе стороны.",
        empty: "Блокировок пока нет.",
        blocker: "Заблокировал",
        blocked: "Заблокирован",
        viewBlocker: "Профиль блокирующего",
        viewBlocked: "Профиль заблокированного",
      },
      users: {
        title: "Пользователи",
        introBefore:
          "Бан блокирует посты, комментарии, реакции и чат (только чтение). Причина (по желанию) показывается пользователю на ",
        introAfter:
          ". Premium выдаётся админом до даты (оплаты пока не подключены).",
        banTitle: "Бан {name}",
        reasonLabel: "Причина (необязательно, видна пользователю)",
        reasonPlaceholder: "например: спам, оскорбления…",
        charCount: "{current}/{max} символов",
        confirmBan: "Подтвердить бан",
        cancel: "Отмена",
        colEmail: "Email",
        colAdmin: "Админ",
        colBanned: "Бан",
        colReason: "Причина",
        colPremium: "Premium",
        colActions: "Действия",
        yes: "да",
        emDash: "—",
        labelModeration: "Модерация",
        labelPremium: "Premium",
        unban: "Разбан",
        ban: "Бан",
        clearPrem: "Сброс prem.",
        premiumExpired: "истёк",
        confirmClearPremium: "Сбросить Premium для этого пользователя?",
        confirmUnban: "Разбанить этого пользователя?",
        banReasonTooLong: "Причина не длиннее {max} символов.",
        ariaBan: "Бан {name}",
        ariaUnban: "Разбан {name}",
        ariaPrem30: "+30 дней Premium для {name}",
        ariaPrem365: "+365 дней Premium для {name}",
        ariaClearPrem: "Сброс Premium для {name}",
      },
      api: {
        title: "Каталог API",
        intro:
          "Metafeed работает с Supabase (PostgREST + Auth + Realtime). Отдельного HTTP API в репозитории нет — используется @supabase/supabase-js с RLS. Ниже — реестр имён (src/lib/api). Колонки и порядок миграций: supabase/SCHEMA.md.",
        publicTables: "Публичные таблицы",
        clientRpcs: "RPC клиента",
        colTable: "public.table",
        colRpc: "public function (RPC)",
        footerNote:
          "Триггеры и внутренние функции (напр. handle_new_user) здесь не перечислены — см. миграции.",
      },
    },
    notifications: {
      title: "Уведомления",
      loading: "Загрузка…",
      heroUnreadCount: "{count} непрочитанных",
      heroTotalCount: "{count} всего",
      statsTotal: "Всего",
      statsUnread: "Непрочитанные",
      statsRead: "Прочитанные",
      markAllRead: "Прочитать все",
      markRead: "Прочитано",
      empty:
        "Пока нет уведомлений. Здесь появятся комментарии и реакции к вашим постам и новые подписчики.",
      backToFeed: "← Лента",
      postLabel: "пост",
      viewProfile: "Профиль",
      msgComment: "{actor} прокомментировал(а) ваш пост",
      msgReaction: "{actor} отреагировал(а) на ваш пост",
      msgFollow: "{actor} подписался(ась) на вас",
    },
    postCard: {
      deleteConfirm: "Удалить этот пост?",
      delete: "Удалить",
      deleting: "…",
      netScoreTitle: "Итог (лайки минус дизлайки)",
      flaggedAuthorHint: "На проверке — в общей ленте видите только вы и модераторы.",
      readMore: "Ещё",
      showLess: "Свернуть",
      expandBodyAria: "Показать полный текст",
      collapseBodyAria: "Свернуть текст",
      edit: "Редактировать",
      editSave: "Сохранить",
      editSaving: "Сохранение…",
      editCancel: "Отмена",
      editSaved: "Пост обновлён.",
      editFlaggedHint: "Ваша правка была помечена автоматической проверкой. Она может не отображаться в публичной ленте до проверки.",
      edited: "(изменено)",
    },
    comment: {
      comments: "Комментарии",
      hideComments: "Скрыть комментарии",
      loading: "Загрузка комментариев…",
      addLabel: "Комментарий",
      placeholder: "Напишите комментарий…",
      sending: "Отправка…",
      submit: "Отправить",
      signInLink: "Войдите",
      signInSuffix: "чтобы комментировать.",
      deleteCommentConfirm: "Удалить этот комментарий?",
      delete: "Удалить",
      commentFailed: "Не удалось отправить комментарий",
      flaggedAfterComment:
        "Комментарий отмечен автоматической проверкой. Другие могут не видеть его до модерации.",
    },
    report: {
      report: "Пожаловаться",
      whyLabel: "Почему вы жалуетесь на этот пост?",
      placeholder: "Краткая причина…",
      sending: "Отправка…",
      submit: "Отправить жалобу",
      cancel: "Отмена",
      success: "Жалоба отправлена. Спасибо.",
    },
    reactions: {
      ariaLabel: "Реакции",
      thumbsUp: "Лайк",
      thumbsDown: "Дизлайк",
      signInToReact: "Войдите, чтобы поставить реакцию",
    },
    legal: {
      navAria: "Юридическая навигация",
      title: "Юридическая информация",
      lastUpdated: "Обновлено: 1 апреля 2026 · Metafeed v1 (MVP)",
    },
    sponsored: {
      title: "Спонсорское размещение",
      testModeBanner:
        "Тестовый режим: платные размещения и выплаты никому не предлагаются. Функции могут меняться — дождитесь обновления продукта, прежде чем ожидать коммерческих условий.",
      intro:
        "Метка «Реклама» в ленте ведёт сюда. Отправьте заголовок, короткий текст и при желании URL для верхней полосы. Команда рассматривает заявки; при необходимости свяжемся по email.",
      howItWorksTitle: "Как это работает",
      howItWorksBody:
        "1) Вы отправляете текст ниже. 2) Мы принимаем решение (ожидание → одобрено или отклонено). 3) Даже при одобрении финальный текст вводится в админке Ads перед публикацией. Это пока не мгновенная оплата self-serve.",
      formTitle: "Отправить заявку",
      fieldTitle: "Предлагаемый заголовок (необязательно)",
      fieldTitleHint: "Короткая строка; можно оставить пустым, если достаточно текста.",
      fieldBody: "Предлагаемый текст",
      fieldBodyHint: "Не менее 10 символов. Только текст.",
      fieldLink: "Целевой URL (необязательно)",
      fieldLinkHint: "Куда перейти по клику на заголовок (https://…).",
      submit: "Отправить заявку",
      submitting: "Отправка…",
      successToast: "Заявка получена. Статус ниже.",
      signInTitle: "Войдите, чтобы подать заявку",
      signInBody: "Нужен аккаунт, чтобы отправлять заявки на спонсорский блок.",
      signInLink: "Вход или регистрация",
      myRequestsTitle: "Ваши заявки",
      emptyMine: "Вы ещё не отправляли заявок.",
      statusPending: "На рассмотрении",
      statusApproved: "Одобрено (ещё не в ленте, пока не опубликовано в Ads)",
      statusRejected: "Отклонено",
      adminNoteFromTeam: "Сообщение от команды",
    },
    security: {
      navAria: "Навигация по безопасности",
      title: "Безопасность",
      intro: "Как Metafeed подходит к безопасности в MVP (кратко).",
      sectionAuth: "Аккаунт и пароли",
      sectionAuthLi1:
        "Новые пароли и смена — не менее 8 символов (в приложении; Supabase Auth хранит безопасно).",
      sectionAuthLi2: "Используйте уникальный пароль; на общих устройствах выходите через",
      sectionAuthLi2End: ".",
      sectionData: "Доступ к данным",
      sectionDataP1:
        "Бэкенд использует RLS в таблицах — клиент видит только разрешённые данные.",
      sectionDataP2:
        "В браузере — anon-ключ (ограничен RLS). Не вставляйте service_role в фронтенд.",
      sectionTransport: "Транспорт и хостинг",
      sectionTransportP:
        "В продакшене используйте HTTPS. На хостинге (например Vercel) можно настроить заголовки безопасности.",
      sectionPrivacy: "Конфиденциальность",
      privacyIntro: "Управление видимостью в поиске по email:",
      privacySettingsPrivacy: "Настройки → Конфиденциальность",
      privacySeeAlso: "См. также",
    },
  },
  seo: {
    announcer: "Переход: {title}",
    defaultDescription:
      "Metafeed (metafeed.it.com) — социальная лента: посты, реакции, комментарии, теги, поиск и сообщения.",
    searchWithQueryTitle: "Поиск: {q}",
    searchWithQueryDescription:
      "Результаты по запросу «{q}» в Metafeed — посты и профили.",
    admin: {
      title: "Админ",
      description: "Инструменты администрирования Metafeed.",
    },
    routes: {
      home: {
        title: "Главная",
        description:
          "Metafeed (metafeed.it.com) — социальная лента: посты, реакции, комментарии, теги, поиск и сообщения.",
      },
      chatPeer: {
        title: "Чат",
        description: "Личная переписка в Metafeed.",
      },
      messages: {
        title: "Сообщения",
        description: "Ваши диалоги в Metafeed.",
      },
      notifications: {
        title: "Уведомления",
        description: "Ваши уведомления в Metafeed.",
      },
      profile: {
        title: "Профиль",
        description: "Ваш профиль и посты в Metafeed.",
      },
      userProfile: {
        title: "Профиль участника",
        description: "Профиль пользователя и посты в Metafeed.",
      },
      userFollowers: {
        title: "Подписчики",
        description: "Аккаунты, которые подписаны на этого пользователя в Metafeed.",
      },
      userFollowing: {
        title: "Подписки",
        description: "Аккаунты, на которые подписан этот пользователь в Metafeed.",
      },
      settings: {
        title: "Настройки",
        description: "Настройки аккаунта и конфиденциальности в Metafeed.",
      },
      forgotPassword: {
        title: "Сброс пароля",
        description: "Запрос письма для сброса пароля в Metafeed.",
      },
      resetPassword: {
        title: "Новый пароль",
        description: "Установка нового пароля после перехода по ссылке.",
      },
      login: {
        title: "Вход",
        description: "Вход в Metafeed.",
      },
      banned: {
        title: "Аккаунт ограничен",
        description: "Статус аккаунта в Metafeed.",
      },
      search: {
        title: "Поиск",
        description: "Поиск постов и профилей в Metafeed.",
      },
      legal: {
        title: "Условия и конфиденциальность",
        description: "Условия использования и политика конфиденциальности Metafeed.",
      },
      sponsored: {
        title: "Спонсорское размещение",
        description: "Заявка на верхний спонсорский блок ленты в Metafeed.",
      },
      security: {
        title: "Безопасность",
        description: "Советы по безопасности аккаунта в Metafeed.",
      },
      notFound: {
        title: "Страница не найдена",
        description: "Эта страница не существует или была перенесена на Metafeed.",
      },
    },
  },
};

export const messages: Record<Locale, Bundle> = {
  en,
  ka,
  ru,
};
