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
    addImage: string;
    removeImage: string;
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
      attachAria: "Attach image",
      addImage: "Add image",
      removeImage: "Remove image",
      previewAlt: "Selected image preview",
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
      attachAria: "სურათის მიმაგრება",
      addImage: "სურათი",
      removeImage: "სურათის მოშორება",
      previewAlt: "არჩეული სურათის გადახედვა",
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
      attachAria: "Прикрепить изображение",
      addImage: "Добавить фото",
      removeImage: "Убрать фото",
      previewAlt: "Предпросмотр изображения",
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
