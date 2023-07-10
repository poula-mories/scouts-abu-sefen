CREATE TABLE "users"(
    "id" SERIAL NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "fullname" character varying NOT NULL,
    "phone" character varying NOT NULL,
    "birth_date" DATE NOT NULL,
    "confession_father" character varying NOT NULL,
    "team_id" INTEGER NULL,
    "role_id" INTEGER NOT NULL,
    "isapproved" INTEGER DEFAULT 0,
    "approval_user_id" INTEGER NULL,
    "isadmin" INTEGER NULL
);
CREATE INDEX "user_id_index" ON
    "user"("id");
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");
CREATE TABLE "role"(
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL
);
ALTER TABLE
    "role" ADD PRIMARY KEY("id");
CREATE TABLE "attendance"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "attendance_taker_id" INTEGER NOT NULL
);
CREATE INDEX "attendance_id_index" ON
    "attendance"("id");
ALTER TABLE
    "attendance" ADD PRIMARY KEY("id");
CREATE TABLE "team"(
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL
);
ALTER TABLE
    "team" ADD PRIMARY KEY("id");
CREATE TABLE "privilege"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "see_files" INTEGER NULL,
    "update_files" INTEGER NULL,
    "attendance_service" INTEGER NULL,
    "attendance_meeting" INTEGER NULL,
    "attendance_kada_mosa3ed_swa3ed" INTEGER NULL,
    "promotion" INTEGER NULL,
    "transtion_team" INTEGER NULL,
    "delete_user_his_team" INTEGER NULL,
    "send_announcements" INTEGER NULL,
    "see_his_team_data" INTEGER NULL
);
CREATE INDEX "privilege_id_index" ON
    "privilege"("id");
ALTER TABLE
    "privilege" ADD PRIMARY KEY("id");
CREATE TABLE "file"(
    "id" SERIAL NOT NULL,
    "uploader_user_id" INTEGER NOT NULL,
    "name" character varying NOT NULL,
    "file" bytea NOT NULL
);
ALTER TABLE
    "file" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_approval_user_id_foreign" FOREIGN KEY("approval_user_id") REFERENCES "user"("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "role"("id");
ALTER TABLE
    "attendance" ADD CONSTRAINT "attendance_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "attendance" ADD CONSTRAINT "attendance_attendance_taker_id_foreign" FOREIGN KEY("attendance_taker_id") REFERENCES "user"("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_team_id_foreign" FOREIGN KEY("team_id") REFERENCES "team"("id");
ALTER TABLE
    "privilege" ADD CONSTRAINT "privilege_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "file" ADD CONSTRAINT "file_uploader_user_id_foreign" FOREIGN KEY("uploader_user_id") REFERENCES "user"("id");