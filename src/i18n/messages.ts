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
    title: string;
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
  };
  login: {
    titleSignIn: string;
    titleSignUp: string;
    termsPrefix: string;
    modeSignIn: string;
    modeSignUp: string;
    email: string;
    password: string;
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
    /** `aria-label` for the results landmark (loading + lists). */
    resultsRegionLabel: string;
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
  };
  userProfile: {
    invalidTitle: string;
    invalidBody: string;
    backHome: string;
    title: string;
    notFound: string;
    bannedNotice: string;
    emailHidden: string;
    followersStat: string;
    followingStat: string;
    follow: string;
    unfollow: string;
    /** Shown when viewer and profile user follow each other. */
    mutualFollowBadge: string;
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
        linkAds: string;
        linkApi: string;
        countsTitle: string;
        statProfiles: string;
        statPosts: string;
        statComments: string;
        statReactions: string;
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
        feedTopTitle: string;
        fieldTitle: string;
        fieldBody: string;
        fieldLinkUrl: string;
        activeLabel: string;
        phTitle: string;
        phBody: string;
        phUrl: string;
        saving: string;
        save: string;
        savedToast: string;
        noSlot: string;
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
        metricAdSlots: string;
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
      admin: string;
      adminMenuAria: string;
      adminOverview: string;
      users: string;
      moderation: string;
      reports: string;
      stats: string;
      ads: string;
      api: string;
      security: string;
      legal: string;
    };
    unreadBadge: string;
    toastRegionAria: string;
    toastDismiss: string;
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
    privacy: string;
    privacyHint: string;
    privacyLoading: string;
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
    brandAria: "REZIIZI home",
    navAria: "Main",
    nav: {
      home: "Home",
      search: "Search",
      login: "Login",
      messages: "Messages",
      notifications: "Notifications",
      profile: "Profile",
      settings: "Settings",
      admin: "Admin",
      adminMenuAria: "Admin pages",
      adminOverview: "Overview",
      users: "Users",
      moderation: "Moderation",
      reports: "Reports",
      stats: "Stats",
      ads: "Ads",
      api: "API",
      security: "Security",
      legal: "Legal",
    },
    unreadBadge: "{count} unread",
    toastRegionAria: "Notifications",
    toastDismiss: "Dismiss",
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
    privacy: "Privacy",
    privacyHint:
      "Control whether your account appears when others search by email on the Search page.",
    privacyLoading: "Loading…",
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
      title: "Feed",
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
    },
    login: {
      titleSignIn: "Log in",
      titleSignUp: "Create account",
      termsPrefix: "By continuing you agree to our",
      modeSignIn: "Sign in",
      modeSignUp: "Sign up",
      email: "Email",
      password: "Password",
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
      resultsRegionLabel: "Search results",
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
      followersStat: "Followers: {count}",
      followingStat: "Following: {count}",
      follow: "Follow",
      unfollow: "Unfollow",
      mutualFollowBadge: "Mutual",
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
        linkStats: "Statistics — full platform counts",
        linkAds: "Ads — feed top sponsored strip",
        linkApi: "API catalog — tables & RPCs (Supabase)",
        countsTitle: "Counts",
        statProfiles: "Profiles",
        statPosts: "Posts",
        statComments: "Comments",
        statReactions: "Reactions",
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
        intro: "Feed top strip on the home page. Plain text only (no HTML).",
        feedTopTitle: "Feed top",
        fieldTitle: "Title",
        fieldBody: "Body",
        fieldLinkUrl: "Link URL",
        activeLabel: "Active (show on home feed)",
        phTitle: "Optional headline",
        phBody: "Short text",
        phUrl: "https://…",
        saving: "Saving…",
        save: "Save",
        savedToast: "Saved.",
        noSlot: "No ad slot row (run migrations).",
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
        metricAdSlots: "Ad slots",
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
          "REZIIZI talks to Supabase (PostgREST + Auth + Realtime). There is no custom HTTP API in this repo — the app uses @supabase/supabase-js with Row Level Security. Names below are the canonical registry (src/lib/api). Column-level notes and migration order: supabase/SCHEMA.md in the repo.",
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
      lastUpdated: "Last updated: April 1, 2026 · REZIIZI v1 (MVP)",
    },
    security: {
      navAria: "Security navigation",
      title: "Security",
      intro: "How REZIIZI approaches security in the MVP (high level).",
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
      "REZIIZI — social feed: posts, reactions, comments, tags, search, and messages.",
    searchWithQueryTitle: "Search: {q}",
    searchWithQueryDescription:
      "Search results for “{q}” on REZIIZI — posts and profiles.",
    admin: {
      title: "Admin",
      description: "Administration tools for REZIIZI.",
    },
    routes: {
      home: {
        title: "Home",
        description:
          "REZIIZI — social feed: posts, reactions, comments, tags, search, and messages.",
      },
      chatPeer: {
        title: "Chat",
        description: "Direct message thread on REZIIZI.",
      },
      messages: {
        title: "Messages",
        description: "Your conversations on REZIIZI.",
      },
      notifications: {
        title: "Notifications",
        description: "Your notifications on REZIIZI.",
      },
      profile: {
        title: "Profile",
        description: "Your profile and posts on REZIIZI.",
      },
      userProfile: {
        title: "Member profile",
        description: "User profile and posts on REZIIZI.",
      },
      userFollowers: {
        title: "Followers",
        description: "Accounts that follow this user on REZIIZI.",
      },
      userFollowing: {
        title: "Following",
        description: "Accounts this user follows on REZIIZI.",
      },
      settings: {
        title: "Settings",
        description: "Account and privacy settings on REZIIZI.",
      },
      forgotPassword: {
        title: "Reset password",
        description: "Request a password reset email for REZIIZI.",
      },
      resetPassword: {
        title: "Set new password",
        description: "Choose a new password after following the reset link.",
      },
      login: {
        title: "Log in",
        description: "Sign in to REZIIZI.",
      },
      banned: {
        title: "Account restricted",
        description: "Account status on REZIIZI.",
      },
      search: {
        title: "Search",
        description: "Search posts and find profiles on REZIIZI.",
      },
      legal: {
        title: "Terms & Privacy",
        description: "Terms of service and privacy information for REZIIZI.",
      },
      security: {
        title: "Security",
        description: "Security tips and account safety on REZIIZI.",
      },
      notFound: {
        title: "Page not found",
        description: "This page does not exist or was moved on REZIIZI.",
      },
    },
  },
};

