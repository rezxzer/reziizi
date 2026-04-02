/**
 * Deletes the authenticated user's Storage objects (avatars + post-images) and auth user.
 * Requires deploy: `supabase functions deploy delete-account`
 * Env (auto on hosted Supabase): SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Matches `@supabase/supabase-js/cors` — `Access-Control-Allow-Methods` required or browser preflight fails ("Failed to fetch"). */
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};

const AVATARS_BUCKET = "avatars";
const POST_IMAGES_BUCKET = "post-images";
const REMOVE_CHUNK = 50;

/** Folders are prefix-only rows; files carry `metadata` (e.g. size). */
function isFolder(item: { metadata: Record<string, unknown> | null }): boolean {
  return item.metadata === null;
}

/** Lists all file object paths under prefix (recursive). */
async function collectFilePaths(
  admin: SupabaseClient,
  bucket: string,
  prefix: string,
): Promise<string[]> {
  const out: string[] = [];
  let offset = 0;
  const limit = 1000;
  for (;;) {
    const { data, error } = await admin.storage.from(bucket).list(prefix, {
      limit,
      offset,
      sortBy: { column: "name", order: "asc" },
    });
    if (error) {
      throw error;
    }
    const batch = data ?? [];
    if (batch.length === 0) {
      break;
    }
    for (const item of batch) {
      const childPath = prefix ? `${prefix}/${item.name}` : item.name;
      if (isFolder(item)) {
        const nested = await collectFilePaths(admin, bucket, childPath);
        out.push(...nested);
      } else {
        out.push(childPath);
      }
    }
    if (batch.length < limit) {
      break;
    }
    offset += limit;
  }
  return out;
}

async function removePaths(admin: SupabaseClient, bucket: string, paths: string[]): Promise<void> {
  for (let i = 0; i < paths.length; i += REMOVE_CHUNK) {
    const slice = paths.slice(i, i + REMOVE_CHUNK);
    const { error } = await admin.storage.from(bucket).remove(slice);
    if (error) {
      throw error;
    }
  }
}

async function deleteUserStorage(admin: SupabaseClient, userId: string): Promise<void> {
  const avatarPrefix = `avatars/${userId}`;
  const postPrefix = `posts/${userId}`;
  const avatarPaths = await collectFilePaths(admin, AVATARS_BUCKET, avatarPrefix);
  await removePaths(admin, AVATARS_BUCKET, avatarPaths);
  const postPaths = await collectFilePaths(admin, POST_IMAGES_BUCKET, postPrefix);
  await removePaths(admin, POST_IMAGES_BUCKET, postPaths);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (!supabaseUrl || !anonKey || !serviceKey) {
    console.error("delete-account: missing SUPABASE_* env");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Missing authorization" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const {
    data: { user },
    error: userErr,
  } = await userClient.auth.getUser();
  if (userErr || !user) {
    return new Response(JSON.stringify({ error: "Invalid session" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const userId = user.id;

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    await deleteUserStorage(admin, userId);
  } catch (e) {
    console.error("delete-account: storage cleanup", e);
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? "Storage cleanup failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const { error: delErr } = await admin.auth.admin.deleteUser(userId);
  if (delErr) {
    console.error("delete-account: auth.admin.deleteUser", delErr);
    return new Response(JSON.stringify({ error: delErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
