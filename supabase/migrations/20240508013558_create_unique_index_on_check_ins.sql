CREATE UNIQUE INDEX idx_unique_profile_date ON check_ins(profile_id, DATE(created_at at TIME ZONE 'UTC+12'));

