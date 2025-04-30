-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "gender" TEXT,
    "location" TEXT,
    "birthdate" DATE,
    "website" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "works" JSONB,
    "education" JSONB,
    "skills" JSONB,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "globalPoints" INTEGER NOT NULL DEFAULT 0,
    "totalSolved" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "languageId" SERIAL NOT NULL,
    "languageName" VARCHAR(50) NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "sourceFileExt" VARCHAR(10) NOT NULL,
    "binaryFileExt" VARCHAR(10),
    "compileCommand" VARCHAR(100),
    "runCommand" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "canDelete" BOOLEAN NOT NULL DEFAULT true,
    "monacoCodeLanguage" VARCHAR(50) DEFAULT 'plaintext',
    "templateCode" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Language_pkey" PRIMARY KEY ("languageId")
);

-- CreateTable
CREATE TABLE "Problem" (
    "problemId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" JSON,
    "problemStatement" JSON NOT NULL,
    "difficultyLevel" SMALLINT NOT NULL DEFAULT 1,
    "timeLimitInMs" INTEGER NOT NULL DEFAULT 10,
    "memoryLimitInKb" INTEGER NOT NULL DEFAULT 256,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "totalSubmissions" INTEGER NOT NULL DEFAULT 0,
    "acceptedSubmissions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "createdBy" VARCHAR(100),
    "updatedBy" VARCHAR(100),
    "deletedBy" VARCHAR(100),
    "hints" JSON,
    "metadata" JSON,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("problemId")
);

-- CreateTable
CREATE TABLE "ProblemLanguage" (
    "problemId" UUID NOT NULL,
    "languageId" INTEGER NOT NULL,
    "templateCode" TEXT,
    "timeLimitInMs" INTEGER NOT NULL DEFAULT 10,
    "memoryLimitInKb" INTEGER NOT NULL DEFAULT 256,

    CONSTRAINT "ProblemLanguage_ProblemId_LanguageId_pk" PRIMARY KEY ("problemId","languageId")
);

-- CreateTable
CREATE TABLE "ProblemTag" (
    "problemId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "ProblemTag_ProblemId_TagId_pk" PRIMARY KEY ("problemId","tagId")
);

-- CreateTable
CREATE TABLE "Submission" (
    "submissionId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" VARCHAR(100) NOT NULL,
    "problemId" UUID NOT NULL,
    "languageId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "timeExecutionInMs" INTEGER NOT NULL,
    "memoryUsageInKb" INTEGER NOT NULL DEFAULT 256,
    "submissionTime" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "createdBy" VARCHAR(100),
    "updatedBy" VARCHAR(100),
    "deletedBy" VARCHAR(100),
    "problemContestId" UUID,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("submissionId")
);

-- CreateTable
CREATE TABLE "SubmissionTestcase" (
    "submissionId" UUID NOT NULL,
    "testcaseId" UUID NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "stdout" TEXT,
    "problemId" UUID NOT NULL,
    "runtimeInMs" INTEGER NOT NULL DEFAULT 10,
    "memoryUsedInKb" INTEGER NOT NULL DEFAULT 256,

    CONSTRAINT "SubmissionTestcase_SubmissionId_TestcaseId_pk" PRIMARY KEY ("submissionId","testcaseId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tagName" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(100),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "Testcase" (
    "testCaseId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "index" SMALLINT NOT NULL DEFAULT 1,
    "problemId" UUID NOT NULL,
    "inputData" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,
    "isSample" BOOLEAN NOT NULL DEFAULT false,
    "points" SMALLINT NOT NULL DEFAULT 0,
    "label" VARCHAR(50),
    "explanation" JSON,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "createdBy" VARCHAR(100),
    "updatedBy" VARCHAR(100),
    "deletedBy" VARCHAR(100),
    "metadata" JSON,

    CONSTRAINT "Testcase_pkey" PRIMARY KEY ("testCaseId")
);

-- CreateTable
CREATE TABLE "Contest" (
    "contestId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "totalParticipants" INTEGER NOT NULL DEFAULT 0,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "details" JSONB,
    "prices" JSONB,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("contestId")
);

-- CreateTable
CREATE TABLE "ProblemContest" (
    "id" UUID NOT NULL,
    "contestId" UUID NOT NULL,
    "problemId" UUID NOT NULL,

    CONSTRAINT "ProblemContest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "contestId" UUID NOT NULL,
    "userId" VARCHAR(100) NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "totalTime" INTEGER NOT NULL DEFAULT 0,
    "totalSolved" INTEGER NOT NULL DEFAULT 0,
    "submissionAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaderboard_ContestId_UserId_pk" PRIMARY KEY ("contestId","userId")
);

-- CreateTable
CREATE TABLE "ContestParticipant" (
    "contestId" UUID NOT NULL,
    "userId" VARCHAR(100) NOT NULL,
    "registerAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestParticipant_ContestId_UserId_pk" PRIMARY KEY ("contestId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Language_LanguageName_Unique" ON "Language"("languageName");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemLanguage" ADD CONSTRAINT "ProblemLanguage_LanguageId_Language_LanguageId_fk" FOREIGN KEY ("languageId") REFERENCES "Language"("languageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemLanguage" ADD CONSTRAINT "ProblemLanguage_ProblemId_Problem_ProblemId_fk" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemTag" ADD CONSTRAINT "ProblemTag_ProblemId_Problem_ProblemId_fk" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemTag" ADD CONSTRAINT "ProblemTag_TagId_Tag_TagId_fk" FOREIGN KEY ("tagId") REFERENCES "Tag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_ProblemId_Problem_ProblemId_fk" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_LanguageId_Language_LanguageId_fk" FOREIGN KEY ("languageId") REFERENCES "Language"("languageId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_ProblemContestId_ProblemContest_ProblemContestId_fk" FOREIGN KEY ("problemContestId") REFERENCES "ProblemContest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubmissionTestcase" ADD CONSTRAINT "SubmissionTestcase_ProblemId_Problem_ProblemId_fk" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionTestcase" ADD CONSTRAINT "SubmissionTestcase_SubmissionId_Submission_SubmissionId_fk" FOREIGN KEY ("submissionId") REFERENCES "Submission"("submissionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionTestcase" ADD CONSTRAINT "SubmissionTestcase_TestcaseId_Testcase_TestCaseId_fk" FOREIGN KEY ("testcaseId") REFERENCES "Testcase"("testCaseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testcase" ADD CONSTRAINT "Testcase_ProblemId_Problem_ProblemId_fk" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemContest" ADD CONSTRAINT "ProblemContest_ProblemId_Problem_ProblemId_fk" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemContest" ADD CONSTRAINT "ProblemContest_ContestId_Contest_ContestId_fk" FOREIGN KEY ("contestId") REFERENCES "Contest"("contestId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_ContestId_Contest_ContestId_fk" FOREIGN KEY ("contestId") REFERENCES "Contest"("contestId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipant" ADD CONSTRAINT "ContestParticipant_ContestId_Contest_ContestId_fk" FOREIGN KEY ("contestId") REFERENCES "Contest"("contestId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipant" ADD CONSTRAINT "ContestParticipant_UserId_User_Id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
