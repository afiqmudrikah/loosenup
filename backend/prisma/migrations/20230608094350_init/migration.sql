-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "postPostID" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postPostID_fkey" FOREIGN KEY ("postPostID") REFERENCES "Post"("postID") ON DELETE SET NULL ON UPDATE CASCADE;
