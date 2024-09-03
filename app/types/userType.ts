export type UserType =
    | {
          id?: string;
          name?: string | null;
          email?: string | null;
          emailVerified?: Date;
          description?: string | null;
          image?: string | null;
          hashedPassword?: string;
          createdAt?: Date;
          updatedAt?: Date;
          resetToken?: string;
          resetTokenExpired?: Date;
      }
    | undefined;
