CREATE VIEW public.check_ins_by_day AS
SELECT
    date_trunc('day', check_ins.created_at) AS day,
    profiles.pfp_url,
    profiles.twitch_username,
    profiles.id
FROM
    check_ins
    LEFT JOIN profiles ON check_ins.profile_id = profiles.id
GROUP BY
    day,
    profiles.id;