const ka: Bundle = {
  layout: {
    skipToMain: "გადასვლა მთავარ შიგთავსზე",
    brandAria: "REZIIZI — მთავარი",
    navAria: "მთავარი ნავიგაცია",
    nav: {
      home: "მთავარი",
      search: "ძიება",
      login: "შესვლა",
      messages: "მესიჯები",
      notifications: "შეტყობინებები",
      profile: "პროფილი",
      settings: "პარამეტრები",
      admin: "ადმინი",
      adminMenuAria: "ადმინის გვერდები",
      adminOverview: "მიმოხილვა",
      users: "მომხმარებლები",
      moderation: "მოდერაცია",
      reports: "რეპორტები",
      stats: "სტატისტიკა",
      ads: "რეკლამა",
      api: "API",
      security: "უსაფრთხოება",
      legal: "იურიდიული",
    },
    unreadBadge: "{count} წაუკითხავი",
    toastRegionAria: "შეტყობინებები",
    toastDismiss: "დახურვა",
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
    privacy: "პირადულობა",
    privacyHint:
      "განსაზღვრეთ, ჩანდება თუ არა თქვენი პროფილი სხვების ელფოსტით ძიებისას (ძიების გვერდი).",
    privacyLoading: "იტვირთება…",
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
      title: "ლენტა",
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
    },
    login: {
      titleSignIn: "შესვლა",
      titleSignUp: "ანგარიშის შექმნა",
      termsPrefix: "გაგრძელებით ეთანხმებით",
      modeSignIn: "შესვლა",
      modeSignUp: "რეგისტრაცია",
      email: "ელფოსტა",
      password: "პაროლი",
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
      resultsRegionLabel: "ძიების შედეგები",
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
      followersStat: "გამომწერები: {count}",
      followingStat: "გამოწერები: {count}",
      follow: "გამოწერა",
      unfollow: "გამოწერის მოშორება",
      mutualFollowBadge: "ორმხრივი გამოწერა",
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
        linkStats: "სტატისტიკა — პლატფორმის სრული რაოდენობები",
        linkAds: "რეკლამა — ლენტის ზედა ზოლი",
        linkApi: "API კატალოგი — ცხრილები და RPC (Supabase)",
        countsTitle: "რაოდენობები",
        statProfiles: "პროფილები",
        statPosts: "პოსტები",
        statComments: "კომენტარები",
        statReactions: "რეაქციები",
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
        intro: "ლენტის ზედა ზოლი მთავარ გვერდზე. მხოლოდ ტექსტი (HTML არა).",
        feedTopTitle: "ლენტის ზედა",
        fieldTitle: "სათაური",
        fieldBody: "ტექსტი",
        fieldLinkUrl: "ბმულის URL",
        activeLabel: "აქტიური (ლენტაზე ჩვენება)",
        phTitle: "სათაური (არასავალდებულო)",
        phBody: "მოკლე ტექსტი",
        phUrl: "https://…",
        saving: "ინახება…",
        save: "შენახვა",
        savedToast: "შენახულია.",
        noSlot: "რეკლამის ჩანაწერი არაა (გაუშვით მიგრაციები).",
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
        metricAdSlots: "რეკლამის სლოტები",
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
          "REZIIZI უკავშირდება Supabase-ს (PostgREST + Auth + Realtime). ამ რეპოში ცალკე HTTP API არაა — გამოიყენება @supabase/supabase-js RLS-ით. ქვემოთ სახელები არის რეესტრი (src/lib/api). სვეტები და მიგრაციის რიგი: supabase/SCHEMA.md.",
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
      lastUpdated: "ბოლო განახლება: 2026-04-01 · REZIIZI v1 (MVP)",
    },
    security: {
      navAria: "უსაფრთხოების ნავიგაცია",
      title: "უსაფრთხოება",
      intro: "როგორ უდგება REZIIZI უსაფრთხოებას MVP-ში (მოკლედ).",
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
      "REZIIZI — სოციალური ლენტა: პოსტები, რეაქციები, კომენტარები, თეგები, ძიება და მესიჯები.",
    searchWithQueryTitle: "ძიება: {q}",
    searchWithQueryDescription:
      "შედეგები „{q}“-ისთვის REZIIZI-ზე — პოსტები და პროფილები.",
    admin: {
      title: "ადმინისტრაცია",
      description: "REZIIZI-ის ადმინისტრაციული ინსტრუმენტები.",
    },
    routes: {
      home: {
        title: "მთავარი",
        description:
          "REZIIZI — სოციალური ლენტა: პოსტები, რეაქციები, კომენტარები, თეგები, ძიება და მესიჯები.",
      },
      chatPeer: {
        title: "ჩატი",
        description: "პირდაპირი მესიჯების თრედი REZIIZI-ზე.",
      },
      messages: {
        title: "მესიჯები",
        description: "თქვენი საუბრები REZIIZI-ზე.",
      },
      notifications: {
        title: "შეტყობინებები",
        description: "თქვენი შეტყობინებები REZIIZI-ზე.",
      },
      profile: {
        title: "პროფილი",
        description: "თქვენი პროფილი და პოსტები REZIIZI-ზე.",
      },
      userProfile: {
        title: "მომხმარებლის პროფილი",
        description: "მომხმარებლის პროფილი და პოსტები REZIIZI-ზე.",
      },
      userFollowers: {
        title: "გამომწერები",
        description: "ვინ არის გამოწერილი ამ მომხმარებელზე REZIIZI-ზე.",
      },
      userFollowing: {
        title: "გამოწერები",
        description: "რომელ ანგარიშებს უწერს გამომწერებას ეს მომხმარებელი REZIIZI-ზე.",
      },
      settings: {
        title: "პარამეტრები",
        description: "ანგარიშისა და პირადულობის პარამეტრები REZIIZI-ზე.",
      },
      forgotPassword: {
        title: "პაროლის აღდგენა",
        description: "პაროლის აღდგენის ელფოსტის მოთხოვნა REZIIZI-ზე.",
      },
      resetPassword: {
        title: "ახალი პაროლი",
        description: "ახალი პაროლის არჩევა აღდგენის ბმულის შემდეგ.",
      },
      login: {
        title: "შესვლა",
        description: "REZIIZI-ზე ავტორიზაცია.",
      },
      banned: {
        title: "ანგარიში შეზღუდულია",
        description: "ანგარიშის სტატუსი REZIIZI-ზე.",
      },
      search: {
        title: "ძიება",
        description: "პოსტების ძიება და პროფილების პოვნა REZIIZI-ზე.",
      },
      legal: {
        title: "წესები და კონფიდენციალურობა",
        description: "მომსახურების წესები და კონფიდენციალურობა REZIIZI-ზე.",
      },
      security: {
        title: "უსაფრთხოება",
        description: "რჩევები ანგარიშის უსაფრთხოებისთვის REZIIZI-ზე.",
      },
      notFound: {
        title: "გვერდი ვერ მოიძებნა",
        description: "ეს გვერდი არ არსებობს ან გადატანილია REZIIZI-ზე.",
      },
    },
  },
};

