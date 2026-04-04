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
  login: SeoPage;
  banned: SeoPage;
  search: SeoPage;
  legal: SeoPage;
  security: SeoPage;
};

type PagesBundle = {
  common: { loading: string };
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
  };
  search: {
    title: string;
    queryLabel: string;
    placeholder: string;
    submit: string;
    hintMinChars: string;
    searching: string;
    usersWithCount: string;
    usersPrivacyNote: string;
    noProfiles: string;
    message: string;
    viewProfile: string;
    postsWithCount: string;
    noPosts: string;
  };
  postForm: {
    signInPrompt: string;
    signInLink: string;
    banned: string;
    bodyLength: string;
    createFailed: string;
    label: string;
    placeholder: string;
    attachAria: string;
    addMedia: string;
    removeMedia: string;
    mediaInvalidType: string;
    previewAlt: string;
    tagsLabel: string;
    tagsPlaceholder: string;
    tagsHint: string;
    posting: string;
    post: string;
  };
  chrome: { backHome: string };
  profile: {
    title: string;
    premiumBadge: string;
    loading: string;
    emailLabel: string;
    changePhoto: string;
    uploadPhoto: string;
    settingsPhotoHint: string;
    postsCount: string;
    yourPosts: string;
    emptyPosts: string;
    avatarLabel: string;
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
        postsHeading: string;
        commentsHeading: string;
        noPosts: string;
        noComments: string;
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
    termsLink: string;
  };
  pages: PagesBundle;
  seo: {
    announcer: string;
    defaultDescription: string;
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
    termsLink: "Terms & Privacy",
  },
  pages: {
    common: {
      loading: "Loading…",
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
    },
    search: {
      title: "Search",
      queryLabel: "Query",
      placeholder: "Posts (body) or users (email)…",
      submit: "Search",
      hintMinChars: "Enter at least 2 characters (after trimming).",
      searching: "Searching…",
      usersWithCount: "Users ({count})",
      usersPrivacyNote:
        "Users who disabled email search discovery in Settings → Privacy won't appear here (except to themselves).",
      noProfiles: "No matching profiles.",
      message: "Message",
      viewProfile: "Profile",
      postsWithCount: "Posts ({count})",
      noPosts: "No matching posts.",
    },
    postForm: {
      signInPrompt: "Sign in to create posts.",
      signInLink: "Log in",
      banned: "Your account cannot create posts right now.",
      bodyLength: "Body must be 1–{max} characters.",
      createFailed: "Could not create post",
      label: "New post",
      placeholder: "Write something…",
      attachAria: "Attach image or video",
      addMedia: "Add image or video",
      removeMedia: "Remove attachment",
      mediaInvalidType: "Choose an image (JPEG, PNG, WebP, GIF) or a video (MP4, WebM).",
      previewAlt: "Selected attachment preview",
      tagsLabel: "Tags (optional)",
      tagsPlaceholder: "e.g. news, dev, release-notes",
      tagsHint: "Comma-separated. Lowercase letters, numbers, hyphens. Up to 8 tags.",
      posting: "Posting…",
      post: "Post",
    },
    chrome: {
      backHome: "← Home",
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
      yourPosts: "Your posts",
      emptyPosts: "You have not posted yet.",
      avatarLabel: "Profile",
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
        hint: "Delete posts or comments (admin only).",
        latest50: "Latest 50 each.",
        postsHeading: "Posts",
        commentsHeading: "Comments",
        noPosts: "No posts.",
        noComments: "No comments.",
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
    termsLink: "წესები და კონფიდენციალურობა",
  },
  pages: {
    common: {
      loading: "იტვირთება…",
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
    },
    search: {
      title: "ძიება",
      queryLabel: "მოთხოვნა",
      placeholder: "პოსტები (ტექსტი) ან მომხმარებლები (ელფოსტა)…",
      submit: "ძიება",
      hintMinChars: "შეიყვანეთ მინიმუმ 2 სიმბოლო (გაფართოების შემდეგ).",
      searching: "ძიება…",
      usersWithCount: "მომხმარებლები ({count})",
      usersPrivacyNote:
        "ვინც პარამეტრებში გამორთა ელფოსტით ძიება, აქ არ ჩანს (გარდა საკუთარი თავისა).",
      noProfiles: "შესაბამისი პროფილები არ მოიძებნა.",
      message: "მესიჯი",
      viewProfile: "პროფილი",
      postsWithCount: "პოსტები ({count})",
      noPosts: "შესაბამისი პოსტები არ არის.",
    },
    postForm: {
      signInPrompt: "პოსტისთვის შედით.",
      signInLink: "შესვლა",
      banned: "თქვენი ანგარიში ახლა პოსტებს ვერ ქმნის.",
      bodyLength: "ტექსტი იყოს 1–{max} სიმბოლო.",
      createFailed: "პოსტის შექმნა ვერ მოხერხდა",
      label: "ახალი პოსტი",
      placeholder: "დაწერეთ…",
      attachAria: "სურათი ან ვიდეო",
      addMedia: "სურათი ან ვიდეო",
      removeMedia: "მიმაგრების მოშორება",
      mediaInvalidType: "აირჩიეთ სურათი (JPEG, PNG, WebP, GIF) ან ვიდეო (MP4, WebM).",
      previewAlt: "არჩეული ფაილის გადახედვა",
      tagsLabel: "თეგები (არასავალდებულო)",
      tagsPlaceholder: "მაგ. news, dev, release-notes",
      tagsHint: "მძიმით გამოყოფილი. პატარა ასოები, ციფრები, ტირე. მაქს. 8 თეგი.",
      posting: "იგზავნება…",
      post: "გამოქვეყნება",
    },
    chrome: {
      backHome: "← მთავარი",
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
      yourPosts: "თქვენი პოსტები",
      emptyPosts: "ჯერ პოსტი არ გაქვთ.",
      avatarLabel: "პროფილი",
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
        hint: "პოსტებისა და კომენტარების წაშლა (მხოლოდ ადმინი).",
        latest50: "ბოლო 50 თითოეულიდან.",
        postsHeading: "პოსტები",
        commentsHeading: "კომენტარები",
        noPosts: "პოსტები არაა.",
        noComments: "კომენტარები არაა.",
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
    termsLink: "Условия и конфиденциальность",
  },
  pages: {
    common: {
      loading: "Загрузка…",
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
    },
    search: {
      title: "Поиск",
      queryLabel: "Запрос",
      placeholder: "Посты (текст) или пользователи (email)…",
      submit: "Найти",
      hintMinChars: "Введите не менее 2 символов (после обрезки пробелов).",
      searching: "Поиск…",
      usersWithCount: "Пользователи ({count})",
      usersPrivacyNote:
        "Пользователи, отключившие поиск по email в Настройках → Конфиденциальность, здесь не отображаются (кроме себя).",
      noProfiles: "Подходящих профилей нет.",
      message: "Написать",
      viewProfile: "Профиль",
      postsWithCount: "Посты ({count})",
      noPosts: "Подходящих постов нет.",
    },
    postForm: {
      signInPrompt: "Войдите, чтобы публиковать посты.",
      signInLink: "Вход",
      banned: "Сейчас вы не можете создавать посты.",
      bodyLength: "Текст: от 1 до {max} символов.",
      createFailed: "Не удалось создать пост",
      label: "Новый пост",
      placeholder: "Напишите что-нибудь…",
      attachAria: "Прикрепить фото или видео",
      addMedia: "Добавить фото или видео",
      removeMedia: "Убрать вложение",
      mediaInvalidType: "Выберите изображение (JPEG, PNG, WebP, GIF) или видео (MP4, WebM).",
      previewAlt: "Предпросмотр вложения",
      tagsLabel: "Теги (необязательно)",
      tagsPlaceholder: "напр. news, dev, release-notes",
      tagsHint: "Через запятую. Строчные буквы, цифры, дефис. До 8 тегов.",
      posting: "Публикация…",
      post: "Опубликовать",
    },
    chrome: {
      backHome: "← Главная",
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
      yourPosts: "Ваши посты",
      emptyPosts: "Вы ещё ничего не опубликовали.",
      avatarLabel: "Профиль",
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
        hint: "Удаление постов и комментариев (только админ).",
        latest50: "По 50 последних каждого.",
        postsHeading: "Посты",
        commentsHeading: "Комментарии",
        noPosts: "Нет постов.",
        noComments: "Нет комментариев.",
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
    },
  },
};

export const messages: Record<Locale, Bundle> = {
  en,
  ka,
  ru,
};
