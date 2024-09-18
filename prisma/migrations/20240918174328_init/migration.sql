-- CreateTable
CREATE TABLE "admin_roles" (
    "id" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "admin_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_permissions" (
    "id" TEXT NOT NULL,
    "accessPermissionName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "admin_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_admin_permissionsToadmin_roles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_roles_roleName_key" ON "admin_roles"("roleName");

-- CreateIndex
CREATE UNIQUE INDEX "admin_roles_slug_key" ON "admin_roles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "admin_permissions_accessPermissionName_key" ON "admin_permissions"("accessPermissionName");

-- CreateIndex
CREATE UNIQUE INDEX "admin_permissions_slug_key" ON "admin_permissions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_admin_permissionsToadmin_roles_AB_unique" ON "_admin_permissionsToadmin_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_permissionsToadmin_roles_B_index" ON "_admin_permissionsToadmin_roles"("B");

-- AddForeignKey
ALTER TABLE "_admin_permissionsToadmin_roles" ADD CONSTRAINT "_admin_permissionsToadmin_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "admin_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin_permissionsToadmin_roles" ADD CONSTRAINT "_admin_permissionsToadmin_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "admin_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