const ru: Bundle = {
  layout: {
    skipToMain: "Перейти к основному содержимому",
    brandAria: "REZIIZI — главная",
    navAria: "Основная навигация",
    nav: {
      home: "Главная",
      search: "Поиск",
      login: "Вход",
      messages: "Сообщения",
      notifications: "Уведомления",
      profile: "Профиль",
      settings: "Настройки",
      admin: "Админ",
      adminMenuAria: "Страницы администратора",
      adminOverview: "Обзор",
      users: "Пользователи",
      moderation: "Модерация",
      reports: "Жалобы",
      stats: "Статистика",
      ads: "Реклама",
      api: "API",
      security: "Безопасность",
      legal: "Правовая информация",
    },
    unreadBadge: "{count} непрочитанных",
    toastRegionAria: "Уведомления",
    toastDismiss: "Закрыть",
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
    privacy: "Конфиденциальность",
    privacyHint:
      "Управляйте видимостью профиля при поиске по email на странице «Поиск».",
    privacyLoading: "Загрузка…",
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
      title: "Лента",
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
    },
    login: {
      titleSignIn: "Вход",
      titleSignUp: "Создать аккаунт",
      termsPrefix: "Продолжая, вы соглашаетесь с",
      modeSignIn: "Вход",
      modeSignUp: "Регистрация",
      email: "Email",
      password: "Пароль",
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
      resultsRegionLabel: "Результаты поиска",
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
      followersStat: "Подписчики: {count}",
      followingStat: "Подписки: {count}",
      follow: "Подписаться",
      unfollow: "Отписаться",
      mutualFollowBadge: "Взаимная подписка",
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
        linkStats: "Статистика — счётчики по платформе",
        linkAds: "Реклама — верхняя полоса в ленте",
        linkApi: "Каталог API — таблицы и RPC (Supabase)",
        countsTitle: "Счётчики",
        statProfiles: "Профили",
        statPosts: "Посты",
        statComments: "Комментарии",
        statReactions: "Реакции",
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
        intro: "Верхняя полоса на главной ленте. Только текст (без HTML).",
        feedTopTitle: "Верх ленты",
        fieldTitle: "Заголовок",
        fieldBody: "Текст",
        fieldLinkUrl: "URL ссылки",
        activeLabel: "Активно (показывать в ленте)",
        phTitle: "Заголовок (необязательно)",
        phBody: "Короткий текст",
        phUrl: "https://…",
        saving: "Сохранение…",
        save: "Сохранить",
        savedToast: "Сохранено.",
        noSlot: "Нет строки слота (выполните миграции).",
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
        metricAdSlots: "Слоты рекламы",
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
          "REZIIZI работает с Supabase (PostgREST + Auth + Realtime). Отдельного HTTP API в репозитории нет — используется @supabase/supabase-js с RLS. Ниже — реестр имён (src/lib/api). Колонки и порядок миграций: supabase/SCHEMA.md.",
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
      lastUpdated: "Обновлено: 1 апреля 2026 · REZIIZI v1 (MVP)",
    },
    security: {
      navAria: "Навигация по безопасности",
      title: "Безопасность",
      intro: "Как REZIIZI подходит к безопасности в MVP (кратко).",
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
      "REZIIZI — социальная лента: посты, реакции, комментарии, теги, поиск и сообщения.",
    searchWithQueryTitle: "Поиск: {q}",
    searchWithQueryDescription:
      "Результаты по запросу «{q}» в REZIIZI — посты и профили.",
    admin: {
      title: "Админ",
      description: "Инструменты администрирования REZIIZI.",
    },
    routes: {
      home: {
        title: "Главная",
        description:
          "REZIIZI — социальная лента: посты, реакции, комментарии, теги, поиск и сообщения.",
      },
      chatPeer: {
        title: "Чат",
        description: "Личная переписка в REZIIZI.",
      },
      messages: {
        title: "Сообщения",
        description: "Ваши диалоги в REZIIZI.",
      },
      notifications: {
        title: "Уведомления",
        description: "Ваши уведомления в REZIIZI.",
      },
      profile: {
        title: "Профиль",
        description: "Ваш профиль и посты в REZIIZI.",
      },
      userProfile: {
        title: "Профиль участника",
        description: "Профиль пользователя и посты в REZIIZI.",
      },
      userFollowers: {
        title: "Подписчики",
        description: "Аккаунты, которые подписаны на этого пользователя в REZIIZI.",
      },
      userFollowing: {
        title: "Подписки",
        description: "Аккаунты, на которые подписан этот пользователь в REZIIZI.",
      },
      settings: {
        title: "Настройки",
        description: "Настройки аккаунта и конфиденциальности в REZIIZI.",
      },
      forgotPassword: {
        title: "Сброс пароля",
        description: "Запрос письма для сброса пароля в REZIIZI.",
      },
      resetPassword: {
        title: "Новый пароль",
        description: "Установка нового пароля после перехода по ссылке.",
      },
      login: {
        title: "Вход",
        description: "Вход в REZIIZI.",
      },
      banned: {
        title: "Аккаунт ограничен",
        description: "Статус аккаунта в REZIIZI.",
      },
      search: {
        title: "Поиск",
        description: "Поиск постов и профилей в REZIIZI.",
      },
      legal: {
        title: "Условия и конфиденциальность",
        description: "Условия использования и политика конфиденциальности REZIIZI.",
      },
      security: {
        title: "Безопасность",
        description: "Советы по безопасности аккаунта в REZIIZI.",
      },
      notFound: {
        title: "Страница не найдена",
        description: "Эта страница не существует или была перенесена на REZIIZI.",
      },
    },
  },
};

export const messages: Record<Locale, Bundle> = {
  en,
  ka,
  ru,
};
