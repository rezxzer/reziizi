-- REZIIZI v3: admins can delete any post / comment (RLS; OR with existing delete_own policies)

create policy "posts_delete_admin"
  on public.posts for delete
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );

create policy "comments_delete_admin"
  on public.comments for delete
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and p.is_admin is true
    )
  );
