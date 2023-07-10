CREATE TABLE "announcement"(
    "id" INTEGER NOT NULL,
    "sender_user_id" INTEGER NOT NULL,
    "message" CHAR(255) NOT NULL,
    "to_type_ids" CHAR(255) NOT NULL,
    "to_role_ids" CHAR(255) NOT NULL,
    "date_time" DATE NOT NULL
);
CREATE INDEX "announcement_id_index" ON
    "announcement"("id");
ALTER TABLE
    "announcement" ADD PRIMARY KEY("id");
CREATE TABLE "attendance_type"(
    "id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL,
    "created_user_id" INTEGER NOT NULL
);
CREATE INDEX "attendance_type_id_index" ON
    "attendance_type"("id");
ALTER TABLE
    "attendance_type" ADD PRIMARY KEY("id");
CREATE TABLE "attendance"(
    "id" INTEGER NOT NULL,
    "attendance_taker_id" INTEGER NOT NULL,
    "attendance_type_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "date_time" DATE NOT NULL
);
CREATE INDEX "attendance_id_index" ON
    "attendance"("id");
ALTER TABLE
    "attendance" ADD PRIMARY KEY("id");
CREATE TABLE "file_group"(
    "id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL
);
CREATE INDEX "file_group_id_index" ON
    "file_group"("id");
ALTER TABLE
    "file_group" ADD PRIMARY KEY("id");
CREATE TABLE "file"(
    "id" INTEGER NOT NULL,
    "uploader_user_id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL,
    "url" CHAR(255) NOT NULL,
    "file_group_id" INTEGER NOT NULL
);
CREATE INDEX "file_id_index" ON
    "file"("id");
ALTER TABLE
    "file" ADD PRIMARY KEY("id");
CREATE TABLE "privilege"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "attendance_meeting" INTEGER NULL,
    "attendance_service" INTEGER NULL,
    "attendance_kada_mosa3ed_swa3ed" INTEGER NULL,
    "transtion_team" INTEGER NULL,
    "see_files" INTEGER NULL,
    "approve_users_his_team" INTEGER NULL,
    "delete_users_his_team" INTEGER NULL,
    "see_users_data_his_team" INTEGER NULL,
    "send_announcements" INTEGER NULL
);
CREATE INDEX "privilege_id_index" ON
    "privilege"("id");
ALTER TABLE
    "privilege" ADD PRIMARY KEY("id");
CREATE TABLE "role"(
    "id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL
);
ALTER TABLE
    "role" ADD PRIMARY KEY("id");
CREATE TABLE "team"(
    "id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL
);
ALTER TABLE
    "team" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "email" CHAR(255) NOT NULL,
    "password" CHAR(255) NOT NULL,
    "fullname" CHAR(255) NOT NULL,
    "phone" CHAR(255) NOT NULL,
    "birth_date" DATE NOT NULL,
    "address" CHAR(255) NOT NULL,
    "confession_father" CHAR(255) NOT NULL,
    "team_id" INTEGER NULL,
    "role_id" INTEGER NOT NULL,
    "isapproved" INTEGER NOT NULL,
    "approval_user_id" INTEGER NULL,
    "isadmin" INTEGER NULL
);
CREATE INDEX "users_id_index" ON
    "users"("id");
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
ALTER TABLE
    "users" ADD CONSTRAINT "users_approval_user_id_foreign" FOREIGN KEY("approval_user_id") REFERENCES "users"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "role"("id");
ALTER TABLE
    "attendance" ADD CONSTRAINT "attendance_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "attendance" ADD CONSTRAINT "attendance_attendance_taker_id_foreign" FOREIGN KEY("attendance_taker_id") REFERENCES "users"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_team_id_foreign" FOREIGN KEY("team_id") REFERENCES "team"("id");
ALTER TABLE
    "privilege" ADD CONSTRAINT "privilege_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "file" ADD CONSTRAINT "file_uploader_user_id_foreign" FOREIGN KEY("uploader_user_id") REFERENCES "users"("id");
ALTER TABLE
    "file" ADD CONSTRAINT "file_file_group_id_foreign" FOREIGN KEY("file_group_id") REFERENCES "file_group"("id");
ALTER TABLE
    "attendance" ADD CONSTRAINT "attendance_attendance_type_id_foreign" FOREIGN KEY("attendance_type_id") REFERENCES "attendance_type"("id");
ALTER TABLE
    "attendance_type" ADD CONSTRAINT "attendance_type_created_user_id_foreign" FOREIGN KEY("created_user_id") REFERENCES "users"("id");
ALTER TABLE
    "announcement" ADD CONSTRAINT "announcement_sender_user_id_foreign" FOREIGN KEY("sender_user_id") REFERENCES "users"("id");